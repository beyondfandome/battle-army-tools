(() => {
  "use strict";

  const MODULE_ID = "battle-army-tools";
  const MODULE_TITLE = "Battle Army Tools";
  const MODULE_VERSION = "0.1.1";

  const FLAG_SCOPE = "world";
  const BATTLE_UNIT_KEY = "battleUnit";
  const TERRAIN_FLAG_KEY = "battleTerrain";
  const COMMANDER_KEY = "battleCommander";
  const TURN_TRACKER_KEY = "battleTurnState";

  const TOOLTIP_ID = "battle-army-tools-tooltip";
  const HUD_ID = "battle-army-tools-turn-hud";

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
    }
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
      "enableTurnHud",
      "Enable Battle Turn HUD",
      "Show a compact HUD with current round, side, phase, and current side command tokens.",
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
      "debugMode",
      "Debug Mode",
      "Log extra Battle Army Tools information to the console.",
      Boolean,
      false
    );
  });

  Hooks.once("ready", () => {
    exposeApi();
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
    return turnState.order?.[turnState.sideIndex] || null;
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
      options?.teleport ||
      unit?.routedPoolTransferInProgress
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

  function buildTooltipHtml(token) {
    const unit = getBattleUnitFromToken(token);
    if (!unit) return "";

    ensureAmmoDefaults(unit);

    const terrain = getPrimaryTerrainUnderToken(token);
    const command = getCommanderCommandInfo(unit);
    const hp = getHp(unit);
    const maxHp = getMaxHp(unit);
    const status = unit.status || "Active";

    const chargeBlocked = terrain?.chargeBlocked ? "Yes" : "No";
    const terrainMove = getTerrainValue(terrain, "movementPenalty");
    const terrainBonus = getTerrainValue(terrain, "movementBonus");

    return `
      <div class="bat-tooltip-title">${escapeHtml(getUnitName(unit, token.name))}</div>
      <div class="bat-tooltip-grid">
        <div>Status</div><strong>${escapeHtml(status)}</strong>
        <div>HP</div><strong>${escapeHtml(hp)} / ${escapeHtml(maxHp)}</strong>
        <div>Attack</div><strong>${escapeHtml(unit.attack ?? "-")}</strong>
        <div>Defence</div><strong>${escapeHtml(unit.defence ?? "-")}</strong>
        <div>Range</div><strong>${escapeHtml(unit.range ?? "-")}</strong>
        <div>Move</div><strong>${escapeHtml(unit.movement ?? "-")}</strong>
        <div>Movement</div><strong>${escapeHtml(movementText(unit))}</strong>
        <div>Moved / Attacked</div><strong>${unit.hasMoved ? "Yes" : "No"} / ${unit.hasAttacked ? "Yes" : "No"}</strong>
        <div>Ammo</div><strong>${escapeHtml(getAmmoText(unit))}</strong>
        <div>Can Volley</div><strong>${canVolley(unit) ? "Yes" : "No"}</strong>
        <div>Ability</div><strong>${escapeHtml(unit.ability || "None")}</strong>
        <div>Commander</div><strong>${escapeHtml(command.text)}</strong>
        <div>Team</div><strong>${escapeHtml(unit.team || "-")}</strong>
        <div>Alliance</div><strong>${escapeHtml(unit.alliance || "-")}</strong>
        <div>Formation</div><strong>${escapeHtml(unit.formationName || "-")}</strong>
        <div>Terrain</div><strong>${escapeHtml(getTerrainName(terrain))}</strong>
        <div>Terrain Move</div><strong>${terrainMove >= 0 ? "+" : ""}${escapeHtml(terrainMove)} penalty / +${escapeHtml(terrainBonus)} bonus</strong>
        <div>Charge Blocked</div><strong>${chargeBlocked}</strong>
      </div>
    `;
  }

  function positionTooltip(el) {
    const mouse = canvas?.app?.renderer?.plugins?.interaction?.mouse?.global;
    const x = Number(mouse?.x || window.innerWidth / 2);
    const y = Number(mouse?.y || window.innerHeight / 2);

    el.style.left = `${Math.min(window.innerWidth - 340, x + 18)}px`;
    el.style.top = `${Math.min(window.innerHeight - 260, y + 18)}px`;
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
      `;
      el.style.display = "block";
      return;
    }

    const side = getCurrentSide(turnState) || "Unknown";
    const phase = getCurrentPhase(turnState) || "Unknown";

    el.innerHTML = `
      <div class="bat-hud-title">Battle Turn</div>
      <div class="bat-hud-line"><span>Round</span><strong>${escapeHtml(turnState.round || 1)}</strong></div>
      <div class="bat-hud-line"><span>${escapeHtml(turnState.mode || "Side")}</span><strong>${escapeHtml(side)}</strong></div>
      <div class="bat-hud-line"><span>Phase</span><strong>${escapeHtml(phase)}</strong></div>
      <div class="bat-hud-divider"></div>
      <div class="bat-hud-subtitle">Command Tokens</div>
      ${commanderRowsForSide(turnState)}
    `;

    el.style.display = "block";
  }

  function removeTurnHud() {
    const el = document.getElementById(HUD_ID);
    if (el) el.remove();
  }

  /* ----------------------------------------------------------------------- */
  /* Feature lifecycle                                                        */
  /* ----------------------------------------------------------------------- */

  function restartEnabledFeatures() {
    if (!game?.ready) return;

    stopMovementWatcher(false);
    stopHoverTooltip();
    stopHpBars();

    startMovementWatcher();
    startHoverTooltip();
    startHpBars();
    renderTurnHud();
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
