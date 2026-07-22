(() => {
  "use strict";

  const MODULE_ID = "battle-army-tools";
  const MODULE_TITLE = "Battle Army Tools";
  const MODULE_VERSION = "0.2.3";

  const FLAG_SCOPE = "world";
  const BATTLE_UNIT_KEY = "battleUnit";
  const TERRAIN_FLAG_KEY = "battleTerrain";
  const COMMANDER_KEY = "battleCommander";
  const TURN_TRACKER_KEY = "battleTurnState";
  const ROUTED_POOL_TOKEN_NAME_DEFAULT = "Routed Pool";

  const SOCKET_TYPE_COMBAT_REQUEST = "combatRequest";
  const SOCKET_TYPE_COMBAT_RESULT = "combatResult";

  const TOOLTIP_ID = "battle-army-tools-tooltip";
  const HUD_ID = "battle-army-tools-turn-hud";
  const PANEL_ID = "battle-army-tools-action-panel";

  const CLEAR_TERRAIN = {
    key: "clear",
    label: "Clear / None",
    customName: "Clear / None",
    priority: 0,
    movementPenalty: 0,
    movementBonus: 0,
    defenceBonus: 0,
    rangedDefenceBonus: 0,
    attackPenaltyInto: 0,
    attackBonusFrom: 0,
    rangeBonusFrom: 0,
    chargeBlocked: false
  };

  const state = {
    movement: {
      active: false,
      pendingMoves: {},
      preUpdateHandler: null,
      updateHandler: null
    },
    tooltip: {
      active: false,
      hoverHandler: null,
      currentTokenId: null
    },
    hpBars: {
      active: false,
      updateHandler: null
    },
    panel: {
      active: false
    },
    socketRegistered: false
  };

  function setting(key) {
    return game.settings.get(MODULE_ID, key);
  }

  function registerSetting(key, name, hint, type, defaultValue, config = true) {
    game.settings.register(MODULE_ID, key, {
      name,
      hint,
      scope: "world",
      config,
      type,
      default: defaultValue,
      onChange: () => restartEnabledFeatures()
    });
  }

  Hooks.once("init", () => {
    registerSetting(
      "enableMovementWatcher",
      "Enable Movement Watcher",
      "Automatically enforce cumulative army-unit movement.",
      Boolean,
      true
    );

    registerSetting(
      "enforceMovement",
      "Enforce Movement Allowance",
      "Prevent army units from moving beyond their cumulative movement allowance.",
      Boolean,
      true
    );

    registerSetting(
      "blockRoutedMovement",
      "Block Routed Movement",
      "Prevent routed or inactive units from being moved manually. Routed-pool transfers from Resolve Combat are still allowed.",
      Boolean,
      true
    );

    registerSetting(
      "blockOccupiedSquares",
      "Block Occupied Squares",
      "Prevent active battle units from moving onto a square already occupied by another active battle unit.",
      Boolean,
      true
    );

    registerSetting(
      "movementNotifications",
      "Movement Notifications",
      "Show a notification when a unit legally moves.",
      Boolean,
      true
    );

    registerSetting(
      "enableHoverTooltip",
      "Enable Battle Unit Hover Tooltip",
      "Show battle stats, movement, ammo, commander tokens, terrain, and status when hovering a battle unit.",
      Boolean,
      true
    );

    registerSetting(
      "tooltipDockLeft",
      "Dock Hover Tooltip Left",
      "Keep the battle tooltip docked on the left side of the screen instead of following the mouse.",
      Boolean,
      true
    );

    registerSetting(
      "enableTurnHud",
      "Enable Battle Turn HUD",
      "Show a compact HUD with current round, side, and current side command tokens.",
      Boolean,
      true
    );

    registerSetting(
      "enableHpBars",
      "Enable Custom Battle HP Bars",
      "Draw custom HP bars on battle unit tokens.",
      Boolean,
      true
    );

    registerSetting(
      "enableActionPanel",
      "Enable Battle Action Panel",
      "Show a compact action panel with Resolve Combat and reset helpers.",
      Boolean,
      true
    );

    registerSetting(
      "allowPlayerCombatRequests",
      "Allow Player Combat Requests",
      "Let players request combat resolution from their selected attacker against their targeted defender. The active GM performs the actual token updates.",
      Boolean,
      true
    );

    registerSetting(
      "enforceActiveTurnForCombat",
      "Enforce Active Turn for Combat",
      "Prevent players from resolving combat with an attacker that does not match the current turn tracker side, commander, alliance, or formation.",
      Boolean,
      true
    );

    registerSetting(
      "allowGmOutOfTurnCombat",
      "Allow GM Out-of-Turn Combat Override",
      "Let the GM resolve out-of-turn combat directly for corrections and testing. Player requests are still blocked when active-turn enforcement is enabled.",
      Boolean,
      true
    );

    registerSetting(
      "routedPoolTokenName",
      "Routed Pool Token Name",
      "Name of the token used as the anchor for routed units.",
      String,
      ROUTED_POOL_TOKEN_NAME_DEFAULT
    );

    registerSetting(
      "rallyPromptOnMoraleFailure",
      "Prompt Rally on Morale Failure",
      "When a unit fails morale and has a commander token available, ask the GM whether to spend one command token to rally instead of routing.",
      Boolean,
      true
    );

    registerSetting(
      "debugMode",
      "Debug Mode",
      "Log extra Battle Army Tools information to the console.",
      Boolean,
      false
    );
  });

  Hooks.once("ready", () => {
    exposeApi();
    registerSocketHandler();
    restartEnabledFeatures();
    ui.notifications.info(`${MODULE_TITLE} ${MODULE_VERSION} ready.`);
  });

  Hooks.on("canvasReady", () => {
    setTimeout(() => {
      refreshAllHpBars();
      renderTurnHud();
    }, 250);
  });

  Hooks.on("updateScene", (scene) => {
    if (canvas?.scene && scene.id === canvas.scene.id) {
      setTimeout(renderTurnHud, 100);
    }
  });

  Hooks.on("createActor", () => setTimeout(renderTurnHud, 100));
  Hooks.on("updateActor", () => setTimeout(renderTurnHud, 100));
  Hooks.on("deleteActor", () => setTimeout(renderTurnHud, 100));

  function debug(...args) {
    if (game?.settings && setting("debugMode")) {
      console.log(`${MODULE_TITLE} |`, ...args);
    }
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getBattleUnitFromToken(token) {
    return token?.document?.getFlag(FLAG_SCOPE, BATTLE_UNIT_KEY) || null;
  }

  function getBattleUnitFromDocument(tokenDocument) {
    return tokenDocument?.getFlag(FLAG_SCOPE, BATTLE_UNIT_KEY) || null;
  }

  function getHp(unit) {
    return Number(unit?.health?.value || 0);
  }

  function getMaxHp(unit) {
    return Number(unit?.health?.max || unit?.health || 1);
  }

  function isActiveUnit(unit) {
    return unit && unit.status !== "Routed" && getHp(unit) > 0;
  }

  function getUnitName(unit, fallback = "Unknown Unit") {
    return String(unit?.name || fallback);
  }

  function getTerrainName(terrain) {
    if (!terrain) return "Clear / None";
    return String(terrain.customName || terrain.label || terrain.key || "Clear / None");
  }

  function getTerrainValue(terrain, key) {
    if (!terrain) return 0;
    return Number(terrain[key] || 0);
  }

  function isRangedCapableUnit(unit) {
    const type = String(unit?.type || "").toLowerCase();
    const ability = String(unit?.ability || "").toLowerCase();
    const name = String(unit?.name || "").toLowerCase();

    if (type.includes("ranged")) return true;
    if (ability === "volley") return true;
    if (ability === "hit & run") return true;
    if (ability === "incinerate") return true;
    if (name.includes("bowman")) return true;
    if (name.includes("crossbow")) return true;
    if (name.includes("archer")) return true;
    if (name.includes("dragon")) return true;

    return false;
  }

  function isArcherLikeUnit(unit) {
    const type = String(unit?.type || "").toLowerCase();
    const ability = String(unit?.ability || "").toLowerCase();
    const name = String(unit?.name || "").toLowerCase();

    if (ability === "volley") return true;
    if (ability === "hit & run") return true;
    if (type.includes("ranged")) return true;
    if (type.includes("archer")) return true;
    if (name.includes("bowman")) return true;
    if (name.includes("crossbow")) return true;
    if (name.includes("archer")) return true;

    return false;
  }

  function ensureAmmoDefaults(unit) {
    if (!unit || !isArcherLikeUnit(unit)) return unit;

    if (!Number.isFinite(Number(unit.ammoMax))) unit.ammoMax = 5;
    if (!Number.isFinite(Number(unit.ammoRemaining))) unit.ammoRemaining = Number(unit.ammoMax || 5);

    unit.ammoMax = Math.max(0, Number(unit.ammoMax || 0));
    unit.ammoRemaining = clamp(Number(unit.ammoRemaining || 0), 0, unit.ammoMax);

    return unit;
  }

  function getAmmoText(unit) {
    if (!isArcherLikeUnit(unit)) return "N/A";
    ensureAmmoDefaults(unit);
    return `${unit.ammoRemaining} / ${unit.ammoMax}`;
  }

  function getCommanderActorForUnit(unit) {
    if (!unit) return null;

    if (unit.commanderActorId) {
      const actor = game.actors.get(unit.commanderActorId);
      if (actor) return actor;
    }

    const commanderName = String(unit.commanderName || "").trim();
    if (!commanderName) return null;

    return game.actors.contents.find((actor) => {
      const data = actor.getFlag(FLAG_SCOPE, COMMANDER_KEY);
      return data && String(data.commanderName || "").trim() === commanderName;
    }) || null;
  }

  function getCommanderCommandInfo(unit) {
    const actor = getCommanderActorForUnit(unit);

    if (!actor) {
      return {
        actor: null,
        found: false,
        commanderName: unit?.commanderName || "No Commander",
        max: 0,
        remaining: 0,
        text: "No commander linked"
      };
    }

    const data = actor.getFlag(FLAG_SCOPE, COMMANDER_KEY) || {};
    const max = Math.max(0, Number(data.commandTokensMax ?? data.commandTokensPerTurn ?? data.commandTokens ?? 1));
    const remaining = Math.max(0, Number(data.commandTokensRemaining ?? max));
    const commanderName = data.commanderName || unit?.commanderName || actor.name;

    return {
      actor,
      found: true,
      data,
      commanderName,
      max,
      remaining,
      text: `${commanderName}: ${remaining} / ${max}`
    };
  }

  function getCommanderEntries() {
    return game.actors.contents
      .map((actor) => ({ actor, data: actor.getFlag(FLAG_SCOPE, COMMANDER_KEY) }))
      .filter((entry) => Boolean(entry.data));
  }

  function commanderMatchesSide(entry, side, mode) {
    if (!entry?.data) return false;

    if (mode === "Alliance") {
      return String(entry.data.alliance || "").trim() === String(side || "").trim();
    }

    return String(entry.data.team || "").trim() === String(side || "").trim();
  }

  function getCurrentTurnState() {
    return canvas?.scene?.getFlag(FLAG_SCOPE, TURN_TRACKER_KEY) || null;
  }

  function getCurrentSide(turnState) {
    if (!turnState) return null;
    return (
      turnState.currentSide ||
      turnState.order?.[turnState.sideIndex] ||
      turnState.order?.[turnState.currentIndex] ||
      null
    );
  }

  function getCurrentPhase(turnState) {
    if (!turnState) return null;
    return turnState.phases?.[turnState.phaseIndex] || null;
  }

  /* ----------------------------------------------------------------------- */
  /* Terrain detection                                                        */
  /* ----------------------------------------------------------------------- */

  function normalizeShapeType(type) {
    const value = String(type ?? "").toLowerCase();

    if (value === "r" || value.includes("rect")) return "rectangle";
    if (value === "e" || value.includes("ellipse") || value.includes("circle")) return "ellipse";
    if (value === "p" || value.includes("poly")) return "polygon";
    if (value === "f" || value.includes("free")) return "freehand";

    return value;
  }

  function getDrawingLocalPoint(point, drawing) {
    const doc = drawing.document;
    return {
      x: point.x - Number(doc.x || 0),
      y: point.y - Number(doc.y || 0)
    };
  }

  function pointInRectangle(localPoint, shape) {
    const width = Number(shape.width || 0);
    const height = Number(shape.height || 0);

    return localPoint.x >= 0 && localPoint.y >= 0 && localPoint.x <= width && localPoint.y <= height;
  }

  function pointInEllipse(localPoint, shape) {
    const width = Number(shape.width || 0);
    const height = Number(shape.height || 0);

    if (width <= 0 || height <= 0) return false;

    const rx = width / 2;
    const ry = height / 2;
    const cx = rx;
    const cy = ry;
    const dx = (localPoint.x - cx) / rx;
    const dy = (localPoint.y - cy) / ry;

    return dx * dx + dy * dy <= 1;
  }

  function normalizePoints(rawPoints) {
    if (!Array.isArray(rawPoints) || rawPoints.length === 0) return [];

    if (typeof rawPoints[0] === "number") {
      const points = [];
      for (let i = 0; i < rawPoints.length - 1; i += 2) {
        points.push({ x: Number(rawPoints[i] || 0), y: Number(rawPoints[i + 1] || 0) });
      }
      return points;
    }

    return rawPoints.map((point) => ({ x: Number(point.x || 0), y: Number(point.y || 0) }));
  }

  function pointInPolygon(localPoint, points) {
    if (!points || points.length < 3) return false;

    let inside = false;

    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const xi = points[i].x;
      const yi = points[i].y;
      const xj = points[j].x;
      const yj = points[j].y;

      const intersects =
        yi > localPoint.y !== yj > localPoint.y &&
        localPoint.x < ((xj - xi) * (localPoint.y - yi)) / ((yj - yi) || 0.000001) + xi;

      if (intersects) inside = !inside;
    }

    return inside;
  }

  function distancePointToSegment(point, a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;

    if (dx === 0 && dy === 0) return Math.hypot(point.x - a.x, point.y - a.y);

    const t = Math.max(
      0,
      Math.min(1, ((point.x - a.x) * dx + (point.y - a.y) * dy) / (dx * dx + dy * dy))
    );

    const projection = { x: a.x + t * dx, y: a.y + t * dy };
    return Math.hypot(point.x - projection.x, point.y - projection.y);
  }

  function pointNearFreehandLine(localPoint, points, tolerance) {
    if (!points || points.length < 2) return false;

    for (let i = 0; i < points.length - 1; i++) {
      if (distancePointToSegment(localPoint, points[i], points[i + 1]) <= tolerance) return true;
    }

    return false;
  }

  function pointInsideDrawing(point, drawing) {
    if (!drawing) return false;

    const doc = drawing.document;
    const shape = doc.shape || {};
    const shapeType = normalizeShapeType(shape.type);
    const localPoint = getDrawingLocalPoint(point, drawing);

    if (shapeType === "rectangle") return pointInRectangle(localPoint, shape);
    if (shapeType === "ellipse") return pointInEllipse(localPoint, shape);

    if (shapeType === "polygon") {
      const points = normalizePoints(shape.points || doc.points || []);
      return pointInPolygon(localPoint, points);
    }

    if (shapeType === "freehand") {
      const points = normalizePoints(shape.points || doc.points || []);
      const gridSize = canvas.scene.grid.size || 100;
      const tolerance = Math.max(12, gridSize * 0.35);
      return pointNearFreehandLine(localPoint, points, tolerance);
    }

    const width = Number(shape.width || 0);
    const height = Number(shape.height || 0);
    return localPoint.x >= 0 && localPoint.y >= 0 && localPoint.x <= width && localPoint.y <= height;
  }

  function getPrimaryTerrainAtPoint(point) {
    const zones = [];

    for (const drawing of canvas.drawings?.placeables || []) {
      const terrain = drawing.document.getFlag(FLAG_SCOPE, TERRAIN_FLAG_KEY);
      if (!terrain) continue;

      if (pointInsideDrawing(point, drawing)) {
        zones.push({ drawing, terrain });
      }
    }

    zones.sort((a, b) => Number(b.terrain.priority || 0) - Number(a.terrain.priority || 0));

    if (zones.length === 0) return CLEAR_TERRAIN;

    return { ...CLEAR_TERRAIN, ...zones[0].terrain };
  }

  function getPrimaryTerrainUnderToken(token) {
    if (!token) return CLEAR_TERRAIN;
    return getPrimaryTerrainAtPoint(token.center);
  }

  /* ----------------------------------------------------------------------- */
  /* Movement watcher                                                         */
  /* ----------------------------------------------------------------------- */

  function isMovementUpdate(change) {
    return Boolean(
      change &&
      (Object.prototype.hasOwnProperty.call(change, "x") || Object.prototype.hasOwnProperty.call(change, "y"))
    );
  }

  function isRoutedPoolBypass(unit, options) {
    return Boolean(
      options?.battleRoutedPoolMove ||
      options?.bypassBattleMovementWatcher ||
      options?.teleport
    );
  }

  function calculateIncrementalMovementPath(originX, originY, destinationX, destinationY) {
    const gridSize = canvas.scene.grid.size || 100;
    const dxSquares = Math.round((destinationX - originX) / gridSize);
    const dySquares = Math.round((destinationY - originY) / gridSize);
    const steps = Math.max(Math.abs(dxSquares), Math.abs(dySquares));

    if (steps <= 0) {
      return {
        steps: 0,
        totalCost: 0,
        bonusAllowance: 0,
        terrainCounts: {},
        terrainSteps: [],
        summary: "No movement."
      };
    }

    let totalCost = 0;
    let bonusAllowance = 0;
    const terrainCounts = {};
    const terrainSteps = [];

    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const sampleTopLeftX = originX + dxSquares * gridSize * t;
      const sampleTopLeftY = originY + dySquares * gridSize * t;
      const samplePoint = {
        x: sampleTopLeftX + gridSize / 2,
        y: sampleTopLeftY + gridSize / 2
      };

      const terrain = getPrimaryTerrainAtPoint(samplePoint);
      const terrainName = getTerrainName(terrain);
      const movementPenalty = getTerrainValue(terrain, "movementPenalty");
      const movementBonus = getTerrainValue(terrain, "movementBonus");
      const stepCost = Math.max(1, 1 + movementPenalty);

      totalCost += stepCost;
      bonusAllowance = Math.max(bonusAllowance, movementBonus);

      if (!terrainCounts[terrainName]) terrainCounts[terrainName] = 0;
      terrainCounts[terrainName]++;

      terrainSteps.push({ step: i, terrain, terrainName, cost: stepCost });
    }

    const summary = Object.keys(terrainCounts).map((terrainName) => `${terrainName} x${terrainCounts[terrainName]}`).join(", ");

    return {
      steps,
      totalCost,
      bonusAllowance,
      terrainCounts,
      terrainSteps,
      summary: summary || "Clear / None"
    };
  }

  function calculateAllowanceAfterMove(unit, incrementalPath) {
    const baseMovement = Number(unit.movement || 0);
    const previousBonus = Number(unit.movementBonusAllowance || 0);
    const newBonus = Number(incrementalPath?.bonusAllowance || 0);
    const bonusAllowance = Math.max(previousBonus, newBonus);

    return {
      baseMovement,
      bonusAllowance,
      totalAllowance: baseMovement + bonusAllowance
    };
  }

  function calculateCumulativeMovementAfterMove(unit, incrementalPath) {
    return Number(unit.movementUsed || 0) + Number(incrementalPath?.totalCost || 0);
  }

  function findActiveBattleTokenAtPosition(x, y, ignoreTokenId) {
    const gridSize = canvas.scene.grid.size || 100;

    return canvas.tokens.placeables.find((token) => {
      if (token.document.id === ignoreTokenId || token.id === ignoreTokenId) return false;

      const unit = getBattleUnitFromToken(token);
      if (!isActiveUnit(unit)) return false;

      const tokenX = Number(token.document.x || 0);
      const tokenY = Number(token.document.y || 0);

      return Math.abs(tokenX - x) < gridSize * 0.25 && Math.abs(tokenY - y) < gridSize * 0.25;
    }) || null;
  }

  async function postMovementChat(tokenDocument, unit, movementRecord) {
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Battle Movement Watcher" }),
      content:
        "<h2>Unit Moved</h2>" +
        `<p><strong>Unit:</strong> ${escapeHtml(unit.name || tokenDocument.name)}</p>` +
        `<p><strong>This Move Cost:</strong> ${escapeHtml(movementRecord.thisMoveCost)}</p>` +
        `<p><strong>Total Movement Used This Turn:</strong> ${escapeHtml(movementRecord.cumulativeMovementUsed)}</p>` +
        `<p><strong>Allowance:</strong> ${escapeHtml(movementRecord.allowance)}</p>` +
        `<p><strong>Remaining Movement:</strong> ${escapeHtml(movementRecord.remainingMovement)}</p>` +
        `<p><strong>Terrain Crossed:</strong> ${escapeHtml(movementRecord.terrainSummary)}</p>` +
        "<p><strong>hasMoved:</strong> true</p>"
    });
  }

  function startMovementWatcher() {
    stopMovementWatcher(false);

    if (!setting("enableMovementWatcher")) return;

    const pendingMoves = {};

    const preUpdateHandler = function (tokenDocument, change, options, userId) {
      if (userId !== game.user.id) return;
      if (!isMovementUpdate(change)) return;

      const unit = getBattleUnitFromDocument(tokenDocument);
      if (!unit) return;

      if (isRoutedPoolBypass(unit, options)) {
        delete pendingMoves[tokenDocument.id];
        return true;
      }

      const oldX = Number(tokenDocument.x || 0);
      const oldY = Number(tokenDocument.y || 0);
      const newX = Number(change.x ?? oldX);
      const newY = Number(change.y ?? oldY);

      if (oldX === newX && oldY === newY) return;

      if (setting("blockOccupiedSquares")) {
        const blocker = findActiveBattleTokenAtPosition(newX, newY, tokenDocument.id);
        if (blocker) {
          const blockerUnit = getBattleUnitFromToken(blocker);
          ui.notifications.warn(`Occupied square: ${getUnitName(blockerUnit, blocker.name)} is already there.`);
          delete pendingMoves[tokenDocument.id];
          return false;
        }
      }

      if (setting("blockRoutedMovement") && unit.status === "Routed") {
        ui.notifications.warn("Routed units cannot move.");
        delete pendingMoves[tokenDocument.id];
        return false;
      }

      if (!isActiveUnit(unit)) {
        ui.notifications.warn("Inactive units cannot move.");
        delete pendingMoves[tokenDocument.id];
        return false;
      }

      const incrementalPath = calculateIncrementalMovementPath(oldX, oldY, newX, newY);
      const cumulativeUsed = calculateCumulativeMovementAfterMove(unit, incrementalPath);
      const allowance = calculateAllowanceAfterMove(unit, incrementalPath);
      const remainingMovement = Math.max(0, allowance.totalAllowance - cumulativeUsed);

      if (setting("enforceMovement") && cumulativeUsed > allowance.totalAllowance) {
        ui.notifications.warn(
          `Illegal movement for ${unit.name || tokenDocument.name}. ` +
          `This move costs ${incrementalPath.totalCost}, total would be ${cumulativeUsed} / allowance ${allowance.totalAllowance}. ` +
          `Terrain: ${incrementalPath.summary}.`
        );

        delete pendingMoves[tokenDocument.id];
        return false;
      }

      pendingMoves[tokenDocument.id] = {
        tokenId: tokenDocument.id,
        fromX: oldX,
        fromY: oldY,
        destinationX: newX,
        destinationY: newY,
        thisMoveCost: incrementalPath.totalCost,
        cumulativeMovementUsed: cumulativeUsed,
        allowance: allowance.totalAllowance,
        baseMovement: allowance.baseMovement,
        bonusAllowance: allowance.bonusAllowance,
        remainingMovement,
        terrainSummary: incrementalPath.summary,
        createdAt: Date.now()
      };
    };

    const updateHandler = async function (tokenDocument, change, options, userId) {
      if (userId !== game.user.id) return;
      if (!isMovementUpdate(change)) return;

      const unit = getBattleUnitFromDocument(tokenDocument);
      if (!unit) return;

      if (isRoutedPoolBypass(unit, options)) {
        delete pendingMoves[tokenDocument.id];
        return;
      }

      const pending = pendingMoves[tokenDocument.id];
      if (!pending) return;

      delete pendingMoves[tokenDocument.id];
      if (pending.thisMoveCost <= 0) return;

      unit.hasMoved = true;
      unit.movementUsed = pending.cumulativeMovementUsed;
      unit.movementBonusAllowance = pending.bonusAllowance;
      unit.remainingMovement = pending.remainingMovement;

      if (!unit.movementOrigin || unit.movementOrigin.sceneId !== canvas.scene.id) {
        unit.movementOrigin = {
          sceneId: canvas.scene.id,
          x: pending.fromX,
          y: pending.fromY,
          setAt: new Date().toISOString(),
          source: `${MODULE_TITLE} ${MODULE_VERSION}`
        };
      }

      unit.lastMovement = {
        version: `${MODULE_TITLE} ${MODULE_VERSION}`,
        sceneId: canvas.scene.id,
        fromX: pending.fromX,
        fromY: pending.fromY,
        destinationX: pending.destinationX,
        destinationY: pending.destinationY,
        thisMoveCost: pending.thisMoveCost,
        cumulativeMovementUsed: pending.cumulativeMovementUsed,
        allowance: pending.allowance,
        baseMovement: pending.baseMovement,
        bonusAllowance: pending.bonusAllowance,
        remainingMovement: pending.remainingMovement,
        terrainSummary: pending.terrainSummary,
        movedAt: new Date().toISOString()
      };

      unit.lastKnownX = pending.destinationX;
      unit.lastKnownY = pending.destinationY;

      await tokenDocument.setFlag(FLAG_SCOPE, BATTLE_UNIT_KEY, unit);

      if (setting("movementNotifications")) {
        ui.notifications.info(`${unit.name || tokenDocument.name} moved. Total used ${pending.cumulativeMovementUsed} / ${pending.allowance}.`);
      }

      debug("Movement applied", unit.name || tokenDocument.name, pending);
    };

    Hooks.on("preUpdateToken", preUpdateHandler);
    Hooks.on("updateToken", updateHandler);

    state.movement = {
      active: true,
      pendingMoves,
      preUpdateHandler,
      updateHandler
    };

    debug("Movement watcher started");
  }

  function stopMovementWatcher(notify = false) {
    if (state.movement.preUpdateHandler) Hooks.off("preUpdateToken", state.movement.preUpdateHandler);
    if (state.movement.updateHandler) Hooks.off("updateToken", state.movement.updateHandler);

    state.movement = {
      active: false,
      pendingMoves: {},
      preUpdateHandler: null,
      updateHandler: null
    };

    if (notify) ui.notifications.info("Battle Army Tools movement watcher stopped.");
  }

  /* ----------------------------------------------------------------------- */
  /* HP bars                                                                  */
  /* ----------------------------------------------------------------------- */

  function getHpColour(percent, status) {
    if (status === "Routed") return 0x660000;
    if (percent <= 0.2) return 0xcc0000;
    if (percent <= 0.5) return 0xffcc00;
    return 0x00aa00;
  }

  function removeBattleHpBar(token) {
    if (!token?.children) return;

    const existing = token.children.find((child) => child.name === "battle-army-tools-hp-bar");
    if (existing) {
      token.removeChild(existing);
      existing.destroy({ children: true });
    }
  }

  function drawBattleHpBar(token) {
    if (!setting("enableHpBars")) return;

    const unit = getBattleUnitFromToken(token);
    if (!unit) {
      removeBattleHpBar(token);
      return;
    }

    removeBattleHpBar(token);

    const hp = getHp(unit);
    const maxHp = getMaxHp(unit);
    const percent = clamp(hp / maxHp, 0, 1);

    const container = new PIXI.Container();
    container.name = "battle-army-tools-hp-bar";

    const barWidth = token.w * 0.78;
    const barHeight = 7;
    const x = token.w * 0.11;
    const y = token.h - 10;

    const background = new PIXI.Graphics();
    background.beginFill(0x000000, 0.75);
    background.drawRoundedRect(x, y, barWidth, barHeight, 3);
    background.endFill();

    const fill = new PIXI.Graphics();
    fill.beginFill(getHpColour(percent, unit.status));
    fill.drawRoundedRect(x, y, barWidth * percent, barHeight, 3);
    fill.endFill();

    const border = new PIXI.Graphics();
    border.lineStyle(1, 0xffffff, 0.8);
    border.drawRoundedRect(x, y, barWidth, barHeight, 3);

    container.addChild(background);
    container.addChild(fill);
    container.addChild(border);

    token.addChild(container);
  }

  function refreshAllHpBars() {
    if (!canvas?.tokens?.placeables) return;
    for (const token of canvas.tokens.placeables) drawBattleHpBar(token);
  }

  function startHpBars() {
    stopHpBars();
    if (!setting("enableHpBars")) return;

    const updateHandler = (tokenDocument) => {
      const token = canvas.tokens.get(tokenDocument.id);
      if (!token) return;
      setTimeout(() => drawBattleHpBar(token), 100);
    };

    Hooks.on("updateToken", updateHandler);
    Hooks.on("createToken", updateHandler);

    state.hpBars = { active: true, updateHandler };
    setTimeout(refreshAllHpBars, 250);
  }

  function stopHpBars() {
    if (state.hpBars.updateHandler) {
      Hooks.off("updateToken", state.hpBars.updateHandler);
      Hooks.off("createToken", state.hpBars.updateHandler);
    }

    state.hpBars = { active: false, updateHandler: null };
  }

  /* ----------------------------------------------------------------------- */
  /* Hover tooltip                                                            */
  /* ----------------------------------------------------------------------- */

  function getTooltipElement() {
    let el = document.getElementById(TOOLTIP_ID);
    if (!el) {
      el = document.createElement("div");
      el.id = TOOLTIP_ID;
      el.className = "battle-army-tools-tooltip";
      document.body.appendChild(el);
    }
    return el;
  }

  function hideTooltip() {
    const el = document.getElementById(TOOLTIP_ID);
    if (el) el.style.display = "none";
    state.tooltip.currentTokenId = null;
  }

  function canVolley(unit) {
    const ability = String(unit?.ability || "").toLowerCase();
    if (ability !== "volley") return false;
    if (unit.hasMoved) return false;
    ensureAmmoDefaults(unit);
    if (Number(unit.ammoRemaining || 0) <= 0) return false;

    const command = getCommanderCommandInfo(unit);
    return command.found && command.remaining > 0;
  }

  function movementText(unit) {
    const base = Number(unit.movement || 0);
    const used = Number(unit.movementUsed || 0);
    const bonus = Number(unit.movementBonusAllowance || 0);
    const allowance = base + bonus;
    const remaining = Number.isFinite(Number(unit.remainingMovement))
      ? Number(unit.remainingMovement)
      : Math.max(0, allowance - used);

    return `${used} / ${allowance} used, ${remaining} left`;
  }

  function signedNumber(value) {
    const n = Number(value || 0);
    if (n > 0) return `+${n}`;
    return String(n);
  }

  function signedDice(value) {
    const n = Number(value || 0);
    if (n === 0) return "+0";
    return n > 0 ? `+${n}` : String(n);
  }

  function statusClass(unit) {
    const hp = getHp(unit);
    const maxHp = getMaxHp(unit);
    const status = String(unit?.status || "Active");

    if (status === "Routed" || hp <= 0) return "bat-status-routed";
    if (hp <= Math.floor(maxHp * 0.2)) return "bat-status-danger";
    if (hp <= Math.floor(maxHp * 0.5)) return "bat-status-warning";
    return "bat-status-active";
  }

  function statLine(baseValue, bonusValue, label = "terrain") {
    const base = Number(baseValue || 0);
    const bonus = Number(bonusValue || 0);
    const total = base + bonus;

    if (bonus === 0) {
      return `<strong>${escapeHtml(base)}</strong>`;
    }

    return `<strong>${escapeHtml(total)}</strong><span class="bat-tooltip-muted"> ${escapeHtml(base)} ${signedDice(bonus)} ${escapeHtml(label)}</span>`;
  }

  function terrainAttackBonus(unit, terrain) {
    return getTerrainValue(terrain, "attackBonusFrom");
  }

  function terrainDefenceBonus(unit, terrain) {
    return getTerrainValue(terrain, "defenceBonus");
  }

  function terrainRangedDefenceBonus(unit, terrain) {
    return getTerrainValue(terrain, "defenceBonus") + getTerrainValue(terrain, "rangedDefenceBonus");
  }

  function terrainRangeBonus(unit, terrain) {
    if (!isRangedCapableUnit(unit)) return 0;
    return getTerrainValue(terrain, "rangeBonusFrom");
  }

  function movementBreakdown(unit, terrain) {
    const baseMove = Number(unit.movement || 0);
    const terrainPenalty = getTerrainValue(terrain, "movementPenalty");
    const terrainBonus = getTerrainValue(terrain, "movementBonus");

    const parts = [];

    if (terrainPenalty) parts.push(`${signedNumber(terrainPenalty)} step cost`);
    if (terrainBonus) parts.push(`+${terrainBonus} allowance`);

    if (parts.length === 0) {
      return `<strong>${escapeHtml(baseMove)}</strong><span class="bat-tooltip-muted"> no terrain move modifier</span>`;
    }

    return `<strong>${escapeHtml(baseMove)}</strong><span class="bat-tooltip-muted"> ${escapeHtml(parts.join(" / "))}</span>`;
  }

  function terrainEffectRows(unit, terrain) {
    const rows = [];

    const defenceBonus = getTerrainValue(terrain, "defenceBonus");
    const rangedDefenceBonus = getTerrainValue(terrain, "rangedDefenceBonus");
    const attackPenaltyInto = getTerrainValue(terrain, "attackPenaltyInto");
    const attackBonusFrom = getTerrainValue(terrain, "attackBonusFrom");
    const rangeBonusFrom = getTerrainValue(terrain, "rangeBonusFrom");
    const movementPenalty = getTerrainValue(terrain, "movementPenalty");
    const movementBonus = getTerrainValue(terrain, "movementBonus");

    if (movementPenalty || movementBonus) {
      rows.push(["Movement", `${movementPenalty ? signedNumber(movementPenalty) + " step cost" : "+0 penalty"}${movementBonus ? " / +" + movementBonus + " allowance" : ""}`]);
    }

    if (attackBonusFrom) rows.push(["Attack From Terrain", `${signedDice(attackBonusFrom)} dice`]);
    if (defenceBonus) rows.push(["Defence In Terrain", `${signedDice(defenceBonus)} dice`]);
    if (rangedDefenceBonus) rows.push(["Extra vs Ranged", `${signedDice(rangedDefenceBonus)} dice`]);
    if (rangeBonusFrom && isRangedCapableUnit(unit)) rows.push(["Range From Terrain", `${signedDice(rangeBonusFrom)} squares`]);
    if (attackPenaltyInto) rows.push(["Enemy Ranged Attack Into", `${signedDice(-attackPenaltyInto)} attack dice`]);
    if (terrain?.chargeBlocked) rows.push(["Charge", "Blocked here"]);

    if (rows.length === 0) {
      return `<div class="bat-tooltip-row"><span>Effects</span><strong>None</strong></div>`;
    }

    return rows.map(([label, value]) => {
      return `<div class="bat-tooltip-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
    }).join("");
  }

  function tooltipSection(title, rowsHtml) {
    return `
      <div class="bat-tooltip-section">
        <div class="bat-tooltip-section-title">${escapeHtml(title)}</div>
        ${rowsHtml}
      </div>
    `;
  }

  function rowHtml(label, valueHtml) {
    return `<div class="bat-tooltip-row"><span>${escapeHtml(label)}</span>${valueHtml}</div>`;
  }

  function buildTooltipHtml(token) {
    const unit = getBattleUnitFromToken(token);
    if (!unit) return "";

    ensureAmmoDefaults(unit);

    const terrain = getPrimaryTerrainUnderToken(token);
    const command = getCommanderCommandInfo(unit);
    const hp = getHp(unit);
    const maxHp = getMaxHp(unit);
    const status = unit.status || "Active";
    const hpPercent = clamp(maxHp > 0 ? hp / maxHp : 0, 0, 1);

    const attackBonus = terrainAttackBonus(unit, terrain);
    const defenceBonus = terrainDefenceBonus(unit, terrain);
    const rangedDefenceBonus = terrainRangedDefenceBonus(unit, terrain);
    const rangeBonus = terrainRangeBonus(unit, terrain);

    const coreRows =
      rowHtml("Status", `<strong class="bat-status-pill ${statusClass(unit)}">${escapeHtml(status)}</strong>`) +
      rowHtml("HP", `<strong class="${statusClass(unit)}">${escapeHtml(hp)} / ${escapeHtml(maxHp)}</strong><div class="bat-tooltip-mini-bar"><div style="width:${Math.round(hpPercent * 100)}%;"></div></div>`) +
      rowHtml("Attack", statLine(unit.attack, attackBonus, "terrain")) +
      rowHtml("Defence", statLine(unit.defence, defenceBonus, "terrain")) +
      rowHtml("Vs Ranged Defence", statLine(unit.defence, rangedDefenceBonus, "terrain")) +
      rowHtml("Range", statLine(unit.range, rangeBonus, "terrain")) +
      rowHtml("Move", movementBreakdown(unit, terrain));

    const turnRows =
      rowHtml("Movement", `<strong>${escapeHtml(movementText(unit))}</strong>`) +
      rowHtml("Moved / Attacked", `<strong>${unit.hasMoved ? "Yes" : "No"} / ${unit.hasAttacked ? "Yes" : "No"}</strong>`) +
      rowHtml("Ammo", `<strong>${escapeHtml(getAmmoText(unit))}</strong>`) +
      rowHtml("Can Volley", `<strong class="${canVolley(unit) ? "bat-good" : "bat-muted"}">${canVolley(unit) ? "Yes" : "No"}</strong>`) +
      rowHtml("Ability", `<strong>${escapeHtml(unit.ability || "None")}</strong>`);

    const commandRows =
      rowHtml("Commander", `<strong>${escapeHtml(command.text)}</strong>`) +
      rowHtml("Team", `<strong>${escapeHtml(unit.team || "-")}</strong>`) +
      rowHtml("Alliance", `<strong>${escapeHtml(unit.alliance || "-")}</strong>`) +
      rowHtml("Formation", `<strong>${escapeHtml(unit.formationName || "-")}</strong>`);

    const terrainRows =
      rowHtml("Terrain", `<strong>${escapeHtml(getTerrainName(terrain))}</strong>`) +
      terrainEffectRows(unit, terrain);

    return `
      <div class="bat-tooltip-title-row">
        <div class="bat-tooltip-title">${escapeHtml(getUnitName(unit, token.name))}</div>
        <div class="bat-tooltip-status ${statusClass(unit)}">${escapeHtml(status)}</div>
      </div>
      ${tooltipSection("Core Stats", coreRows)}
      ${tooltipSection("Turn State", turnRows)}
      ${tooltipSection("Command & Formation", commandRows)}
      ${tooltipSection("Terrain Bonuses", terrainRows)}
    `;
  }

  function positionTooltip(el) {
    if (setting("tooltipDockLeft")) {
      el.style.left = "14px";
      el.style.top = "86px";
      el.style.width = "360px";
      return;
    }

    const mouse = canvas?.app?.renderer?.plugins?.interaction?.mouse?.global;
    const x = Number(mouse?.x || window.innerWidth / 2);
    const y = Number(mouse?.y || window.innerHeight / 2);

    el.style.left = `${Math.min(window.innerWidth - 380, x + 18)}px`;
    el.style.top = `${Math.min(window.innerHeight - 300, y + 18)}px`;
  }

  function showTooltip(token) {
    if (!setting("enableHoverTooltip")) return;

    const unit = getBattleUnitFromToken(token);
    if (!unit) return;

    const el = getTooltipElement();
    el.innerHTML = buildTooltipHtml(token);
    el.style.display = "block";
    positionTooltip(el);
    state.tooltip.currentTokenId = token.id;
  }

  function startHoverTooltip() {
    stopHoverTooltip();
    if (!setting("enableHoverTooltip")) return;

    const hoverHandler = function (token, hovered) {
      if (!hovered) {
        if (state.tooltip.currentTokenId === token.id) hideTooltip();
        return;
      }

      showTooltip(token);
    };

    Hooks.on("hoverToken", hoverHandler);

    const mouseMoveHandler = () => {
      const el = document.getElementById(TOOLTIP_ID);
      if (el && el.style.display !== "none") positionTooltip(el);
    };

    document.addEventListener("mousemove", mouseMoveHandler);

    state.tooltip = {
      active: true,
      hoverHandler,
      mouseMoveHandler,
      currentTokenId: null
    };

    debug("Hover tooltip started");
  }

  function stopHoverTooltip() {
    if (state.tooltip.hoverHandler) Hooks.off("hoverToken", state.tooltip.hoverHandler);
    if (state.tooltip.mouseMoveHandler) document.removeEventListener("mousemove", state.tooltip.mouseMoveHandler);

    hideTooltip();

    state.tooltip = {
      active: false,
      hoverHandler: null,
      mouseMoveHandler: null,
      currentTokenId: null
    };
  }

  /* ----------------------------------------------------------------------- */
  /* Turn HUD                                                                 */
  /* ----------------------------------------------------------------------- */

  function getHudElement() {
    let el = document.getElementById(HUD_ID);
    if (!el) {
      el = document.createElement("div");
      el.id = HUD_ID;
      el.className = "battle-army-tools-turn-hud";
      document.body.appendChild(el);
      el.addEventListener("click", renderTurnHud);
    }
    return el;
  }

  function commanderRowsForSide(turnState) {
    const side = getCurrentSide(turnState);
    const mode = turnState?.mode || "Team";
    const commanders = getCommanderEntries().filter((entry) => commanderMatchesSide(entry, side, mode));

    if (commanders.length === 0) {
      return '<div class="bat-hud-small">No commanders found for current side.</div>';
    }

    return commanders.map((entry) => {
      const data = entry.data || {};
      const max = Math.max(0, Number(data.commandTokensMax ?? data.commandTokensPerTurn ?? data.commandTokens ?? 1));
      const remaining = Math.max(0, Number(data.commandTokensRemaining ?? max));
      const name = data.commanderName || entry.actor.name;
      return `<div class="bat-hud-row"><span>${escapeHtml(name)}</span><strong>${escapeHtml(remaining)} / ${escapeHtml(max)}</strong></div>`;
    }).join("");
  }

  function renderTurnHud() {
    const el = getHudElement();

    if (!setting("enableTurnHud") || !canvas?.scene) {
      el.style.display = "none";
      return;
    }

    const turnState = getCurrentTurnState();

    if (!turnState) {
      el.innerHTML = `
        <div class="bat-hud-title">Battle Turn</div>
        <div class="bat-hud-small">No tracker state on this scene.</div>
        <div class="bat-hud-small">Use your Battle Turn Tracker macro to create turn state.</div>
      `;
      el.style.display = "block";
      return;
    }

    const side = getCurrentSide(turnState) || turnState.currentSide || "Unknown";
    const phase = getCurrentPhase(turnState) || turnState.currentPhase || turnState.phase || null;
    const mode = turnState.mode || turnState.turnMode || "Side";
    const phaseHtml = phase
      ? `<div class="bat-hud-line"><span>Phase</span><strong>${escapeHtml(phase)}</strong></div>`
      : "";

    el.innerHTML = `
      <div class="bat-hud-title">Battle Turn</div>
      <div class="bat-hud-line"><span>Round</span><strong>${escapeHtml(turnState.round || 1)}</strong></div>
      <div class="bat-hud-line"><span>${escapeHtml(mode)}</span><strong>${escapeHtml(side)}</strong></div>
      ${phaseHtml}
      <div class="bat-hud-divider"></div>
      <div class="bat-hud-subtitle">Command Tokens</div>
      ${commanderRowsForSide(turnState)}
      <div class="bat-hud-divider"></div>
      <div class="bat-hud-small">Select attacker + target defender, then use Resolve Combat.</div>
    `;

    el.style.display = "block";
  }

  function removeTurnHud() {
    const el = document.getElementById(HUD_ID);
    if (el) el.remove();
  }


  /* ----------------------------------------------------------------------- */
  /* Battle action panel + player-safe combat resolver                         */
  /* ----------------------------------------------------------------------- */

  function getTokenById(tokenId) {
    return canvas?.tokens?.get(tokenId) || canvas?.tokens?.placeables?.find((token) => token.id === tokenId || token.document.id === tokenId) || null;
  }

  function getControlledBattleToken() {
    const selected = canvas.tokens?.controlled || [];
    if (selected.length !== 1) {
      ui.notifications.warn("Select exactly one attacking battle unit.");
      return null;
    }

    const token = selected[0];
    const unit = getBattleUnitFromToken(token);

    if (!unit) {
      ui.notifications.warn("Selected token is not a battle unit.");
      return null;
    }

    return token;
  }

  function getSingleTargetedBattleToken() {
    const targets = Array.from(game.user.targets || []);
    if (targets.length !== 1) {
      ui.notifications.warn("Target exactly one defending battle unit.");
      return null;
    }

    const token = targets[0];
    const unit = getBattleUnitFromToken(token);

    if (!unit) {
      ui.notifications.warn("Targeted token is not a battle unit.");
      return null;
    }

    return token;
  }

  function normaliseTurnText(value) {
    return String(value ?? "")
      .trim()
      .toLowerCase();
  }

  function getTurnTrackingMode(turnState) {
    const raw = String(turnState?.tracking || turnState?.mode || "team").trim().toLowerCase();

    if (raw.includes("alliance")) return "alliance";
    if (raw.includes("commander")) return "commander";
    if (raw.includes("formation")) return "formation";

    return "team";
  }

  function getTurnTrackingLabel(mode) {
    if (mode === "alliance") return "Alliance";
    if (mode === "commander") return "Commander";
    if (mode === "formation") return "Formation";
    return "Team";
  }

  function getUnitTurnValue(unit, mode) {
    if (mode === "alliance") {
      return String(unit?.alliance || "No Alliance");
    }

    if (mode === "commander") {
      return String(
        unit?.commanderName ||
        unit?.commanderActorName ||
        unit?.commander ||
        unit?.commanderId ||
        "No Commander"
      );
    }

    if (mode === "formation") {
      return String(unit?.formationName || unit?.formation || "No Formation");
    }

    return String(unit?.team || "No Team");
  }

  function getCurrentTurnSideName(turnState) {
    if (!turnState) return null;

    return (
      turnState.currentSide ||
      turnState.order?.[turnState.sideIndex] ||
      turnState.order?.[turnState.currentIndex] ||
      null
    );
  }

  function validateAttackerMatchesActiveTurn(attackerToken, attackerUnit, requesterName = game.user.name) {
    if (!setting("enforceActiveTurnForCombat")) return true;

    const turnState = getCurrentTurnState();
    const currentSide = getCurrentTurnSideName(turnState);

    // If the tracker has not been configured yet, do not hard-block combat.
    if (!turnState || !currentSide) return true;

    const mode = getTurnTrackingMode(turnState);
    const label = getTurnTrackingLabel(mode);
    const attackerSide = getUnitTurnValue(attackerUnit, mode);

    if (normaliseTurnText(attackerSide) === normaliseTurnText(currentSide)) {
      return true;
    }

    const unitName = getUnitName(attackerUnit, attackerToken?.name || "Selected attacker");
    const message =
      "Out-of-turn combat blocked. Current " +
      label +
      " is " +
      currentSide +
      ", but " +
      unitName +
      " belongs to " +
      attackerSide +
      ".";

    const isDirectGmAction = game.user.isGM && normaliseTurnText(requesterName) === normaliseTurnText(game.user.name);

    if (isDirectGmAction && setting("allowGmOutOfTurnCombat")) {
      ui.notifications.warn("GM override: " + message);
      return true;
    }

    throw new Error(message);
  }

  function getDistanceInSquares(tokenA, tokenB) {
    const gridSize = canvas.scene.grid.size || 100;
    const dx = Math.abs(Number(tokenA.document.x || 0) - Number(tokenB.document.x || 0)) / gridSize;
    const dy = Math.abs(Number(tokenA.document.y || 0) - Number(tokenB.document.y || 0)) / gridSize;
    return Math.max(dx, dy);
  }

  function areAllied(unitA, unitB) {
    if (!unitA || !unitB) return false;

    const allianceA = String(unitA.alliance || "").trim();
    const allianceB = String(unitB.alliance || "").trim();
    if (allianceA && allianceB) return allianceA === allianceB;

    const teamA = String(unitA.team || "").trim();
    const teamB = String(unitB.team || "").trim();
    if (teamA && teamB) return teamA === teamB;

    return false;
  }

  function areHostile(unitA, unitB) {
    if (!unitA || !unitB) return false;

    const allianceA = String(unitA.alliance || "").trim();
    const allianceB = String(unitB.alliance || "").trim();
    if (allianceA && allianceB) return allianceA !== allianceB;

    const teamA = String(unitA.team || "").trim();
    const teamB = String(unitB.team || "").trim();
    if (teamA && teamB) return teamA !== teamB;

    return true;
  }

  function isProjectileOrAreaAttack(attackerUnit, distance) {
    if (distance <= 1) return false;
    return isRangedCapableUnit(attackerUnit);
  }

  function isAmmoSpendingAttack(attackerUnit, distance) {
    return distance > 1 && isArcherLikeUnit(attackerUnit);
  }

  function getAttackTypeLabel(attackerUnit, distance) {
    if (distance <= 1) return "Adjacent / Melee";
    if (isProjectileOrAreaAttack(attackerUnit, distance)) return "Ranged / Projectile";
    return "Reach / Extended Melee";
  }

  function getEffectiveRange(attackerUnit, attackerTerrain) {
    const baseRange = Number(attackerUnit.range || 1);
    let effectiveRange = baseRange;
    if (isRangedCapableUnit(attackerUnit)) effectiveRange += getTerrainValue(attackerTerrain, "rangeBonusFrom");
    return Math.max(1, effectiveRange);
  }

  function terrainBlocksCharge(attackerTerrain, defenderTerrain) {
    return Boolean(attackerTerrain?.chargeBlocked || defenderTerrain?.chargeBlocked);
  }

  function getAdjacentBattleTokens(targetToken) {
    return (canvas.tokens?.placeables || []).filter((token) => {
      if (token.id === targetToken.id) return false;
      const unit = getBattleUnitFromToken(token);
      if (!isActiveUnit(unit)) return false;
      return getDistanceInSquares(token, targetToken) <= 1;
    });
  }

  function getHostileAdjacentTokens(targetToken, targetUnit) {
    return getAdjacentBattleTokens(targetToken).filter((token) => areHostile(getBattleUnitFromToken(token), targetUnit));
  }

  function getAlliedAdjacentTokens(targetToken, attackerUnit) {
    return getAdjacentBattleTokens(targetToken).filter((token) => areAllied(getBattleUnitFromToken(token), attackerUnit));
  }

  function calculateFlanking(attackerToken, attackerUnit, defenderToken, defenderUnit, distance) {
    if (distance > 1) {
      return {
        applies: false,
        hostileAdjacentCount: 0,
        engagedDirections: 0,
        attackBonusDice: 0,
        defencePenaltyDice: 0,
        moraleExtraDice: 0,
        reason: "No flanking: attacker is not adjacent."
      };
    }

    const hostileAdjacentCount = getHostileAdjacentTokens(defenderToken, defenderUnit).length;

    if (hostileAdjacentCount < 2) {
      return {
        applies: false,
        hostileAdjacentCount,
        engagedDirections: hostileAdjacentCount,
        attackBonusDice: 0,
        defencePenaltyDice: 0,
        moraleExtraDice: 0,
        reason: "No flanking: only one hostile unit is adjacent."
      };
    }

    const engagedDirections = Math.min(4, hostileAdjacentCount);
    const bonus = clamp(engagedDirections - 1, 1, 3);

    return {
      applies: true,
      hostileAdjacentCount,
      engagedDirections,
      attackBonusDice: bonus,
      defencePenaltyDice: bonus,
      moraleExtraDice: bonus,
      reason: "Flanking applies: 2+ hostile units are adjacent to the defender."
    };
  }

  function rollD10s(numberOfDice) {
    numberOfDice = Math.max(0, Math.floor(Number(numberOfDice || 0)));
    const rolls = [];
    let total = 0;

    for (let i = 0; i < numberOfDice; i++) {
      const result = Math.floor(Math.random() * 10) + 1;
      rolls.push(result);
      total += result;
    }

    return { rolls, total };
  }

  function formatRolls(rollData) {
    if (!rollData || !Array.isArray(rollData.rolls)) return "";
    return `${rollData.rolls.join(", ")} = ${rollData.total}`;
  }

  function formatNotes(notes) {
    if (!notes || notes.length === 0) return "<p><strong>Notes:</strong> None</p>";
    return "<p><strong>Notes:</strong></p><ul>" + notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("") + "</ul>";
  }

  async function saveCombatUnit(token, unit) {
    await token.document.setFlag(FLAG_SCOPE, BATTLE_UNIT_KEY, unit);
    await updateTokenVisualsForCombat(token, unit);
  }

  async function updateTokenVisualsForCombat(token, unit) {
    const hp = getHp(unit);
    const maxHp = getMaxHp(unit);
    const status = unit.status || "Active";

    await token.document.update({
      name: `${hp}/${maxHp} ${status}`,
      alpha: status === "Routed" ? 0.4 : 1,
      displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS
    });

    drawBattleHpBar(token);
  }

  function normaliseName(value) {
    return String(value || "").trim().toLowerCase();
  }

  function getRoutedPoolAnchor() {
    const wanted = normaliseName(setting("routedPoolTokenName") || ROUTED_POOL_TOKEN_NAME_DEFAULT);
    return (canvas.tokens?.placeables || []).find((token) => {
      return [token.name, token.document?.name, token.actor?.name].some((name) => normaliseName(name) === wanted);
    }) || null;
  }

  function routedPoolSlotIsOccupied(x, y, ignoreTokenId) {
    const gridSize = canvas.scene.grid.size || 100;
    return (canvas.tokens?.placeables || []).some((token) => {
      if (token.id === ignoreTokenId || token.document.id === ignoreTokenId) return false;
      const tokenX = Number(token.document.x || 0);
      const tokenY = Number(token.document.y || 0);
      return Math.abs(tokenX - x) < gridSize * 0.25 && Math.abs(tokenY - y) < gridSize * 0.25;
    });
  }

  async function moveTokenToRoutedPool(token) {
    const anchor = getRoutedPoolAnchor();

    if (!anchor) {
      return { moved: false, reason: `No Routed Pool token found. Expected: ${setting("routedPoolTokenName") || ROUTED_POOL_TOKEN_NAME_DEFAULT}` };
    }

    if (token.id === anchor.id) return { moved: false, reason: "Routed Pool anchor cannot move into itself." };

    const gridSize = canvas.scene.grid.size || 100;
    const anchorX = Number(anchor.document.x || 0);
    const anchorY = Number(anchor.document.y || 0);

    for (let slotIndex = 0; slotIndex < 200; slotIndex++) {
      const column = slotIndex % 12;
      const row = Math.floor(slotIndex / 12);
      const x = anchorX + gridSize + column * gridSize;
      const y = anchorY + row * gridSize;

      if (routedPoolSlotIsOccupied(x, y, token.id)) continue;

      await canvas.scene.updateEmbeddedDocuments(
        "Token",
        [{ _id: token.document.id, x, y }],
        { animate: false, battleRoutedPoolMove: true, bypassBattleMovementWatcher: true, teleport: true }
      );

      return { moved: true, reason: "Teleported to Routed Pool.", x, y, slotIndex, anchorTokenName: anchor.document.name };
    }

    return { moved: false, reason: "Routed Pool found, but no empty slot was available." };
  }

  async function setRoutedByCombat(token, unit) {
    unit.status = "Routed";
    unit.hasMoved = true;
    unit.hasAttacked = true;
    unit.routedAt = new Date().toISOString();

    await token.document.setFlag(FLAG_SCOPE, BATTLE_UNIT_KEY, unit);
    await updateTokenVisualsForCombat(token, unit);

    try {
      await token.toggleEffect("icons/svg/skull.svg", { active: true });
    } catch (err) {
      debug("Could not toggle skull effect", err);
    }

    const poolResult = await moveTokenToRoutedPool(token);
    const latestUnit = getBattleUnitFromToken(token) || unit;
    latestUnit.routedPool = {
      moved: poolResult.moved,
      reason: poolResult.reason,
      x: poolResult.x ?? null,
      y: poolResult.y ?? null,
      slotIndex: poolResult.slotIndex ?? null,
      time: new Date().toISOString()
    };

    await token.document.setFlag(FLAG_SCOPE, BATTLE_UNIT_KEY, latestUnit);
    await updateTokenVisualsForCombat(token, latestUnit);
    return poolResult;
  }

  function createBattleLogEntry(entry) {
    return { time: new Date().toISOString(), version: `${MODULE_TITLE} ${MODULE_VERSION}`, ...entry };
  }

  async function appendBattleLog(token, entry) {
    const unit = getBattleUnitFromToken(token);
    if (!unit) return;
    const currentLog = Array.isArray(unit.battleLog) ? unit.battleLog : [];
    currentLog.push(createBattleLogEntry(entry));
    unit.battleLog = currentLog;
    await token.document.setFlag(FLAG_SCOPE, BATTLE_UNIT_KEY, unit);
  }

  async function askRallyDecision(token, unit, moraleRoll) {
    if (!game.user.isGM) return false;
    if (!setting("rallyPromptOnMoraleFailure")) return false;

    const info = getCommanderCommandInfo(unit);
    if (!info.found || !info.actor || info.remaining <= 0) return false;

    return await Dialog.confirm({
      title: "Rally Failed Morale?",
      content:
        `<p><strong>${escapeHtml(getUnitName(unit, token.name))}</strong> failed morale.</p>` +
        `<p><strong>Morale Roll:</strong> ${escapeHtml(formatRolls(moraleRoll.roll))}</p>` +
        `<p><strong>Threshold:</strong> under ${escapeHtml(moraleRoll.threshold)}</p>` +
        `<p><strong>Commander:</strong> ${escapeHtml(info.commanderName)} has ${escapeHtml(info.remaining)} / ${escapeHtml(info.max)} command tokens.</p>` +
        `<p>Spend 1 command token to rally and avoid routing?</p>`,
      yes: () => true,
      no: () => false,
      defaultYes: false
    });
  }

  async function spendCommanderCommandTokenForUnit(unit, reason) {
    const info = getCommanderCommandInfo(unit);

    if (!info.found || !info.actor) {
      return { success: false, reason: `No commander linked for ${getUnitName(unit)}.`, ability: reason };
    }

    if (info.remaining <= 0) {
      return { success: false, reason: `${info.commanderName} has no command tokens remaining.`, ability: reason };
    }

    const updated = foundry.utils.deepClone(info.data || {});
    updated.commandTokensMax = info.max;
    updated.commandTokensRemaining = info.remaining - 1;
    updated.lastCommandTokenSpend = { time: new Date().toISOString(), reason, unitName: getUnitName(unit) };

    await info.actor.setFlag(FLAG_SCOPE, COMMANDER_KEY, updated);

    return { success: true, commanderName: info.commanderName, ability: reason, before: info.remaining, after: info.remaining - 1, max: info.max };
  }

  async function moraleCheckForCombat(token, unit, extraMoraleDice, reason) {
    const hp = getHp(unit);
    const maxHp = getMaxHp(unit);

    if (unit.status === "Routed") return { checked: false, routed: true, reason: "Already routed." };

    if (hp <= 0) {
      const routedPool = await setRoutedByCombat(token, unit);
      return { checked: false, routed: true, reason: "HP reached 0.", routedPool };
    }

    if (hp <= Math.floor(maxHp * 0.2)) {
      const routedPool = await setRoutedByCombat(token, unit);
      return { checked: false, routed: true, reason: "Auto-routed at 20% HP or lower.", routedPool };
    }

    if (hp > Math.floor(maxHp * 0.5)) {
      await saveCombatUnit(token, unit);
      return { checked: false, routed: false, reason: "Morale check not required." };
    }

    const moraleDice = 5 + Math.max(0, Number(extraMoraleDice || 0));
    const roll = rollD10s(moraleDice);
    const passed = roll.total < hp;

    if (passed) {
      await saveCombatUnit(token, unit);
      return { checked: true, routed: false, passed: true, dice: moraleDice, roll, threshold: hp, reason: reason || "HP at or below 50%." };
    }

    const moralePreview = { checked: true, routed: true, passed: false, dice: moraleDice, roll, threshold: hp, reason: reason || "HP at or below 50%." };
    const rally = await askRallyDecision(token, unit, moralePreview);

    if (rally) {
      const spend = await spendCommanderCommandTokenForUnit(unit, "Rally");
      if (spend.success) {
        unit.status = "Active";
        unit.ralliedAt = new Date().toISOString();
        unit.lastRally = spend;
        await saveCombatUnit(token, unit);
        return { ...moralePreview, routed: false, rallied: true, rallySpend: spend, reason: "Failed morale, but commander spent 1 command token to rally." };
      }
    }

    const routedPool = await setRoutedByCombat(token, unit);
    return { ...moralePreview, routed: true, routedPool };
  }

  function getCombatAbilityOptions(attackerUnit, defenderUnit, distance, effectiveRange, attackerTerrain, defenderTerrain) {
    ensureAmmoDefaults(attackerUnit);
    ensureAmmoDefaults(defenderUnit);

    const attackerAbility = String(attackerUnit.ability || "").trim();
    const defenderAbility = String(defenderUnit.ability || "").trim();
    const blockedByTerrain = terrainBlocksCharge(attackerTerrain, defenderTerrain);

    return {
      useCharge: attackerAbility === "Charge" && distance <= effectiveRange && !blockedByTerrain && getCommanderCommandInfo(attackerUnit).remaining > 0,
      useVolley: attackerAbility === "Volley" && distance > 1 && !attackerUnit.hasMoved && getCommanderCommandInfo(attackerUnit).remaining > 0 && Number(attackerUnit.ammoRemaining || 0) > 0,
      defenderUsesFormUp: defenderAbility === "Form Up",
      defenderUsesBrace: defenderAbility === "Brace" && attackerAbility === "Charge" && !blockedByTerrain && getCommanderCommandInfo(defenderUnit).remaining > 0,
      chargeBlockedByTerrain: blockedByTerrain,
      attackerCommandInfo: getCommanderCommandInfo(attackerUnit),
      defenderCommandInfo: getCommanderCommandInfo(defenderUnit),
      ammoText: getAmmoText(attackerUnit)
    };
  }

  function sanitizeCombatOptions(requested, possible) {
    requested = requested || {};
    return {
      useCharge: Boolean(possible.useCharge && requested.useCharge),
      useVolley: Boolean(possible.useVolley && requested.useVolley),
      defenderUsesFormUp: Boolean(possible.defenderUsesFormUp && requested.defenderUsesFormUp),
      defenderUsesBrace: Boolean(possible.defenderUsesBrace && requested.defenderUsesBrace),
      chargeBlockedByTerrain: Boolean(possible.chargeBlockedByTerrain),
      commandSpendResults: [],
      ammoSpent: 0
    };
  }

  async function askCombatOptionsForModule(context) {
    const possible = getCombatAbilityOptions(context.attackerUnit, context.defenderUnit, context.distance, context.effectiveRange, context.attackerTerrain, context.defenderTerrain);
    const archerMeleeNote = isArcherLikeUnit(context.attackerUnit) && context.distance <= 1
      ? '<p><strong>Archer Melee:</strong> Adjacent archer attack uses 2 attack dice.</p>'
      : "";

    return await new Promise((resolve) => {
      new Dialog({
        title: "Resolve Combat Options",
        content:
          '<form>' +
            `<p><strong>Attacker:</strong> ${escapeHtml(getUnitName(context.attackerUnit, context.attackerToken.name))}</p>` +
            `<p><strong>Defender:</strong> ${escapeHtml(getUnitName(context.defenderUnit, context.defenderToken.name))}</p>` +
            `<p><strong>Distance:</strong> ${escapeHtml(context.distance)}</p>` +
            `<p><strong>Effective Range:</strong> ${escapeHtml(context.effectiveRange)}</p>` +
            `<p><strong>Attack Type:</strong> ${escapeHtml(getAttackTypeLabel(context.attackerUnit, context.distance))}</p>` +
            archerMeleeNote +
            '<hr>' +
            `<p><strong>Attacker Command:</strong> ${escapeHtml(possible.attackerCommandInfo.text)}</p>` +
            `<p><strong>Defender Command:</strong> ${escapeHtml(possible.defenderCommandInfo.text)}</p>` +
            `<p><strong>Attacker Ammo:</strong> ${escapeHtml(possible.ammoText)}</p>` +
            '<hr>' +
            `<p><strong>Attacker Terrain:</strong> ${escapeHtml(getTerrainName(context.attackerTerrain))}</p>` +
            `<p><strong>Defender Terrain:</strong> ${escapeHtml(getTerrainName(context.defenderTerrain))}</p>` +
            `<p><strong>Charge Blocked By Terrain:</strong> ${possible.chargeBlockedByTerrain ? "Yes" : "No"}</p>` +
            '<hr>' +
            '<div class="form-group"><label>' +
              `<input type="checkbox" name="useCharge" ${possible.useCharge ? "" : "disabled"} /> ` +
              'Use Charge — costs 1 attacker command token</label></div>' +
            '<div class="form-group"><label>' +
              `<input type="checkbox" name="useVolley" ${possible.useVolley ? "" : "disabled"} /> ` +
              'Use Volley — costs 1 attacker command token and 1 ammo</label></div>' +
            '<div class="form-group"><label>' +
              `<input type="checkbox" name="defenderUsesFormUp" ${possible.defenderUsesFormUp ? "" : "disabled"} /> ` +
              'Defender uses Form Up if available</label></div>' +
            '<div class="form-group"><label>' +
              `<input type="checkbox" name="defenderUsesBrace" ${possible.defenderUsesBrace ? "" : "disabled"} /> ` +
              'Defender uses Brace — costs 1 defender command token</label></div>' +
            '<hr>' +
            `<p><strong>Friendly-fire targets:</strong> ${escapeHtml(context.friendlyFireTargets.length)}</p>` +
            '<p style="font-size:12px;opacity:0.85;">Friendly fire only happens for ranged/projectile attacks into melee.</p>' +
          '</form>',
        buttons: {
          resolve: {
            label: "Resolve Attack",
            callback: (html) => {
              const form = html[0].querySelector("form");
              resolve(sanitizeCombatOptions({
                useCharge: form.useCharge.checked,
                useVolley: form.useVolley.checked,
                defenderUsesFormUp: form.defenderUsesFormUp.checked,
                defenderUsesBrace: form.defenderUsesBrace.checked
              }, possible));
            }
          },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "resolve",
        close: () => resolve(null)
      }, { width: 680, height: 700, resizable: true }).render(true);
    });
  }

  async function buildCombatContext(attackerToken, defenderToken, allowAlliedConfirm = true) {
    const attackerUnit = foundry.utils.deepClone(getBattleUnitFromToken(attackerToken));
    const defenderUnit = foundry.utils.deepClone(getBattleUnitFromToken(defenderToken));

    if (!attackerUnit || !defenderUnit) throw new Error("Both attacker and defender must be battle units.");
    if (!isActiveUnit(attackerUnit)) throw new Error(`${getUnitName(attackerUnit, attackerToken.name)} is not active.`);
    if (!isActiveUnit(defenderUnit)) throw new Error(`${getUnitName(defenderUnit, defenderToken.name)} is not active.`);

    ensureAmmoDefaults(attackerUnit);
    ensureAmmoDefaults(defenderUnit);

    const distance = getDistanceInSquares(attackerToken, defenderToken);
    const attackerTerrain = getPrimaryTerrainUnderToken(attackerToken);
    const defenderTerrain = getPrimaryTerrainUnderToken(defenderToken);
    const baseRange = Number(attackerUnit.range || 1);
    const effectiveRange = getEffectiveRange(attackerUnit, attackerTerrain);

    if (distance > effectiveRange) {
      throw new Error(`${getUnitName(attackerUnit, attackerToken.name)} is out of range. Distance ${distance}, effective range ${effectiveRange}.`);
    }

    if (allowAlliedConfirm && areAllied(attackerUnit, defenderUnit)) {
      const proceed = await Dialog.confirm({
        title: "Attack Allied Unit?",
        content: "<p>The selected attacker and target appear to be allied.</p><p>Resolve anyway?</p>",
        yes: () => true,
        no: () => false,
        defaultYes: false
      });
      if (!proceed) throw new Error("Combat cancelled: allied target.");
    }

    const projectileAttack = isProjectileOrAreaAttack(attackerUnit, distance);
    const spendsAmmo = isAmmoSpendingAttack(attackerUnit, distance);

    if (spendsAmmo && Number(attackerUnit.ammoRemaining || 0) <= 0) {
      throw new Error(`${getUnitName(attackerUnit, attackerToken.name)} has no ammo remaining for ranged attacks. It can still fight adjacent enemies in melee.`);
    }

    const friendlyFireTargets = projectileAttack ? getAlliedAdjacentTokens(defenderToken, attackerUnit) : [];

    return { attackerToken, defenderToken, attackerUnit, defenderUnit, distance, attackerTerrain, defenderTerrain, baseRange, effectiveRange, projectileAttack, spendsAmmo, friendlyFireTargets };
  }

  function calculateAttackDiceForCombat(attackerUnit, options, flanking, terrainContext, isFriendlyFire, projectileAttack) {
    let dice = Number(attackerUnit.attack || 0);
    const notes = [];
    const attackerTerrain = terrainContext.attackerTerrain || CLEAR_TERRAIN;
    const defenderTerrain = terrainContext.defenderTerrain || CLEAR_TERRAIN;

    if (isArcherLikeUnit(attackerUnit) && !projectileAttack) {
      dice = 2;
      notes.push("Archer fighting adjacent / melee uses 2 attack dice");
    }

    if (options.useCharge) { dice += 2; notes.push("Charge +2 attack dice"); }
    if (options.useVolley) { dice += 2; notes.push("Volley +2 attack dice"); }
    if (!isFriendlyFire && flanking.attackBonusDice > 0) { dice += flanking.attackBonusDice; notes.push(`Flanking +${flanking.attackBonusDice} attack dice`); }

    const attackBonusFrom = getTerrainValue(attackerTerrain, "attackBonusFrom");
    if (attackBonusFrom !== 0) {
      dice += attackBonusFrom;
      notes.push(`${getTerrainName(attackerTerrain)} attack modifier ${attackBonusFrom > 0 ? "+" : ""}${attackBonusFrom} attack dice`);
    }

    const attackPenaltyInto = getTerrainValue(defenderTerrain, "attackPenaltyInto");
    if (projectileAttack && attackPenaltyInto > 0) {
      dice -= attackPenaltyInto;
      notes.push(`Ranged attack into ${getTerrainName(defenderTerrain)} -${attackPenaltyInto} attack dice`);
    }

    return { dice: Math.max(0, dice), notes };
  }

  function calculateDefenceDiceForCombat(defenderUnit, options, flanking, isFriendlyFire, terrainContext, projectileAttack) {
    let dice = Number(defenderUnit.defence || 0);
    const notes = [];
    const defenderTerrain = terrainContext.defenderTerrain || CLEAR_TERRAIN;

    if (!isFriendlyFire && options.defenderUsesFormUp) { dice += 1; notes.push("Form Up +1 defence die"); }

    const defenceBonus = getTerrainValue(defenderTerrain, "defenceBonus");
    if (defenceBonus !== 0) { dice += defenceBonus; notes.push(`${getTerrainName(defenderTerrain)} ${defenceBonus > 0 ? "+" : ""}${defenceBonus} defence dice`); }

    const rangedDefenceBonus = getTerrainValue(defenderTerrain, "rangedDefenceBonus");
    if (projectileAttack && rangedDefenceBonus !== 0) { dice += rangedDefenceBonus; notes.push(`${getTerrainName(defenderTerrain)} ranged defence ${rangedDefenceBonus > 0 ? "+" : ""}${rangedDefenceBonus} defence dice`); }

    if (!isFriendlyFire && flanking.defencePenaltyDice > 0) { dice -= flanking.defencePenaltyDice; notes.push(`Flanking -${flanking.defencePenaltyDice} defence dice`); }

    return { dice: Math.max(0, dice), notes };
  }

  async function applyDamageAndMoraleForCombat(targetToken, damage, moraleExtraDice, moraleReason) {
    const unit = getBattleUnitFromToken(targetToken);
    if (!unit) return null;

    const oldHp = getHp(unit);
    const maxHp = getMaxHp(unit);
    const newHp = clamp(oldHp - damage, 0, maxHp);
    unit.health.value = newHp;

    await targetToken.document.setFlag(FLAG_SCOPE, BATTLE_UNIT_KEY, unit);
    const morale = await moraleCheckForCombat(targetToken, unit, moraleExtraDice, moraleReason);
    const updatedUnit = getBattleUnitFromToken(targetToken);
    await updateTokenVisualsForCombat(targetToken, updatedUnit);

    return { oldHp, newHp, maxHp, damage, morale, unit: updatedUnit };
  }

  async function resolveSingleAttackForCombat(params) {
    const terrainContext = { attackerTerrain: params.attackerTerrain || CLEAR_TERRAIN, defenderTerrain: params.defenderTerrain || CLEAR_TERRAIN };
    const noFlanking = { attackBonusDice: 0, defencePenaltyDice: 0, moraleExtraDice: 0 };

    const attackCalc = calculateAttackDiceForCombat(params.attackerUnit, params.options, params.isFriendlyFire ? noFlanking : params.flanking, terrainContext, params.isFriendlyFire, params.projectileAttack);
    const defenceCalc = calculateDefenceDiceForCombat(params.defenderUnit, params.options, params.isFriendlyFire ? noFlanking : params.flanking, params.isFriendlyFire, terrainContext, params.projectileAttack);
    const attackRoll = rollD10s(attackCalc.dice);
    const defenceRoll = rollD10s(defenceCalc.dice);
    const damage = Math.max(0, attackRoll.total - defenceRoll.total);

    const damageResult = await applyDamageAndMoraleForCombat(
      params.defenderToken,
      damage,
      params.isFriendlyFire ? 0 : params.flanking.moraleExtraDice,
      params.isFriendlyFire ? "Friendly fire damage." : "Damage, terrain, and melee engagement pressure."
    );

    await appendBattleLog(params.attackerToken, {
      type: params.isFriendlyFire ? "Friendly Fire Attack Made" : "Attack Made",
      target: getUnitName(params.defenderUnit, params.defenderToken.name),
      targetTokenId: params.defenderToken.id,
      attackDice: attackCalc.dice,
      attackRolls: attackRoll.rolls,
      attackTotal: attackRoll.total,
      defenceDice: defenceCalc.dice,
      defenceRolls: defenceRoll.rolls,
      defenceTotal: defenceRoll.total,
      damage,
      attackNotes: attackCalc.notes,
      defenceNotes: defenceCalc.notes
    });

    await appendBattleLog(params.defenderToken, {
      type: params.isFriendlyFire ? "Friendly Fire Received" : "Attack Received",
      attacker: getUnitName(params.attackerUnit, params.attackerToken.name),
      attackerTokenId: params.attackerToken.id,
      attackDice: attackCalc.dice,
      attackRolls: attackRoll.rolls,
      attackTotal: attackRoll.total,
      defenceDice: defenceCalc.dice,
      defenceRolls: defenceRoll.rolls,
      defenceTotal: defenceRoll.total,
      damage,
      oldHp: damageResult?.oldHp,
      newHp: damageResult?.newHp,
      morale: damageResult?.morale,
      attackNotes: attackCalc.notes,
      defenceNotes: defenceCalc.notes
    });

    return { ...params, attackCalc, defenceCalc, attackRoll, defenceRoll, damage, damageResult };
  }

  async function resolveBraceCounterattackForCombat(attackerToken, attackerUnit, defenderToken, defenderUnit, attackerTerrain, defenderTerrain) {
    const options = { useCharge: false, useVolley: false, defenderUsesFormUp: false, defenderUsesBrace: false };
    const flanking = { attackBonusDice: 0, defencePenaltyDice: 0, moraleExtraDice: 0 };
    return resolveSingleAttackForCombat({
      attackerToken: defenderToken,
      defenderToken: attackerToken,
      attackerUnit: defenderUnit,
      defenderUnit: attackerUnit,
      options,
      flanking,
      isFriendlyFire: false,
      projectileAttack: false,
      attackerTerrain: defenderTerrain,
      defenderTerrain: attackerTerrain
    });
  }

  function formatMoraleHtml(morale) {
    if (!morale) return "<p><strong>Morale:</strong> None</p>";
    let html = `<p><strong>Morale:</strong> ${escapeHtml(morale.reason || "")}</p>`;
    if (morale.checked) {
      html += `<p><strong>Morale Roll:</strong> ${escapeHtml(formatRolls(morale.roll))}</p>`;
      html += `<p><strong>Needed:</strong> under ${escapeHtml(morale.threshold)}</p>`;
      html += `<p><strong>Result:</strong> ${morale.routed ? "Routed" : morale.rallied ? "Rallied" : "Passed"}</p>`;
    }
    if (morale.rallySpend) {
      html += `<p><strong>Rally:</strong> ${escapeHtml(morale.rallySpend.commanderName)} spent 1 command token — ${escapeHtml(morale.rallySpend.after)} / ${escapeHtml(morale.rallySpend.max)} remaining.</p>`;
    }
    if (morale.routedPool) html += `<p><strong>Routed Pool:</strong> ${escapeHtml(morale.routedPool.reason)}</p>`;
    return html;
  }

  function formatAttackResultHtml(result, title) {
    if (!result) return "";
    const damage = result.damageResult || {};
    return `
      <h2>${escapeHtml(title)}</h2>
      <p><strong>Target:</strong> ${escapeHtml(getUnitName(result.defenderUnit, result.defenderToken.name))}</p>
      <p><strong>Attack Dice:</strong> ${escapeHtml(result.attackCalc.dice)}</p>
      <p><strong>Attack Roll:</strong> ${escapeHtml(formatRolls(result.attackRoll))}</p>
      <p><strong>Defence Dice:</strong> ${escapeHtml(result.defenceCalc.dice)}</p>
      <p><strong>Defence Roll:</strong> ${escapeHtml(formatRolls(result.defenceRoll))}</p>
      <p><strong>Damage:</strong> ${escapeHtml(result.damage)}</p>
      <p><strong>HP:</strong> ${escapeHtml(damage.oldHp)} → ${escapeHtml(damage.newHp)} / ${escapeHtml(damage.maxHp)}</p>
      ${formatNotes(result.attackCalc.notes)}
      ${formatNotes(result.defenceCalc.notes)}
      ${formatMoraleHtml(damage.morale)}
    `;
  }

  function formatCommandSpendHtml(results) {
    if (!results || results.length === 0) return "<p><strong>Command Tokens Spent:</strong> None</p>";
    return "<p><strong>Command Tokens Spent:</strong></p><ul>" + results.map((result) => {
      return `<li>${escapeHtml(result.commanderName)} spent 1 token for ${escapeHtml(result.ability)} — ${escapeHtml(result.after)} / ${escapeHtml(result.max)} remaining</li>`;
    }).join("") + "</ul>";
  }

  function formatBraceHtml(braceResult, attackerToken) {
    if (!braceResult) return "<h2>Brace Counterattack</h2><p>No Brace counterattack occurred.</p>";
    return formatAttackResultHtml(braceResult, "Brace Counterattack") + `<p><strong>Counterattack Target:</strong> ${escapeHtml(attackerToken.name)}</p>`;
  }

  async function resolveCombatByTokenIds(attackerId, defenderId, requestedOptions = {}, requesterName = game.user.name) {
    if (!game.user.isGM) throw new Error("Only the active GM can apply combat results.");

    const attackerToken = getTokenById(attackerId);
    const defenderToken = getTokenById(defenderId);
    if (!attackerToken || !defenderToken) throw new Error("Could not find attacker or defender token on this scene.");

    const context = await buildCombatContext(attackerToken, defenderToken, false);
    validateAttackerMatchesActiveTurn(context.attackerToken, context.attackerUnit, requesterName);

    const possible = getCombatAbilityOptions(context.attackerUnit, context.defenderUnit, context.distance, context.effectiveRange, context.attackerTerrain, context.defenderTerrain);
    const options = sanitizeCombatOptions(requestedOptions, possible);

    const commandSpendResults = [];
    for (const [enabled, unit, reason] of [
      [options.useCharge, context.attackerUnit, "Charge"],
      [options.useVolley, context.attackerUnit, "Volley"],
      [options.defenderUsesBrace, context.defenderUnit, "Brace"]
    ]) {
      if (!enabled) continue;
      const spend = await spendCommanderCommandTokenForUnit(unit, reason);
      if (!spend.success) throw new Error(spend.reason);
      commandSpendResults.push(spend);
    }

    options.commandSpendResults = commandSpendResults;
    options.ammoSpent = context.spendsAmmo ? 1 : 0;

    const flanking = calculateFlanking(context.attackerToken, context.attackerUnit, context.defenderToken, context.defenderUnit, context.distance);

    const mainResult = await resolveSingleAttackForCombat({
      attackerToken: context.attackerToken,
      defenderToken: context.defenderToken,
      attackerUnit: context.attackerUnit,
      defenderUnit: context.defenderUnit,
      options,
      flanking,
      isFriendlyFire: false,
      projectileAttack: context.projectileAttack,
      attackerTerrain: context.attackerTerrain,
      defenderTerrain: context.defenderTerrain
    });

    let braceResult = null;
    if (options.defenderUsesBrace && options.useCharge && isActiveUnit(getBattleUnitFromToken(context.defenderToken)) && isActiveUnit(getBattleUnitFromToken(context.attackerToken))) {
      braceResult = await resolveBraceCounterattackForCombat(
        context.attackerToken,
        getBattleUnitFromToken(context.attackerToken),
        context.defenderToken,
        getBattleUnitFromToken(context.defenderToken),
        context.attackerTerrain,
        context.defenderTerrain
      );
    }

    const friendlyFireResults = [];
    for (const friendlyToken of context.friendlyFireTargets) {
      const friendlyUnit = getBattleUnitFromToken(friendlyToken);
      if (!isActiveUnit(friendlyUnit)) continue;
      const friendlyTerrain = getPrimaryTerrainUnderToken(friendlyToken);
      const result = await resolveSingleAttackForCombat({
        attackerToken: context.attackerToken,
        defenderToken: friendlyToken,
        attackerUnit: getBattleUnitFromToken(context.attackerToken),
        defenderUnit: friendlyUnit,
        options,
        flanking: { attackBonusDice: 0, defencePenaltyDice: 0, moraleExtraDice: 0 },
        isFriendlyFire: true,
        projectileAttack: true,
        attackerTerrain: context.attackerTerrain,
        defenderTerrain: friendlyTerrain
      });
      friendlyFireResults.push(result);
    }

    const latestAttackerUnit = getBattleUnitFromToken(context.attackerToken);
    ensureAmmoDefaults(latestAttackerUnit);
    latestAttackerUnit.hasAttacked = true;
    if (context.spendsAmmo) latestAttackerUnit.ammoRemaining = Math.max(0, Number(latestAttackerUnit.ammoRemaining || 0) - 1);
    if (options.useCharge || options.useVolley) latestAttackerUnit.hasMoved = true;
    await saveCombatUnit(context.attackerToken, latestAttackerUnit);

    let friendlyFireHtml = "";
    if (friendlyFireResults.length > 0) {
      friendlyFireHtml = "<h2>Friendly Fire</h2><p><strong>Rule:</strong> Ranged/projectile attack into melee. Every allied unit adjacent to the target was also attacked.</p>" +
        friendlyFireResults.map((result, index) => formatAttackResultHtml(result, `Friendly Fire Target ${index + 1}`)).join("");
    } else if (context.projectileAttack) {
      friendlyFireHtml = "<h2>Friendly Fire</h2><p>No allied units were adjacent to the target, so no friendly fire occurred.</p>";
    }

    const flankingHtml =
      "<h2>Flanking / Engagement</h2>" +
      `<p><strong>Attack distance:</strong> ${escapeHtml(context.distance)}</p>` +
      `<p><strong>Attack type:</strong> ${escapeHtml(getAttackTypeLabel(context.attackerUnit, context.distance))}</p>` +
      `<p><strong>Flanking applies:</strong> ${flanking.applies ? "Yes" : "No"}</p>` +
      `<p><strong>Reason:</strong> ${escapeHtml(flanking.reason)}</p>` +
      `<p><strong>Hostile adjacent units around defender:</strong> ${escapeHtml(flanking.hostileAdjacentCount)}</p>` +
      `<p><strong>Attack bonus dice:</strong> +${escapeHtml(flanking.attackBonusDice)}</p>` +
      `<p><strong>Defence penalty dice:</strong> -${escapeHtml(flanking.defencePenaltyDice)}</p>`;

    const terrainHtml =
      "<h2>Terrain</h2>" +
      `<p><strong>Attacker Terrain:</strong> ${escapeHtml(getTerrainName(context.attackerTerrain))}</p>` +
      `<p><strong>Defender Terrain:</strong> ${escapeHtml(getTerrainName(context.defenderTerrain))}</p>` +
      `<p><strong>Base Range:</strong> ${escapeHtml(context.baseRange)}</p>` +
      `<p><strong>Effective Range:</strong> ${escapeHtml(context.effectiveRange)}</p>` +
      `<p><strong>Charge Blocked By Terrain:</strong> ${terrainBlocksCharge(context.attackerTerrain, context.defenderTerrain) ? "Yes" : "No"}</p>`;

    const commandAndAmmoHtml =
      "<h2>Command / Ammo</h2>" +
      formatCommandSpendHtml(options.commandSpendResults) +
      `<p><strong>Ammo Spent:</strong> ${escapeHtml(options.ammoSpent || 0)}</p>` +
      `<p><strong>Attacker Ammo Remaining:</strong> ${escapeHtml(getAmmoText(getBattleUnitFromToken(context.attackerToken)))}</p>`;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Battle Army Tools" }),
      content:
        `<h1>${escapeHtml(MODULE_TITLE)} ${escapeHtml(MODULE_VERSION)} Combat</h1>` +
        `<p><strong>Requested by:</strong> ${escapeHtml(requesterName || game.user.name)}</p>` +
        "<h2>Main Attack</h2>" +
        `<p><strong>Attacker:</strong> ${escapeHtml(getUnitName(context.attackerUnit, context.attackerToken.name))}</p>` +
        `<p><strong>Defender:</strong> ${escapeHtml(getUnitName(context.defenderUnit, context.defenderToken.name))}</p>` +
        `<p><strong>Range:</strong> ${escapeHtml(context.distance)} / ${escapeHtml(context.effectiveRange)}</p>` +
        `<p><strong>Attack Type:</strong> ${escapeHtml(getAttackTypeLabel(context.attackerUnit, context.distance))}</p>` +
        `<p><strong>Charge:</strong> ${options.useCharge ? "Yes" : "No"}</p>` +
        `<p><strong>Volley:</strong> ${options.useVolley ? "Yes" : "No"}</p>` +
        `<p><strong>Form Up:</strong> ${options.defenderUsesFormUp ? "Yes" : "No"}</p>` +
        `<p><strong>Brace:</strong> ${options.defenderUsesBrace ? "Yes" : "No"}</p>` +
        commandAndAmmoHtml +
        terrainHtml +
        formatAttackResultHtml(mainResult, "Main Target Result") +
        flankingHtml +
        formatBraceHtml(braceResult, context.attackerToken) +
        friendlyFireHtml
    });

    refreshAllHpBars();
    renderTurnHud();
    return { success: true, attacker: context.attackerToken.name, defender: context.defenderToken.name };
  }

  function getActiveGmUser() {
    const activeGms = game.users.contents.filter((user) => user.isGM && user.active);
    if (!activeGms.length) return null;

    const sceneId = canvas?.scene?.id || null;

    // Prefer a GM/Assistant GM who is actually viewing the same battle scene.
    // This avoids sending the request to another logged-in GM account sitting on a different scene or screen.
    const sameSceneGm = activeGms.find((user) => String(user.viewedScene || "") === String(sceneId || ""));
    if (sameSceneGm) return sameSceneGm;

    // Fallback for Foundry versions/situations where viewedScene is not populated.
    return activeGms[0] || null;
  }

  async function requestCombatResolutionFromGm(attackerId, defenderId, options) {
    const gm = getActiveGmUser();
    if (!gm) throw new Error("No active GM is connected to apply combat results.");

    game.socket.emit(`module.${MODULE_ID}`, {
      type: SOCKET_TYPE_COMBAT_REQUEST,
      gmUserId: gm.id,
      gmName: gm.name,
      requesterUserId: game.user.id,
      requesterName: game.user.name,
      sceneId: canvas.scene.id,
      sceneName: canvas.scene.name,
      attackerId,
      defenderId,
      options,
      requestId: foundry.utils.randomID()
    });

    ui.notifications.info(`Combat request sent to GM ${gm.name} for resolution.`);
  }

  async function resolveCombatFromSelection() {
    try {
      const attackerToken = getControlledBattleToken();
      if (!attackerToken) return;
      const defenderToken = getSingleTargetedBattleToken();
      if (!defenderToken) return;

      const context = await buildCombatContext(attackerToken, defenderToken, true);
      validateAttackerMatchesActiveTurn(attackerToken, context.attackerUnit, game.user.name);

      const options = await askCombatOptionsForModule(context);
      if (!options) {
        ui.notifications.warn("Combat cancelled.");
        return;
      }

      if (game.user.isGM) {
        await resolveCombatByTokenIds(attackerToken.id, defenderToken.id, options, game.user.name);
      } else {
        if (!setting("allowPlayerCombatRequests")) {
          ui.notifications.warn("Player combat requests are disabled in module settings.");
          return;
        }
        await requestCombatResolutionFromGm(attackerToken.id, defenderToken.id, options);
      }
    } catch (err) {
      console.error(err);
      ui.notifications.error(err.message || "Could not resolve combat.");
    }
  }

  async function handleCombatSocketMessage(payload) {
    if (!payload || payload.type !== SOCKET_TYPE_COMBAT_REQUEST) return;
    if (!game.user.isGM) return;
    if (payload.gmUserId && payload.gmUserId !== game.user.id) return;

    if (!canvas?.scene || payload.sceneId !== canvas.scene.id) {
      ui.notifications.warn(`Combat request from ${payload.requesterName || "player"} was sent to ${payload.gmName || game.user.name}, but this GM is not on scene ${payload.sceneName || payload.sceneId}. Open that battle scene, then have the player try again.`);
      return;
    }

    try {
      ui.notifications.info(`Resolving combat request from ${payload.requesterName || "player"}...`);
      await resolveCombatByTokenIds(payload.attackerId, payload.defenderId, payload.options, payload.requesterName);
      ui.notifications.info(`Resolved combat request from ${payload.requesterName || "player"}.`);
    } catch (err) {
      console.error(err);
      ui.notifications.error(`Combat request failed: ${err.message || err}`);
    }
  }

  function registerSocketHandler() {
    if (state.socketRegistered) return;
    game.socket.on(`module.${MODULE_ID}`, handleCombatSocketMessage);
    state.socketRegistered = true;
  }

  async function resetSelectedMovement() {
    const tokens = (canvas.tokens?.controlled || []).filter((token) => Boolean(getBattleUnitFromToken(token)));
    if (!tokens.length) {
      ui.notifications.warn("Select one or more battle units to reset movement.");
      return;
    }

    for (const token of tokens) {
      const unit = getBattleUnitFromToken(token);
      unit.hasMoved = false;
      unit.movementUsed = 0;
      unit.remainingMovement = Number(unit.movement || 0);
      unit.movementBonusAllowance = 0;
      delete unit.movementOrigin;
      delete unit.lastMovement;
      await token.document.setFlag(FLAG_SCOPE, BATTLE_UNIT_KEY, unit);
    }

    ui.notifications.info(`Reset movement for ${tokens.length} selected battle unit(s).`);
  }

  async function resetSelectedAmmo() {
    const tokens = (canvas.tokens?.controlled || []).filter((token) => Boolean(getBattleUnitFromToken(token)));
    if (!tokens.length) {
      ui.notifications.warn("Select one or more battle units to reset ammo.");
      return;
    }

    let count = 0;
    for (const token of tokens) {
      const unit = getBattleUnitFromToken(token);
      if (!isArcherLikeUnit(unit)) continue;
      ensureAmmoDefaults(unit);
      unit.ammoRemaining = Number(unit.ammoMax || 5);
      await token.document.setFlag(FLAG_SCOPE, BATTLE_UNIT_KEY, unit);
      count++;
    }

    ui.notifications.info(`Reset ammo for ${count} selected ranged unit(s).`);
  }

  async function resetCurrentSideCommandTokens() {
    if (!game.user.isGM) {
      ui.notifications.warn("Only the GM can reset command tokens.");
      return;
    }

    const turnState = getCurrentTurnState();
    const side = getCurrentSide(turnState) || turnState?.currentSide;
    if (!side) {
      ui.notifications.warn("No current side found in battle turn state.");
      return;
    }

    const mode = turnState?.mode || "Team";
    let count = 0;

    for (const entry of getCommanderEntries()) {
      if (!commanderMatchesSide(entry, side, mode)) continue;
      const data = foundry.utils.deepClone(entry.data || {});
      const max = Math.max(0, Number(data.commandTokensMax ?? data.commandTokensPerTurn ?? data.commandTokens ?? 1));
      data.commandTokensMax = max;
      data.commandTokensRemaining = max;
      data.lastCommandTokenReset = { time: new Date().toISOString(), source: `${MODULE_TITLE} ${MODULE_VERSION}`, side, mode };
      await entry.actor.setFlag(FLAG_SCOPE, COMMANDER_KEY, data);
      count++;
    }

    renderTurnHud();
    ui.notifications.info(`Reset command tokens for ${count} commander(s) on ${side}.`);
  }

  function getActionPanelElement() {
    let el = document.getElementById(PANEL_ID);
    if (!el) {
      el = document.createElement("div");
      el.id = PANEL_ID;
      el.className = "battle-army-tools-action-panel";
      document.body.appendChild(el);
    }
    return el;
  }

  function renderActionPanel() {
    const el = getActionPanelElement();

    if (!setting("enableActionPanel") || !canvas?.scene) {
      el.style.display = "none";
      return;
    }

    el.innerHTML = `
      <div class="bat-panel-title">Battle Actions</div>
      <button type="button" data-action="resolve">Resolve Combat</button>
      <button type="button" data-action="resetMove">Reset Selected Move</button>
      <button type="button" data-action="resetAmmo">Reset Selected Ammo</button>
      ${game.user.isGM ? '<button type="button" data-action="resetCmd">Reset Side Command</button>' : ''}
      <div class="bat-panel-help">Select attacker. Target defender. Press Resolve Combat.</div>
    `;

    el.querySelector('[data-action="resolve"]')?.addEventListener("click", resolveCombatFromSelection);
    el.querySelector('[data-action="resetMove"]')?.addEventListener("click", resetSelectedMovement);
    el.querySelector('[data-action="resetAmmo"]')?.addEventListener("click", resetSelectedAmmo);
    el.querySelector('[data-action="resetCmd"]')?.addEventListener("click", resetCurrentSideCommandTokens);

    el.style.display = "block";
    state.panel.active = true;
  }

  function startBattlePanel() {
    renderActionPanel();
  }

  function stopBattlePanel() {
    const el = document.getElementById(PANEL_ID);
    if (el) el.style.display = "none";
    state.panel.active = false;
  }

  /* ----------------------------------------------------------------------- */
  /* Feature lifecycle                                                        */
  /* ----------------------------------------------------------------------- */

  function restartEnabledFeatures() {
    if (!game?.ready) return;

    stopMovementWatcher(false);
    stopHoverTooltip();
    stopHpBars();
    stopBattlePanel();

    startMovementWatcher();
    startHoverTooltip();
    startHpBars();
    renderTurnHud();
    startBattlePanel();
  }

  function exposeApi() {
    globalThis.BATTLE_ARMY_TOOLS = {
      moduleId: MODULE_ID,
      version: MODULE_VERSION,
      restart: restartEnabledFeatures,
      startMovementWatcher,
      stopMovementWatcher: () => stopMovementWatcher(true),
      refreshHpBars: refreshAllHpBars,
      renderTurnHud,
      hideTooltip,
      resolveCombatFromSelection,
      resetSelectedMovement,
      resetSelectedAmmo,
      resetCurrentSideCommandTokens,
      utilities: {
        getBattleUnitFromToken,
        getBattleUnitFromDocument,
        getCommanderCommandInfo,
        getPrimaryTerrainUnderToken,
        getPrimaryTerrainAtPoint,
        isActiveUnit,
        ensureAmmoDefaults
      }
    };
  }
})();
