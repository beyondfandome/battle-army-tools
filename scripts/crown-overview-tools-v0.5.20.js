(() => {
  const MODULE_ID = "crown-overview-tools";
  const MODULE_VERSION = "0.5.20";
  const FLAG_SCOPE = "world";
  const WORLD_TILE_KEY = "worldTile";
  const WORLD_PIECE_KEY = "worldPiece";
  const WORLD_CHARACTER_KEY = "worldCharacter";
  const HOUSE_KEY = "houseData";
  const ROUND_CLOCK_KEY = "worldRoundClock";
  const SCENE_MODE_KEY = "overviewMapMode";
  const WORLD_MAP_FOLDER_NAME = "World Map Folder";

  const ALLOWED_SCENE_NAMES = ["Crown of Ashes", "Crown of Ashes (Copy)"];
  const DATE_BANNER_ID = "coa-world-date-banner";
  const PANEL_ID = "coa-overview-panel";
  const PANEL_POSITION_KEY = "COA_OVERVIEW_PANEL_POSITION_V1";
  const HOVER_TOOLTIP_ID = "world-tile-hover-tooltip";
  const ROUTE_TOOLTIP_ID = "coa-route-tooltip";
  const ROUTE_TOOLTIP_KEY = "COA_WORLD_ROUTE_TOOLTIP";
  const PIECE_TOOLTIP_ID = "coa-world-piece-tooltip";
  const PIECE_TOOLTIP_KEY = "COA_WORLD_PIECE_TOOLTIP";
  const CLICK_MOVE_KEY = "COA_WORLD_CLICK_MOVE";
  const HOVER_KEY = "COA_WORLD_TILE_HOVER";
  const VISIBILITY_KEY = "COA_WORLD_TILE_VISIBILITY";
  const VISIBILITY_DIMMER_KEY = "COA_WORLD_TILE_VISIBILITY_DIMMER";
  const LINK_VIEWER_KEY = "COA_WORLD_TILE_LINK_VIEWER";
  const BUILD_LEDGER_KEY = "worldBuildLedger";
  const ECONOMY_LEDGER_KEY = "worldEconomyLedger";
  const MARKET_FORCES_KEY = "worldMarketForces";
  const PENDING_BUILD_STATUS_PENDING = "pending";
  const PENDING_BUILD_STATUS_APPLIED = "applied";
  const PENDING_BUILD_STATUS_FAILED = "failed";
  const SOCKET_NAME = `module.${MODULE_ID}`;

  const DEFAULT_IMAGES = {
    character: "icons/svg/mystery-man.svg",
    army: "icons/svg/sword.svg",
    fleet: "icons/svg/anchor.svg",
    dragon: "icons/svg/wing.svg"
  };

  const CHARACTER_STAT_KEYS = ["statecraft", "intrigue", "lore", "prowess", "martial", "diplomacy"];
  const CHARACTER_SECONDARY_STAT_KEYS = ["marriageDiplomacy", "navalMovement", "landMovement", "wounds", "fertility", "commandPoints", "favouredWeaponBonus"];
  const CHARACTER_CSV_COLUMNS = [
    ["Character ID", "characterId"],
    ["Player Name", "playerName"],
    ["Player User ID", "playerUserId"],
    ["Owner Type", "ownerType"],
    ["Character Slot", "characterSlot"],
    ["Character Role", "characterRole"],
    ["Character Name", "characterName"],
    ["House", "house"],
    ["Culture", "culture"],
    ["Religion", "religion"],
    ["Age", "age"],
    ["Height / Weight", "heightWeight"],
    ["Preferred Weapons", "preferredWeapons"],
    ["Marriage", "marriage"],
    ["Issue / Children", "issueChildren"],
    ["Current Tile Name", "currentTileName"],
    ["Current Tile ID", "currentTileId"],
    ["Current Region", "currentRegion"],
    ["Token Name", "tokenName"],
    ["Token Image", "tokenImage"],
    ["Status", "status"],
    ["Visibility", "visibility"],
    ["Statecraft", "statecraft"],
    ["Intrigue", "intrigue"],
    ["Lore", "lore"],
    ["Prowess", "prowess"],
    ["Martial", "martial"],
    ["Diplomacy", "diplomacy"],
    ["Marriage Diplomacy", "marriageDiplomacy"],
    ["Naval Movement", "navalMovement"],
    ["Land Movement", "landMovement"],
    ["Wounds", "wounds"],
    ["Fertility", "fertility"],
    ["Command Points", "commandPoints"],
    ["Favoured Weapon Bonus", "favouredWeaponBonus"],
    ["Traits", "traits"],
    ["Quirks", "quirks"],
    ["Public Notes", "publicNotes"],
    ["GM Notes", "gmNotes"]
  ];

  const TILE_OWNERSHIP_CSV_COLUMNS = [
    ["Tile Name", "tileName"],
    ["Tile ID", "tileId"],
    ["Drawing ID", "drawingId"],
    ["Region", "region"],
    ["Tile Type", "tileType"],
    ["Ownership Type", "ownershipType"],
    ["Controller Player Name", "controllerPlayerName"],
    ["Controller Player User ID", "controllerPlayerUserId"],
    ["House", "house"],
    ["Ruler", "ruler"],
    ["Ruling Character ID", "rulingCharacterId"],
    ["Culture", "culture"],
    ["Religion", "religion"],
    ["Sworn To Type", "swornToType"],
    ["Sworn To Player Name", "swornToPlayerName"],
    ["Sworn To Player User ID", "swornToPlayerUserId"],
    ["Marriage Protected", "marriageProtected"],
    ["Marriage Protected Player Name", "marriageProtectedPlayerName"],
    ["Marriage Protected Player User ID", "marriageProtectedPlayerUserId"],
    ["Ruler Diplomacy", "rulerDiplomacy"],
    ["NPC Defender Diplomacy", "npcDefenderDiplomacy"],
    ["Diplomatic Takeover Allowed", "diplomaticTakeoverAllowed"],
    ["Public Owner Label", "publicOwnerLabel"],
    ["Ownership Notes", "ownershipNotes"]
  ];

  const ARMY_TROOP_TYPES = [
    { key: "Mob", label: "Mob", gold: 1, food: 1 },
    { key: "Light Infantry", label: "Light Infantry", gold: 1, food: 2 },
    { key: "Spearmen", label: "Spearmen", gold: 1, food: 2 },
    { key: "Archers", label: "Archers", gold: 2, food: 2 },
    { key: "Heavy Infantry", label: "Heavy Infantry", gold: 3, food: 2 },
    { key: "Pikemen", label: "Pikemen", gold: 3, food: 2 },
    { key: "Crossbowmen", label: "Crossbowmen", gold: 3, food: 2 },
    { key: "Light Cavalry", label: "Light Cavalry", gold: 3, food: 3 },
    { key: "Lancers", label: "Lancers", gold: 4, food: 3 },
    { key: "Heavy Cavalry", label: "Heavy Cavalry", gold: 5, food: 4 }
  ];

  const NAVY_SHIP_TYPES = [
    { key: "Fishing / Conscripted Vessel", label: "Fishing / Conscripted Vessel", quality: 1, gold: 1, food: 1, troopEquivalent: "Mob", note: "Improvised force, poorly suited to battle" },
    { key: "Longship", label: "Longship", quality: 2, gold: 2, food: 1, troopEquivalent: "Light Infantry", note: "Cheap, mobile, effective basic combat ship" },
    { key: "Galley", label: "Galley", quality: 3, gold: 3, food: 2, troopEquivalent: "Archers", note: "Proper trained naval unit, but not a heavy hitter" },
    { key: "War Galley", label: "War Galley", quality: 4, gold: 4, food: 2, troopEquivalent: "Heavy Infantry / Crossbowmen / Light Cavalry", note: "Dedicated, powerful military ship" },
    { key: "Greatship", label: "Greatship", quality: 5, gold: 5, food: 3, troopEquivalent: "Lancers", note: "Expensive elite naval asset" },
    { key: "Dromond", label: "Dromond", quality: 6, gold: 6, food: 3, troopEquivalent: "Heavy Cavalry", note: "Premier, extremely expensive military ship" }
  ];


  const DUEL_WEAPONS = ["Spear", "Bow", "Sword", "Polearm", "Mace", "Axe"];

  const DUEL_ARMORS = [
    { key: "Unarmored", label: "Unarmored", bonus: 3, note: "+3 combat, no injury protection" },
    { key: "Lightly Armored", label: "Lightly Armored", bonus: 2, note: "+2 combat, reroll Amputation once" },
    { key: "Medium Armored", label: "Medium Armored", bonus: 1, note: "+1 combat, reroll lethal or Amputation once" },
    { key: "Heavy Armored", label: "Heavy Armored", bonus: 0, note: "+0 combat, roll second injury on lethal/Amputation and keep the less severe" }
  ];

  const DUEL_WEAPON_ADVANTAGE = {
    Sword: ["Axe", "Mace"],
    Axe: ["Mace", "Polearm"],
    Mace: ["Polearm", "Spear"],
    Polearm: ["Spear", "Sword"],
    Spear: ["Sword", "Axe"],
    Bow: []
  };

  const DUEL_HIT_LOCATIONS = [
    { location: "Forehead", effect: "Dazed; lose a round." },
    { location: "Ear", effect: "Temporarily deafened." },
    { location: "Left Eye", effect: "Partially blinded." },
    { location: "Right Eye", effect: "Partially blinded." },
    { location: "Nose/Cheek", effect: "Reduced appearance." },
    { location: "Mouth/Jaw", effect: "Muddled speech." },
    { location: "Right Shoulder", effect: "Reduced attack." },
    { location: "Right Bicep", effect: "Reduced attack." },
    { location: "Right Forearm", effect: "Possible disarm." },
    { location: "Right Palm", effect: "Disarmed." },
    { location: "Right Thumb", effect: "Can't grasp." },
    { location: "Right Finger", effect: "Disarmed." },
    { location: "Left Shoulder", effect: "Reduced attack." },
    { location: "Left Bicep", effect: "Reduced attack." },
    { location: "Left Forearm", effect: "Possible disarm." },
    { location: "Left Palm", effect: "Disarmed." },
    { location: "Left Thumb", effect: "Can't grasp." },
    { location: "Left Fingers", effect: "Disarmed." },
    { location: "Solar Plexus", effect: "Temporarily winded." },
    { location: "Upper Belly", effect: "Possibly winded." },
    { location: "Lower Belly", effect: "Possibly winded." },
    { location: "Left Hip", effect: "No extra effect." },
    { location: "Right Hip", effect: "No extra effect." },
    { location: "Genitals", effect: "Crippling pain; possible end of fight." },
    { location: "Neck", effect: "Possible end of fight." },
    { location: "Left Clavicle", effect: "Disarmed." },
    { location: "Right Clavicle", effect: "Disarmed." },
    { location: "Left Chest", effect: "Possible death." },
    { location: "Right Chest", effect: "Winded." },
    { location: "Ribs", effect: "Possibly winded." },
    { location: "Right Foot", effect: "Trip." },
    { location: "Left Foot", effect: "Trip." },
    { location: "Right Knee", effect: "Half move." },
    { location: "Left Knee", effect: "Half move." },
    { location: "Right Thigh", effect: "Reduced move." },
    { location: "Left Thigh", effect: "Reduced move." }
  ];

  const SIEGE_DC_TABLE = {
    ruin: [15, 20, 25, 30],
    hamlet: [25, 30, 35, 40],
    village: [35, 40, 45, 50],
    town: [45, 50, 55, 60],
    city: [55, 60, 65, 70]
  };

  const ROUND_ORDER = [
    { season: "Spring", round: 1 },
    { season: "Spring", round: 2 },
    { season: "Summer", round: 1 },
    { season: "Summer", round: 2 },
    { season: "Fall", round: 1 },
    { season: "Fall", round: 2 },
    { season: "Winter", round: 1 },
    { season: "Winter", round: 2 }
  ];

  const DEVELOPMENT_LEVELS = {
    0: { label: "Ruins", minPopulation: 0, maxPopulation: 4999 },
    1: { label: "Village", minPopulation: 5000, maxPopulation: 9999 },
    2: { label: "Holdfast", minPopulation: 10000, maxPopulation: 14999 },
    3: { label: "Town", minPopulation: 15000, maxPopulation: 24999 },
    4: { label: "City", minPopulation: 25000, maxPopulation: 34999 }
  };

  const CULTURES = ["First Men", "Andal", "Ironborn", "Rhoynar", "Valyrian", "Free Folk", "Other"];

  const DEFAULT_RESOURCE_NAMES = ["Gold", "Food", "Influence", "Mob", "Light Infantry", "Spearmen", "Heavy Infantry", "Pikemen", "Archers", "Crossbowmen", "Light Cavalry", "Lancers", "Heavy Cavalry", "Ships", "Siege", "Grain", "Wood", "Stone", "Iron", "Wool", "Fish", "Horses"];

  const BUILDING_TIER_COSTS = {
    1: { Gold: 4 },
    2: { Gold: 12 },
    3: { Gold: 24 }
  };

  const BUILDING_TIER_STATECRAFT_REQUIREMENTS = {
    1: 5,
    2: 10,
    3: 12
  };

  const BUILDING_LINES = [
    { key: "fields", group: "Economy", label: "Resow The Fields", levels: [
      { level: 1, name: "Fields", income: { Food: 4 }, effect: "+4 Food" },
      { level: 2, name: "Mills", income: { Food: 8 }, effect: "+8 Food" },
      { level: 3, name: "Granary", income: { Food: 12 }, effect: "+12 Food" }
    ]},
    { key: "orchard", group: "Economy", label: "Replant The Vineyard", levels: [
      { level: 1, name: "Orchard", income: { Gold: 1, Food: 2 }, effect: "+1 Gold, +2 Food" },
      { level: 2, name: "Mead Makers", income: { Gold: 2, Food: 4 }, effect: "+2 Gold, +4 Food" },
      { level: 3, name: "Winery", income: { Gold: 3, Food: 6 }, effect: "+3 Gold, +6 Food" }
    ]},
    { key: "mine", group: "Economy", label: "Reopen The Mines", levels: [
      { level: 1, name: "Mine", income: { Gold: 5 }, effect: "+5 Gold; best pure-gold economy line" },
      { level: 2, name: "Deep Mine", income: { Gold: 10 }, effect: "+10 Gold; best pure-gold economy line" },
      { level: 3, name: "Mining Complex", income: { Gold: 15 }, effect: "+15 Gold; best pure-gold economy line" }
    ]},
    { key: "forester", group: "Economy", label: "Fight Back The Wilderness", levels: [
      { level: 1, name: "Forester Camps", income: { Gold: 3, Food: 1 }, effect: "+3 Gold, +1 Food" },
      { level: 2, name: "Logging Guild", income: { Gold: 6, Food: 2 }, effect: "+6 Gold, +2 Food" },
      { level: 3, name: "Arborialists", income: { Gold: 9, Food: 3 }, effect: "+9 Gold, +3 Food" }
    ]},
    { key: "hunters", group: "Economy", label: "Hunt The Great Beasts", levels: [
      { level: 1, name: "Hunters Camp", aliases: ["Hunters Camps"], income: { Gold: 2, Food: 2 }, effect: "+2 Gold, +2 Food" },
      { level: 2, name: "Adventurer's Guild", aliases: ["Adventurer's Guilds"], income: { Gold: 4, Food: 4 }, effect: "+4 Gold, +4 Food" },
      { level: 3, name: "Monster Hunters League", income: { Gold: 6, Food: 6 }, effect: "+6 Gold, +6 Food" }
    ]},
    { key: "market", group: "Economy", label: "Clear Away The Rubble In The Square", levels: [
      { level: 1, name: "Town Square", income: { Gold: 3, Food: 1 }, effect: "+3 Gold, +1 Food" },
      { level: 2, name: "Market Square", income: { Gold: 6, Food: 2 }, effect: "+6 Gold, +2 Food" },
      { level: 3, name: "Trading Hall", income: { Gold: 9, Food: 3 }, effect: "+9 Gold, +3 Food" }
    ]},
    { key: "foundry", group: "Economy", label: "Stoke The Forges Anew", levels: [
      { level: 1, name: "Foundry", income: { Gold: 4 }, troopSupport: { basicEquipment: true }, effect: "+4 Gold; supplies basic military equipment" },
      { level: 2, name: "Blacksmith", income: { Gold: 8 }, troopSupport: { basicEquipment: true, trainedCapacityBonus: 250 }, effect: "+8 Gold; supplies better arms; +250 trained-troop support when recruitment is added" },
      { level: 3, name: "Armorer", aliases: ["Armoror"], income: { Gold: 12 }, troopSupport: { basicEquipment: true, trainedCapacityBonus: 500, heavyEquipment: true }, effect: "+12 Gold; supplies heavy arms/armor; heavy-troop support when recruitment is added" }
    ]},
    { key: "pastures", group: "Economy", label: "Pen The Lost Herds", levels: [
      { level: 1, name: "Pastures", income: { Food: 4 }, effect: "+4 Food" },
      { level: 2, name: "Expanded Pastures", income: { Food: 8 }, effect: "+8 Food" },
      { level: 3, name: "Slaughterhouses", income: { Food: 12 }, effect: "+12 Food" }
    ]},
    { key: "fishery", group: "Economy", label: "Brave The Seas For Its Bounty", levels: [
      { level: 1, name: "Fishing Wharf", aliases: ["Fishing Warf"], income: { Food: 4 }, effect: "+4 Food" },
      { level: 2, name: "Fishing Boats", income: { Food: 8 }, effect: "+8 Food" },
      { level: 3, name: "Deep Sea Fishing Boats", income: { Food: 12 }, effect: "+12 Food" }
    ]},
    { key: "stone", group: "Economy", label: "Break Open The Stone Pits", levels: [
      { level: 1, name: "Stone Pit", income: { Gold: 2 }, infrastructureDiscount: 1, effect: "+2 Gold; Roads, Ports, and Watchtowers cost -1 Gold on this tile" },
      { level: 2, name: "Stone Quarry", income: { Gold: 4 }, infrastructureDiscount: 2, effect: "+4 Gold; Roads, Ports, and Watchtowers cost -2 Gold on this tile" },
      { level: 3, name: "Quarrying Complex", income: { Gold: 6 }, infrastructureDiscount: 3, effect: "+6 Gold; Roads, Ports, and Watchtowers cost -3 Gold on this tile" }
    ]},
    { key: "road", group: "Infrastructure", label: "Road", levels: [
      { level: 1, name: "Road", income: {}, effect: "One-and-done; -0.5 movement cost through this tile" }
    ]},
    { key: "port", group: "Infrastructure", label: "Port", levels: [
      { level: 1, name: "Port", income: { Gold: 1 }, effect: "Enables port travel; +1 Gold" },
      { level: 2, name: "Trade Port", income: { Gold: 2, Food: 1 }, effect: "+2 Gold, +1 Food" },
      { level: 3, name: "Safe Harbor", income: { Gold: 3, Food: 2 }, effect: "+3 Gold, +2 Food" }
    ]},
    { key: "barracks", group: "Military", label: "Barracks", levels: [
      { level: 1, name: "Town Guards", income: { "Light Infantry": 500 }, effect: "Convert 500 Mob to Light Infantry/Spearmen" },
      { level: 2, name: "Town Barracks", income: { "Light Infantry": 1000, Spearmen: 1000 }, effect: "Convert 1000 Mob to Light Infantry/Spearmen" },
      { level: 3, name: "Infantry Schools", income: { "Light Infantry": 1000, Spearmen: 1000, "Heavy Infantry": 250, Pikemen: 250 }, effect: "Convert 1000 Mob to Light Infantry/Spearmen; 250 Heavy Infantry/Pikemen" }
    ]},
    { key: "archery", group: "Military", label: "Archery Range", levels: [
      { level: 1, name: "Hunters Lodge", income: { Archers: 500 }, effect: "Convert 500 Mob to Archers" },
      { level: 2, name: "Archery Range", income: { Archers: 1000, Crossbowmen: 1000 }, effect: "Convert 1000 Mob to Archers/Crossbowmen" },
      { level: 3, name: "Master Fletchers", income: { Archers: 1500, Crossbowmen: 1500 }, effect: "Convert 1500 Mob to Archers/Crossbowmen" }
    ]},
    { key: "stable", group: "Military", label: "Stable", levels: [
      { level: 1, name: "Scout Stable", aliases: ["Scouts Stable"], income: { "Light Cavalry": 250 }, effect: "Convert 250 Mob to Light Cavalry" },
      { level: 2, name: "Lancers Training Grounds", income: { "Light Cavalry": 500, Lancers: 500 }, effect: "Convert 500 Mob to Light Cavalry/Lancers" },
      { level: 3, name: "Knight's Holdfast", aliases: ["Knights Holdfasts"], income: { "Light Cavalry": 500, Lancers: 500, "Heavy Cavalry": 200 }, effect: "Convert 500 Mob to Light Cavalry/Lancers; 200 Heavy Cavalry" }
    ]},
    { key: "mustering", group: "Military", label: "Mustering Grounds", levels: [
      { level: 1, name: "Mustering Hall", income: { Food: -3 }, manpowerBonus: 500, effect: "+500 province manpower / +5 ship fielding capacity; -3 Food upkeep" },
      { level: 2, name: "Mustering Grounds", income: { Food: -6 }, manpowerBonus: 1000, effect: "+1000 province manpower / +10 ship fielding capacity; -6 Food upkeep" },
      { level: 3, name: "Levee En Masse", aliases: ["Levee En Mass"], income: { Food: -6, Gold: -3 }, manpowerBonus: 1500, effect: "+1500 province manpower / +15 ship fielding capacity; -6 Food, -3 Gold upkeep" }
    ]},
    { key: "watchtower", group: "Military", label: "Watchtowers", levels: [
      { level: 1, name: "Watchtowers", income: {}, movementCostModifier: 0.5, siegeModifier: 1, effect: "+1 siege DC, +0.5 enemy movement cost" },
      { level: 2, name: "Holdfasts", income: {}, movementCostModifier: 1, siegeModifier: 2, effect: "+2 siege DC, +1 enemy movement cost" },
      { level: 3, name: "Castles", income: {}, movementCostModifier: 1.5, siegeModifier: 3, effect: "+3 siege DC, +1.5 enemy movement cost" }
    ]},
    { key: "siege", group: "Military", label: "Siege Workshop", levels: [
      { level: 1, name: "Ram Specialists", income: { Siege: 5 }, effect: "Unlock Battering Ram" },
      { level: 2, name: "Carpenters Guild", income: { Siege: 10 }, effect: "Unlock Ballista/Onager" },
      { level: 3, name: "Siege Workshop", income: { Siege: 15 }, effect: "Unlock Trebuchet" }
    ]},
    { key: "drydock", group: "Military", label: "Drydock", levels: [
      { level: 1, name: "Shipwright", income: {}, effect: "Unlock Fishing / Conscripted Vessels and Longships" },
      { level: 2, name: "Sail Makers", income: {}, effect: "Unlock Galleys and War Galleys" },
      { level: 3, name: "Dry Dock", income: {}, effect: "Unlock Greatships and Dromonds" }
    ]},
    { key: "sept", group: "Social", label: "Sept", levels: [
      { level: 1, name: "Village Sept", income: { Influence: 1 }, effect: "+1 Influence; holy order flavour" },
      { level: 2, name: "Monastery", aliases: ["Monastary"], income: { Influence: 2 }, effect: "+2 total Influence" },
      { level: 3, name: "Grand Sept", income: { Influence: 3 }, effect: "+3 total Influence" }
    ]},
    { key: "godswood", group: "Social", label: "Godswood", levels: [
      { level: 1, name: "Small Godswood", income: { Influence: 1 }, effect: "+1 Influence; old gods flavour" },
      { level: 2, name: "Godsgrove", income: { Influence: 2 }, effect: "+2 total Influence" },
      { level: 3, name: "Massive Godswood", income: { Influence: 3 }, effect: "+3 total Influence" }
    ]},
    { key: "festival", group: "Social", label: "Festival Square", levels: [
      { level: 1, name: "Festival Square", income: { Influence: 1 }, festivalCostReduction: 10, effect: "+1 Influence; -10% festival cost" },
      { level: 2, name: "Feasting Halls", income: { Influence: 2 }, festivalCostReduction: 15, effect: "+2 total Influence; -15% festival cost" },
      { level: 3, name: "Tourney Grounds", income: { Influence: 3 }, festivalCostReduction: 20, effect: "+3 total Influence; -20% festival/tourney cost" }
    ]},
    { key: "school", group: "Social", label: "Schools", levels: [
      { level: 1, name: "Apprenticeships", income: { Influence: 1 }, skillTrainingUses: 1, effect: "+1 Influence; train 1 skill once" },
      { level: 2, name: "School", income: { Influence: 2 }, skillTrainingUses: 1, effect: "+2 total Influence; train 1 skill once" },
      { level: 3, name: "University", income: { Influence: 3 }, skillTrainingUses: 1, effect: "+3 total Influence; train 1 skill once" }
    ]},
    { key: "townhall", group: "Social", label: "Town Hall", levels: [
      { level: 1, name: "Village Charters", income: { Influence: 1 }, effect: "+1 Influence" },
      { level: 2, name: "Travelling Doctors", aliases: ["Traveling Doctors"], income: { Influence: 2 }, effect: "+2 total Influence" },
      { level: 3, name: "Town Halls", income: { Influence: 3 }, effect: "+3 total Influence" }
    ]}
  ];

  const BUILDINGS = BUILDING_LINES.map(line => line.levels[0]?.name).filter(Boolean);

  const BUILDING_RULES = {
    "Great Hall": { cost: { Gold: 4 }, income: { Gold: 1 }, effect: "Legacy building" },
    "Keep": { cost: { Gold: 5, Stone: 1 }, income: { Gold: 1 }, effect: "Legacy building" },
    "Barracks": { cost: { Gold: 3, Wood: 1 }, income: {}, effect: "Legacy building" },
    "Stable": { cost: { Gold: 3, Wood: 1 }, income: {}, effect: "Legacy building" },
    "Smithy": { cost: { Gold: 3, Iron: 1 }, income: { Gold: 1 }, effect: "Legacy building" },
    "Market": { cost: { Gold: 4 }, income: { Gold: 2 }, effect: "Legacy building" },
    "Temple": { cost: { Gold: 3, Stone: 1 }, income: { Gold: 1 }, effect: "Legacy building" },
    "Shipyard": { cost: { Gold: 4, Wood: 2 }, income: {}, effect: "Legacy building" },
    "Whaling Dock": { cost: { Gold: 3, Wood: 1 }, income: { Gold: 1, Food: 2 }, effect: "Legacy building" },
    "Smokehouse": { cost: { Gold: 2, Wood: 1 }, income: { Food: 1 }, effect: "Legacy building" },
    "Workshop": { cost: { Gold: 3, Wood: 1 }, income: { Gold: 1 }, effect: "Legacy building" },
    "Harbor": { cost: { Gold: 5, Wood: 2 }, income: { Gold: 2, Food: 1 }, effect: "Legacy building" }
  };

  // v0.3.4: Market Forces are now the source of truth for seasonal scaling.
  // Keep this legacy constant neutral so Winter does not half some income twice while
  // Market Forces half trade goods separately.
  const SEASON_INCOME_MULTIPLIERS = {
    Spring: 1,
    Summer: 1,
    Fall: 1,
    Winter: 1
  };

  const TRADE_GOODS = [
    {
        "category": "Grains & Field Crops",
        "name": "Barley",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Grains & Field Crops",
        "name": "Buckwheat",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Grains & Field Crops",
        "name": "Oat",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Grains & Field Crops",
        "name": "Rye",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Grains & Field Crops",
        "name": "Wheat",
        "goldValue": 2,
        "foodValue": 3
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Blueberries",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Green Apples",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Pears",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Plums",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Pumpkins",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Red Apples",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Cantaloupes",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Grapes",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Lemons",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Olives",
        "goldValue": 2,
        "foodValue": 3
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Peaches",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Peppers",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Watermelons",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Fireplums",
        "goldValue": 3,
        "foodValue": 2
    },
    {
        "category": "Fruits & Orchard Crops",
        "name": "Spicy Peppers",
        "goldValue": 3,
        "foodValue": 2
    },
    {
        "category": "Livestock & Mounts",
        "name": "Cattle",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Livestock & Mounts",
        "name": "Chickens",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Livestock & Mounts",
        "name": "Ducks",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Livestock & Mounts",
        "name": "Geese",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Livestock & Mounts",
        "name": "Goats",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Livestock & Mounts",
        "name": "Pigs",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Livestock & Mounts",
        "name": "Sheep",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Livestock & Mounts",
        "name": "Bracken Browns",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Livestock & Mounts",
        "name": "Highland Cows",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Livestock & Mounts",
        "name": "Honeybees",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Livestock & Mounts",
        "name": "Pack Horses",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Livestock & Mounts",
        "name": "Westerland Golds",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Livestock & Mounts",
        "name": "Sand Steed",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Livestock & Mounts",
        "name": "Snow Steeds",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Livestock & Mounts",
        "name": "Vale Greys",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Boar",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Game & Animal Products",
        "name": "Deer",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Game & Animal Products",
        "name": "Elk",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Game & Animal Products",
        "name": "Hides",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Small Game",
        "goldValue": 1,
        "foodValue": 2
    },
    {
        "category": "Game & Animal Products",
        "name": "Bear Pelts",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Falcons",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Fox Furs",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Hunting Hounds",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Marten Pelts",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Otter Pelts",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Ravens",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Wolf Pelts",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Exotic Birds",
        "goldValue": 3,
        "foodValue": 1
    },
    {
        "category": "Game & Animal Products",
        "name": "Pale Hide",
        "goldValue": 4,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Unicorns",
        "goldValue": 4,
        "foodValue": 0
    },
    {
        "category": "Game & Animal Products",
        "name": "Unicorn Horn",
        "goldValue": 4,
        "foodValue": 0
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Catfish",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Cod",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "River Pike",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "River Trout",
        "goldValue": 1,
        "foodValue": 3
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Crab",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Fermented Crab",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Seals",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Tuna",
        "goldValue": 2,
        "foodValue": 3
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Turtles",
        "goldValue": 2,
        "foodValue": 2
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Whale Oil",
        "goldValue": 2,
        "foodValue": 1
    },
    {
        "category": "Fish & Aquatic Resources",
        "name": "Pearls",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Metals & Ores",
        "name": "Bog Iron",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Metals & Ores",
        "name": "Lead",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Metals & Ores",
        "name": "Bronze",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Metals & Ores",
        "name": "Copper",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Metals & Ores",
        "name": "Iron",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Metals & Ores",
        "name": "Tin",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Metals & Ores",
        "name": "Gold",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Metals & Ores",
        "name": "Silver",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Clay",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Sandstone",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Stone",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Cut Stone",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Granite",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Ice",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Salt",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Sulfur",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Amber",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Jewels",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Stone & Minerals",
        "name": "Marble",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Timber & Natural Materials",
        "name": "Beech",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Timber & Natural Materials",
        "name": "Peat",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Timber & Natural Materials",
        "name": "Reeds",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Timber & Natural Materials",
        "name": "Ash",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Timber & Natural Materials",
        "name": "Oak",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Timber & Natural Materials",
        "name": "Ironwood",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Candles",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Fertilizer",
        "goldValue": 1,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Dyes",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Glass",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Goosefeather Arrows",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Paper",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Yew Bows",
        "goldValue": 2,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Obsidian Blades",
        "goldValue": 4,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Poison",
        "goldValue": 3,
        "foodValue": 0
    },
    {
        "category": "Crafted & Manufactured Goods",
        "name": "Weirwood Bows",
        "goldValue": 4,
        "foodValue": 0
    },
    {
        "category": "Trade & Industry",
        "name": "Ale",
        "goldValue": 1,
        "foodValue": 1
    },
    {
        "category": "Trade & Industry",
        "name": "Cider",
        "goldValue": 1,
        "foodValue": 1
    },
    {
        "category": "Trade & Industry",
        "name": "Whiskey",
        "goldValue": 2,
        "foodValue": 1
    },
    {
        "category": "Trade & Industry",
        "name": "Wine",
        "goldValue": 2,
        "foodValue": 1
    },
    {
        "category": "Trade & Industry",
        "name": "Dornish Red",
        "goldValue": 3,
        "foodValue": 1
    },
    {
        "category": "Trade & Industry",
        "name": "Eyrie Purple (Wine)",
        "goldValue": 3,
        "foodValue": 1
    },
    {
        "category": "Trade & Industry",
        "name": "Tradeports",
        "goldValue": 3,
        "foodValue": 0
    }
];

  const TRADE_GOOD_CATEGORIES = Array.from(new Set(TRADE_GOODS.map(good => good.category)));

  const DEVELOPMENT_ECONOMY_BONUSES = {
    0: { label: "Ruins", gold: 0, food: 1 },
    1: { label: "Hamlet / Village", gold: 3, food: 2 },
    2: { label: "Holdfast", gold: 4, food: 2 },
    3: { label: "Town", gold: 6, food: 1 },
    4: { label: "City", gold: 9, food: -1 }
  };

  const BUILDING_TREE_DEFINITIONS = {
    economy: {
      maxLevel: 3,
      notes: "Trade goods provide natural tile income. Buildings provide flat income/unlocks and do not gain matching-export bonuses.",
      categories: TRADE_GOOD_CATEGORIES
    },
    road: { maxLevel: 1, movementModifierPerLevel: -0.5, notes: "Roads reduce movement cost by 0.5 and do not upgrade twice." },
    military: { maxLevel: 3, lines: ["Barracks", "Archery Range", "Stable", "Siege Workshop"], notes: "Future hook: converts base mob into trained soldiers." },
    musteringGrounds: { maxLevel: 3, baseManpower: 1000, manpowerByLevel: { 1: 500, 2: 1000, 3: 1500 }, notes: "Each land province contributes 1,000 base manpower and 10 ship fielding capacity; Mustering buildings increase both caps proportionally and charge their listed upkeep." },
    influence: { maxLevel: 3, lines: ["Sept", "Godswood", "Festival Square", "School"], notes: "Influence buildings provide +1 additional Influence per upgrade tier, shown as total Influence 1/2/3." },
    fortification: { maxLevel: 3, movementCostIncreasePerLevel: 0.5, quickSiegeDcIncreasePerLevel: 2 }
  };

  function getBuildingAliases(level) {
    return Array.isArray(level?.aliases) ? level.aliases : [];
  }

  function getBuildingMetaByName(name) {
    const target = normalize(name);
    if (!target) return null;
    for (const line of BUILDING_LINES) {
      for (const level of line.levels || []) {
        const names = [level.name, ...getBuildingAliases(level)];
        if (names.some(value => normalize(value) === target)) return { line, level };
      }
    }
    return null;
  }

  function getBuildingLineState(house = {}) {
    const built = Array.isArray(house.builtBuildings) ? house.builtBuildings.map(String) : [];
    const state = new Map();

    for (const item of Array.isArray(house.buildingSlots) ? house.buildingSlots : []) {
      const line = BUILDING_LINES.find(candidate => candidate.key === item?.key);
      const level = line?.levels?.find(candidate => Number(candidate.level) === Number(item?.level));
      if (line && level) state.set(line.key, { line, level, name: level.name });
    }

    for (const name of built) {
      const meta = getBuildingMetaByName(name);
      if (!meta) continue;
      const current = state.get(meta.line.key);
      if (!current || Number(meta.level.level) > Number(current.level.level)) {
        state.set(meta.line.key, { line: meta.line, level: meta.level, name: meta.level.name });
      }
    }

    return state;
  }

  function getBuildingDataByName(house = {}) {
    const map = new Map();
    for (const item of Array.isArray(house.buildingData) ? house.buildingData : []) {
      const name = String(item?.name || item?.building || "");
      if (name) map.set(name, item);
    }
    return map;
  }

  function isBuildingMetaActive(meta = null, clock = getClock()) {
    if (!meta) return true;
    const activeSort = roundSortValueFromBuildMeta(meta);
    if (!activeSort) return true;
    return activeSort <= roundSortValue(clock || getDefaultClock());
  }

  function getActiveBuiltBuildings(house = {}, clock = getClock()) {
    const built = Array.isArray(house.builtBuildings) ? house.builtBuildings.map(String) : [];
    const detailsByName = getBuildingDataByName(house);
    return built.filter(name => isBuildingMetaActive(detailsByName.get(String(name)), clock));
  }

  function getPendingBuiltBuildings(house = {}, clock = getClock()) {
    const built = Array.isArray(house.builtBuildings) ? house.builtBuildings.map(String) : [];
    const detailsByName = getBuildingDataByName(house);
    return built.filter(name => !isBuildingMetaActive(detailsByName.get(String(name)), clock));
  }

  function getActiveBuildingLineState(house = {}, clock = getClock()) {
    const activeBuilt = getActiveBuiltBuildings(house, clock);
    const activeNames = new Set(activeBuilt.map(name => normalize(name)));
    const activeSlots = Array.isArray(house.buildingSlots)
      ? house.buildingSlots.filter(item => activeNames.has(normalize(item?.name || item?.building || "")))
      : [];
    return getBuildingLineState({ ...house, builtBuildings: activeBuilt, buildingSlots: activeSlots });
  }

  function getActiveBuildingSlotCount(house = {}, clock = getClock()) {
    const activeBuilt = getActiveBuiltBuildings(house, clock);
    const activeNames = new Set(activeBuilt.map(name => normalize(name)));
    const activeSlots = Array.isArray(house.buildingSlots)
      ? house.buildingSlots.filter(item => activeNames.has(normalize(item?.name || item?.building || "")))
      : [];
    return getBuildingSlotCount({ ...house, builtBuildings: activeBuilt, buildingSlots: activeSlots });
  }

  function getBuildingSlotCount(house = {}) {
    const state = getBuildingLineState(house);
    const legacyBuilt = Array.isArray(house.builtBuildings) ? house.builtBuildings : [];
    let legacyCount = 0;
    for (const name of legacyBuilt) if (!getBuildingMetaByName(name)) legacyCount++;
    return state.size + legacyCount;
  }

  function getNextBuildingLevel(line, currentLevel = 0) {
    return (line.levels || []).find(level => Number(level.level) === Number(currentLevel) + 1) || null;
  }

  function getBuildingTradeCategories(house = {}) {
    const goods = getHouseTradeGoods(house);
    return new Set([goods.primary?.category, goods.secondary?.category].filter(Boolean));
  }

  function buildingMatchesTileTrade(line, house = {}) {
    // v0.4.1: building income is flat. Trade goods remain separate natural tile income.
    return false;
  }

  function getBuildingIncomeForLevel(line, level, house = {}) {
    if (!level) return {};
    return normalizeResourceMap(level.income || {});
  }

  function getBuildingDisplayEffect(line, level, house = {}) {
    const income = getBuildingIncomeForLevel(line, level, house);
    const parts = [];
    const incomeText = resourceMapToText(income, "");
    if (incomeText) parts.push(incomeText);
    if (level?.effect) parts.push(level.effect);
    return parts.filter(Boolean).join(" — ") || "No passive income";
  }

  function getPieceStatecraft(piece = {}) {
    const raw = piece.statecraft ?? piece.stats?.statecraft ?? piece.abilities?.statecraft;
    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
  }

  function getBuildingStatecraftRequirement(levelNumber) {
    return Number(BUILDING_TIER_STATECRAFT_REQUIREMENTS[Number(levelNumber)] || 0);
  }

  function getStoneInfrastructureDiscount(house = {}, clock = getClock()) {
    const state = getActiveBuildingLineState(house, clock).get("stone");
    const discount = Number(state?.level?.infrastructureDiscount || 0);
    return Number.isFinite(discount) ? Math.max(0, discount) : 0;
  }

  function getBuildingTierCost(levelNumber, line = null, house = {}) {
    const cost = normalizeResourceMap(BUILDING_TIER_COSTS[Number(levelNumber)] || { Gold: 4 });
    const discountApplies = Boolean(line && (line.group === "Infrastructure" || line.key === "watchtower"));
    const discount = discountApplies ? getStoneInfrastructureDiscount(house) : 0;

    if (discount > 0 && Number(cost.Gold || 0) > 0) {
      cost.Gold = Math.max(0, Number(cost.Gold || 0) - discount);
    }

    return cost;
  }

  function getBuiltBuildingsAfterCatalogChange(house = {}, targetName) {
    const built = Array.isArray(house.builtBuildings) ? house.builtBuildings.map(String) : [];
    const meta = getBuildingMetaByName(targetName);
    if (!meta) return built.includes(targetName) ? built : [...built, targetName];
    const clean = built.filter(name => getBuildingMetaByName(name)?.line?.key !== meta.line.key);
    clean.push(meta.level.name);
    return clean;
  }

  function getBuildingSlotsAfterCatalogChange(house = {}, targetName) {
    const state = getBuildingLineState(house);
    const meta = getBuildingMetaByName(targetName);
    if (!meta) return Array.from(state.values()).map(item => ({ key: item.line.key, label: item.line.label, level: item.level.level, name: item.level.name }));
    state.set(meta.line.key, { line: meta.line, level: meta.level, name: meta.level.name });
    return Array.from(state.values()).map(item => ({
      key: item.line.key,
      label: item.line.label,
      group: item.line.group,
      tradeCategory: item.line.tradeCategory || "",
      level: item.level.level,
      name: item.level.name,
      statecraftRequired: getBuildingStatecraftRequirement(item.level.level),
      cost: getBuildingTierCost(item.level.level, item.line, house),
      effect: getBuildingDisplayEffect(item.line, item.level, house)
    }));
  }

  function describeBuildingOption(line, level, mode, house = {}) {
    const costText = resourceMapToText(getBuildingTierCost(level.level, line, house));
    const req = getBuildingStatecraftRequirement(level.level);
    const effect = getBuildingDisplayEffect(line, level, house);
    return `${mode}: ${line.label} → ${level.name} [Tier ${level.level}, Statecraft ${req}, Cost ${costText}] — ${effect}`;
  }

  function makeBuildingOption(line, level, mode, house = {}, piece = {}) {
    const statecraftRequired = getBuildingStatecraftRequirement(level?.level || 0);
    const pieceStatecraft = getPieceStatecraft(piece);
    const lockedByStatecraft = !game.user.isGM && pieceStatecraft !== null && statecraftRequired > 0 && pieceStatecraft < statecraftRequired;
    const baseLabel = describeBuildingOption(line, level, mode, house);
    const label = lockedByStatecraft
      ? `${baseLabel} — LOCKED: ${piece.name || "This character"} has Statecraft ${pieceStatecraft}, needs ${statecraftRequired}`
      : baseLabel;
    return {
      group: lockedByStatecraft ? `${line.group} — Locked` : (mode.startsWith("Upgrade") ? `${line.group} Upgrades` : line.group),
      value: level.name,
      label,
      disabled: lockedByStatecraft
    };
  }

  function buildCatalogBuildingOptions(house = {}, piece = {}) {
    const built = Array.isArray(house.builtBuildings) ? house.builtBuildings.map(String) : [];
    const state = getBuildingLineState(house);
    const slotCount = getBuildingSlotCount(house);
    const options = [];

    for (const line of BUILDING_LINES) {
      const current = state.get(line.key);
      if (current) {
        const next = getNextBuildingLevel(line, current.level.level);
        if (next) options.push(makeBuildingOption(line, next, `Upgrade ${current.level.name}`, house, piece));
      } else if (slotCount < 4) {
        const first = line.levels?.[0];
        if (first) options.push(makeBuildingOption(line, first, "Build", house, piece));
      }
    }

    for (const legacy of BUILDINGS) {
      if (!built.includes(legacy) && !getBuildingMetaByName(legacy) && slotCount < 4) {
        options.push({ group: "Legacy", value: legacy, label: legacy });
      }
    }

    return options;
  }

  function renderOptionGroups(options) {
    const groups = new Map();
    for (const option of options) {
      const group = option.group || "Buildings";
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(option);
    }
    let html = "";
    for (const [group, rows] of groups.entries()) {
      html += `<optgroup label="${escapeHtml(group)}">`;
      for (const option of rows) html += `<option value="${escapeHtml(option.value)}" ${option.disabled ? "disabled" : ""}>${escapeHtml(option.label)}</option>`;
      html += `</optgroup>`;
    }
    return html;
  }


  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalize(value) {
    return String(value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
  }

  function titleCase(value) {
    const text = String(value || "").trim();
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
  }

  function isOverviewScene(scene = canvas?.scene) {
    if (!scene) return false;
    const explicit = scene.getFlag?.(FLAG_SCOPE, SCENE_MODE_KEY);
    if (explicit === true || explicit === "overview" || explicit === "world" || explicit === "on") return true;
    if (explicit === false || explicit === "off") return false;
    return ALLOWED_SCENE_NAMES.includes(scene.name);
  }

  function requireOverviewScene() {
    if (isOverviewScene()) return true;
    ui.notifications.warn("Crown Overview Tools only runs on Crown of Ashes overview scenes.");
    return false;
  }

  function getWorldTile(drawing) {
    return drawing?.document?.getFlag(FLAG_SCOPE, WORLD_TILE_KEY);
  }

  function getHouseData(drawing) {
    return drawing?.document?.getFlag(FLAG_SCOPE, HOUSE_KEY);
  }

  function getWorldPiece(token) {
    return token?.document?.getFlag(FLAG_SCOPE, WORLD_PIECE_KEY);
  }

  function getTileId(entry) {
    return entry?.tile?.id || entry?.drawing?.document?.id;
  }

  function getTileName(entry) {
    return entry?.tile?.name || entry?.drawing?.document?.name || getTileId(entry) || "Unnamed Tile";
  }

  function normalizeShapeType(type) {
    const value = normalize(type);
    if (value === "r" || value.includes("rect")) return "rectangle";
    if (value === "e" || value.includes("ellipse") || value.includes("circle")) return "ellipse";
    if (value === "p" || value.includes("poly")) return "polygon";
    if (value === "f" || value.includes("free")) return "freehand";
    return value;
  }

  function normalizePoints(rawPoints) {
    if (!Array.isArray(rawPoints) || !rawPoints.length) return [];
    if (typeof rawPoints[0] === "number") {
      const points = [];
      for (let i = 0; i < rawPoints.length - 1; i += 2) {
        points.push({ x: Number(rawPoints[i] || 0), y: Number(rawPoints[i + 1] || 0) });
      }
      return points;
    }
    return rawPoints.map(point => ({ x: Number(point.x || 0), y: Number(point.y || 0) }));
  }

  function getDrawingLocalPoint(point, drawing) {
    const doc = drawing.document;
    return { x: point.x - Number(doc.x || 0), y: point.y - Number(doc.y || 0) };
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
    const dx = (localPoint.x - rx) / rx;
    const dy = (localPoint.y - ry) / ry;
    return dx * dx + dy * dy <= 1;
  }

  function pointInPolygon(localPoint, points) {
    if (!points || points.length < 3) return false;
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const xi = points[i].x;
      const yi = points[i].y;
      const xj = points[j].x;
      const yj = points[j].y;
      const intersects = yi > localPoint.y !== yj > localPoint.y &&
        localPoint.x < ((xj - xi) * (localPoint.y - yi)) / ((yj - yi) || 0.000001) + xi;
      if (intersects) inside = !inside;
    }
    return inside;
  }

  function pointInsideDrawing(point, drawing) {
    const doc = drawing.document;
    const shape = doc.shape || {};
    const shapeType = normalizeShapeType(shape.type);
    const localPoint = getDrawingLocalPoint(point, drawing);
    if (shapeType === "rectangle") return pointInRectangle(localPoint, shape);
    if (shapeType === "ellipse") return pointInEllipse(localPoint, shape);
    if (shapeType === "polygon" || shapeType === "freehand") {
      const points = normalizePoints(shape.points || doc.points || []);
      return pointInPolygon(localPoint, points);
    }
    return pointInRectangle(localPoint, shape);
  }

  function getWorldTileEntries() {
    return canvas.drawings.placeables
      .map(drawing => ({ drawing, tile: getWorldTile(drawing) }))
      .filter(entry => Boolean(entry.tile));
  }

  function getEntryById(id) {
    return getWorldTileEntries().find(entry => getTileId(entry) === id || entry.drawing.document.id === id) || null;
  }

  function getTileById(tileId) {
    return getEntryById(tileId);
  }

  function getMouseWorldPoint() {
    try {
      const mouse = canvas?.app?.renderer?.plugins?.interaction?.mouse?.global || canvas?.app?.renderer?.events?.pointer?.global;
      if (!mouse) return null;
      const point = new PIXI.Point(mouse.x, mouse.y);
      return canvas.stage.worldTransform.applyInverse(point);
    } catch (err) {
      return null;
    }
  }

  function findTileAtPoint(point) {
    if (!point) return null;
    const candidates = getWorldTileEntries()
      .filter(entry => pointInsideDrawing(point, entry.drawing))
      .sort((a, b) => {
        const ap = Number(a.tile.priority || 0);
        const bp = Number(b.tile.priority || 0);
        if (bp !== ap) return bp - ap;
        return Number(b.drawing.document.sort || 0) - Number(a.drawing.document.sort || 0);
      });
    return candidates[0] || null;
  }

  function getDrawingCenter(drawingOrEntry) {
    const drawing = drawingOrEntry.drawing || drawingOrEntry;
    const doc = drawing.document;
    const shape = doc.shape || {};
    const shapeType = normalizeShapeType(shape.type);
    if (shapeType === "polygon" || shapeType === "freehand") {
      const points = normalizePoints(shape.points || doc.points || []);
      if (points.length) {
        const avg = points.reduce((acc, point) => {
          acc.x += point.x;
          acc.y += point.y;
          return acc;
        }, { x: 0, y: 0 });
        return { x: Number(doc.x || 0) + avg.x / points.length, y: Number(doc.y || 0) + avg.y / points.length };
      }
    }
    return { x: Number(doc.x || 0) + Number(shape.width || 0) / 2, y: Number(doc.y || 0) + Number(shape.height || 0) / 2 };
  }

  function getGridSize() {
    return Number(canvas.scene?.grid?.size || 100);
  }

  function getTokenCenter(token) {
    if (token.center) return { x: token.center.x, y: token.center.y };
    const gridSize = getGridSize();
    return {
      x: Number(token.document.x || 0) + (Number(token.document.width || 1) * gridSize) / 2,
      y: Number(token.document.y || 0) + (Number(token.document.height || 1) * gridSize) / 2
    };
  }

  function getTokenTopLeftForPoint(token, point) {
    const gridSize = getGridSize();
    const width = Number(token.document.width || 1) * gridSize;
    const height = Number(token.document.height || 1) * gridSize;
    return { x: point.x - width / 2, y: point.y - height / 2 };
  }

  function getTileType(tile) {
    const explicit = normalize(tile?.tileType);
    if (["land", "sea", "port", "mixed"].includes(explicit)) return explicit;
    const terrain = normalize(tile?.terrainKey || tile?.terrainLabel);
    if (terrain === "sea" || terrain.includes("sea")) return "sea";
    if (terrain === "port" || terrain.includes("port") || terrain.includes("coastal")) return "port";
    return "land";
  }

  function isSeaTile(tile) { return getTileType(tile) === "sea"; }
  function isPortLike(tile) { const type = getTileType(tile); return type === "port" || type === "mixed"; }
  function isSeaLike(tile) { return getTileType(tile) === "sea"; }
  function isLandLike(tile) { const type = getTileType(tile); return type === "land" || type === "port" || type === "mixed"; }
  function isActivePort(tile) { return tile?.portActive === true || getTileType(tile) === "port"; }

  function getAllowedTileTypes(pieceType) {
    const type = normalize(pieceType || "army");
    if (type === "fleet") return ["sea", "port"];
    if (type === "dragon") return ["land", "sea", "port", "mixed"];
    return ["land", "port", "mixed"];
  }

  function isTileAllowedForPiece(piece, tile) {
    if (!piece || !tile) return false;
    const type = getTileType(tile);
    const pieceType = normalize(piece.pieceType || "army");
    if (pieceType === "dragon") return true;
    if (pieceType === "fleet") return type === "sea" || type === "port";
    if (pieceType === "army" || pieceType === "character") return type === "land" || type === "port" || type === "mixed";
    const allowed = Array.isArray(piece.allowedTileTypes) ? piece.allowedTileTypes : ["land", "port", "mixed"];
    return allowed.map(normalize).includes(type);
  }

  function isTileAllowedForRoute(piece, tile, routeMode, startTile, endTile) {
    if (!piece || !tile) return false;
    if (!isTileAllowedForPiece(piece, tile)) return false;
    const type = getTileType(tile);
    const pieceType = normalize(piece.pieceType || "army");
    if (pieceType === "dragon") return true;
    if (pieceType === "fleet") return type === "sea" || type === "port";
    if (routeMode === "land") return isLandLike(tile);
    if (routeMode === "sea") {
      const startValid = isPortLike(startTile) || isSeaLike(startTile);
      const endValid = isPortLike(endTile) || isSeaLike(endTile);
      if (!startValid || !endValid) return false;
      return type === "sea" || type === "port" || type === "mixed";
    }
    return isTileAllowedForPiece(piece, tile);
  }

  function getTileMovementCost(tile) {
    const cost = Number(tile?.movementCost ?? 1);
    return Number.isFinite(cost) ? Math.max(0, cost) : 1;
  }

  function findPath(startTile, endTile, piece, routeMode) {
    if (!startTile || !endTile) return null;
    if (!isTileAllowedForRoute(piece, endTile, routeMode, startTile, endTile)) return null;
    if (startTile.id === endTile.id) return { mode: routeMode, cost: 0, tileIds: [startTile.id], tileNames: [startTile.name] };

    const entries = getWorldTileEntries();
    const byId = new Map(entries.map(entry => [entry.tile.id, entry.tile]));
    const distances = new Map([[startTile.id, 0]]);
    const previous = new Map();
    const visited = new Set();

    while (true) {
      let currentId = null;
      let currentDistance = Infinity;
      for (const [tileId, distance] of distances.entries()) {
        if (visited.has(tileId)) continue;
        if (distance < currentDistance) {
          currentDistance = distance;
          currentId = tileId;
        }
      }
      if (!currentId) break;
      if (currentId === endTile.id) break;
      visited.add(currentId);
      const currentTile = byId.get(currentId);
      if (!currentTile) continue;
      const adjacentIds = Array.isArray(currentTile.adjacentTileIds) ? currentTile.adjacentTileIds : [];
      for (const nextId of adjacentIds) {
        const nextTile = byId.get(nextId);
        if (!nextTile) continue;
        if (!isTileAllowedForRoute(piece, nextTile, routeMode, startTile, endTile)) continue;
        const candidateDistance = currentDistance + getTileMovementCost(nextTile);
        if (!distances.has(nextId) || candidateDistance < distances.get(nextId)) {
          distances.set(nextId, candidateDistance);
          previous.set(nextId, currentId);
        }
      }
    }

    if (!distances.has(endTile.id)) return null;
    const tileIds = [];
    let cursor = endTile.id;
    while (cursor) {
      tileIds.unshift(cursor);
      if (cursor === startTile.id) break;
      cursor = previous.get(cursor);
    }
    const tileNames = tileIds.map(id => byId.get(id)?.name || id);
    return { mode: routeMode, cost: distances.get(endTile.id), tileIds, tileNames };
  }

  function findBestPath(startTile, endTile, piece) {
    const options = [
      findPath(startTile, endTile, piece, "land"),
      findPath(startTile, endTile, piece, "sea"),
      findPath(startTile, endTile, piece, "default")
    ].filter(Boolean);
    if (!options.length) return null;
    options.sort((a, b) => {
      if (a.cost !== b.cost) return a.cost - b.cost;
      const priority = { sea: 1, land: 2, default: 3 };
      return (priority[a.mode] || 99) - (priority[b.mode] || 99);
    });
    return options[0];
  }

  function getMovementRemaining(piece) {
    return Math.max(0, Number(piece.movementMax ?? 0) - Number(piece.movementUsed ?? 0));
  }

  function getCurrentActionRoundKey() {
    return getRoundKey(getClock()) || "unknown-round";
  }

  function strategicMovementLockReason(piece = {}) {
    const roundKey = getCurrentActionRoundKey();
    if (piece.movementLockedRoundKey && String(piece.movementLockedRoundKey) === String(roundKey)) {
      return piece.movementLockedReason || "This piece has already committed a strategic action this turn.";
    }
    if (piece.lastSiegeRoundKey && String(piece.lastSiegeRoundKey) === String(roundKey)) {
      return "This army has already committed a siege this turn and cannot move until movement resets.";
    }
    return "";
  }

  function hasDiplomacyAttemptThisRound(character = {}, piece = {}) {
    const roundKey = getCurrentActionRoundKey();
    return String(character.lastDiplomacyRoundKey || piece.lastDiplomacyRoundKey || "") === String(roundKey);
  }

  async function lockPieceMovementForRound(token, piece, reason) {
    if (!token || !piece) return;
    const updated = foundry.utils.deepClone(piece || {});
    updated.movementUsed = Math.max(Number(updated.movementUsed || 0), Number(updated.movementMax || 0));
    updated.movementLockedRoundKey = getCurrentActionRoundKey();
    updated.movementLockedReason = reason || "Strategic action committed this turn.";
    updated.movementLockedAt = new Date().toISOString();
    updated.movementLockedBy = game.user.name;
    await saveWorldPiece(token, updated);
  }

  function routeModeLabel(mode) {
    if (mode === "land") return "Land Route";
    if (mode === "sea") return "Sea / Port Route";
    if (mode === "best") return "Best Available Route";
    if (mode === "default") return "Piece Default Route";
    if (mode === "crossing") return "Port Crossing";
    return mode;
  }

  function getRegionName(tile) {
    return String(tile?.region ?? "").trim() || "Unassigned";
  }

  function getRegions() {
    return Array.from(new Set(getWorldTileEntries().map(entry => getRegionName(entry.tile)))).sort((a, b) => a.localeCompare(b));
  }

  function getTilesInRegion(region) {
    return getWorldTileEntries()
      .filter(entry => getRegionName(entry.tile) === region)
      .sort((a, b) => String(a.tile.name || "").localeCompare(String(b.tile.name || "")));
  }

  function getLegalTilesInRegion(region, piece) {
    return getTilesInRegion(region).filter(entry => isTileAllowedForPiece(piece, entry.tile));
  }

  function randomPopulation(level) {
    const data = DEVELOPMENT_LEVELS[level];
    if (!data) return 0;
    return Math.floor(Math.random() * (data.maxPopulation - data.minPopulation + 1)) + data.minPopulation;
  }

  function cleanNumber(value) {
    const text = String(value ?? "").replaceAll(",", "").trim();
    if (text === "") return "";
    const number = Number(text);
    return Number.isNaN(number) ? "" : number;
  }

  function splitList(value) {
    const text = String(value ?? "").trim();
    if (!text) return [];
    return text.split(";").map(item => item.trim()).filter(Boolean);
  }

  function csvEscape(value) {
    if (value === null || value === undefined) return '""';
    return '"' + String(value).replaceAll('"', '""') + '"';
  }

  function parseCSV(text) {
    const rows = [];
    let row = [];
    let cell = "";
    let insideQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const next = text[i + 1];
      if (char === '"') {
        if (insideQuotes && next === '"') { cell += '"'; i++; }
        else insideQuotes = !insideQuotes;
      } else if (char === "," && !insideQuotes) {
        row.push(cell); cell = "";
      } else if ((char === "\n" || char === "\r") && !insideQuotes) {
        if (char === "\r" && next === "\n") i++;
        row.push(cell);
        if (row.some(value => value !== "")) rows.push(row);
        row = []; cell = "";
      } else {
        cell += char;
      }
    }
    if (cell !== "" || row.length) {
      row.push(cell);
      if (row.some(value => value !== "")) rows.push(row);
    }
    return rows;
  }

  function safeFilename(value) {
    return String(value ?? "World_Map").replace(/[^a-z0-9_-]/gi, "_").replace(/_+/g, "_").replace(/^_+|_+$/g, "");
  }

  function getClock() {
    return canvas.scene?.getFlag(FLAG_SCOPE, ROUND_CLOCK_KEY) ?? null;
  }

  function getDefaultClock() {
    return { year: 100, roundIndex: 0, season: "Spring", round: 1, version: MODULE_VERSION, updatedAt: new Date().toISOString(), updatedBy: game.user.name };
  }

  function getDateLabel(clock) {
    if (!clock) return "Date Not Initialized";
    return `${clock.season ?? "Spring"} ${Number(clock.round ?? 1)}, ${Number(clock.year ?? 100)} AF`;
  }

  async function saveClock(clock) {
    clock.version = MODULE_VERSION;
    clock.updatedAt = new Date().toISOString();
    clock.updatedBy = game.user.name;
    await canvas.scene.setFlag(FLAG_SCOPE, ROUND_CLOCK_KEY, clock);
    updateDateBanner();
  }

  function advanceClockData(clock) {
    let nextIndex = Number(clock.roundIndex ?? 0) + 1;
    let nextYear = Number(clock.year ?? 100);
    if (nextIndex >= ROUND_ORDER.length) { nextIndex = 0; nextYear++; }
    const nextRound = ROUND_ORDER[nextIndex];
    return { year: nextYear, roundIndex: nextIndex, season: nextRound.season, round: nextRound.round, version: MODULE_VERSION, updatedAt: new Date().toISOString(), updatedBy: game.user.name };
  }

  function rewindClockData(clock) {
    let previousIndex = Number(clock.roundIndex ?? 0) - 1;
    let previousYear = Number(clock.year ?? 100);
    if (previousIndex < 0) { previousIndex = ROUND_ORDER.length - 1; previousYear--; }
    const previousRound = ROUND_ORDER[previousIndex];
    return { year: previousYear, roundIndex: previousIndex, season: previousRound.season, round: previousRound.round, version: MODULE_VERSION, updatedAt: new Date().toISOString(), updatedBy: game.user.name };
  }

  function getOrCreateDateBanner() {
    let banner = document.getElementById(DATE_BANNER_ID);
    if (banner) return banner;
    banner = document.createElement("div");
    banner.id = DATE_BANNER_ID;
    banner.style.position = "fixed";
    banner.style.top = "8px";
    banner.style.left = "50%";
    banner.style.transform = "translateX(-50%)";
    banner.style.zIndex = "1000000";
    banner.style.padding = "8px 24px 10px 24px";
    banner.style.minWidth = "220px";
    banner.style.textAlign = "center";
    banner.style.fontSize = "18px";
    banner.style.fontWeight = "bold";
    banner.style.letterSpacing = "0.5px";
    banner.style.color = "#f2e4c4";
    banner.style.background = "rgba(35, 24, 18, 0.94)";
    banner.style.border = "2px solid rgba(180, 145, 90, 0.9)";
    banner.style.borderTop = "none";
    banner.style.borderRadius = "0 0 10px 10px";
    banner.style.boxShadow = "0 4px 12px rgba(0,0,0,0.55)";
    banner.style.textShadow = "0 1px 2px rgba(0,0,0,0.8)";
    banner.style.pointerEvents = "none";

    for (const side of ["left", "right"]) {
      const tab = document.createElement("div");
      tab.style.position = "absolute";
      tab.style.top = "-8px";
      tab.style[side] = "24px";
      tab.style.width = "12px";
      tab.style.height = "12px";
      tab.style.background = "rgba(120, 85, 50, 0.95)";
      tab.style.borderRadius = "2px";
      banner.appendChild(tab);
    }

    const text = document.createElement("div");
    text.className = "coa-world-date-text";
    banner.appendChild(text);
    document.body.appendChild(banner);
    return banner;
  }

  function updateDateBanner() {
    if (!isOverviewScene()) return;
    const banner = getOrCreateDateBanner();
    const text = banner.querySelector(".coa-world-date-text");
    if (text) text.textContent = getDateLabel(getClock());
  }

  function removeDateBanner() {
    document.getElementById(DATE_BANNER_ID)?.remove();
  }

  function getDefaultPanelPosition() {
    return {
      left: 86,
      top: 96
    };
  }

  function loadPanelPosition() {
    const fallback = getDefaultPanelPosition();

    try {
      const raw = localStorage.getItem(PANEL_POSITION_KEY);
      if (!raw) return fallback;

      const parsed = JSON.parse(raw);
      const left = Number(parsed.left);
      const top = Number(parsed.top);

      if (!Number.isFinite(left) || !Number.isFinite(top)) return fallback;

      return {
        left,
        top
      };
    } catch (err) {
      return fallback;
    }
  }

  function savePanelPosition(left, top) {
    try {
      localStorage.setItem(PANEL_POSITION_KEY, JSON.stringify({
        left: Math.round(left),
        top: Math.round(top)
      }));
    } catch (err) {
      console.warn("Crown Overview Tools could not save panel position:", err);
    }
  }

  function clampPanelPosition(panel, position) {
    const margin = 8;
    const width = Number(panel.offsetWidth || 205);
    const height = Number(panel.offsetHeight || 320);

    const maxLeft = Math.max(margin, window.innerWidth - width - margin);
    const maxTop = Math.max(margin, window.innerHeight - height - margin);

    return {
      left: Math.min(Math.max(Number(position.left || 0), margin), maxLeft),
      top: Math.min(Math.max(Number(position.top || 0), margin), maxTop)
    };
  }

  function applyPanelPosition(panel) {
    const position = clampPanelPosition(panel, loadPanelPosition());
    panel.style.left = `${position.left}px`;
    panel.style.top = `${position.top}px`;
  }

  function resetPanelPosition(panel) {
    const position = getDefaultPanelPosition();
    savePanelPosition(position.left, position.top);
    applyPanelPosition(panel);
    ui.notifications.info("Crown Overview panel position reset.");
  }

  function makePanelDraggable(panel) {
    if (!panel) return;

    const handle = panel.querySelector(".coa-panel-drag-handle");
    if (!handle) return;

    let dragging = false;
    let startMouseX = 0;
    let startMouseY = 0;
    let startLeft = 0;
    let startTop = 0;

    function onMouseMove(event) {
      if (!dragging) return;

      event.preventDefault();

      const nextPosition = clampPanelPosition(panel, {
        left: startLeft + event.clientX - startMouseX,
        top: startTop + event.clientY - startMouseY
      });

      panel.style.left = `${nextPosition.left}px`;
      panel.style.top = `${nextPosition.top}px`;
    }

    function onMouseUp() {
      if (!dragging) return;

      dragging = false;
      panel.classList.remove("coa-dragging");
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      savePanelPosition(parseInt(panel.style.left || "0", 10), parseInt(panel.style.top || "0", 10));
    }

    handle.addEventListener("mousedown", event => {
      if (event.button !== 0) return;
      if (event.target?.closest?.("button")) return;

      dragging = true;
      startMouseX = event.clientX;
      startMouseY = event.clientY;
      startLeft = parseInt(panel.style.left || "0", 10) || panel.getBoundingClientRect().left;
      startTop = parseInt(panel.style.top || "0", 10) || panel.getBoundingClientRect().top;

      panel.classList.add("coa-dragging");
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      event.preventDefault();
      event.stopPropagation();
    });

    panel.querySelector("[data-coa-panel-reset]")?.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      resetPanelPosition(panel);
    });
  }

  function getOrCreatePanel() {
    let panel = document.getElementById(PANEL_ID);
    if (panel) return panel;
    panel = document.createElement("div");
    panel.id = PANEL_ID;
    document.body.appendChild(panel);
    return panel;
  }

  function renderPanel() {
    if (!isOverviewScene()) { document.getElementById(PANEL_ID)?.remove(); return; }
    const panel = getOrCreatePanel();
    const gmButtons = game.user.isGM ? `
      <div class="coa-panel-section coa-panel-gm-section">
        <div class="coa-panel-section-title">GM: Characters</div>
        <button data-coa-action="createCharacter">Create Character</button>
        <button data-coa-action="editSelectedCharacter">Edit / Assign Character</button>
        <button data-coa-action="importCharacterCsv">Import Character CSV</button>
        <button data-coa-action="exportCharacterCsv">Export Character CSV</button>
      </div>
      <div class="coa-panel-section coa-panel-gm-section">
        <div class="coa-panel-section-title">GM: Armies & Navies</div>
        <button data-coa-action="processArmyMusters">Process Military Musters</button>
        <button data-coa-action="editSelectedArmy">Edit Selected Army / Navy</button>
        <button data-coa-action="dismissSelectedArmy">Dismiss Selected Army / Navy</button>
      </div>
      <div class="coa-panel-section coa-panel-gm-section">
        <div class="coa-panel-section-title">GM: Tile Ownership</div>
        <button data-coa-action="importTileOwnershipCsv">Import Tile Ownership CSV</button>
        <button data-coa-action="exportTileOwnershipCsv">Export Tile Ownership CSV</button>
        <button data-coa-action="assignHouse">Edit Tile Ownership / House Data</button>
        <button data-coa-action="setSelectedTerritoryNeutral"><strong>Make Territory Neutral / Unaligned</strong></button>
        <button data-coa-action="auditProvinceHouseData">Audit Province / House Data</button>
      </div>
      <div class="coa-panel-section coa-panel-gm-section">
        <div class="coa-panel-section-title">GM: World Pieces</div>
        <button data-coa-action="createPiece">Create World Piece</button>
        <button data-coa-action="editWorldPiece">Edit World Piece</button>
        <button data-coa-action="assignPieceOwner">Assign Piece Owner</button>
        <button data-coa-action="resetMovement">Reset Movement</button>
      </div>
      <div class="coa-panel-section coa-panel-gm-section">
        <div class="coa-panel-section-title">GM: Tiles & Economy</div>
        <button data-coa-action="roundClock">Round Clock</button>
        <button data-coa-action="processPendingBuilds">Process Pending Builds</button>
        <button data-coa-action="collectEconomy">Collect Economy</button>
        <button data-coa-action="manageTileEconomy">Manage Tile Economy</button>
        <button data-coa-action="manageMarketForces">Manage Market Forces</button>
      </div>
      <div class="coa-panel-section coa-panel-gm-section">
        <div class="coa-panel-section-title">GM: Map Tools</div>
        <button data-coa-action="linkTiles">Link Selected Tiles</button>
        <button data-coa-action="unlinkTiles">Unlink Selected Tiles</button>
        <button data-coa-action="viewLinks">View Tile Links</button>
        <button data-coa-action="togglePort">Make / Edit Port</button>
        <button data-coa-action="resetBuildCapacity">Reset Build Uses</button>
        <button data-coa-action="repairBuildLocks">Repair Build Locks</button>
        <button data-coa-action="repairEconomyData">Repair Economy Data</button>
        <button data-coa-action="importRealm">Import Realm CSV</button>
        <button data-coa-action="exportRealm">Export Realm CSV</button>
        <button data-coa-action="hideTileText">Hide Original Tile Text</button>
      </div>
    ` : "";
    panel.innerHTML = `
      <div class="coa-panel-drag-handle" title="Drag to move this panel">
        <div>
          <h2>Crown Overview</h2>
          <div class="coa-muted">${escapeHtml(canvas.scene?.name || "")} · v${escapeHtml(MODULE_VERSION)}</div>
        </div>
        <button type="button" class="coa-panel-reset" data-coa-panel-reset title="Reset panel position">↺</button>
      </div>
      <div class="coa-panel-section coa-panel-player-section">
        <div class="coa-panel-section-title">Player Actions</div>
        <button data-coa-action="characterMoveMenu"><strong>My Characters / Move</strong></button>
        <button data-coa-action="pathMove">Move Selected Piece</button>
        <button data-coa-action="spreadSelected">Spread Selected</button>
        <button data-coa-action="summonArmy">Summon Army</button>
        <button data-coa-action="summonNavy">Summon Navy</button>
        <button data-coa-action="embarkArmy">Embark Army</button>
        <button data-coa-action="disembarkArmy">Disembark Army</button>
        <button data-coa-action="diplomaticTakeover">Diplomatic Takeover</button>
        <button data-coa-action="siegeStorm">Siege / Storm</button>
        <button data-coa-action="duel">Duel</button>
        <button data-coa-action="dismissSelectedArmy">Dismiss Army / Navy</button>
        <button data-coa-action="buildOnCurrentTile">Build / Upgrade</button>
        <button data-coa-action="showHoldings">My Holdings</button>
        <button data-coa-action="portCrossing">Port Crossing</button>
        <button data-coa-action="toggleClickMove">Click Move: ${globalThis[CLICK_MOVE_KEY] ? "On" : "Off"}</button>
        <button data-coa-action="toggleRouteTooltip">Route Tooltip: ${globalThis[ROUTE_TOOLTIP_KEY] ? "On" : "Off"}</button>
        <button data-coa-action="togglePieceTooltip">Piece Tooltip: ${globalThis[PIECE_TOOLTIP_KEY] ? "On" : "Off"}</button>
      </div>
      ${gmButtons}
    `;

    applyPanelPosition(panel);
    makePanelDraggable(panel);

    for (const button of panel.querySelectorAll("[data-coa-action]")) {
      button.addEventListener("click", async event => {
        event.preventDefault();
        const action = button.dataset.coaAction;
        try {
          await API[action]?.();
        } catch (err) {
          console.error(`Crown Overview action failed: ${action}`, err);
          ui.notifications.error(`Crown Overview action failed: ${action}. Check console.`);
        }
      });
    }
  }

  function removePanel() {
    document.getElementById(PANEL_ID)?.remove();
  }

  function getOrCreateHoverOverlay() {
    const manager = globalThis[HOVER_KEY];
    if (manager?.overlay) return manager.overlay;
    const overlay = new PIXI.Graphics();
    overlay.name = "coa-world-tile-hover-highlight-overlay";
    overlay.zIndex = 999999;
    overlay.eventMode = "none";
    overlay.interactive = false;
    canvas.stage.sortableChildren = true;
    canvas.stage.addChild(overlay);
    return overlay;
  }

  function getOrCreateHoverTooltip() {
    let el = document.getElementById(HOVER_TOOLTIP_ID);
    if (el) return el;
    el = document.createElement("div");
    el.id = HOVER_TOOLTIP_ID;
    el.style.position = "fixed";
    el.style.left = "16px";
    el.style.bottom = "104px";
    el.style.width = "460px";
    el.style.maxWidth = "calc(100vw - 32px)";
    el.style.maxHeight = "calc(100vh - 170px)";
    el.style.overflowY = "auto";
    el.style.zIndex = "100000";
    el.style.padding = "10px 12px";
    el.style.border = "1px solid rgba(255,255,255,0.35)";
    el.style.borderRadius = "8px";
    el.style.background = "rgba(20,20,20,0.92)";
    el.style.color = "#f0f0f0";
    el.style.fontSize = "13px";
    el.style.lineHeight = "1.4";
    el.style.pointerEvents = "auto";
    el.style.boxShadow = "0 4px 18px rgba(0,0,0,0.45)";
    el.style.display = "none";
    document.body.appendChild(el);
    return el;
  }

  function fitFixedTooltipToViewport(el) {
    if (!el) return;

    const margin = 12;
    const rect = el.getBoundingClientRect();

    if (rect.left < margin) {
      el.style.left = `${margin}px`;
    }

    if (rect.right > window.innerWidth - margin) {
      el.style.left = `${Math.max(margin, window.innerWidth - rect.width - margin)}px`;
    }

    if (rect.top < margin) {
      el.style.top = `${margin}px`;
      el.style.bottom = "auto";
    }
  }

  function hideHoverTooltip() {
    const el = document.getElementById(HOVER_TOOLTIP_ID);
    if (el) el.style.display = "none";
  }

  function isSeaByTile(tile) {
    return isSeaTile(tile) || normalize(tile?.terrainKey) === "sea" || normalize(tile?.terrainLabel) === "sea";
  }

  function getSelectedTravelTextToTile(destinationTile) {
    const selected = canvas.tokens.controlled.filter(token => Boolean(getWorldPiece(token)));
    if (selected.length !== 1) return "";
    const token = selected[0];
    const piece = getWorldPiece(token);
    if (!piece || !canUserControlWorldPiece(token, piece)) return "";
    let startEntry = findTileAtPoint(getTokenCenter(token));
    if (!startEntry && piece.currentTileId) startEntry = getTileById(piece.currentTileId);
    if (!startEntry || !destinationTile || String(startEntry.tile?.id || "") === String(destinationTile.id || "")) return "Current location";
    const comparisons = getRouteComparisons(startEntry.tile, destinationTile, piece);
    const best = comparisons.bestPath;
    if (!best) return "No valid route from selected piece";
    return `${best.cost} movement by ${routeModeLabel(best.mode)}`;
  }

  function canCurrentUserSeeTileDetails(tile, house = null) {
    return game.user.isGM || isTileOwnedByUser(tile, house, game.user);
  }

  function getTileDisplayHouseLabelForTooltip(tile = {}, house = {}) {
    const localHouse = String(house?.house || tile?.house || tile?.owner || "").trim();
    const allegiance = String(house?.allegiance || tile?.allegiance || "").trim();
    const publicLabel = String(house?.publicOwnerLabel || tile?.publicOwnerLabel || "").trim();
    const localKey = normalize(localHouse);
    const allegianceKey = normalize(allegiance);
    const publicKey = normalize(publicLabel);
    const isGenericLocal = !localKey || ["neutral", "npc", "none", "unaligned"].includes(localKey);
    if (isGenericLocal && allegiance && !["neutral", "npc", "none", "unaligned"].includes(allegianceKey)) return allegiance;
    if (isGenericLocal && publicLabel && !["neutral", "npc", "none", "unaligned"].includes(publicKey)) return publicLabel;
    return localHouse || publicLabel || allegiance || "House Information";
  }

  function showHoverTooltip(entry) {
    const el = getOrCreateHoverTooltip();
    const tile = entry.tile;
    const house = getHouseData(entry.drawing);
    const isSea = isSeaByTile(tile);
    const adjacentNames = Array.isArray(tile.adjacentTileNames) ? tile.adjacentTileNames.join(", ") : "";
    const tileOwnerName = getTileOwnerUserName(tile, house);
    const canSeeDetails = canCurrentUserSeeTileDetails(tile, house);
    const travelText = getSelectedTravelTextToTile(tile);

    let html = `<div><strong style="font-size:17px;">${escapeHtml(tile.name || "Unnamed Tile")}</strong>
      <div style="margin-top:6px;">
        <strong>Region:</strong> ${escapeHtml(tile.region || "None")}<br>
        <strong>Type:</strong> ${escapeHtml(tile.tileType || "land")}<br>
        <strong>Terrain:</strong> ${escapeHtml(tile.terrainLabel || tile.terrainKey || "None")}<br>
        <strong>Move Cost:</strong> ${escapeHtml(tile.movementCost ?? 1)}${tileOwnerName ? `<br><strong>Player Owner:</strong> ${escapeHtml(tileOwnerName)}` : ""}${travelText ? `<br><strong>Travel:</strong> ${escapeHtml(travelText)}` : ""}
        ${!isSea && (house?.culture || tile.culture) ? `<br><strong>Culture:</strong> ${escapeHtml(house?.culture || tile.culture)}` : ""}
        ${!isSea && (house?.religion || tile.religion) ? `<br><strong>Religion:</strong> ${escapeHtml(house?.religion || tile.religion)}` : ""}
      </div>`;

    if (house) {
      html += `<div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.30);">
        <strong style="font-size:16px;">${escapeHtml(getTileDisplayHouseLabelForTooltip(tile, house))}</strong>
        <div style="margin-top:6px;">`;

      if (house.lord) html += `<strong>Ruler:</strong> ${escapeHtml(house.lord)}<br>`;

      if (!canSeeDetails) {
        html += `<span style="opacity:0.78;">Detailed economy, population, buildings, and internal stats are hidden because this is not your holding.</span>`;
      } else {
        const buildings = !isSea && Array.isArray(house.builtBuildings) ? house.builtBuildings.join(", ") : "";
        if (!isSea && (house.developmentLabel || house.developmentLevel !== undefined)) {
          html += `<strong>Development:</strong> ${escapeHtml(house.developmentLabel || `Level ${house.developmentLevel}`)}`;
          if (house.developmentLevel !== "" && house.developmentLevel !== undefined && house.developmentLevel !== null) html += ` (${escapeHtml(house.developmentLevel)})`;
          html += `<br>`;
        }
        if (!isSea && house.population !== "" && house.population !== undefined && house.population !== null) {
          const population = Number(house.population);
          html += `<strong>Population:</strong> ${escapeHtml(Number.isNaN(population) ? house.population : population.toLocaleString())}<br>`;
        }
        if (isEconomyEnabled(house)) {
          html += `<strong>Trade Goods:</strong> ${escapeHtml(tradeGoodSummaryText(house))}<br>`;
          html += `<strong>Stockpile:</strong> ${escapeHtml(resourceMapToText(getHouseResourceStockpile(house)))}<br>`;
          html += `<strong>Round Income:</strong> ${escapeHtml(resourceMapToText(getTileTotalIncome(house, getClock())))}<br>`;
        } else if (house.treasury !== "" && house.treasury !== undefined && house.treasury !== null) {
          const treasury = Number(house.treasury);
          html += `<strong>Treasury:</strong> ${escapeHtml(Number.isNaN(treasury) ? house.treasury : treasury.toLocaleString())}<br>`;
        }
        if (house.primaryExport || house.exports) html += `<strong>Primary Export:</strong> ${escapeHtml(house.primaryExport || house.exports)}<br>`;
        if (house.secondaryExport) html += `<strong>Secondary Export:</strong> ${escapeHtml(house.secondaryExport)}<br>`;
        if (house.allegiance) html += `<strong>Allegiance:</strong> ${escapeHtml(house.allegiance)}<br>`;
        html += `</div>`;
        if (!isSea && buildings) html += `<div style="margin-top:7px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.15);"><strong>Buildings:</strong><br><span style="opacity:0.9;">${escapeHtml(buildings)}</span></div>`;
      }

      html += `</div>`;
    }

    if (adjacentNames) {
      const linkedTiles = adjacentNames.split(",").map(value => value.trim()).filter(Boolean);
      html += `<div style="margin-top:9px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.15);">
        <strong>Links:</strong>
        <div class="coa-hover-links">
          ${linkedTiles.map(name => `<span>${escapeHtml(name)}</span>`).join("")}
        </div>
      </div>`;
    }

    html += `</div>`;
    el.innerHTML = html;
    el.style.display = "block";
    fitFixedTooltipToViewport(el);
  }

  function drawTileShapeOnGraphics(graphics, drawing, fillColor = 0xffcc33, fillAlpha = 0.18, strokeColor = 0xffcc33, strokeAlpha = 0.95, strokeWidth = 4) {
    const doc = drawing.document;
    const shape = doc.shape || {};
    const shapeType = normalizeShapeType(shape.type);
    const x = Number(doc.x || 0);
    const y = Number(doc.y || 0);
    const width = Number(shape.width || 0);
    const height = Number(shape.height || 0);
    graphics.lineStyle(strokeWidth, strokeColor, strokeAlpha);
    graphics.beginFill(fillColor, fillAlpha);
    if (shapeType === "rectangle") graphics.drawRect(x, y, width, height);
    else if (shapeType === "ellipse") graphics.drawEllipse(x + width / 2, y + height / 2, width / 2, height / 2);
    else {
      const points = normalizePoints(shape.points || doc.points || []);
      if (points.length >= 3) {
        const flat = [];
        for (const point of points) flat.push(x + point.x, y + point.y);
        graphics.drawPolygon(flat);
      }
    }
    graphics.endFill();
  }

  function drawHoverHighlight(entry) {
    const overlay = getOrCreateHoverOverlay();
    overlay.clear();
    if (!entry) { overlay.visible = false; hideHoverTooltip(); return; }
    overlay.visible = true;
    drawTileShapeOnGraphics(overlay, entry.drawing);
    showHoverTooltip(entry);
  }

  function updateHoverHighlight() {
    if (!isOverviewScene() || !canvas?.ready) return;
    const mousePoint = getMouseWorldPoint();
    if (!mousePoint) { drawHoverHighlight(null); return; }
    const entry = findTileAtPoint(mousePoint);
    const manager = globalThis[HOVER_KEY];
    if (!manager) return;
    const currentId = entry?.tile?.id || null;
    if (manager.lastTileId === currentId) return;
    manager.lastTileId = currentId;
    drawHoverHighlight(entry);
  }

  function startHover() {
    stopHover();
    const overlay = getOrCreateHoverOverlay();
    globalThis[HOVER_KEY] = { version: MODULE_VERSION, overlay, interval: setInterval(updateHoverHighlight, 100), lastTileId: null };
    updateHoverHighlight();
  }

  function stopHover() {
    const manager = globalThis[HOVER_KEY];
    if (manager?.interval) clearInterval(manager.interval);
    if (manager?.overlay) { manager.overlay.clear(); manager.overlay.destroy(); }
    document.getElementById(HOVER_TOOLTIP_ID)?.remove();
    globalThis[HOVER_KEY] = null;
  }

  function getOrCreateRouteTooltip() {
    let el = document.getElementById(ROUTE_TOOLTIP_ID);
    if (el) return el;

    el = document.createElement("div");
    el.id = ROUTE_TOOLTIP_ID;
    el.style.position = "fixed";
    el.style.left = "315px";
    el.style.top = "112px";
    el.style.width = "420px";
    el.style.maxHeight = "calc(100vh - 150px)";
    el.style.overflowY = "auto";
    el.style.zIndex = "100000";
    el.style.padding = "10px";
    el.style.border = "1px solid rgba(180,145,90,0.85)";
    el.style.borderRadius = "8px";
    el.style.background = "rgba(20,20,20,0.94)";
    el.style.color = "#f2e4c4";
    el.style.fontSize = "12px";
    el.style.lineHeight = "1.35";
    el.style.pointerEvents = "none";
    el.style.boxShadow = "0 4px 18px rgba(0,0,0,0.55)";
    el.style.display = "none";
    document.body.appendChild(el);
    return el;
  }

  function hideRouteTooltip() {
    const el = document.getElementById(ROUTE_TOOLTIP_ID);
    if (el) el.style.display = "none";
  }

  function removeRouteTooltipElement() {
    document.getElementById(ROUTE_TOOLTIP_ID)?.remove();
  }

  function routeTooltipStatusHtml(route, remaining) {
    if (!route) return '<span style="color:#ff9999;font-weight:bold;">No route</span>';
    if (route.cost > remaining) return '<span style="color:#ffd166;font-weight:bold;">Costs ' + escapeHtml(route.cost) + ' / not enough movement</span>';
    return '<span style="color:#9ee493;font-weight:bold;">Costs ' + escapeHtml(route.cost) + '</span>';
  }

  function routeTooltipPathHtml(route) {
    if (!route) return '<div style="opacity:0.75;margin-top:4px;">No linked route found.</div>';
    return '<div style="margin-top:4px;padding:6px;border-radius:5px;background:rgba(255,255,255,0.08);">' + route.tileNames.map(escapeHtml).join(" → ") + '</div>';
  }

  function getBestRouteOption(routeOptions) {
    const valid = routeOptions.filter(option => Boolean(option.path));
    if (!valid.length) return null;
    valid.sort((a, b) => {
      if (a.path.cost !== b.path.cost) return a.path.cost - b.path.cost;
      const priority = { sea: 1, land: 2, default: 3 };
      return (priority[a.path.mode] || 99) - (priority[b.path.mode] || 99);
    });
    return valid[0];
  }

  function buildRouteTooltipBlock(title, route, remaining, isBest) {
    return '<div style="margin-top:8px;padding:8px;border-radius:6px;background:' +
      (isBest ? 'rgba(158,228,147,0.14)' : 'rgba(255,255,255,0.055)') +
      ';">' +
        '<div style="font-weight:bold;font-size:13px;margin-bottom:4px;color:#f7e2b5;">' +
          escapeHtml(title) +
          (isBest ? ' <span style="color:#9ee493;">★ Best</span>' : '') +
        '</div>' +
        '<div><strong>Status:</strong> ' + routeTooltipStatusHtml(route, remaining) + '</div>' +
        '<div style="margin-top:4px;"><strong>Route:</strong></div>' +
        routeTooltipPathHtml(route) +
      '</div>';
  }

  function buildRouteTooltipHtml(piece, startTile, destinationTile, landPath, seaPath, defaultPath) {
    const remaining = getMovementRemaining(piece);
    const options = [
      { label: "Sea / Port Route", path: seaPath },
      { label: "Land Route", path: landPath },
      { label: "Piece Default Route", path: defaultPath }
    ];
    const best = getBestRouteOption(options);
    const bestMode = best?.path?.mode || null;

    return '<div>' +
      '<h2 style="margin:0 0 8px 0;font-size:16px;color:#f7e2b5;">World Route</h2>' +
      '<div style="margin-bottom:8px;">' +
        '<strong>Piece:</strong> ' + escapeHtml(piece.name || "World Piece") + '<br>' +
        '<strong>From:</strong> ' + escapeHtml(startTile?.name || "Unknown") + ' <span style="opacity:0.7;">[' + escapeHtml(getTileType(startTile)) + ']</span><br>' +
        '<strong>To:</strong> ' + escapeHtml(destinationTile?.name || "Unknown") + ' <span style="opacity:0.7;">[' + escapeHtml(getTileType(destinationTile)) + ']</span>' +
      '</div>' +
      '<div style="margin-bottom:8px;">' +
        '<strong>Movement:</strong> ' + escapeHtml(Number(piece.movementUsed || 0)) + ' / ' + escapeHtml(Number(piece.movementMax || 0)) + ' used — <strong>' + escapeHtml(remaining) + '</strong> remaining' +
      '</div>' +
      buildRouteTooltipBlock("Sea / Port Route", seaPath, remaining, bestMode === "sea") +
      buildRouteTooltipBlock("Land Route", landPath, remaining, bestMode === "land") +
      buildRouteTooltipBlock("Piece Default Route", defaultPath, remaining, bestMode === "default") +
      '<div style="opacity:0.75;font-size:11px;margin-top:10px;">Select one world piece, then hover a tile. Turn on Click Move to click a destination and confirm movement.</div>' +
    '</div>';
  }

  function updateRouteTooltip() {
    if (!isOverviewScene() || !canvas?.ready) { hideRouteTooltip(); return; }

    const selected = canvas.tokens.controlled;
    if (selected.length !== 1) { hideRouteTooltip(); return; }

    const token = selected[0];
    const piece = getWorldPiece(token);
    if (!piece) { hideRouteTooltip(); return; }

    const mousePoint = getMouseWorldPoint();
    if (!mousePoint) { hideRouteTooltip(); return; }

    const destinationEntry = findTileAtPoint(mousePoint);
    if (!destinationEntry) { hideRouteTooltip(); return; }

    let startEntry = findTileAtPoint(getTokenCenter(token));
    if (!startEntry && piece.currentTileId) startEntry = getTileById(piece.currentTileId);

    if (!startEntry) {
      const el = getOrCreateRouteTooltip();
      el.innerHTML = '<h2 style="margin:0 0 8px 0;font-size:16px;color:#f7e2b5;">World Route</h2>' +
        '<p><strong>Piece:</strong> ' + escapeHtml(piece.name || token.document.name) + '</p>' +
        '<p>Selected piece is not currently inside a world tile.</p>';
      el.style.display = "block";
      return;
    }

    const startTile = startEntry.tile;
    const destinationTile = destinationEntry.tile;
    const landPath = findPath(startTile, destinationTile, piece, "land");
    const seaPath = findPath(startTile, destinationTile, piece, "sea");
    const defaultPath = findPath(startTile, destinationTile, piece, "default");

    const el = getOrCreateRouteTooltip();
    el.innerHTML = buildRouteTooltipHtml(piece, startTile, destinationTile, landPath, seaPath, defaultPath);
    el.style.display = "block";
  }

  function startRouteTooltip() {
    stopRouteTooltip(false);
    globalThis[ROUTE_TOOLTIP_KEY] = {
      version: MODULE_VERSION,
      interval: setInterval(updateRouteTooltip, 150),
      startedAt: new Date().toISOString()
    };
    updateRouteTooltip();
    renderPanel();
    ui.notifications.info("World route tooltip enabled.");
  }

  function stopRouteTooltip(showNotification = true) {
    const manager = globalThis[ROUTE_TOOLTIP_KEY];
    if (manager?.interval) clearInterval(manager.interval);
    removeRouteTooltipElement();
    globalThis[ROUTE_TOOLTIP_KEY] = null;
    renderPanel();
    if (showNotification) ui.notifications.info("World route tooltip disabled.");
  }

  async function toggleRouteTooltip() {
    if (!requireOverviewScene()) return;
    if (globalThis[ROUTE_TOOLTIP_KEY]) stopRouteTooltip(true);
    else startRouteTooltip();
  }

  function getClickMoveRouteSelectHtml(comparisons) {
    const items = [];
    if (comparisons.bestPath) items.push(["best", `Best Available Route — ${routeModeLabel(comparisons.bestPath.mode)} / Cost ${comparisons.bestPath.cost}`]);
    if (comparisons.landPath) items.push(["land", `Land Route — Cost ${comparisons.landPath.cost}`]);
    if (comparisons.seaPath) items.push(["sea", `Sea / Port Route — Cost ${comparisons.seaPath.cost}`]);
    if (comparisons.defaultPath) items.push(["default", `Piece Default Route — Cost ${comparisons.defaultPath.cost}`]);

    return items
      .map(([value, label], index) => `<option value="${escapeHtml(value)}" ${index === 0 ? "selected" : ""}>${escapeHtml(label)}</option>`)
      .join("");
  }

  async function askClickMoveConfirmation(token, piece, startTile, destinationTile, comparisons) {
    const remaining = getMovementRemaining(piece);
    const bestMode = comparisons.bestPath?.mode || null;

    return await new Promise(resolve => {
      new Dialog({
        title: "Confirm World Move",
        content: `<form>
          <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;">
            <strong>Piece:</strong> ${escapeHtml(piece.name || token.document.name)}<br>
            <strong>From:</strong> ${escapeHtml(startTile.name)}<br>
            <strong>To:</strong> ${escapeHtml(destinationTile.name)}<br>
            <strong>Movement:</strong> ${escapeHtml(Number(piece.movementUsed || 0))} / ${escapeHtml(Number(piece.movementMax || 0))} used — ${escapeHtml(remaining)} remaining
          </div>

          <div class="form-group">
            <label><strong>Route to use</strong></label>
            <select name="routeMode" style="width:100%;">
              ${getClickMoveRouteSelectHtml(comparisons)}
            </select>
          </div>

          <div style="max-height:260px;overflow-y:auto;border:1px solid #777;border-radius:6px;padding:8px;">
            <ul style="margin:0 0 0 18px;padding:0;">
              ${routeSummaryLine("Sea / Port Route", comparisons.seaPath, remaining, bestMode === "sea")}
              ${routeSummaryLine("Land Route", comparisons.landPath, remaining, bestMode === "land")}
              ${routeSummaryLine("Piece Default Route", comparisons.defaultPath, remaining, bestMode === "default")}
            </ul>
          </div>

          <p class="notes">If another world piece is already in the destination tile, this piece will be placed in an open slot nearby instead of directly on top of it.</p>
        </form>`,
        buttons: {
          move: { label: "Move", callback: html => {
            const form = html[0].querySelector("form");
            resolve({ routeMode: String(form.routeMode.value || "best") });
          }},
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "move"
      }, { width: 640, height: 520, resizable: true }).render(true);
    });
  }

  async function handleClickMove(event) {
    const manager = globalThis[CLICK_MOVE_KEY];
    if (!manager || !isOverviewScene() || !canvas?.ready) return;

    if (event?.target?.tagName && String(event.target.tagName).toLowerCase() !== "canvas") return;

    const selected = canvas.tokens.controlled;
    if (selected.length !== 1) return;

    const token = selected[0];
    const piece = getWorldPiece(token);
    if (!piece) return;

    const mousePoint = getMouseWorldPoint();
    if (!mousePoint) return;

    const destinationEntry = findTileAtPoint(mousePoint);
    if (!destinationEntry) return;

    let startEntry = findTileAtPoint(getTokenCenter(token));
    if (!startEntry && piece.currentTileId) startEntry = getTileById(piece.currentTileId);
    if (!startEntry) return;

    const startTile = startEntry.tile;
    const destinationTile = destinationEntry.tile;

    if (String(startTile.id) === String(destinationTile.id)) return;

    event.preventDefault?.();
    event.stopPropagation?.();

    if (!canUserControlWorldPiece(token, piece)) {
      ui.notifications.warn("You can only move world pieces you control.");
      return;
    }

    const lockedReason = strategicMovementLockReason(piece);
    if (lockedReason) { ui.notifications.warn(lockedReason); return; }

    if (!isTileAllowedForPiece(piece, destinationTile)) {
      ui.notifications.warn(`${piece.name || token.document.name} cannot enter ${destinationTile.name}.`);
      return;
    }

    const comparisons = getRouteComparisons(startTile, destinationTile, piece);
    if (!comparisons.bestPath && !comparisons.landPath && !comparisons.seaPath && !comparisons.defaultPath) {
      ui.notifications.warn(`No valid route from ${startTile.name} to ${destinationTile.name}.`);
      return;
    }

    const choice = await askClickMoveConfirmation(token, piece, startTile, destinationTile, comparisons);
    if (!choice) return;

    const path = getPathForMode(startTile, destinationTile, piece, choice.routeMode);
    if (!path) { ui.notifications.warn(`No valid ${routeModeLabel(choice.routeMode)} from ${startTile.name} to ${destinationTile.name}.`); return; }

    const remaining = getMovementRemaining(piece);
    if (path.cost > remaining) { ui.notifications.warn(`Move blocked: needs ${path.cost} movement, but only has ${remaining} remaining.`); return; }

    await executeWorldPathMove(token, piece, startTile, destinationTile, path, 350, "Click World Move");
  }

  function startClickMove() {
    stopClickMove(false);
    const clickHandler = event => handleClickMove(event);
    document.addEventListener("click", clickHandler, true);
    globalThis[CLICK_MOVE_KEY] = {
      version: MODULE_VERSION,
      clickHandler,
      startedAt: new Date().toISOString()
    };
    renderPanel();
    ui.notifications.info("Click Move enabled. Select a world piece, then click a destination tile.");
  }

  function stopClickMove(showNotification = true) {
    const manager = globalThis[CLICK_MOVE_KEY];
    if (manager?.clickHandler) document.removeEventListener("click", manager.clickHandler, true);
    globalThis[CLICK_MOVE_KEY] = null;
    renderPanel();
    if (showNotification) ui.notifications.info("Click Move disabled.");
  }

  async function toggleClickMove() {
    if (!requireOverviewScene()) return;
    if (globalThis[CLICK_MOVE_KEY]) stopClickMove(true);
    else startClickMove();
  }

  function refreshTokenVisibility() {
    for (const token of canvas.tokens.placeables) {
      try { token.renderFlags?.set?.({ refreshVisibility: true }); }
      catch (_) { try { token._refreshVisibility?.(); } catch (_) {} }
    }
  }

  function getVisionContainer() {
    return canvas?.visibility?.vision?.sight || canvas?.visibility?.vision?.light?.preview || null;
  }

  function getSceneRect() {
    const dims = canvas?.dimensions || {};
    return {
      x: Number(dims.sceneX ?? dims.rect?.x ?? 0),
      y: Number(dims.sceneY ?? dims.rect?.y ?? 0),
      width: Number(dims.sceneWidth ?? dims.rect?.width ?? canvas?.scene?.width ?? 4000),
      height: Number(dims.sceneHeight ?? dims.rect?.height ?? canvas?.scene?.height ?? 4000)
    };
  }

  function getOrCreateVisionDimmer() {
    let overlay = globalThis[VISIBILITY_DIMMER_KEY];
    if (overlay && !overlay.destroyed) return overlay;

    overlay = new PIXI.Graphics();
    overlay.name = VISIBILITY_DIMMER_KEY;
    overlay.zIndex = 999990;
    overlay.eventMode = "none";
    overlay.interactive = false;
    overlay.alpha = 1;
    canvas.stage.sortableChildren = true;
    canvas.stage.addChild(overlay);
    globalThis[VISIBILITY_DIMMER_KEY] = overlay;
    return overlay;
  }

  function drawTilePath(graphics, drawing) {
    const doc = drawing.document;
    const shape = doc.shape || {};
    const type = normalizeShapeType(shape.type);
    const x = Number(doc.x || 0);
    const y = Number(doc.y || 0);
    const width = Number(shape.width || 0);
    const height = Number(shape.height || 0);

    if (type === "rectangle") graphics.drawRect(x, y, width, height);
    else if (type === "ellipse") graphics.drawEllipse(x + width / 2, y + height / 2, width / 2, height / 2);
    else {
      const points = normalizePoints(shape.points || doc.points || []);
      const flat = [];
      for (const point of points) flat.push(x + point.x, y + point.y);
      if (flat.length >= 6) graphics.drawPolygon(flat);
    }
  }

  function redrawVisibilityDimmer(revealedEntries = []) {
    const overlay = getOrCreateVisionDimmer();
    overlay.clear();

    if (!isOverviewScene() || game.user.isGM) {
      overlay.visible = false;
      return;
    }

    const rect = getSceneRect();
    overlay.visible = true;
    overlay.beginFill(0x000000, 0.48);
    overlay.drawRect(rect.x, rect.y, rect.width, rect.height);

    if (revealedEntries.length && typeof overlay.beginHole === "function") {
      overlay.beginHole();
      for (const entry of revealedEntries) drawTilePath(overlay, entry.drawing);
      overlay.endHole();
    }

    overlay.endFill();
  }

  function removeVisibilityDimmer() {
    const overlay = globalThis[VISIBILITY_DIMMER_KEY];
    if (overlay) {
      overlay.clear?.();
      overlay.parent?.removeChild?.(overlay);
      overlay.destroy?.();
    }
    globalThis[VISIBILITY_DIMMER_KEY] = null;
  }

  function findCurrentTileForToken(token) {
    return findTileAtPoint(getTokenCenter(token));
  }

  function getLinkedTiles(current) {
    const allTiles = getWorldTileEntries();
    const rawIds = Array.isArray(current.tile.adjacentTileIds) ? current.tile.adjacentTileIds : [];
    const rawNames = Array.isArray(current.tile.adjacentTileNames) ? current.tile.adjacentTileNames : [];
    const idSet = new Set(rawIds.map(String));
    const nameSet = new Set(rawNames.map(normalize));
    return allTiles.filter(entry => idSet.has(String(entry.tile.id)) || idSet.has(String(entry.drawing.document.id)) || nameSet.has(normalize(entry.tile.name)));
  }

  function getRevealEntriesForTileEntry(entry) {
    if (!entry?.tile) return [];
    return [entry, ...getLinkedTiles(entry)];
  }

  function isTileOwnedByUser(worldTile, house = null, user = game.user) {
    if (!user || user.isGM) return true;
    const ownerUserId = getTileOwnerUserId(worldTile, house);
    if (ownerUserId) return String(ownerUserId) === String(user.id);
    const ownerUserName = getTileOwnerUserName(worldTile, house);
    if (ownerUserName) return normalize(ownerUserName) === normalize(user.name);
    return false;
  }

  function getOwnedTileRevealEntriesForUser(user = game.user) {
    if (!user || user.isGM) return [];
    const entries = [];
    for (const entry of getWorldTileEntries()) {
      const house = getHouseData(entry.drawing) || {};
      if (!isTileOwnedByUser(entry.tile, house, user)) continue;
      entries.push(...getRevealEntriesForTileEntry(entry));
    }
    return entries;
  }

  function isWorldPieceRevealed(token) {
    const manager = globalThis[VISIBILITY_KEY];
    if (!manager || !getWorldPiece(token) || !manager.revealedEntries?.length) return false;
    const point = getTokenCenter(token);
    return manager.revealedEntries.some(entry => pointInsideDrawing(point, entry.drawing));
  }

  function clearReveal() {
    const manager = globalThis[VISIBILITY_KEY];
    if (!manager) return;
    manager.revealedEntries = [];
    manager.graphics?.clear();
    if (manager.graphics) manager.graphics.visible = false;
    redrawVisibilityDimmer([]);
    canvas.visibility?.refreshVisibility?.();
    refreshTokenVisibility();
  }

  function drawTileIntoVision(graphics, drawing) {
    const doc = drawing.document;
    const shape = doc.shape || {};
    const type = normalizeShapeType(shape.type);
    const x = Number(doc.x || 0);
    const y = Number(doc.y || 0);
    const width = Number(shape.width || 0);
    const height = Number(shape.height || 0);
    graphics.beginFill(0xffffff, 1);
    if (type === "rectangle") graphics.drawRect(x, y, width, height);
    else if (type === "ellipse") graphics.drawEllipse(x + width / 2, y + height / 2, width / 2, height / 2);
    else {
      const points = normalizePoints(shape.points || doc.points || []);
      const flat = [];
      for (const point of points) flat.push(x + point.x, y + point.y);
      if (flat.length >= 6) graphics.drawPolygon(flat);
    }
    graphics.endFill();
  }

  function getRevealEntriesForToken(token) {
    if (!token || !getWorldPiece(token)) return [];
    const current = findCurrentTileForToken(token) || getTileById(getWorldPiece(token)?.currentTileId);
    if (!current) return [];
    return [current, ...getLinkedTiles(current)];
  }

  function getControlledRevealSourceTokens() {
    const selectedWorldPieces = canvas.tokens.controlled.filter(token => Boolean(getWorldPiece(token)));
    if (selectedWorldPieces.length === 1) return selectedWorldPieces;

    if (game.user.isGM) return [];

    return canvas.tokens.placeables.filter(token => {
      const piece = getWorldPiece(token);
      return Boolean(piece) && canUserControlWorldPiece(token, piece);
    });
  }

  function revealForTokens(tokens) {
    const manager = globalThis[VISIBILITY_KEY];
    if (!manager) return;

    const byTileId = new Map();
    for (const entry of getOwnedTileRevealEntriesForUser(game.user)) {
      const id = String(getTileId(entry) || entry.tile?.id || entry.drawing?.document?.id || "");
      if (id && !byTileId.has(id)) byTileId.set(id, entry);
    }
    for (const token of tokens || []) {
      for (const entry of getRevealEntriesForToken(token)) {
        const id = String(getTileId(entry) || entry.tile?.id || entry.drawing?.document?.id || "");
        if (id && !byTileId.has(id)) byTileId.set(id, entry);
      }
    }

    manager.revealedEntries = [...byTileId.values()];
    manager.graphics.clear();

    if (!manager.revealedEntries.length) {
      manager.graphics.visible = false;
      redrawVisibilityDimmer([]);
      canvas.visibility?.refreshVisibility?.();
      refreshTokenVisibility();
      return;
    }

    manager.graphics.visible = true;
    for (const entry of manager.revealedEntries) drawTileIntoVision(manager.graphics, entry.drawing);
    redrawVisibilityDimmer(manager.revealedEntries);
    canvas.visibility?.refreshVisibility?.();
    refreshTokenVisibility();
  }

  function revealForCurrentPlayerPieces() {
    revealForTokens(getControlledRevealSourceTokens());
  }

  function revealForToken(token) {
    if (!token || !getWorldPiece(token)) { revealForCurrentPlayerPieces(); return; }
    revealForTokens([token]);
  }

  function startVisibility() {
    if (globalThis[VISIBILITY_KEY]) return;
    const TokenClass = foundry?.canvas?.placeables?.Token || CONFIG?.Token?.objectClass || globalThis.Token;
    if (!TokenClass) { console.warn("Crown Overview Tools: could not locate Token class."); return; }
    const originalIsVisibleDescriptor = Object.getOwnPropertyDescriptor(TokenClass.prototype, "isVisible");
    if (!originalIsVisibleDescriptor?.get) { console.warn("Crown Overview Tools: could not patch Token.isVisible."); return; }
    const visionContainer = getVisionContainer();
    if (!visionContainer) { console.warn("Crown Overview Tools: could not locate vision container."); return; }
    const graphics = new PIXI.Graphics();
    graphics.name = VISIBILITY_KEY;
    graphics.eventMode = "none";
    graphics.interactive = false;
    visionContainer.addChild(graphics);

    const originalIsVisibleGetter = originalIsVisibleDescriptor.get;
    const controlHook = Hooks.on("controlToken", (token, controlled) => {
      if (!isOverviewScene()) return;
      if (canvas.tokens.controlled.length === 1 && getWorldPiece(canvas.tokens.controlled[0])) revealForToken(canvas.tokens.controlled[0]);
      else revealForCurrentPlayerPieces();
    });
    const updateHook = Hooks.on("updateToken", (document, changes) => {
      if (!isOverviewScene()) return;
      if (changes.x === undefined && changes.y === undefined) return;
      if (canvas.tokens.controlled.length === 1 && getWorldPiece(canvas.tokens.controlled[0])) revealForToken(canvas.tokens.controlled[0]);
      else revealForCurrentPlayerPieces();
    });

    globalThis[VISIBILITY_KEY] = { TokenClass, originalIsVisibleDescriptor, graphics, visionContainer, revealedEntries: [], controlHook, updateHook };

    Object.defineProperty(TokenClass.prototype, "isVisible", {
      configurable: true,
      get: function () {
        const manager = globalThis[VISIBILITY_KEY];
        if (manager && isOverviewScene() && !game.user.isGM && getWorldPiece(this)) {
          return isWorldPieceRevealed(this);
        }
        if (manager && isOverviewScene() && isWorldPieceRevealed(this)) return true;
        return originalIsVisibleGetter.call(this);
      }
    });

    if (canvas.tokens.controlled.length === 1 && getWorldPiece(canvas.tokens.controlled[0])) revealForToken(canvas.tokens.controlled[0]);
    else revealForCurrentPlayerPieces();
  }

  function stopVisibility() {
    const manager = globalThis[VISIBILITY_KEY];
    if (!manager) return;
    if (manager.TokenClass && manager.originalIsVisibleDescriptor) {
      Object.defineProperty(manager.TokenClass.prototype, "isVisible", manager.originalIsVisibleDescriptor);
    }
    if (manager.controlHook) Hooks.off("controlToken", manager.controlHook);
    if (manager.updateHook) Hooks.off("updateToken", manager.updateHook);
    manager.graphics?.parent?.removeChild(manager.graphics);
    manager.graphics?.destroy();
    globalThis[VISIBILITY_KEY] = null;
    removeVisibilityDimmer();
    canvas.visibility?.refreshVisibility?.();
    refreshTokenVisibility();
  }

  async function getOrCreateWorldMapFolder() {
    let folder = game.folders.find(folder => folder.type === "Actor" && folder.name === WORLD_MAP_FOLDER_NAME);
    if (folder) return folder;
    return await Folder.create({ name: WORLD_MAP_FOLDER_NAME, type: "Actor", sorting: "a" });
  }

  function getSafeActorType() {
    let availableTypes = [];
    if (Array.isArray(game.system?.documentTypes?.Actor)) availableTypes = game.system.documentTypes.Actor;
    if (!availableTypes.length && CONFIG?.Actor?.typeLabels) availableTypes = Object.keys(CONFIG.Actor.typeLabels);
    if (availableTypes.includes("character")) return "character";
    if (availableTypes.includes("npc")) return "npc";
    return availableTypes[0] || "character";
  }

  async function saveWorldPiece(token, piece) {
    await token.document.setFlag(FLAG_SCOPE, WORLD_PIECE_KEY, piece);
    if (token.actor) {
      try { await token.actor.setFlag(FLAG_SCOPE, WORLD_PIECE_KEY, foundry.utils.deepClone(piece)); }
      catch (error) { console.warn("Could not update Actor worldPiece flag:", error); }
    }
  }

  function canUserControlWorldPiece(token, piece = getWorldPiece(token)) {
    if (game.user.isGM) return true;
    if (!token || !piece) return false;
    if (token.isOwner) return true;
    if (piece.ownerUserId && String(piece.ownerUserId) === String(game.user.id)) return true;
    if (piece.ownerUserName && normalize(piece.ownerUserName) === normalize(game.user.name)) return true;
    return false;
  }
  function canUserControlWorldPieceForUser(token, piece = getWorldPiece(token), user = game.user) {
    if (!user || !token || !piece) return false;
    if (user.isGM) return true;
    if (piece.ownerUserId && String(piece.ownerUserId) === String(user.id)) return true;
    if (piece.ownerUserName && normalize(piece.ownerUserName) === normalize(user.name)) return true;

    const actorOwnership = token.actor?.ownership || {};
    const level = Number(actorOwnership[user.id] ?? actorOwnership.default ?? 0);
    return level >= CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
  }


  function getTileOwnerUserId(worldTile, house = null) {
    return String(
      house?.ownerUserId ||
      house?.playerOwnerUserId ||
      worldTile?.ownerUserId ||
      worldTile?.playerOwnerUserId ||
      ""
    ).trim();
  }

  function getTileOwnerUserName(worldTile, house = null) {
    return String(
      house?.ownerUserName ||
      house?.playerOwnerUserName ||
      worldTile?.ownerUserName ||
      worldTile?.playerOwnerUserName ||
      ""
    ).trim();
  }

  function canUserBuildOnTile(worldTile, house = null) {
    if (game.user.isGM) return true;

    const ownerUserId = getTileOwnerUserId(worldTile, house);
    if (ownerUserId) return String(ownerUserId) === String(game.user.id);

    const ownerUserName = getTileOwnerUserName(worldTile, house);
    if (ownerUserName) return normalize(ownerUserName) === normalize(game.user.name);

    return false;
  }

  function getBuildBlockedReason(worldTile, house = null) {
    const ownerName = getTileOwnerUserName(worldTile, house);
    if (ownerName) return `${worldTile?.name || "This tile"} is assigned to ${ownerName}. You are ${game.user.name}.`;
    return `${worldTile?.name || "This tile"} is not assigned to any player yet. Ask the GM to use Assign Tile Owner.`;
  }

  function getPlayerUsers() {
    return game.users.contents
      .filter(user => !user.isGM)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  function getOccupantsForTile(tile, movingToken = null) {
    if (!tile) return [];
    const tileId = String(tile.id || "");
    const occupants = [];

    for (const other of canvas.tokens.placeables) {
      if (movingToken && other.document.id === movingToken.document.id) continue;
      const otherPiece = getWorldPiece(other);
      if (!otherPiece) continue;

      let inTile = false;
      if (otherPiece.currentTileId && String(otherPiece.currentTileId) === tileId) inTile = true;
      if (!inTile) {
        const entry = findTileAtPoint(getTokenCenter(other));
        if (entry?.tile?.id && String(entry.tile.id) === tileId) inTile = true;
      }

      if (inTile) occupants.push(other);
    }

    return occupants.sort((a, b) => String(a.document.id).localeCompare(String(b.document.id)));
  }

  function getSlotOffset(index, gridSize) {
    if (index <= 0) return { x: 0, y: 0 };

    const radius = gridSize * 0.42 * Math.ceil(index / 8);
    const angle = ((index - 1) % 8) * (Math.PI / 4);

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  }

  function getTokenTopLeftForTileSlot(token, entry) {
    const center = getDrawingCenter(entry);
    const gridSize = getGridSize();
    const occupants = getOccupantsForTile(entry.tile, token);
    const slotIndex = occupants.length;
    const offset = getSlotOffset(slotIndex, gridSize);

    return getTokenTopLeftForPoint(token, {
      x: center.x + offset.x,
      y: center.y + offset.y
    });
  }

  function getRouteComparisons(startTile, destinationTile, piece) {
    const landPath = findPath(startTile, destinationTile, piece, "land");
    const seaPath = findPath(startTile, destinationTile, piece, "sea");
    const defaultPath = findPath(startTile, destinationTile, piece, "default");
    const bestPath = findBestPath(startTile, destinationTile, piece);

    return { landPath, seaPath, defaultPath, bestPath };
  }

  function getPathForMode(startTile, destinationTile, piece, routeMode) {
    if (routeMode === "best") return findBestPath(startTile, destinationTile, piece);
    return findPath(startTile, destinationTile, piece, routeMode);
  }

  function routeSummaryLine(label, path, remaining, isBest = false) {
    if (!path) return `<li><strong>${escapeHtml(label)}:</strong> No route</li>`;
    const status = path.cost > remaining ? `Costs ${path.cost} / not enough movement` : `Costs ${path.cost}`;
    return `<li><strong>${escapeHtml(label)}${isBest ? " ★ Best" : ""}:</strong> ${escapeHtml(status)}<br><span style="opacity:0.85;">${path.tileNames.map(escapeHtml).join(" → ")}</span></li>`;
  }

  async function executeWorldPathMove(token, piece, startTile, destinationTile, path, pauseMs = 350, sourceLabel = "World Path Move") {
    if (!path) return null;

    let currentPiece = foundry.utils.deepClone(piece);
    let spentThisMove = 0;

    for (let i = 1; i < path.tileIds.length; i++) {
      const entry = getTileById(path.tileIds[i]);
      if (!entry) continue;

      const tile = entry.tile;
      if (!isTileAllowedForPiece(currentPiece, tile)) {
        ui.notifications.error(`Movement stopped: ${currentPiece.name || token.document.name} cannot enter ${tile.name}.`);
        return null;
      }

      const position = getTokenTopLeftForTileSlot(token, entry);
      const stepCost = getTileMovementCost(tile);

      currentPiece.previousTileId = currentPiece.currentTileId || path.tileIds[i - 1];
      currentPiece.previousTileName = currentPiece.currentTileName || path.tileNames[i - 1];
      currentPiece.currentTileId = tile.id;
      currentPiece.currentTileName = tile.name;
      currentPiece.movementUsed = Number(currentPiece.movementUsed || 0) + stepCost;
      currentPiece.lastMoveCost = stepCost;
      currentPiece.lastMovePath = path.tileNames.slice(0, i + 1);
      currentPiece.lastRouteMode = path.mode;
      currentPiece.lastMovedAt = new Date().toISOString();
      currentPiece.lastMovedBy = game.user.name;
      currentPiece.lastMovedSource = `Crown Overview Tools ${MODULE_VERSION} - ${sourceLabel}`;

      spentThisMove += stepCost;

      await saveWorldPiece(token, currentPiece);
      await token.document.update({ x: position.x, y: position.y }, { animate: true, worldMovementBypass: true, bypassWorldMovementWatcher: true, clickMoveBypass: true });
      await moveLinkedArmyToCharacter(token, currentPiece, entry);
      await moveLinkedCharacterWithFleet(token, currentPiece, entry);
      await moveEmbarkedArmiesWithFleet(token, currentPiece, entry);

      if (pauseMs > 0) await new Promise(resolve => setTimeout(resolve, pauseMs));
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: sourceLabel }),
      content: `<h2>${escapeHtml(sourceLabel)}</h2><p><strong>Piece:</strong> ${escapeHtml(currentPiece.name || token.document.name)}</p><p><strong>Type:</strong> ${escapeHtml(currentPiece.pieceType || "Unknown")}</p><p><strong>Route Mode:</strong> ${escapeHtml(routeModeLabel(path.mode))}</p><p><strong>From:</strong> ${escapeHtml(startTile.name)}</p><p><strong>To:</strong> ${escapeHtml(destinationTile.name)}</p><p><strong>Path:</strong> ${path.tileNames.map(escapeHtml).join(" → ")}</p><p><strong>Movement spent:</strong> ${escapeHtml(spentThisMove)}</p><p><strong>Total movement used:</strong> ${escapeHtml(currentPiece.movementUsed)} / ${escapeHtml(currentPiece.movementMax || 0)}</p>`
    });

    return { piece: currentPiece, spentThisMove };
  }


  function getActorOwnerNames(actor) {
    if (!actor) return [];
    const ownership = actor.ownership || {};
    const ownerLevel = CONST.DOCUMENT_OWNERSHIP_LEVELS?.OWNER ?? 3;
    return getPlayerUsers()
      .filter(user => Number(ownership[user.id] || 0) >= ownerLevel)
      .map(user => user.name);
  }

  function getWorldPieceOwnerName(token, piece = getWorldPiece(token)) {
    if (piece?.ownerUserName) return String(piece.ownerUserName);
    if (piece?.playerOwnerUserName) return String(piece.playerOwnerUserName);
    if (piece?.ownerUserId && game.users.get(piece.ownerUserId)) return game.users.get(piece.ownerUserId).name;
    if (piece?.playerOwnerUserId && game.users.get(piece.playerOwnerUserId)) return game.users.get(piece.playerOwnerUserId).name;
    const actorOwners = getActorOwnerNames(token?.actor);
    return actorOwners.length ? actorOwners.join(", ") : "Unassigned";
  }

  function pointInsideToken(point, token) {
    if (!point || !token) return false;
    const gridSize = getGridSize();
    const x = Number(token.document.x || 0);
    const y = Number(token.document.y || 0);
    const width = Number(token.document.width || 1) * gridSize;
    const height = Number(token.document.height || 1) * gridSize;
    return point.x >= x && point.y >= y && point.x <= x + width && point.y <= y + height;
  }

  function findWorldPieceAtPoint(point) {
    const candidates = canvas.tokens.placeables
      .filter(token => Boolean(getWorldPiece(token)))
      .filter(token => token.visible !== false)
      .filter(token => pointInsideToken(point, token))
      .sort((a, b) => {
        const as = Number(a.document.sort || 0);
        const bs = Number(b.document.sort || 0);
        if (bs !== as) return bs - as;
        return String(b.document.id || "").localeCompare(String(a.document.id || ""));
      });
    return candidates[0] || null;
  }

  function getOrCreatePieceTooltip() {
    let el = document.getElementById(PIECE_TOOLTIP_ID);
    if (el) return el;

    el = document.createElement("div");
    el.id = PIECE_TOOLTIP_ID;
    el.style.position = "fixed";
    el.style.left = "16px";
    el.style.bottom = "560px";
    el.style.width = "420px";
    el.style.maxHeight = "220px";
    el.style.overflowY = "auto";
    el.style.zIndex = "100001";
    el.style.padding = "10px 12px";
    el.style.border = "1px solid rgba(180,145,90,0.85)";
    el.style.borderRadius = "8px";
    el.style.background = "rgba(20,20,20,0.94)";
    el.style.color = "#f0f0f0";
    el.style.fontSize = "13px";
    el.style.lineHeight = "1.4";
    el.style.pointerEvents = "none";
    el.style.boxShadow = "0 4px 18px rgba(0,0,0,0.45)";
    el.style.display = "none";
    document.body.appendChild(el);
    return el;
  }

  function hidePieceTooltip() {
    const el = document.getElementById(PIECE_TOOLTIP_ID);
    if (el) el.style.display = "none";
  }

  function renderPieceTooltip(token) {
    const piece = getWorldPiece(token);
    if (!piece) { hidePieceTooltip(); return; }

    const currentEntry = findTileAtPoint(getTokenCenter(token)) || getTileById(piece.currentTileId);
    const currentTileName = currentEntry?.tile?.name || piece.currentTileName || "Unknown";
    const ownerName = getWorldPieceOwnerName(token, piece);
    const canSeeDetails = game.user.isGM || canUserControlWorldPiece(token, piece);
    const movementUsed = Number(piece.movementUsed || 0);
    const movementMax = Number(piece.movementMax || 0);
    const movementRemaining = Math.max(0, movementMax - movementUsed);

    let detailsHtml = `
      <strong>Type:</strong> ${escapeHtml(piece.pieceType || "Unknown")}<br>
      <strong>Player Owner:</strong> ${escapeHtml(ownerName)}<br>
      <strong>Current Tile:</strong> ${escapeHtml(currentTileName)}<br>
    `;

    if (canSeeDetails) {
      detailsHtml += `
        <strong>Faction:</strong> ${escapeHtml(piece.faction || "None")}<br>
        <strong>Movement:</strong> ${escapeHtml(movementUsed)} / ${escapeHtml(movementMax)} used — ${escapeHtml(movementRemaining)} remaining<br>
      `;
      const statecraft = getPieceStatecraft(piece);
      if (statecraft !== null) detailsHtml += `<strong>Statecraft:</strong> ${escapeHtml(statecraft)}<br>`;
      if (piece.pieceType === "army" && (piece.strengthCurrent !== undefined || piece.strengthMax !== undefined)) {
        detailsHtml += `<strong>Strength:</strong> ${escapeHtml(piece.strengthCurrent ?? "?")} / ${escapeHtml(piece.strengthMax ?? "?")}<br>`;
        const armyUpkeep = piece.upkeep ? resourceMapToText(piece.upkeep) : resourceMapToText(calculateArmyUpkeep(getArmyComposition(piece)));
        if (armyUpkeep && armyUpkeep !== "None") detailsHtml += `<strong>Upkeep:</strong> ${escapeHtml(armyUpkeep)}<br>`;
      }
      if (piece.pieceType === "fleet") {
        const shipsCurrent = piece.shipsCurrent ?? piece.shipsMax ?? piece.totalShips ?? 0;
        const shipsMax = piece.shipsMax ?? piece.totalShips ?? shipsCurrent;
        detailsHtml += `<strong>Ships:</strong> ${escapeHtml(shipsCurrent)} / ${escapeHtml(shipsMax)}<br>`;
        const navyText = navyCompositionText(getNavyComposition(piece));
        if (navyText && navyText !== "None") detailsHtml += `<strong>Composition:</strong> ${escapeHtml(navyText)}<br>`;
        const navyUpkeep = piece.upkeep ? resourceMapToText(piece.upkeep) : resourceMapToText(calculateNavyUpkeep(getNavyComposition(piece)));
        if (navyUpkeep && navyUpkeep !== "None") detailsHtml += `<strong>Upkeep:</strong> ${escapeHtml(navyUpkeep)}<br>`;
        if (piece.linkedCharacterName) detailsHtml += `<strong>Carrying:</strong> ${escapeHtml(piece.linkedCharacterName)}<br>`;
      }
      if (piece.pieceType === "character" && piece.wounds !== undefined) {
        detailsHtml += `<strong>Wounds:</strong> ${escapeHtml(piece.wounds)}<br>`;
      }
    } else {
      detailsHtml += `<span style="opacity:0.78;">Detailed piece stats are hidden because you do not control this piece.</span>`;
    }

    const el = getOrCreatePieceTooltip();
    el.innerHTML = `
      <div>
        <strong style="font-size:17px;">${escapeHtml(piece.name || token.document.name || "World Piece")}</strong>
        <div style="margin-top:6px;">
          ${detailsHtml}
        </div>
      </div>
    `;
    el.style.display = "block";
    positionPieceTooltipAboveTileTooltip(el);
  }

  function positionPieceTooltipAboveTileTooltip(el) {
    if (!el) return;
    const margin = 12;
    const hover = document.getElementById(HOVER_TOOLTIP_ID);

    if (hover && hover.style.display !== "none") {
      const hoverRect = hover.getBoundingClientRect();
      const ownRect = el.getBoundingClientRect();
      const preferredBottom = Math.max(320, window.innerHeight - hoverRect.top + 28);
      const maxBottom = Math.max(104, window.innerHeight - ownRect.height - margin);
      el.style.left = `${Math.max(margin, hoverRect.left)}px`;
      el.style.bottom = `${Math.min(preferredBottom, maxBottom)}px`;
      el.style.top = "auto";
      return;
    }

    el.style.left = "16px";
    el.style.bottom = "560px";
    el.style.top = "auto";
  }

  function updatePieceTooltip() {
    if (!isOverviewScene() || !canvas?.ready) return;
    const mousePoint = getMouseWorldPoint();
    if (!mousePoint) { hidePieceTooltip(); return; }
    const token = findWorldPieceAtPoint(mousePoint);
    const manager = globalThis[PIECE_TOOLTIP_KEY];
    if (!manager) return;
    const currentId = token?.document?.id || null;
    if (manager.lastTokenId === currentId) return;
    manager.lastTokenId = currentId;
    if (!token) hidePieceTooltip();
    else renderPieceTooltip(token);
  }

  function startPieceTooltip() {
    stopPieceTooltip(false);
    globalThis[PIECE_TOOLTIP_KEY] = {
      version: MODULE_VERSION,
      interval: setInterval(updatePieceTooltip, 120),
      lastTokenId: null,
      startedAt: new Date().toISOString()
    };
    updatePieceTooltip();
    ui.notifications.info("World piece hover tooltip enabled.");
    renderPanel();
  }

  function stopPieceTooltip(notify = true) {
    const manager = globalThis[PIECE_TOOLTIP_KEY];
    if (manager?.interval) clearInterval(manager.interval);
    document.getElementById(PIECE_TOOLTIP_ID)?.remove();
    globalThis[PIECE_TOOLTIP_KEY] = null;
    if (notify) ui.notifications.info("World piece hover tooltip disabled.");
    renderPanel();
  }

  async function togglePieceTooltip() {
    if (!requireOverviewScene()) return;
    if (globalThis[PIECE_TOOLTIP_KEY]) stopPieceTooltip(true);
    else startPieceTooltip();
  }

  async function applyWorldPieceOwner(token, piece, ownerUser, clearOtherPlayers = true) {
    const updatedPiece = foundry.utils.deepClone(piece || getWorldPiece(token) || {});

    if (ownerUser) {
      updatedPiece.ownerUserId = ownerUser.id;
      updatedPiece.ownerUserName = ownerUser.name;
      updatedPiece.playerOwnerUserId = ownerUser.id;
      updatedPiece.playerOwnerUserName = ownerUser.name;
    } else {
      delete updatedPiece.ownerUserId;
      delete updatedPiece.ownerUserName;
      delete updatedPiece.playerOwnerUserId;
      delete updatedPiece.playerOwnerUserName;
    }

    updatedPiece.ownerAssignedAt = new Date().toISOString();
    updatedPiece.ownerAssignedBy = game.user.name;
    updatedPiece.ownerAssignedSource = `Crown Overview Tools ${MODULE_VERSION}`;

    await saveWorldPiece(token, updatedPiece);

    if (token.actor) {
      const ownership = foundry.utils.deepClone(token.actor.ownership || {});
      if (clearOtherPlayers) {
        for (const user of getPlayerUsers()) {
          ownership[user.id] = CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE;
        }
      }
      if (ownerUser) ownership[ownerUser.id] = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
      await token.actor.update({ ownership });
    }

    return updatedPiece;
  }


  function numberOrBlank(value) {
    if (value === null || value === undefined || String(value).trim() === "") return "";
    const number = Number(String(value).replaceAll(",", "").trim());
    return Number.isFinite(number) ? number : "";
  }

  function getWorldCharacter(token) {
    return token?.document?.getFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY) || token?.actor?.getFlag?.(FLAG_SCOPE, WORLD_CHARACTER_KEY) || null;
  }

  function isCharacterToken(token) {
    const piece = getWorldPiece(token);
    if (normalize(piece?.pieceType) === "character") return true;
    return Boolean(getWorldCharacter(token));
  }

  function getCharacterTokens() {
    return canvas.tokens.placeables.filter(token => isCharacterToken(token));
  }

  function getCharacterStats(piece = {}, character = {}) {
    const sourceStats = { ...(character.stats || {}), ...(piece.stats || {}) };
    for (const key of CHARACTER_STAT_KEYS) {
      if (piece[key] !== undefined && piece[key] !== "") sourceStats[key] = piece[key];
      if (character[key] !== undefined && character[key] !== "") sourceStats[key] = character[key];
    }
    const stats = {};
    for (const key of CHARACTER_STAT_KEYS) stats[key] = numberOrBlank(sourceStats[key]);
    return stats;
  }

  function getCharacterSecondaryStats(piece = {}, character = {}) {
    const sourceStats = { ...(character.secondaryStats || {}), ...(piece.secondaryStats || {}) };
    const aliases = {
      marriageDiplomacy: [character.marriageDiplomacy, piece.marriageDiplomacy],
      navalMovement: [character.navalMovement, piece.navalMovement],
      landMovement: [character.landMovement, piece.landMovement, piece.movementMax],
      wounds: [character.wounds, piece.wounds],
      fertility: [character.fertility, piece.fertility],
      commandPoints: [character.commandPoints, piece.commandPoints],
      favouredWeaponBonus: [character.favouredWeaponBonus, piece.favouredWeaponBonus]
    };
    const stats = {};
    for (const key of CHARACTER_SECONDARY_STAT_KEYS) {
      let value = sourceStats[key];
      for (const alias of aliases[key] || []) {
        if ((value === undefined || value === "") && alias !== undefined && alias !== "") value = alias;
      }
      stats[key] = numberOrBlank(value);
    }
    return stats;
  }

  function getCharacterDataFromToken(token) {
    const piece = getWorldPiece(token) || {};
    const stored = getWorldCharacter(token) || piece.characterData || {};
    const entry = getCurrentTileEntryForToken(token, piece);
    const stats = getCharacterStats(piece, stored);
    const secondaryStats = getCharacterSecondaryStats(piece, stored);
    const ownerUserId = stored.playerUserId || stored.ownerUserId || piece.playerOwnerUserId || piece.ownerUserId || "";
    const ownerUser = ownerUserId ? game.users.get(ownerUserId) : null;
    return {
      characterId: stored.characterId || piece.characterId || token.document.id,
      playerName: stored.playerName || piece.playerOwnerUserName || piece.ownerUserName || ownerUser?.name || "",
      playerUserId: ownerUserId,
      ownerType: stored.ownerType || piece.ownerType || (ownerUserId ? "Player" : "NPC"),
      characterSlot: stored.characterSlot || piece.characterSlot || "",
      characterRole: stored.characterRole || piece.characterRole || "",
      characterName: stored.characterName || piece.characterName || piece.name || token.document.name,
      house: stored.house || piece.house || piece.faction || "",
      age: stored.age || piece.age || "",
      heightWeight: stored.heightWeight || piece.heightWeight || "",
      preferredWeapons: stored.preferredWeapons || piece.preferredWeapons || "",
      marriage: stored.marriage || piece.marriage || "",
      issueChildren: stored.issueChildren || piece.issueChildren || "",
      currentTileName: stored.currentTileName || piece.currentTileName || entry?.tile?.name || "",
      currentTileId: stored.currentTileId || piece.currentTileId || entry?.tile?.id || "",
      currentRegion: stored.currentRegion || piece.currentRegion || entry?.tile?.region || "",
      tokenName: token.document.name || stored.tokenName || piece.name || "",
      tokenImage: token.document.texture?.src || stored.tokenImage || token.actor?.img || "",
      status: stored.status || piece.status || "Alive",
      visibility: stored.visibility || piece.visibility || (ownerUserId ? "Owner+GM" : "GM Only"),
      statecraft: stats.statecraft,
      intrigue: stats.intrigue,
      lore: stats.lore,
      prowess: stats.prowess,
      martial: stats.martial,
      diplomacy: stats.diplomacy,
      marriageDiplomacy: secondaryStats.marriageDiplomacy,
      navalMovement: secondaryStats.navalMovement,
      landMovement: secondaryStats.landMovement,
      wounds: secondaryStats.wounds,
      fertility: secondaryStats.fertility,
      commandPoints: secondaryStats.commandPoints,
      favouredWeaponBonus: secondaryStats.favouredWeaponBonus,
      traits: stored.traits || piece.traits || "",
      quirks: stored.quirks || piece.quirks || "",
      publicNotes: stored.publicNotes || piece.publicNotes || "",
      gmNotes: stored.gmNotes || piece.gmNotes || ""
    };
  }

  function buildAllTileOptions(selectedTileId = "") {
    const entries = getWorldTileEntries().sort((a, b) => String(a.tile.region || "").localeCompare(String(b.tile.region || "")) || getTileName(a).localeCompare(getTileName(b)));
    return entries.map(entry => {
      const id = getTileId(entry);
      const label = `${getTileName(entry)}${entry.tile.region ? " — " + entry.tile.region : ""}`;
      return `<option value="${escapeHtml(id)}" ${String(id) === String(selectedTileId) ? "selected" : ""}>${escapeHtml(label)}</option>`;
    }).join("");
  }

  function getTileEntryByNameOrId(value) {
    const text = String(value || "").trim();
    if (!text) return null;
    return getTileById(text) || getWorldTileEntries().find(entry => normalize(getTileName(entry)) === normalize(text) || normalize(entry.tile?.name) === normalize(text)) || null;
  }

  function characterCsvValue(row, headers, ...names) {
    const normalizedHeaders = headers.map(header => normalize(String(header).replace(/[_/]+/g, " ")));
    for (const name of names) {
      const target = normalize(String(name).replace(/[_/]+/g, " "));
      let index = normalizedHeaders.indexOf(target);
      if (index !== -1) return row[index] ?? "";
      index = headers.indexOf(name);
      if (index !== -1) return row[index] ?? "";
    }
    return "";
  }

  function getUserFromCharacterDetails(details = {}) {
    const id = String(details.playerUserId || details.ownerUserId || "").trim();
    if (id && game.users.get(id)) return game.users.get(id);
    const name = normalize(details.playerName || details.ownerUserName || "");
    if (!name) return null;
    return game.users.contents.find(user => normalize(user.name) === name) || null;
  }

  function normalizeCharacterDetails(raw = {}, fallback = {}) {
    const details = { ...fallback, ...raw };
    const stats = {};
    const secondaryStats = {};
    for (const key of CHARACTER_STAT_KEYS) stats[key] = numberOrBlank(details[key]);
    for (const key of CHARACTER_SECONDARY_STAT_KEYS) secondaryStats[key] = numberOrBlank(details[key]);
    const characterName = String(details.characterName || details.name || details.tokenName || "").trim();
    return {
      characterId: String(details.characterId || fallback.characterId || characterName || foundry.utils.randomID()).trim(),
      playerName: String(details.playerName || "").trim(),
      playerUserId: String(details.playerUserId || "").trim(),
      ownerType: String(details.ownerType || (details.playerUserId ? "Player" : "NPC")).trim() || "NPC",
      characterSlot: String(details.characterSlot || "").trim(),
      characterRole: String(details.characterRole || "").trim(),
      characterName,
      house: String(details.house || "").trim(),
      culture: String(details.culture || "").trim(),
      religion: String(details.religion || "").trim(),
      age: String(details.age || "").trim(),
      heightWeight: String(details.heightWeight || "").trim(),
      preferredWeapons: String(details.preferredWeapons || "").trim(),
      marriage: String(details.marriage || "").trim(),
      issueChildren: String(details.issueChildren || "").trim(),
      currentTileName: String(details.currentTileName || "").trim(),
      currentTileId: String(details.currentTileId || "").trim(),
      currentRegion: String(details.currentRegion || "").trim(),
      tokenName: String(details.tokenName || characterName || "").trim(),
      tokenImage: String(details.tokenImage || "").trim(),
      status: String(details.status || "Alive").trim() || "Alive",
      visibility: String(details.visibility || (details.playerUserId ? "Owner+GM" : "GM Only")).trim(),
      stats,
      secondaryStats,
      statecraft: stats.statecraft,
      intrigue: stats.intrigue,
      lore: stats.lore,
      prowess: stats.prowess,
      martial: stats.martial,
      diplomacy: stats.diplomacy,
      marriageDiplomacy: secondaryStats.marriageDiplomacy,
      navalMovement: secondaryStats.navalMovement,
      landMovement: secondaryStats.landMovement,
      wounds: secondaryStats.wounds,
      fertility: secondaryStats.fertility,
      commandPoints: secondaryStats.commandPoints,
      favouredWeaponBonus: secondaryStats.favouredWeaponBonus,
      traits: String(details.traits || "").trim(),
      quirks: String(details.quirks || "").trim(),
      publicNotes: String(details.publicNotes || "").trim(),
      gmNotes: String(details.gmNotes || "").trim()
    };
  }

  function buildCharacterForm(details = {}, selectedTileId = "") {
    const users = getPlayerUsers();
    const ownerUserId = details.playerUserId || details.ownerUserId || "";
    const ownerOptions = [`<option value="" ${!ownerUserId ? "selected" : ""}>NPC / Neutral / GM only</option>`, ...users.map(user => `<option value="${escapeHtml(user.id)}" ${String(user.id) === String(ownerUserId) ? "selected" : ""}>${escapeHtml(user.name)}</option>`)].join("");
    const ownerType = details.ownerType || (ownerUserId ? "Player" : "NPC");
    const visibility = details.visibility || (ownerUserId ? "Owner+GM" : "GM Only");
    return `<form>
      <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;">
        <strong>Character instructions:</strong><br>
        Choose a map tile for the character's location. The GM can see and edit all stats. Players only see full stats for their own characters.
      </div>
      <div class="form-group"><label>Character ID</label><input type="text" name="characterId" value="${escapeHtml(details.characterId || "")}" placeholder="Stable ID for CSV import/export" style="width:100%;" /></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div class="form-group"><label>Character Name</label><input type="text" name="characterName" value="${escapeHtml(details.characterName || "")}" style="width:100%;" /></div>
        <div class="form-group"><label>House</label><input type="text" name="house" value="${escapeHtml(details.house || "")}" style="width:100%;" /></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div class="form-group"><label>Culture</label><input type="text" name="culture" value="${escapeHtml(details.culture || "")}" placeholder="Andal, First Men, Ironborn..." style="width:100%;" /></div>
        <div class="form-group"><label>Religion</label><input type="text" name="religion" value="${escapeHtml(details.religion || "")}" placeholder="Faith of the Seven, Old Gods..." style="width:100%;" /></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div class="form-group"><label>Player Owner / Controller</label><select name="playerUserId" style="width:100%;">${ownerOptions}</select></div>
        <div class="form-group"><label>Owner Type</label><select name="ownerType" style="width:100%;"><option ${ownerType === "Player" ? "selected" : ""}>Player</option><option ${ownerType === "NPC" ? "selected" : ""}>NPC</option><option ${ownerType === "Neutral" ? "selected" : ""}>Neutral</option></select></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div class="form-group"><label>Character Slot</label><input type="number" name="characterSlot" value="${escapeHtml(details.characterSlot || "")}" min="1" step="1" style="width:100%;" /></div>
        <div class="form-group"><label>Role</label><input type="text" name="characterRole" value="${escapeHtml(details.characterRole || "")}" placeholder="Main, Heir, Advisor, NPC Defender..." style="width:100%;" /></div>
      </div>
      <div class="form-group"><label>Location / Tile</label><select name="currentTileId" style="width:100%;">${buildAllTileOptions(selectedTileId || details.currentTileId || "")}</select><p class="notes">Editing a character's location moves the token to this tile and updates its stored location.</p></div>
      <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;">
        <div class="form-group"><label>Status</label><input type="text" name="status" value="${escapeHtml(details.status || "Alive")}" style="width:100%;" /></div>
        <div class="form-group"><label>Visibility</label><select name="visibility" style="width:100%;"><option ${visibility === "Public" ? "selected" : ""}>Public</option><option ${visibility === "Owner+GM" ? "selected" : ""}>Owner+GM</option><option ${visibility === "GM Only" ? "selected" : ""}>GM Only</option></select></div>
        <div class="form-group"><label>Age</label><input type="text" name="age" value="${escapeHtml(details.age || "")}" style="width:100%;" /></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(6, 1fr);gap:8px;">
        ${CHARACTER_STAT_KEYS.map(key => `<div class="form-group"><label>${escapeHtml(titleCase(key))}</label><input type="number" name="${escapeHtml(key)}" value="${escapeHtml(details[key] ?? "")}" step="1" style="width:100%;" /></div>`).join("")}
      </div>
      <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:8px;">
        <div class="form-group"><label>Land Move</label><input type="number" name="landMovement" value="${escapeHtml(details.landMovement ?? details.movementMax ?? 3)}" step="1" style="width:100%;" /></div>
        <div class="form-group"><label>Naval Move</label><input type="number" name="navalMovement" value="${escapeHtml(details.navalMovement ?? 3)}" step="1" style="width:100%;" /></div>
        <div class="form-group"><label>Wounds</label><input type="number" name="wounds" value="${escapeHtml(details.wounds ?? 0)}" step="1" style="width:100%;" /></div>
        <div class="form-group"><label>Command Points</label><input type="number" name="commandPoints" value="${escapeHtml(details.commandPoints ?? "")}" step="0.1" style="width:100%;" /></div>
        <div class="form-group"><label>Marriage Dip.</label><input type="number" name="marriageDiplomacy" value="${escapeHtml(details.marriageDiplomacy ?? "")}" step="1" style="width:100%;" /></div>
        <div class="form-group"><label>Fertility</label><input type="number" name="fertility" value="${escapeHtml(details.fertility ?? "")}" step="1" style="width:100%;" /></div>
        <div class="form-group"><label>Weapon Bonus</label><input type="number" name="favouredWeaponBonus" value="${escapeHtml(details.favouredWeaponBonus ?? "")}" step="1" style="width:100%;" /></div>
        <div class="form-group"><label>Token Image</label><input type="text" name="tokenImage" value="${escapeHtml(details.tokenImage || "")}" style="width:100%;" /></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div class="form-group"><label>Height / Weight</label><input type="text" name="heightWeight" value="${escapeHtml(details.heightWeight || "")}" style="width:100%;" /></div>
        <div class="form-group"><label>Preferred Weapons</label><input type="text" name="preferredWeapons" value="${escapeHtml(details.preferredWeapons || "")}" style="width:100%;" /></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div class="form-group"><label>Marriage</label><input type="text" name="marriage" value="${escapeHtml(details.marriage || "")}" style="width:100%;" /></div>
        <div class="form-group"><label>Issue / Children</label><input type="text" name="issueChildren" value="${escapeHtml(details.issueChildren || "")}" style="width:100%;" /></div>
      </div>
      <div class="form-group"><label>Traits</label><textarea name="traits" style="width:100%;height:50px;">${escapeHtml(details.traits || "")}</textarea></div>
      <div class="form-group"><label>Quirks</label><textarea name="quirks" style="width:100%;height:50px;">${escapeHtml(details.quirks || "")}</textarea></div>
      <div class="form-group"><label>Public Notes</label><textarea name="publicNotes" style="width:100%;height:50px;">${escapeHtml(details.publicNotes || "")}</textarea></div>
      <div class="form-group"><label>GM Notes</label><textarea name="gmNotes" style="width:100%;height:60px;">${escapeHtml(details.gmNotes || "")}</textarea></div>
    </form>`;
  }

  function readCharacterForm(html, fallback = {}) {
    const form = html[0].querySelector("form");
    const get = name => form?.[name]?.value ?? "";
    const details = {
      characterId: get("characterId"),
      playerUserId: get("playerUserId"),
      ownerType: get("ownerType"),
      characterSlot: get("characterSlot"),
      characterRole: get("characterRole"),
      characterName: get("characterName"),
      house: get("house"),
      culture: get("culture"),
      religion: get("religion"),
      age: get("age"),
      heightWeight: get("heightWeight"),
      preferredWeapons: get("preferredWeapons"),
      marriage: get("marriage"),
      issueChildren: get("issueChildren"),
      currentTileId: get("currentTileId"),
      tokenImage: get("tokenImage"),
      status: get("status"),
      visibility: get("visibility"),
      traits: get("traits"),
      quirks: get("quirks"),
      publicNotes: get("publicNotes"),
      gmNotes: get("gmNotes")
    };
    for (const key of CHARACTER_STAT_KEYS) details[key] = get(key);
    for (const key of CHARACTER_SECONDARY_STAT_KEYS) details[key] = get(key);
    return normalizeCharacterDetails(details, fallback);
  }

  async function saveCharacterFlags(token, details, entry, ownerUser = null) {
    const normalized = normalizeCharacterDetails(details);
    const currentPiece = foundry.utils.deepClone(getWorldPiece(token) || {});
    const characterData = {
      ...normalized,
      playerUserId: ownerUser?.id || "",
      playerName: ownerUser?.name || normalized.playerName || "",
      ownerUserId: ownerUser?.id || "",
      ownerUserName: ownerUser?.name || "",
      currentTileId: entry ? getTileId(entry) : normalized.currentTileId,
      currentTileName: entry ? getTileName(entry) : normalized.currentTileName,
      currentRegion: entry?.tile?.region || normalized.currentRegion || "",
      updatedAt: new Date().toISOString(),
      updatedBy: game.user.name,
      updatedSource: `Crown Overview Tools ${MODULE_VERSION}`
    };

    const movementMax = numberOrBlank(characterData.landMovement) === "" ? Number(currentPiece.movementMax || 3) : Number(characterData.landMovement);
    const updatedPiece = {
      ...currentPiece,
      name: characterData.characterName || token.document.name,
      characterName: characterData.characterName || token.document.name,
      characterId: characterData.characterId,
      pieceType: "character",
      faction: characterData.house,
      house: characterData.house,
      culture: characterData.culture,
      religion: characterData.religion,
      ownerType: characterData.ownerType,
      characterSlot: characterData.characterSlot,
      characterRole: characterData.characterRole,
      status: characterData.status,
      visibility: characterData.visibility,
      stats: characterData.stats,
      secondaryStats: characterData.secondaryStats,
      statecraft: characterData.statecraft,
      diplomacy: characterData.diplomacy,
      martial: characterData.martial,
      intrigue: characterData.intrigue,
      lore: characterData.lore,
      prowess: characterData.prowess,
      wounds: characterData.wounds,
      landMovement: characterData.landMovement,
      navalMovement: characterData.navalMovement,
      movementMax,
      movementUsed: Math.min(Number(currentPiece.movementUsed || 0), movementMax),
      allowedTileTypes: getAllowedTileTypes("character"),
      currentTileId: characterData.currentTileId,
      currentTileName: characterData.currentTileName,
      currentRegion: characterData.currentRegion,
      ownerUserId: ownerUser?.id || "",
      ownerUserName: ownerUser?.name || "",
      playerOwnerUserId: ownerUser?.id || "",
      playerOwnerUserName: ownerUser?.name || "",
      characterData,
      version: `Crown Overview Tools ${MODULE_VERSION}`,
      updatedAt: new Date().toISOString(),
      updatedBy: game.user.name
    };

    await token.document.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, characterData);
    if (token.actor) await token.actor.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, foundry.utils.deepClone(characterData));
    await saveWorldPiece(token, updatedPiece);
    await applyWorldPieceOwner(token, updatedPiece, ownerUser, true);
    await token.document.update({ name: updatedPiece.name, ...(characterData.tokenImage ? { texture: { src: characterData.tokenImage } } : {}) }, { worldMovementBypass: true, bypassWorldMovementWatcher: true });
    if (token.actor) await token.actor.update({ name: updatedPiece.name, ...(characterData.tokenImage ? { img: characterData.tokenImage } : {}) });
    return { characterData, piece: updatedPiece };
  }

  async function spawnCharacterToken(details, entry, ownerUser = null) {
    if (!entry) throw new Error("No destination tile selected for the character.");
    const normalized = normalizeCharacterDetails(details);
    if (!normalized.characterName) throw new Error("Character name is required.");
    const image = normalized.tokenImage || DEFAULT_IMAGES.character;
    const folder = await getOrCreateWorldMapFolder();
    const actorType = getSafeActorType();
    const characterData = {
      ...normalized,
      playerUserId: ownerUser?.id || "",
      playerName: ownerUser?.name || normalized.playerName || "",
      ownerUserId: ownerUser?.id || "",
      ownerUserName: ownerUser?.name || "",
      currentTileId: getTileId(entry),
      currentTileName: getTileName(entry),
      currentRegion: entry.tile?.region || "",
      tokenImage: image,
      createdAt: new Date().toISOString(),
      createdBy: game.user.name,
      createdSource: `Crown Overview Tools ${MODULE_VERSION}`
    };
    const movementMax = numberOrBlank(characterData.landMovement) === "" ? 3 : Number(characterData.landMovement);
    const pieceData = {
      name: characterData.characterName,
      characterName: characterData.characterName,
      characterId: characterData.characterId,
      pieceType: "character",
      faction: characterData.house,
      house: characterData.house,
      culture: characterData.culture,
      religion: characterData.religion,
      ownerType: characterData.ownerType,
      characterSlot: characterData.characterSlot,
      characterRole: characterData.characterRole,
      status: characterData.status,
      visibility: characterData.visibility,
      stats: characterData.stats,
      secondaryStats: characterData.secondaryStats,
      statecraft: characterData.statecraft,
      diplomacy: characterData.diplomacy,
      martial: characterData.martial,
      intrigue: characterData.intrigue,
      lore: characterData.lore,
      prowess: characterData.prowess,
      wounds: characterData.wounds,
      landMovement: characterData.landMovement,
      navalMovement: characterData.navalMovement,
      movementMax,
      movementUsed: 0,
      allowedTileTypes: getAllowedTileTypes("character"),
      currentTileId: characterData.currentTileId,
      currentTileName: characterData.currentTileName,
      currentRegion: characterData.currentRegion,
      ownerUserId: ownerUser?.id || "",
      ownerUserName: ownerUser?.name || "",
      playerOwnerUserId: ownerUser?.id || "",
      playerOwnerUserName: ownerUser?.name || "",
      characterData,
      version: `Crown Overview Tools ${MODULE_VERSION}`,
      spawnedAt: new Date().toISOString(),
      spawnedBy: game.user.name
    };

    const actor = await Actor.create({
      name: characterData.characterName,
      type: actorType,
      folder: folder.id,
      img: image,
      flags: { [FLAG_SCOPE]: { [WORLD_PIECE_KEY]: foundry.utils.deepClone(pieceData), [WORLD_CHARACTER_KEY]: foundry.utils.deepClone(characterData) } },
      prototypeToken: {
        name: characterData.characterName,
        actorLink: true,
        width: 1,
        height: 1,
        disposition: ownerUser ? CONST.TOKEN_DISPOSITIONS.FRIENDLY : CONST.TOKEN_DISPOSITIONS.NEUTRAL,
        sight: { enabled: true },
        texture: { src: image },
        flags: { [FLAG_SCOPE]: { [WORLD_PIECE_KEY]: foundry.utils.deepClone(pieceData), [WORLD_CHARACTER_KEY]: foundry.utils.deepClone(characterData) } }
      }
    });

    if (ownerUser) {
      const ownership = foundry.utils.deepClone(actor.ownership || {});
      for (const user of getPlayerUsers()) ownership[user.id] = CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE;
      ownership[ownerUser.id] = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
      await actor.update({ ownership });
    }

    const center = getDrawingCenter(entry);
    const gridSize = getGridSize();
    const tokenData = actor.prototypeToken.toObject();
    tokenData.actorId = actor.id;
    tokenData.actorLink = true;
    tokenData.name = characterData.characterName;
    tokenData.x = center.x - gridSize / 2;
    tokenData.y = center.y - gridSize / 2;
    tokenData.width = 1;
    tokenData.height = 1;
    tokenData.hidden = false;
    tokenData.sight = tokenData.sight || {};
    tokenData.sight.enabled = true;
    tokenData.texture = tokenData.texture || {};
    tokenData.texture.src = image;
    tokenData.flags = tokenData.flags || {};
    tokenData.flags[FLAG_SCOPE] = tokenData.flags[FLAG_SCOPE] || {};
    tokenData.flags[FLAG_SCOPE][WORLD_PIECE_KEY] = foundry.utils.deepClone(pieceData);
    tokenData.flags[FLAG_SCOPE][WORLD_CHARACTER_KEY] = foundry.utils.deepClone(characterData);
    await canvas.scene.createEmbeddedDocuments("Token", [tokenData]);
    return { actor, characterData, piece: pieceData };
  }

  async function createCharacter() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can create characters."); return; }
    const selectedTile = canvas.drawings.controlled.find(drawing => Boolean(getWorldTile(drawing)));
    const selectedEntry = selectedTile ? { drawing: selectedTile, tile: getWorldTile(selectedTile) } : getWorldTileEntries()[0];
    if (!selectedEntry) { ui.notifications.warn("Create or assign at least one world tile first."); return; }
    const blank = normalizeCharacterDetails({ landMovement: 3, navalMovement: 3, status: "Alive", visibility: "Owner+GM" });
    const result = await new Promise(resolve => {
      new Dialog({
        title: "Create Character",
        content: buildCharacterForm(blank, getTileId(selectedEntry)),
        buttons: {
          create: { label: "Create Character", callback: html => resolve(readCharacterForm(html, blank)) },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "create"
      }, { width: 900, height: 760, resizable: true }).render(true);
    });
    if (!result) return;
    const entry = getTileEntryByNameOrId(result.currentTileId);
    if (!entry) { ui.notifications.error("Could not find selected destination tile."); return; }
    const ownerUser = getUserFromCharacterDetails(result);
    if (ownerUser) {
      result.playerUserId = ownerUser.id;
      result.playerName = ownerUser.name;
      result.ownerType = "Player";
      if (!result.visibility || result.visibility === "GM Only") result.visibility = "Owner+GM";
    }
    await spawnCharacterToken(result, entry, ownerUser);
    ui.notifications.info(`Created character: ${result.characterName}.`);
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "Crown Characters" }), content: `<h2>Character Created</h2><p><strong>Name:</strong> ${escapeHtml(result.characterName)}</p><p><strong>House:</strong> ${escapeHtml(result.house || "None")}</p><p><strong>Location:</strong> ${escapeHtml(getTileName(entry))}</p><p><strong>Player:</strong> ${escapeHtml(ownerUser?.name || result.ownerType || "NPC")}</p>` });
    revealForCurrentPlayerPieces();
  }

  async function editSelectedCharacter() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can edit characters."); return; }
    const selected = canvas.tokens.controlled.filter(token => isCharacterToken(token));
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one character token to edit or assign."); return; }
    const token = selected[0];
    const existing = getCharacterDataFromToken(token);
    const result = await new Promise(resolve => {
      new Dialog({
        title: "Edit / Assign Character",
        content: buildCharacterForm(existing, existing.currentTileId),
        buttons: {
          save: { label: "Save Character", callback: html => resolve(readCharacterForm(html, existing)) },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "save"
      }, { width: 900, height: 760, resizable: true }).render(true);
    });
    if (!result) return;
    const entry = getTileEntryByNameOrId(result.currentTileId) || getCurrentTileEntryForToken(token, getWorldPiece(token));
    if (!entry) { ui.notifications.error("Could not find selected destination tile."); return; }
    const ownerUser = getUserFromCharacterDetails(result);
    if (ownerUser) {
      result.playerUserId = ownerUser.id;
      result.playerName = ownerUser.name;
      result.ownerType = "Player";
    } else if (result.ownerType === "Player") {
      result.ownerType = "NPC";
    }
    const saved = await saveCharacterFlags(token, result, entry, ownerUser);
    const position = getTokenTopLeftForTileSlot(token, entry);
    await token.document.update({ x: position.x, y: position.y }, { animate: false, worldMovementBypass: true, bypassWorldMovementWatcher: true, clickMoveBypass: true });
    ui.notifications.info(`Updated character: ${saved.characterData.characterName}.`);
    revealForCurrentPlayerPieces();
  }

  function characterRowFromToken(token) {
    const data = getCharacterDataFromToken(token);
    const piece = getWorldPiece(token) || {};
    const entry = getCurrentTileEntryForToken(token, piece);
    const currentTileId = entry ? getTileId(entry) : (data.currentTileId || piece.currentTileId || "");
    const currentTileName = entry ? getTileName(entry) : (data.currentTileName || piece.currentTileName || "");
    const currentRegion = entry ? (entry.tile?.region || "") : (data.currentRegion || piece.currentRegion || "");
    return {
      ...data,
      currentTileId,
      currentTileName,
      currentRegion,
      tokenName: token.document.name,
      tokenImage: token.document.texture?.src || token.actor?.img || data.tokenImage || ""
    };
  }

  async function exportCharacterCsv() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can export character CSVs."); return; }
    const rows = getCharacterTokens().map(characterRowFromToken).sort((a, b) => String(a.playerName || a.ownerType || "").localeCompare(String(b.playerName || b.ownerType || "")) || String(a.characterSlot || "").localeCompare(String(b.characterSlot || "")) || String(a.characterName || "").localeCompare(String(b.characterName || "")));
    if (!rows.length) { ui.notifications.warn("No character tokens were found on this scene."); return; }
    let csv = "\uFEFF" + CHARACTER_CSV_COLUMNS.map(column => csvEscape(column[0])).join(",") + "\r\n";
    for (const row of rows) csv += CHARACTER_CSV_COLUMNS.map(column => csvEscape(row[column[1]] ?? "")).join(",") + "\r\n";
    const filename = `Crown_of_Ashes_${safeFilename(canvas.scene?.name || "World_Map")}_Characters.csv`;
    saveDataToFile(csv, "text/csv;charset=utf-8", filename);
    ui.notifications.info(`Exported ${rows.length} character(s).`);
  }

  async function importCharacterCsv() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can import character CSVs."); return; }
    const file = await new Promise(resolve => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".csv,text/csv";
      input.addEventListener("change", () => resolve(input.files?.length ? input.files[0] : null));
      input.click();
    });
    if (!file) { ui.notifications.warn("No CSV file selected."); return; }
    let text = await file.text();
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
    const csvRows = parseCSV(text);
    if (csvRows.length < 2) { ui.notifications.error("This CSV contains no character rows."); return; }
    const headers = csvRows[0].map(header => String(header).trim());
    let created = 0, updated = 0, skipped = 0, failed = 0;
    const existing = () => getCharacterTokens();

    for (let i = 1; i < csvRows.length; i++) {
      const row = csvRows[i];
      const raw = {
        characterId: characterCsvValue(row, headers, "Character ID", "character_id", "characterId"),
        playerName: characterCsvValue(row, headers, "Player Name", "player_name", "playerName"),
        playerUserId: characterCsvValue(row, headers, "Player User ID", "player_user_id", "playerUserId"),
        ownerType: characterCsvValue(row, headers, "Owner Type", "owner_type", "ownerType"),
        characterSlot: characterCsvValue(row, headers, "Character Slot", "character_slot", "characterSlot"),
        characterRole: characterCsvValue(row, headers, "Character Role", "character_role", "characterRole"),
        characterName: characterCsvValue(row, headers, "Character Name", "character_name", "characterName", "Name"),
        house: characterCsvValue(row, headers, "House", "house"),
        culture: characterCsvValue(row, headers, "Culture", "culture"),
        religion: characterCsvValue(row, headers, "Religion", "religion"),
        age: characterCsvValue(row, headers, "Age", "age"),
        heightWeight: characterCsvValue(row, headers, "Height / Weight", "height_weight", "heightWeight"),
        preferredWeapons: characterCsvValue(row, headers, "Preferred Weapons", "preferred_weapons", "preferredWeapons"),
        marriage: characterCsvValue(row, headers, "Marriage", "marriage"),
        issueChildren: characterCsvValue(row, headers, "Issue / Children", "issue_children", "issueChildren"),
        currentTileName: characterCsvValue(row, headers, "Current Tile Name", "current_tile_name", "currentTileName"),
        currentTileId: characterCsvValue(row, headers, "Current Tile ID", "current_tile_id", "currentTileId"),
        currentRegion: characterCsvValue(row, headers, "Current Region", "current_region", "currentRegion"),
        tokenName: characterCsvValue(row, headers, "Token Name", "token_name", "tokenName"),
        tokenImage: characterCsvValue(row, headers, "Token Image", "token_image", "tokenImage"),
        status: characterCsvValue(row, headers, "Status", "status"),
        visibility: characterCsvValue(row, headers, "Visibility", "visibility"),
        traits: characterCsvValue(row, headers, "Traits", "traits"),
        quirks: characterCsvValue(row, headers, "Quirks", "quirks"),
        publicNotes: characterCsvValue(row, headers, "Public Notes", "public_notes", "publicNotes"),
        gmNotes: characterCsvValue(row, headers, "GM Notes", "gm_notes", "gmNotes")
      };
      for (const key of CHARACTER_STAT_KEYS) raw[key] = characterCsvValue(row, headers, titleCase(key), key);
      raw.marriageDiplomacy = characterCsvValue(row, headers, "Marriage Diplomacy", "marriage_diplomacy", "marriageDiplomacy");
      raw.navalMovement = characterCsvValue(row, headers, "Naval Movement", "naval_movement", "navalMovement");
      raw.landMovement = characterCsvValue(row, headers, "Land Movement", "land_movement", "landMovement");
      raw.wounds = characterCsvValue(row, headers, "Wounds", "wounds");
      raw.fertility = characterCsvValue(row, headers, "Fertility", "fertility");
      raw.commandPoints = characterCsvValue(row, headers, "Command Points", "command_points", "commandPoints");
      raw.favouredWeaponBonus = characterCsvValue(row, headers, "Favoured Weapon Bonus", "favoured_weapon_bonus", "favouredWeaponBonus");

      const details = normalizeCharacterDetails(raw);
      if (!details.characterName) { skipped++; continue; }
      const requestedEntry = getTileEntryByNameOrId(details.currentTileId) || getTileEntryByNameOrId(details.currentTileName);
      const hasRequestedLocation = Boolean(String(details.currentTileId || details.currentTileName || "").trim());
      const ownerUser = getUserFromCharacterDetails(details);
      if (ownerUser) { details.playerUserId = ownerUser.id; details.playerName = ownerUser.name; details.ownerType = "Player"; }
      const match = existing().find(token => {
        const data = getCharacterDataFromToken(token);
        return (details.characterId && String(data.characterId) === String(details.characterId)) || (details.playerName && data.playerName && normalize(data.playerName) === normalize(details.playerName) && normalize(data.characterName) === normalize(details.characterName)) || normalize(data.characterName) === normalize(details.characterName);
      });
      try {
        if (match) {
          const entry = requestedEntry || getCurrentTileEntryForToken(match, getWorldPiece(match));
          if (!entry && hasRequestedLocation) { failed++; console.warn("Character import row has no matching requested tile:", i + 1, details); continue; }
          await saveCharacterFlags(match, details, requestedEntry ? requestedEntry : null, ownerUser);
          if (requestedEntry) {
            const position = getTokenTopLeftForTileSlot(match, requestedEntry);
            await match.document.update({ x: position.x, y: position.y }, { animate: false, worldMovementBypass: true, bypassWorldMovementWatcher: true, clickMoveBypass: true });
          }
          updated++;
        } else {
          const entry = requestedEntry;
          if (!entry) { failed++; console.warn("New character import row has no matching tile:", i + 1, details); continue; }
          await spawnCharacterToken(details, entry, ownerUser);
          created++;
        }
      } catch (err) {
        failed++;
        console.error("Character import failed on row", i + 1, err);
      }
    }
    ui.notifications.info(`Character import complete — ${created} created, ${updated} updated, ${skipped} skipped, ${failed} failed.`);
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "Crown Characters" }), content: `<h2>Character CSV Import</h2><p><strong>Created:</strong> ${escapeHtml(created)}</p><p><strong>Updated:</strong> ${escapeHtml(updated)}</p><p><strong>Skipped:</strong> ${escapeHtml(skipped)}</p><p><strong>Failed:</strong> ${escapeHtml(failed)}</p>` });
    revealForCurrentPlayerPieces();
  }

  function csvBoolean(value, defaultValue = false) {
    const text = normalize(value);
    if (!text) return Boolean(defaultValue);
    if (["yes", "true", "1", "y", "on", "protected", "blocked"].includes(text)) return true;
    if (["no", "false", "0", "n", "off", "none", "unprotected", "allowed"].includes(text)) return false;
    return Boolean(defaultValue);
  }

  function getCsvValue(row, headers, ...names) {
    return characterCsvValue(row, headers, ...names);
  }

  function getUserByIdOrName(id, name) {
    const userId = String(id || "").trim();
    if (userId && game.users.get(userId)) return game.users.get(userId);
    const userName = normalize(name || "");
    if (!userName) return null;
    return game.users.contents.find(user => normalize(user.name) === userName) || null;
  }

  function inferOwnershipType(worldTile = {}, house = {}) {
    const explicit = String(house.ownershipType || worldTile.ownershipType || "").trim();
    if (explicit) return explicit;
    if (getTileType(worldTile) === "sea" || isSeaByTile(worldTile)) return "None";
    if (getTileOwnerUserId(worldTile, house) || getTileOwnerUserName(worldTile, house)) return "Player";
    const houseName = normalize(house.house || worldTile.owner || "");
    if (!houseName || houseName === "none") return "None";
    if (houseName === "neutral" || houseName === "npc") return "NPC";
    return "NPC";
  }

  function tileOwnershipRowFromEntry(entry) {
    const worldTile = entry.tile || {};
    const house = getHouseData(entry.drawing) || {};
    const tileType = getTileType(worldTile);
    const ownershipType = inferOwnershipType(worldTile, house);
    const controllerName = getTileOwnerUserName(worldTile, house);
    const controllerId = getTileOwnerUserId(worldTile, house);
    const ruler = house.lord || house.ruler || worldTile.ruler || "";
    const npcDiplomacy = house.npcDefenderDiplomacy ?? house.npcDiplomacy ?? worldTile.npcDefenderDiplomacy ?? worldTile.npcDiplomacy ?? "";
    return {
      tileName: getTileName(entry),
      tileId: getTileId(entry),
      drawingId: entry.drawing.document.id,
      region: house.region || worldTile.region || "",
      tileType,
      ownershipType,
      controllerPlayerName: controllerName,
      controllerPlayerUserId: controllerId,
      house: house.house || worldTile.owner || "",
      ruler,
      rulingCharacterId: house.rulingCharacterId || worldTile.rulingCharacterId || "",
      culture: house.culture || worldTile.culture || "",
      religion: house.religion || worldTile.religion || "",
      swornToType: house.swornToType || worldTile.swornToType || (controllerId ? "Player" : ownershipType === "NPC" ? "NPC" : ""),
      swornToPlayerName: house.swornToPlayerName || worldTile.swornToPlayerName || controllerName,
      swornToPlayerUserId: house.swornToPlayerUserId || worldTile.swornToPlayerUserId || controllerId,
      marriageProtected: csvBoolean(house.marriageProtected ?? worldTile.marriageProtected, false) ? "Yes" : "No",
      marriageProtectedPlayerName: house.marriageProtectedPlayerName || worldTile.marriageProtectedPlayerName || "",
      marriageProtectedPlayerUserId: house.marriageProtectedPlayerUserId || worldTile.marriageProtectedPlayerUserId || "",
      rulerDiplomacy: house.rulerDiplomacy ?? worldTile.rulerDiplomacy ?? "",
      npcDefenderDiplomacy: npcDiplomacy,
      diplomaticTakeoverAllowed: csvBoolean(house.diplomaticTakeoverAllowed ?? worldTile.diplomaticTakeoverAllowed, tileType !== "sea") ? "Yes" : "No",
      publicOwnerLabel: house.publicOwnerLabel || worldTile.publicOwnerLabel || controllerName || house.house || "",
      ownershipNotes: house.ownershipNotes || worldTile.ownershipNotes || ""
    };
  }

  async function exportTileOwnershipCsv() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can export tile ownership CSVs."); return; }
    const rows = getWorldTileEntries()
      .map(tileOwnershipRowFromEntry)
      .sort((a, b) => String(a.region || "").localeCompare(String(b.region || "")) || String(a.tileName || "").localeCompare(String(b.tileName || "")));
    let csv = "\uFEFF" + TILE_OWNERSHIP_CSV_COLUMNS.map(column => csvEscape(column[0])).join(",") + "\r\n";
    for (const row of rows) csv += TILE_OWNERSHIP_CSV_COLUMNS.map(column => csvEscape(row[column[1]] ?? "")).join(",") + "\r\n";
    const filename = `Crown_of_Ashes_${safeFilename(canvas.scene?.name || "World_Map")}_Tile_Ownership.csv`;
    saveDataToFile(csv, "text/csv;charset=utf-8", filename);
    ui.notifications.info(`Exported ${rows.length} tile ownership row(s).`);
  }

  function tileOwnershipDetailsFromCsvRow(row, headers) {
    const detail = {};
    for (const [label, key] of TILE_OWNERSHIP_CSV_COLUMNS) detail[key] = getCsvValue(row, headers, label, key);
    detail.controllerPlayerName ||= getCsvValue(row, headers, "Player Owner", "Owner User Name", "World Tile Owner");
    detail.controllerPlayerUserId ||= getCsvValue(row, headers, "Player Owner User ID", "Owner User ID", "playerOwnerUserId");
    detail.ruler ||= getCsvValue(row, headers, "Lord / Ruler", "Ruler", "lord");
    detail.tileName ||= getCsvValue(row, headers, "Province / Tile", "Tile", "Name");
    return detail;
  }

  async function importTileOwnershipCsv() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can import tile ownership CSVs."); return; }
    const file = await new Promise(resolve => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".csv,text/csv";
      input.addEventListener("change", () => resolve(input.files?.length ? input.files[0] : null));
      input.click();
    });
    if (!file) { ui.notifications.warn("No CSV file selected."); return; }
    let text = await file.text();
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
    const csvRows = parseCSV(text);
    if (csvRows.length < 2) { ui.notifications.error("This CSV contains no tile ownership rows."); return; }
    const headers = csvRows[0].map(header => String(header).trim());
    let updated = 0, skipped = 0, failed = 0;

    for (let i = 1; i < csvRows.length; i++) {
      const row = csvRows[i];
      if (!row.some(cell => String(cell || "").trim())) { skipped++; continue; }
      const details = tileOwnershipDetailsFromCsvRow(row, headers);
      const entry = getTileEntryByNameOrId(details.tileId) || getTileEntryByNameOrId(details.drawingId) || getTileEntryByNameOrId(details.tileName);
      if (!entry) { failed++; console.warn("Tile ownership import row has no matching tile:", i + 1, details); continue; }
      try {
        const worldTile = foundry.utils.deepClone(entry.tile || {});
        const house = foundry.utils.deepClone(getHouseData(entry.drawing) || {});
        const ownershipType = String(details.ownershipType || inferOwnershipType(worldTile, house)).trim() || "NPC";
        const controllerUser = getUserByIdOrName(details.controllerPlayerUserId, details.controllerPlayerName);
        const controllerId = controllerUser?.id || String(details.controllerPlayerUserId || "").trim();
        const controllerName = controllerUser?.name || String(details.controllerPlayerName || "").trim();
        const isPlayer = normalize(ownershipType) === "player";

        worldTile.name = worldTile.name || details.tileName || entry.drawing.document.name;
        worldTile.region = String(details.region || worldTile.region || "").trim();
        worldTile.tileType = String(details.tileType || worldTile.tileType || getTileType(worldTile)).trim();
        worldTile.ownershipType = ownershipType;
        worldTile.culture = String(details.culture || "").trim();
        worldTile.religion = String(details.religion || "").trim();
        worldTile.rulingCharacterId = String(details.rulingCharacterId || "").trim();
        worldTile.swornToType = String(details.swornToType || (isPlayer ? "Player" : ownershipType)).trim();
        worldTile.swornToPlayerName = String(details.swornToPlayerName || (isPlayer ? controllerName : "")).trim();
        worldTile.swornToPlayerUserId = String(details.swornToPlayerUserId || (isPlayer ? controllerId : "")).trim();
        worldTile.marriageProtected = csvBoolean(details.marriageProtected, false);
        worldTile.marriageProtectedPlayerName = String(details.marriageProtectedPlayerName || "").trim();
        worldTile.marriageProtectedPlayerUserId = String(details.marriageProtectedPlayerUserId || "").trim();
        worldTile.rulerDiplomacy = numberOrBlank(details.rulerDiplomacy);
        worldTile.npcDefenderDiplomacy = numberOrBlank(details.npcDefenderDiplomacy);
        worldTile.npcDiplomacy = numberOrBlank(details.npcDefenderDiplomacy || details.rulerDiplomacy);
        worldTile.diplomaticTakeoverAllowed = csvBoolean(details.diplomaticTakeoverAllowed, getTileType(worldTile) !== "sea");
        worldTile.publicOwnerLabel = String(details.publicOwnerLabel || "").trim();
        worldTile.ownershipNotes = String(details.ownershipNotes || "").trim();

        house.region = worldTile.region;
        house.house = String(details.house || house.house || worldTile.owner || "").trim();
        house.lord = String(details.ruler || house.lord || "").trim();
        house.ownershipType = ownershipType;
        house.culture = worldTile.culture;
        house.religion = worldTile.religion;
        house.rulingCharacterId = worldTile.rulingCharacterId;
        house.swornToType = worldTile.swornToType;
        house.swornToPlayerName = worldTile.swornToPlayerName;
        house.swornToPlayerUserId = worldTile.swornToPlayerUserId;
        house.marriageProtected = worldTile.marriageProtected;
        house.marriageProtectedPlayerName = worldTile.marriageProtectedPlayerName;
        house.marriageProtectedPlayerUserId = worldTile.marriageProtectedPlayerUserId;
        house.rulerDiplomacy = worldTile.rulerDiplomacy;
        house.npcDefenderName = house.lord || details.tileName || "NPC Defender";
        house.npcDefenderDiplomacy = worldTile.npcDefenderDiplomacy;
        house.npcDiplomacy = worldTile.npcDiplomacy;
        house.diplomaticTakeoverAllowed = worldTile.diplomaticTakeoverAllowed;
        house.publicOwnerLabel = worldTile.publicOwnerLabel;
        house.ownershipNotes = worldTile.ownershipNotes;
        house.version = `Crown Overview Tools ${MODULE_VERSION}`;
        house.updatedAt = new Date().toISOString();
        house.updatedBy = game.user.name;

        if (isPlayer && (controllerId || controllerName)) {
          worldTile.ownerUserId = controllerId;
          worldTile.ownerUserName = controllerName;
          worldTile.playerOwnerUserId = controllerId;
          worldTile.playerOwnerUserName = controllerName;
          house.ownerUserId = controllerId;
          house.ownerUserName = controllerName;
          house.playerOwnerUserId = controllerId;
          house.playerOwnerUserName = controllerName;
        } else {
          delete worldTile.ownerUserId;
          delete worldTile.ownerUserName;
          delete worldTile.playerOwnerUserId;
          delete worldTile.playerOwnerUserName;
          house.ownerUserId = "";
          house.ownerUserName = "";
          house.playerOwnerUserId = "";
          house.playerOwnerUserName = "";
        }

        await entry.drawing.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, worldTile);
        await entry.drawing.document.setFlag(FLAG_SCOPE, HOUSE_KEY, house);
        updated++;
      } catch (err) {
        failed++;
        console.error("Tile ownership import failed on row", i + 1, err);
      }
    }
    ui.notifications.info(`Tile ownership import complete — ${updated} updated, ${skipped} skipped, ${failed} failed.`);
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "Crown Tile Ownership" }), content: `<h2>Tile Ownership CSV Import</h2><p><strong>Updated:</strong> ${escapeHtml(updated)}</p><p><strong>Skipped:</strong> ${escapeHtml(skipped)}</p><p><strong>Failed:</strong> ${escapeHtml(failed)}</p>` });
    revealForCurrentPlayerPieces();
  }

  function getCharacterTokenById(characterId) {
    const id = String(characterId || "").trim();
    if (!id) return null;
    return getCharacterTokens().find(token => String(getCharacterDataFromToken(token).characterId || "") === id || String(getWorldPiece(token)?.characterId || "") === id) || null;
  }

  const BASE_PROVINCE_MANPOWER = 1000;
  const MANPOWER_RECOVERY_RATE = 0.05;

  function getProvinceManpowerMax(house = {}, clock = getClock()) {
    let bonus = 0;
    const state = getActiveBuildingLineState(house, clock).get("mustering");
    if (state?.level) bonus = Math.max(0, Number(state.level.manpowerBonus || 0));
    return BASE_PROVINCE_MANPOWER + bonus;
  }

  const BASE_PROVINCE_SHIP_CAPACITY = 10;
  const MOB_EQUIVALENT_PER_SHIP = 100;

  function getProvinceShipCapacity(house = {}) {
    const manpowerBonus = Math.max(0, getProvinceManpowerMax(house) - BASE_PROVINCE_MANPOWER);
    return BASE_PROVINCE_SHIP_CAPACITY + Math.floor(manpowerBonus / MOB_EQUIVALENT_PER_SHIP);
  }

  function getProvinceManpowerCurrent(house = {}) {
    const max = getProvinceManpowerMax(house);
    const raw = numberOrBlank(house.manpowerCurrent);
    if (raw === "") return max;
    const cachedMax = numberOrBlank(house.manpowerMaxCached);
    const capacityIncrease = cachedMax === "" ? 0 : Math.max(0, max - Number(cachedMax || 0));
    return Math.max(0, Math.min(max, Math.floor(Number(raw || 0) + capacityIncrease)));
  }

  function getCharacterHouseKey(characterToken) {
    const character = getCharacterDataFromToken(characterToken) || {};
    const piece = getWorldPiece(characterToken) || {};
    return normalize(character.house || piece.house || piece.faction || "");
  }

  function getCharacterControllerIdentity(characterToken, fallbackUserId = "", fallbackUserName = "") {
    const character = getCharacterDataFromToken(characterToken) || {};
    const piece = getWorldPiece(characterToken) || {};

    // Explicit controller/player assignment is authoritative. Older owner fields
    // may describe who originally created/owned the token and must never override
    // the player currently assigned to the character's realm.
    const idCandidates = [
      piece.controllerPlayerUserId,
      character.controllerPlayerUserId,
      character.playerUserId,
      piece.playerOwnerUserId,
      character.ownerUserId,
      piece.ownerUserId
    ].map(value => String(value || "").trim()).filter(Boolean);

    for (const id of idCandidates) {
      const user = game.users.get(id);
      if (user && !user.isGM) return { id: user.id, name: user.name, source: "character" };
    }

    const nameCandidates = [
      piece.controllerPlayerName,
      character.controllerPlayerName,
      character.playerName,
      piece.playerOwnerUserName,
      character.ownerUserName,
      piece.ownerUserName
    ].map(value => String(value || "").trim()).filter(Boolean);

    for (const name of nameCandidates) {
      const user = game.users.contents.find(candidate => !candidate.isGM && normalize(candidate.name) === normalize(name));
      if (user) return { id: user.id, name: user.name, source: "character" };
    }

    const fallbackUser = game.users.get(String(fallbackUserId || "").trim());
    if (fallbackUser) return { id: fallbackUser.id, name: fallbackUser.name, source: "requester" };
    return { id: String(fallbackUserId || "").trim(), name: String(fallbackUserName || "").trim(), source: "requester" };
  }

  function getCanonicalHouseNameForCharacter(characterToken, actingUserId = "", actingUserName = "") {
    const character = getCharacterDataFromToken(characterToken) || {};
    const piece = getWorldPiece(characterToken) || {};
    const direct = String(character.house || piece.house || piece.faction || "").trim();
    if (direct) return direct;

    const ownerId = String(actingUserId || piece.ownerUserId || piece.playerOwnerUserId || character.playerUserId || character.ownerUserId || "").trim();
    const ownerName = String(actingUserName || piece.ownerUserName || piece.playerOwnerUserName || character.playerName || character.ownerUserName || "").trim();
    const names = new Map();
    for (const entry of getWorldTileEntries()) {
      if (isSeaByTile(entry.tile)) continue;
      const house = getHouseData(entry.drawing) || {};
      const tileOwnerId = String(getTileOwnerUserId(entry.tile, house) || "").trim();
      const tileOwnerName = String(getTileOwnerUserName(entry.tile, house) || "").trim();
      const controlled = ownerId && tileOwnerId
        ? tileOwnerId === ownerId
        : Boolean(ownerName && tileOwnerName && normalize(tileOwnerName) === normalize(ownerName));
      if (!controlled) continue;
      const candidate = String(house.allegiance || entry.tile?.allegiance || house.house || entry.tile?.house || entry.tile?.owner || "").trim();
      if (!candidate) continue;
      const key = normalize(candidate);
      const row = names.get(key) || { name: candidate, count: 0 };
      row.count += 1;
      names.set(key, row);
    }
    const best = [...names.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))[0];
    return best?.name || "";
  }

  function getCharacterRealmAllegiance(characterToken) {
    const character = getCharacterDataFromToken(characterToken) || {};
    const piece = getWorldPiece(characterToken) || {};
    const currentTileId = String(character.currentTileId || piece.currentTileId || "").trim();
    const currentTileName = String(character.currentTileName || piece.currentTileName || "").trim();

    let currentEntry = null;
    if (currentTileId) currentEntry = getWorldTileEntries().find(entry => String(getTileId(entry) || "") === currentTileId) || null;
    if (!currentEntry && currentTileName) currentEntry = getWorldTileEntries().find(entry => normalize(getTileName(entry)) === normalize(currentTileName)) || null;

    if (currentEntry) {
      const house = getHouseData(currentEntry.drawing) || {};
      const allegiance = String(house.allegiance || currentEntry.tile?.allegiance || "").trim();
      if (allegiance) return allegiance;
    }

    return String(character.allegiance || piece.allegiance || "").trim();
  }

  function getManpowerEntriesForCharacter(characterToken) {
    const piece = getWorldPiece(characterToken) || {};
    const controller = getCharacterControllerIdentity(characterToken);

    // For an actual player using one of their characters, use THEIR My Holdings
    // collection directly. This prevents stale imported character-owner fields from
    // making the muster dialog see a different realm than the Holdings button.
    if (!game.user.isGM && canUserControlWorldPieceForUser(characterToken, piece, game.user)) {
      return getHoldingsForUser(game.user).filter(entry => !isSeaByTile(entry.tile));
    }

    // GM / server-side processing uses the character's explicit assigned controller.
    const realmUser = controller.id ? game.users.get(String(controller.id)) : null;
    if (realmUser && !realmUser.isGM) {
      const controlled = getHoldingsForUser(realmUser).filter(entry => !isSeaByTile(entry.tile));
      if (controlled.length) return controlled;
    }

    // Political fallback: conquered/sworn provinces keep their original House, so
    // realm membership is represented by Allegiance rather than rewriting House.
    const allegiance = getCharacterRealmAllegiance(characterToken);
    const allegianceKey = normalize(allegiance);
    if (allegianceKey) {
      const sworn = getWorldTileEntries().filter(entry => {
        if (isSeaByTile(entry.tile)) return false;
        const house = getHouseData(entry.drawing) || {};
        return normalize(house.allegiance || entry.tile?.allegiance || "") === allegianceKey;
      });
      if (sworn.length) return sworn;
    }

    // Final legacy fallback for NPC realms that have neither player nor allegiance.
    const houseKey = getCharacterHouseKey(characterToken);
    if (!houseKey) return [];
    return getWorldTileEntries().filter(entry => {
      if (isSeaByTile(entry.tile)) return false;
      const house = getHouseData(entry.drawing) || {};
      return normalize(house.house || entry.tile?.house || entry.tile?.owner || "") === houseKey;
    });
  }

  function getHouseManpowerSummaryForCharacter(characterToken) {
    const entries = getManpowerEntriesForCharacter(characterToken);
    let current = 0;
    let max = 0;
    for (const entry of entries) {
      const house = getHouseData(entry.drawing) || {};
      current += getProvinceManpowerCurrent(house);
      max += getProvinceManpowerMax(house);
    }
    return { entries, current, max };
  }

  function getHouseShipCapacitySummaryForCharacter(characterToken, excludeCharacterId = "") {
    const entries = getManpowerEntriesForCharacter(characterToken);
    const houseKey = getCharacterHouseKey(characterToken);
    let max = 0;
    for (const entry of entries) {
      const house = getHouseData(entry.drawing) || {};
      max += getProvinceShipCapacity(house);
    }
    let committed = 0;
    for (const token of getFleetTokens()) {
      const fleet = getWorldPiece(token) || {};
      if (normalize(fleet.house || fleet.faction || "") !== houseKey) continue;
      if (excludeCharacterId && String(fleet.linkedCharacterId || fleet.commanderCharacterId || "") === String(excludeCharacterId)) continue;
      committed += Math.max(0, Math.floor(Number(fleet.shipsCurrent ?? fleet.totalShips ?? getNavyTotalShips(getNavyComposition(fleet)) ?? 0)));
    }
    for (const token of getCharacterTokens()) {
      const pending = getPendingNavyMuster(token);
      if (!pending || pending.status !== "pending") continue;
      if (normalize(pending.house || "") !== houseKey) continue;
      if (excludeCharacterId && String(pending.linkedCharacterId || "") === String(excludeCharacterId)) continue;
      committed += Math.max(0, Math.floor(Number(pending.totalShips || 0)));
    }
    return { entries, max, committed, available: Math.max(0, max - committed) };
  }

  function getNavyCommandCapacity(characterToken) {
    const martial = getCharacterMartialValue(characterToken);
    const mobEquivalent = Math.max(0, Math.floor(martial * 250));
    return { martial, mobEquivalent, ships: Math.max(0, Math.floor(mobEquivalent / MOB_EQUIVALENT_PER_SHIP)) };
  }

  function getHouseDrydockLevelForCharacter(characterToken) {
    let level = 0;
    const entries = getManpowerEntriesForCharacter(characterToken);
    for (const entry of entries) {
      const house = getHouseData(entry.drawing) || {};
      const state = getActiveBuildingLineState(house).get("drydock");
      if (state?.level) level = Math.max(level, Math.max(0, Number(state.level.level || 0)));
    }
    return Math.min(3, level);
  }

  function getShipRequiredDrydockLevel(shipKey) {
    const key = normalize(shipKey);
    if ([normalize("Fishing / Conscripted Vessel"), normalize("Longship")].includes(key)) return 1;
    if ([normalize("Galley"), normalize("War Galley")].includes(key)) return 2;
    if ([normalize("Greatship"), normalize("Dromond")].includes(key)) return 3;
    return 99;
  }

  function getUnlockedNavyShipTypes(characterToken) {
    const drydockLevel = getHouseDrydockLevelForCharacter(characterToken);
    return NAVY_SHIP_TYPES.filter(ship => getShipRequiredDrydockLevel(ship.key) <= drydockLevel);
  }

  function getDrydockUnlockSummary(level) {
    const n = Math.max(0, Math.min(3, Number(level || 0)));
    if (n <= 0) return "No Shipwright: no ship classes unlocked";
    if (n === 1) return "Shipwright: Fishing / Conscripted Vessels and Longships";
    if (n === 2) return "Sail Makers: adds Galleys and War Galleys";
    return "Dry Dock: adds Greatships and Dromonds";
  }

  function validateNavyShipClassUnlocks(characterToken, composition = {}) {
    const drydockLevel = getHouseDrydockLevelForCharacter(characterToken);
    const locked = [];
    for (const ship of NAVY_SHIP_TYPES) {
      const count = Math.max(0, Math.floor(Number(composition?.[ship.key] || 0)));
      if (count <= 0) continue;
      const required = getShipRequiredDrydockLevel(ship.key);
      if (required > drydockLevel) locked.push(`${ship.label} (requires Drydock level ${required})`);
    }
    if (locked.length) {
      throw new Error(`Ship class unavailable: ${locked.join(", ")}. House naval infrastructure is level ${drydockLevel}: ${getDrydockUnlockSummary(drydockLevel)}.`);
    }
    return { drydockLevel, unlocked: getUnlockedNavyShipTypes(characterToken) };
  }

  function getTrainingCapacityForEntries(entries = []) {
    const capacity = {};
    for (const troop of ARMY_TROOP_TYPES) capacity[troop.key] = troop.key === "Mob" ? Infinity : 0;
    for (const entry of entries) {
      const house = getHouseData(entry.drawing) || {};
      const built = getActiveBuiltBuildings(house);
      for (const building of built) {
        const meta = getBuildingMetaByName(building);
        if (!meta || !["barracks", "archery", "stable"].includes(meta.line.key)) continue;
        const support = meta.level.income || {};
        for (const troop of ARMY_TROOP_TYPES) {
          if (troop.key === "Mob") continue;
          capacity[troop.key] += Math.max(0, Number(support[troop.key] || 0));
        }
      }
    }
    return capacity;
  }

  function getCommittedTrainedTroopsForHouse(houseKey, excludeMusterId = "") {
    const used = {};
    for (const troop of ARMY_TROOP_TYPES) used[troop.key] = 0;
    for (const token of getArmyTokens()) {
      const piece = getWorldPiece(token) || {};
      if (normalize(piece.house || piece.faction || "") !== houseKey) continue;
      const composition = getArmyComposition(piece);
      for (const troop of ARMY_TROOP_TYPES) used[troop.key] += Number(composition[troop.key] || 0);
    }
    for (const token of getCharacterTokens()) {
      const pending = getPendingArmyMuster(token);
      if (!pending || pending.status !== "pending" || String(pending.id || "") === String(excludeMusterId || "")) continue;
      if (normalize(pending.house || "") !== houseKey) continue;
      for (const troop of ARMY_TROOP_TYPES) used[troop.key] += Number(pending.composition?.[troop.key] || 0);
    }
    return used;
  }

  function getAvailableTrainingCapacity(characterToken, excludeMusterId = "") {
    const entries = getManpowerEntriesForCharacter(characterToken);
    const total = getTrainingCapacityForEntries(entries);
    const used = getCommittedTrainedTroopsForHouse(getCharacterHouseKey(characterToken), excludeMusterId);
    const available = {};
    for (const troop of ARMY_TROOP_TYPES) {
      available[troop.key] = troop.key === "Mob" ? Infinity : Math.max(0, Number(total[troop.key] || 0) - Number(used[troop.key] || 0));
    }
    return { total, used, available };
  }

  async function changeHouseManpower(characterToken, delta) {
    let remaining = Math.abs(Math.floor(Number(delta || 0)));
    if (!remaining) return 0;
    const entries = getManpowerEntriesForCharacter(characterToken);
    const deducting = Number(delta) < 0;
    const planned = [];

    for (const entry of entries) {
      if (remaining <= 0) break;
      const before = foundry.utils.deepClone(getHouseData(entry.drawing) || {});
      const house = foundry.utils.deepClone(before);
      const max = getProvinceManpowerMax(house);
      const current = getProvinceManpowerCurrent(house);
      const amount = deducting ? Math.min(current, remaining) : Math.min(max - current, remaining);
      if (amount <= 0) continue;
      house.manpowerCurrent = current + (deducting ? -amount : amount);
      house.manpowerMaxCached = max;
      house.manpowerUpdatedAt = new Date().toISOString();
      house.manpowerUpdatedBy = game.user.name;
      planned.push({ entry, before, after: house, amount });
      remaining -= amount;
    }

    const applied = [];
    try {
      for (const change of planned) {
        await change.entry.drawing.document.setFlag(FLAG_SCOPE, HOUSE_KEY, change.after);
        applied.push(change);
      }
    } catch (err) {
      console.error("Crown Overview manpower transaction failed; rolling back applied province changes.", err);
      for (const change of applied.reverse()) {
        try {
          await change.entry.drawing.document.setFlag(FLAG_SCOPE, HOUSE_KEY, change.before);
        } catch (rollbackErr) {
          console.error("Crown Overview manpower rollback failed for", getTileName(change.entry), rollbackErr);
        }
      }
      throw new Error(`Manpower update failed and was rolled back where possible: ${err?.message || err}`);
    }

    return planned.reduce((sum, change) => sum + change.amount, 0);
  }

  async function reserveManpowerForMuster(characterToken, muster) {
    const summary = getHouseManpowerSummaryForCharacter(characterToken);
    const need = Math.max(0, Math.floor(Number(muster?.totalStrength || 0)));
    if (need > summary.current) throw new Error(`Not enough manpower. ${summary.current.toLocaleString()} available, ${need.toLocaleString()} requested.`);
    const reserved = await changeHouseManpower(characterToken, -need);
    if (reserved !== need) throw new Error(`Could only reserve ${reserved.toLocaleString()} of ${need.toLocaleString()} manpower.`);
    muster.manpowerReserved = reserved;
    muster.manpowerReservedAt = new Date().toISOString();
    return muster;
  }

  async function recoverManpowerForRound() {
    let recovered = 0;
    let provinces = 0;
    for (const entry of getWorldTileEntries()) {
      if (isSeaByTile(entry.tile)) continue;
      const house = foundry.utils.deepClone(getHouseData(entry.drawing) || {});
      if (!house.house && !getTileOwnerUserId(entry.tile, house)) continue;
      const max = getProvinceManpowerMax(house);
      const current = getProvinceManpowerCurrent(house);
      if (current >= max) {
        if (house.manpowerCurrent === undefined) {
          house.manpowerCurrent = max;
          house.manpowerMaxCached = max;
          await entry.drawing.document.setFlag(FLAG_SCOPE, HOUSE_KEY, house);
        }
        continue;
      }
      const gain = Math.min(max - current, Math.max(1, Math.ceil(max * MANPOWER_RECOVERY_RATE)));
      house.manpowerCurrent = current + gain;
      house.manpowerMaxCached = max;
      house.manpowerUpdatedAt = new Date().toISOString();
      house.manpowerUpdatedBy = game.user.name;
      await entry.drawing.document.setFlag(FLAG_SCOPE, HOUSE_KEY, house);
      recovered += gain;
      provinces++;
    }
    return { recovered, provinces };
  }

  function getArmyTokens() {
    return canvas.tokens.placeables.filter(token => normalize(getWorldPiece(token)?.pieceType) === "army");
  }

  function getArmyComposition(piece = {}) {
    const raw = piece.composition || piece.armyComposition || {};
    const result = {};
    for (const troop of ARMY_TROOP_TYPES) {
      const value = numberOrBlank(raw[troop.key] ?? raw[troop.label] ?? piece[troop.key] ?? 0);
      result[troop.key] = value === "" ? 0 : Math.max(0, Number(value));
    }
    return result;
  }

  function getArmyTotalStrength(composition = {}) {
    return Object.values(composition || {}).reduce((total, value) => total + Math.max(0, Number(value || 0)), 0);
  }

  function calculateArmyUpkeep(composition = {}) {
    const totals = { Gold: 0, Food: 0 };
    for (const troop of ARMY_TROOP_TYPES) {
      const count = Math.max(0, Number(composition[troop.key] || 0));
      const blocks = count / 500;
      totals.Gold += blocks * troop.gold;
      totals.Food += blocks * troop.food;
    }
    return normalizeResourceMap(totals);
  }

  function armyCompositionText(composition = {}) {
    const parts = [];
    for (const troop of ARMY_TROOP_TYPES) {
      const count = Number(composition[troop.key] || 0);
      if (count > 0) parts.push(`${troop.label}: ${count.toLocaleString()}`);
    }
    return parts.length ? parts.join("; ") : "None";
  }

  function getFleetTokens() {
    return canvas.tokens.placeables.filter(token => normalize(getWorldPiece(token)?.pieceType) === "fleet");
  }

  function getMilitaryForceTokens() {
    return canvas.tokens.placeables.filter(token => ["army", "fleet"].includes(normalize(getWorldPiece(token)?.pieceType)));
  }

  function getNavyComposition(piece = {}) {
    const raw = piece.shipComposition || piece.navyComposition || piece.composition || {};
    const result = {};
    for (const ship of NAVY_SHIP_TYPES) {
      const value = numberOrBlank(raw[ship.key] ?? raw[ship.label] ?? piece[ship.key] ?? 0);
      result[ship.key] = value === "" ? 0 : Math.max(0, Number(value));
    }
    return result;
  }

  function getNavyTotalShips(composition = {}) {
    return Object.values(composition || {}).reduce((total, value) => total + Math.max(0, Number(value || 0)), 0);
  }

  function calculateNavyUpkeep(composition = {}) {
    const totals = { Gold: 0, Food: 0 };
    for (const ship of NAVY_SHIP_TYPES) {
      const count = Math.max(0, Number(composition[ship.key] || 0));
      const blocks = count / 5;
      totals.Gold += blocks * ship.gold;
      totals.Food += blocks * ship.food;
    }
    return normalizeResourceMap(totals);
  }

  function navyCompositionText(composition = {}) {
    const parts = [];
    for (const ship of NAVY_SHIP_TYPES) {
      const count = Number(composition[ship.key] || 0);
      if (count > 0) parts.push(`${ship.label}: ${count.toLocaleString()}`);
    }
    return parts.length ? parts.join("; ") : "None";
  }

  function buildNavyCompositionInputs(maxShips = 0, allowedShipTypes = NAVY_SHIP_TYPES) {
    const maxAttr = Math.max(0, Math.floor(Number(maxShips || 0)));
    const allowed = new Set((allowedShipTypes || []).map(ship => ship.key));
    return NAVY_SHIP_TYPES.map(ship => {
      const unlocked = allowed.has(ship.key);
      const required = getShipRequiredDrydockLevel(ship.key);
      return `<div class="form-group" style="${unlocked ? "" : "opacity:0.55;"}"><label>${escapeHtml(ship.label)}${unlocked ? "" : ` — LOCKED (Drydock ${escapeHtml(required)})`}</label><input type="number" name="ship_${escapeHtml(ship.key)}" value="0" min="0" max="${escapeHtml(unlocked ? maxAttr : 0)}" step="1" style="width:100%;" ${unlocked ? "" : "disabled"} /><p class="notes">Quality ${escapeHtml(ship.quality)} — ${escapeHtml(ship.gold)} Gold / 5, ${escapeHtml(ship.food)} Food / 5. ${escapeHtml(ship.note)}</p></div>`;
    }).join("");
  }

  function readNavyCompositionForm(form) {
    const composition = {};
    for (const ship of NAVY_SHIP_TYPES) {
      const input = form.elements[`ship_${ship.key}`];
      composition[ship.key] = Math.max(0, Number(input?.value || 0));
    }
    return composition;
  }

  function getExistingNavyForCharacter(characterId) {
    const id = String(characterId || "").trim();
    if (!id) return null;
    return getFleetTokens().find(token => String(getWorldPiece(token)?.linkedCharacterId || "") === id) || null;
  }

  function getExistingArmyForCharacter(characterId) {
    const id = String(characterId || "").trim();
    if (!id) return null;
    return getArmyTokens().find(token => String(getWorldPiece(token)?.linkedCharacterId || "") === id) || null;
  }

  function getPendingArmyMuster(characterToken) {
    const character = getCharacterDataFromToken(characterToken) || {};
    const piece = getWorldPiece(characterToken) || {};
    return character.pendingArmyMuster || piece.pendingArmyMuster || null;
  }

  function getPendingNavyMuster(characterToken) {
    const character = getCharacterDataFromToken(characterToken) || {};
    const piece = getWorldPiece(characterToken) || {};
    return character.pendingNavyMuster || piece.pendingNavyMuster || null;
  }

  function getCharacterMartialValue(characterToken) {
    const character = getCharacterDataFromToken(characterToken) || {};
    const piece = getWorldPiece(characterToken) || {};
    const value = numberOrBlank(character.martial ?? character.stats?.martial ?? piece.martial ?? piece.stats?.martial);
    return value === "" ? 0 : Number(value);
  }

  function getCharacterNavalMovementValue(characterToken) {
    const character = getCharacterDataFromToken(characterToken) || {};
    const piece = getWorldPiece(characterToken) || {};
    const value = numberOrBlank(character.navalMovement ?? character.secondaryStats?.navalMovement ?? piece.navalMovement ?? piece.secondaryStats?.navalMovement);
    return value === "" ? 3 : Number(value);
  }

  async function savePendingArmyMuster(characterToken, muster) {
    const character = foundry.utils.deepClone(getCharacterDataFromToken(characterToken) || {});
    const piece = foundry.utils.deepClone(getWorldPiece(characterToken) || {});
    character.pendingArmyMuster = muster;
    piece.pendingArmyMuster = muster;
    if (muster?.status === "pending") {
      piece.movementUsed = Math.max(Number(piece.movementUsed || 0), Number(piece.movementMax || 0));
      piece.movementLockedRoundKey = getCurrentActionRoundKey();
      piece.movementLockedReason = "Summoned an army this turn.";
      piece.movementLockedAt = new Date().toISOString();
      piece.movementLockedBy = game.user.name;
    }
    await characterToken.document.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, character);
    if (characterToken.actor) await characterToken.actor.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, foundry.utils.deepClone(character));
    await saveWorldPiece(characterToken, piece);
  }

  async function savePendingNavyMuster(characterToken, muster) {
    const character = foundry.utils.deepClone(getCharacterDataFromToken(characterToken) || {});
    const piece = foundry.utils.deepClone(getWorldPiece(characterToken) || {});
    character.pendingNavyMuster = muster;
    piece.pendingNavyMuster = muster;
    await characterToken.document.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, character);
    if (characterToken.actor) await characterToken.actor.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, foundry.utils.deepClone(character));
    await saveWorldPiece(characterToken, piece);
  }

  function buildArmyCompositionInputs(maxMen, trainingAvailable = {}) {
    const maxAttr = Math.max(0, Math.floor(Number(maxMen || 0)));
    return ARMY_TROOP_TYPES.map(troop => {
      const isMob = troop.key === "Mob";
      const cap = isMob ? maxAttr : Math.max(0, Math.floor(Number(trainingAvailable[troop.key] || 0)));
      const unlocked = isMob || cap > 0;
      const capText = isMob
        ? "Default troop type; limited only by manpower/command cap"
        : (unlocked ? `Available training capacity: ${cap.toLocaleString()}` : "LOCKED — no available training capacity from your military buildings");
      const maxForInput = unlocked ? cap : 0;
      return `<div class="form-group" style="${unlocked ? "" : "opacity:0.55;"}"><label>${escapeHtml(troop.label)}${unlocked ? "" : " — LOCKED"}</label><input type="number" name="troop_${escapeHtml(troop.key)}" value="0" min="0" max="${escapeHtml(maxForInput)}" step="50" style="width:100%;" ${unlocked ? "" : "disabled"} /><p class="notes">${escapeHtml(troop.gold)} Gold / 500, ${escapeHtml(troop.food)} Food / 500. ${escapeHtml(capText)}</p></div>`;
    }).join("");
  }

  function readArmyCompositionForm(form) {
    const composition = {};
    for (const troop of ARMY_TROOP_TYPES) {
      const input = form.elements[`troop_${troop.key}`];
      composition[troop.key] = Math.max(0, Number(input?.value || 0));
    }
    return composition;
  }

  async function createArmyMusterRequestForCharacter(characterToken) {
    const character = getCharacterDataFromToken(characterToken);
    const piece = getWorldPiece(characterToken);
    const martial = getCharacterMartialValue(characterToken);
    const commandCap = Math.max(0, Math.floor(martial * 250));
    const manpower = getHouseManpowerSummaryForCharacter(characterToken);
    const training = getAvailableTrainingCapacity(characterToken);
    const maxMen = Math.min(commandCap, manpower.current);
    if (!character?.characterId) { ui.notifications.warn("This character is missing a Character ID. Edit/import the character first."); return null; }
    if (getExistingArmyForCharacter(character.characterId)) { ui.notifications.warn(`${character.characterName || piece.name} already has an army token.`); return null; }
    const existingPending = getPendingArmyMuster(characterToken);
    if (existingPending?.status === "pending") { ui.notifications.warn(`${character.characterName || piece.name} already has a pending army muster.`); return null; }
    const entry = getCurrentTileEntryForToken(characterToken, piece);
    if (!entry) { ui.notifications.warn("The selected character is not currently in a world tile."); return null; }

    const result = await new Promise(resolve => {
      new Dialog({
        title: `Summon Army — ${character.characterName || piece.name}`,
        content: `<form>
          <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;">
            <strong>Commander:</strong> ${escapeHtml(character.characterName || piece.name)}<br>
            <strong>Martial:</strong> ${escapeHtml(martial)}<br>
            <strong>Command Capacity:</strong> ${escapeHtml(commandCap.toLocaleString())} men<br>
            <strong>Realm Controller:</strong> ${escapeHtml(getCharacterControllerIdentity(characterToken, game.user.id, game.user.name).name || "Unassigned")}<br>
            <strong>House Manpower:</strong> ${escapeHtml(manpower.current.toLocaleString())} / ${escapeHtml(manpower.max.toLocaleString())} men across ${escapeHtml(manpower.entries.length)} land province(s)<br>
            <strong>Contributing Provinces:</strong> ${escapeHtml(manpower.entries.map(entry => getTileName(entry)).join(", ") || "None")}<br>
            <strong>Maximum Army Size:</strong> ${escapeHtml(maxMen.toLocaleString())} men<br>
            <strong>Location:</strong> ${escapeHtml(getTileName(entry))}<br>
            <span class="notes">Summoning takes 1 turn. The GM must process army musters to spawn the token.</span>
          </div>
          <div class="form-group"><label>Army Name</label><input type="text" name="armyName" value="${escapeHtml(character.characterName || piece.name)}'s Host" style="width:100%;" /></div>
          <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:8px;">${buildArmyCompositionInputs(maxMen, training.available)}</div>
          <div class="form-group"><label>Siege Engines</label><input type="number" name="siegeEngines" value="0" min="0" step="1" style="width:100%;" /></div>
          <div class="form-group"><label><input type="checkbox" name="followCharacter" checked /> Army follows this character when not detached or besieging</label></div>
        </form>`,
        buttons: {
          save: { label: "Request Muster", callback: html => {
            const form = html[0].querySelector("form");
            resolve({
              armyName: String(form.armyName.value || "").trim(),
              composition: readArmyCompositionForm(form),
              siegeEngines: Math.max(0, Number(form.siegeEngines.value || 0)),
              followCharacter: form.followCharacter.checked
            });
          }},
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "save"
      }, { width: 780, height: 820, resizable: true }).render(true);
    });
    if (!result) return null;
    const totalStrength = getArmyTotalStrength(result.composition);
    if (totalStrength <= 0) { ui.notifications.warn("Add at least one troop type to summon an army."); return null; }
    if (totalStrength > maxMen) { ui.notifications.error(`Army is too large: ${totalStrength.toLocaleString()} men selected, but only ${maxMen.toLocaleString()} are available under the command/manpower cap.`); return null; }
    for (const troop of ARMY_TROOP_TYPES) {
      if (troop.key === "Mob") continue;
      const selected = Number(result.composition[troop.key] || 0);
      const available = Number(training.available[troop.key] || 0);
      if (selected > available) {
        ui.notifications.error(`${troop.label} exceeds available training capacity: ${selected.toLocaleString()} selected, ${available.toLocaleString()} available from your military buildings.`);
        return null;
      }
    }
    const upkeep = calculateArmyUpkeep(result.composition);
    return {
      id: foundry.utils.randomID(16),
      status: "pending",
      armyName: result.armyName || `${character.characterName || piece.name}'s Host`,
      linkedCharacterId: character.characterId,
      linkedCharacterName: character.characterName || piece.name || characterToken.document.name,
      requesterUserId: game.user.id,
      requesterUserName: game.user.name,
      ownerUserId: getCharacterControllerIdentity(characterToken, game.user.id, game.user.name).id || game.user.id,
      ownerUserName: getCharacterControllerIdentity(characterToken, game.user.id, game.user.name).name || game.user.name,
      house: character.house || piece.house || piece.faction || "",
      composition: result.composition,
      totalStrength,
      strengthMax: totalStrength,
      strengthCurrent: totalStrength,
      upkeep,
      siegeEngines: result.siegeEngines,
      followCharacter: result.followCharacter,
      currentTileId: getTileId(entry),
      currentTileName: getTileName(entry),
      currentRegion: entry.tile?.region || "",
      requestedRoundKey: getRoundKey(getClock()),
      requestedDateLabel: getDateLabel(getClock()),
      readyRoundKey: getRoundKey(getNextClockData(getClock())),
      readyDateLabel: getDateLabel(getNextClockData(getClock())),
      requestedAt: new Date().toISOString()
    };
  }

  async function summonArmy() {
    if (!requireOverviewScene()) return;
    const selected = canvas.tokens.controlled.filter(token => isCharacterToken(token));
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one character token to summon an army."); return; }
    const token = selected[0];
    const piece = getWorldPiece(token);
    if (!canUserControlWorldPiece(token, piece)) { ui.notifications.warn("You can only summon armies from characters you control."); return; }
    const muster = await createArmyMusterRequestForCharacter(token);
    if (!muster) return;
    if (!game.user.isGM) {
      const gm = findActiveGmForScene(canvas.scene?.id);
      if (!gm) { ui.notifications.warn("No active GM online to receive this army muster request."); return; }
      game.socket.emit(SOCKET_NAME, { type: "armyMusterRequest", targetGmId: gm.id, sceneId: canvas.scene?.id, requesterUserId: game.user.id, requesterUserName: game.user.name, tokenId: token.document.id, tokenName: token.document.name, muster });
      ui.notifications.info(`Army muster request sent to GM ${gm.name}.`);
      return;
    }
    try { await reserveManpowerForMuster(token, muster); } catch (err) { ui.notifications.error(err.message || "Could not reserve manpower."); return; }
    await savePendingArmyMuster(token, muster);
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "Crown Armies" }), content: `<h2>Army Muster Requested</h2><p><strong>Commander:</strong> ${escapeHtml(muster.linkedCharacterName)}</p><p><strong>Army:</strong> ${escapeHtml(muster.armyName)}</p><p><strong>Strength:</strong> ${escapeHtml(muster.totalStrength.toLocaleString())}</p><p><strong>Composition:</strong> ${escapeHtml(armyCompositionText(muster.composition))}</p><p><strong>Upkeep:</strong> ${escapeHtml(resourceMapToText(muster.upkeep))}</p><p><strong>Ready:</strong> ${escapeHtml(muster.readyDateLabel || "next round")}</p>` });
  }

  function getConnectedSeaEntriesForPort(entry) {
    if (!entry?.tile || !isActivePort(entry.tile)) return [];
    return getPortSeaIds(entry.tile)
      .map(id => getEntryById(id))
      .filter(seaEntry => seaEntry && isSeaTile(seaEntry.tile));
  }

  function buildConnectedSeaOptionsForPort(entry, selectedId = "") {
    return getConnectedSeaEntriesForPort(entry).map(seaEntry => {
      const id = getTileId(seaEntry);
      const label = `${getTileName(seaEntry)}${seaEntry.tile.region ? " — " + seaEntry.tile.region : ""}`;
      return `<option value="${escapeHtml(id)}" ${String(id) === String(selectedId) ? "selected" : ""}>${escapeHtml(label)}</option>`;
    }).join("");
  }

  async function moveTokenToTileEntryAndSave(token, piece, entry, { lock = false, reason = "Strategic movement", embarkedFleetTokenId = "", embarkedFleetName = "" } = {}) {
    if (!token || !entry?.tile) return null;
    const updatedPiece = foundry.utils.deepClone(piece || getWorldPiece(token) || {});
    updatedPiece.previousTileId = updatedPiece.currentTileId || "";
    updatedPiece.previousTileName = updatedPiece.currentTileName || "";
    updatedPiece.currentTileId = getTileId(entry);
    updatedPiece.currentTileName = getTileName(entry);
    updatedPiece.currentRegion = entry.tile.region || "";
    updatedPiece.lastMovedAt = new Date().toISOString();
    updatedPiece.lastMovedBy = game.user.name;
    updatedPiece.lastMovedSource = reason;
    if (lock) {
      updatedPiece.movementUsed = Math.max(Number(updatedPiece.movementUsed || 0), Number(updatedPiece.movementMax || 0));
      updatedPiece.movementLockedRoundKey = getCurrentActionRoundKey();
      updatedPiece.movementLockedReason = reason;
      updatedPiece.movementLockedAt = new Date().toISOString();
      updatedPiece.movementLockedBy = game.user.name;
    }
    await saveWorldPiece(token, updatedPiece);

    if (isCharacterToken(token)) {
      const character = foundry.utils.deepClone(getCharacterDataFromToken(token) || {});
      character.currentTileId = updatedPiece.currentTileId;
      character.currentTileName = updatedPiece.currentTileName;
      character.currentRegion = updatedPiece.currentRegion;
      if (embarkedFleetTokenId) character.embarkedFleetTokenId = embarkedFleetTokenId;
      if (embarkedFleetName) character.embarkedFleetName = embarkedFleetName;
      await token.document.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, character);
      if (token.actor) await token.actor.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, foundry.utils.deepClone(character));
    }

    const position = getTokenTopLeftForTileSlot(token, entry);
    await token.document.update({ x: position.x, y: position.y }, { animate: true, worldMovementBypass: true, bypassWorldMovementWatcher: true, navyLaunchBypass: true });
    return updatedPiece;
  }

  async function launchNavyFromMuster(characterToken, muster) {
    const spawned = await spawnNavyTokenFromMuster(characterToken, muster);
    const seaEntry = spawned.entry;
    const characterPiece = getWorldPiece(characterToken) || {};
    await moveTokenToTileEntryAndSave(characterToken, characterPiece, seaEntry, {
      lock: true,
      reason: "Summoned a navy and embarked this turn.",
      embarkedFleetTokenId: spawned.tokenDocument?.id || "",
      embarkedFleetName: spawned.piece?.name || muster.navyName || "Fleet"
    });
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Navies" }),
      content: `<h2>Navy Launched</h2><p><strong>Commander:</strong> ${escapeHtml(muster.linkedCharacterName)}</p><p><strong>Navy:</strong> ${escapeHtml(muster.navyName)}</p><p><strong>Starting Sea Tile:</strong> ${escapeHtml(getTileName(seaEntry))}</p><p><strong>Ships:</strong> ${escapeHtml(Number(muster.totalShips || 0).toLocaleString())}</p><p><strong>Composition:</strong> ${escapeHtml(navyCompositionText(muster.shipComposition || muster.composition || {}))}</p><p><strong>Upkeep:</strong> ${escapeHtml(resourceMapToText(muster.upkeep))}</p><p><strong>Movement:</strong> The commander and fleet have committed their action and cannot move again until movement resets.</p>`
    });
    return spawned;
  }

  async function createNavyMusterRequestForCharacter(characterToken) {
    const character = getCharacterDataFromToken(characterToken);
    const piece = getWorldPiece(characterToken);
    const navalMovement = getCharacterNavalMovementValue(characterToken);
    const command = getNavyCommandCapacity(characterToken);
    const shipCapacity = getHouseShipCapacitySummaryForCharacter(characterToken);
    const drydockLevel = getHouseDrydockLevelForCharacter(characterToken);
    const unlockedShipTypes = getUnlockedNavyShipTypes(characterToken);
    const maxShips = Math.min(command.ships, shipCapacity.available);
    if (!character?.characterId) { ui.notifications.warn("This character is missing a Character ID. Edit/import the character first."); return null; }
    if (getExistingNavyForCharacter(character.characterId)) { ui.notifications.warn(`${character.characterName || piece.name} already has a navy token.`); return null; }
    const existingPending = getPendingNavyMuster(characterToken);
    if (existingPending?.status === "pending") { ui.notifications.warn(`${character.characterName || piece.name} already has a pending navy muster.`); return null; }
    const entry = getCurrentTileEntryForToken(characterToken, piece);
    if (!entry) { ui.notifications.warn("The selected character is not currently in a world tile."); return null; }
    if (!isActivePort(entry.tile)) { ui.notifications.warn("Summon Navy can only be used from an active Port tile."); return null; }
    const seaEntries = getConnectedSeaEntriesForPort(entry);
    if (!seaEntries.length) { ui.notifications.warn(`${getTileName(entry)} is a port, but it has no linked sea tile. Use Make / Edit Port first.`); return null; }
    const defaultSeaId = getTileId(seaEntries[0]);

    const result = await new Promise(resolve => {
      new Dialog({
        title: `Summon Navy — ${character.characterName || piece.name}`,
        content: `<form>
          <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;">
            <strong>Commander:</strong> ${escapeHtml(character.characterName || piece.name)}<br>
            <strong>Martial:</strong> ${escapeHtml(command.martial)}<br>
            <strong>Naval Movement:</strong> ${escapeHtml(navalMovement)}<br>
            <strong>Command Capacity:</strong> ${escapeHtml(command.mobEquivalent.toLocaleString())} Mob-equivalent = ${escapeHtml(command.ships.toLocaleString())} ship(s)<br>
            <strong>House Ship Capacity:</strong> ${escapeHtml(shipCapacity.available.toLocaleString())} available / ${escapeHtml(shipCapacity.max.toLocaleString())} total across ${escapeHtml(shipCapacity.entries.length)} province(s) (${escapeHtml(shipCapacity.committed.toLocaleString())} already fielded)<br>
            <strong>Maximum Fleet Size:</strong> ${escapeHtml(maxShips.toLocaleString())} ship(s)<br>
            <strong>Naval Infrastructure:</strong> Level ${escapeHtml(drydockLevel)} — ${escapeHtml(getDrydockUnlockSummary(drydockLevel))}<br>
            <strong>Port:</strong> ${escapeHtml(getTileName(entry))}<br>
            <strong>Available Sea Tiles:</strong> ${escapeHtml(seaEntries.map(getTileName).join(", "))}<br>
            <span class="notes">The navy launches immediately into the selected sea tile. The commander embarks and cannot move again until movement resets.</span>
          </div>
          <div class="form-group"><label>Starting Sea Tile</label><select name="startingSeaTileId" style="width:100%;">${buildConnectedSeaOptionsForPort(entry, defaultSeaId)}</select></div>
          <div class="form-group"><label>Navy Name</label><input type="text" name="navyName" value="${escapeHtml(character.characterName || piece.name)}'s Fleet" style="width:100%;" /></div>
          <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:8px;">${buildNavyCompositionInputs(maxShips, unlockedShipTypes)}</div>
          <div class="form-group"><label><input type="checkbox" name="carryCharacter" checked /> Fleet carries linked character when moved</label></div>
        </form>`,
        buttons: {
          save: { label: "Launch Navy", callback: html => {
            const form = html[0].querySelector("form");
            resolve({ navyName: String(form.navyName.value || "").trim(), composition: readNavyCompositionForm(form), carryCharacter: form.carryCharacter.checked, startingSeaTileId: String(form.startingSeaTileId.value || defaultSeaId) });
          }},
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "save"
      }, { width: 820, height: 830, resizable: true }).render(true);
    });
    if (!result) return null;
    const totalShips = getNavyTotalShips(result.composition);
    if (totalShips <= 0) {
      if (drydockLevel <= 0) ui.notifications.warn("This House has no Shipwright. Build the first Drydock level before fielding ships.");
      else ui.notifications.warn("Add at least one ship to summon a navy.");
      return null;
    }
    try { validateNavyShipClassUnlocks(characterToken, result.composition); } catch (err) { ui.notifications.error(err.message); return null; }
    if (totalShips > maxShips) {
      ui.notifications.error(`Fleet is too large: ${totalShips.toLocaleString()} ships selected, but this commander/House can currently field only ${maxShips.toLocaleString()}.`);
      return null;
    }
    const seaEntry = getEntryById(result.startingSeaTileId);
    if (!seaEntry || !isSeaTile(seaEntry.tile)) { ui.notifications.error("Could not find the selected starting sea tile."); return null; }
    const upkeep = calculateNavyUpkeep(result.composition);
    return {
      id: foundry.utils.randomID(16),
      status: "launch",
      forceType: "fleet",
      navyName: result.navyName || `${character.characterName || piece.name}'s Fleet`,
      linkedCharacterId: character.characterId,
      linkedCharacterName: character.characterName || piece.name || characterToken.document.name,
      requesterUserId: game.user.id,
      requesterUserName: game.user.name,
      ownerUserId: getCharacterControllerIdentity(characterToken, game.user.id, game.user.name).id || game.user.id,
      ownerUserName: getCharacterControllerIdentity(characterToken, game.user.id, game.user.name).name || game.user.name,
      house: character.house || piece.house || piece.faction || "",
      shipComposition: result.composition,
      composition: result.composition,
      totalShips,
      shipCapacityAtRequest: shipCapacity.max,
      shipCapacityAvailableAtRequest: shipCapacity.available,
      commandShipCapacity: command.ships,
      commandMobEquivalent: command.mobEquivalent,
      strengthMax: totalShips,
      strengthCurrent: totalShips,
      totalStrength: totalShips,
      upkeep,
      carryCharacter: result.carryCharacter,
      followCharacter: result.carryCharacter,
      movementMax: Math.max(1, Number(navalMovement || 3)),
      movementUsed: Math.max(1, Number(navalMovement || 3)),
      lockMovementOnSummon: true,
      launchPortId: getTileId(entry),
      launchPortName: getTileName(entry),
      currentTileId: getTileId(seaEntry),
      currentTileName: getTileName(seaEntry),
      currentRegion: seaEntry.tile?.region || "",
      requestedRoundKey: getRoundKey(getClock()),
      requestedDateLabel: getDateLabel(getClock()),
      readyRoundKey: getRoundKey(getClock()),
      readyDateLabel: getDateLabel(getClock()),
      requestedAt: new Date().toISOString()
    };
  }

  async function summonNavy() {
    if (!requireOverviewScene()) return;
    const selected = canvas.tokens.controlled.filter(token => isCharacterToken(token));
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one character token to summon a navy."); return; }
    const token = selected[0];
    const piece = getWorldPiece(token);
    if (!canUserControlWorldPiece(token, piece)) { ui.notifications.warn("You can only summon navies from characters you control."); return; }
    const lockedReason = strategicMovementLockReason(piece);
    if (lockedReason) { ui.notifications.warn(lockedReason); return; }
    const muster = await createNavyMusterRequestForCharacter(token);
    if (!muster) return;
    if (!game.user.isGM) {
      const gm = findActiveGmForScene(canvas.scene?.id);
      if (!gm) { ui.notifications.warn("No active GM online to launch this navy."); return; }
      game.socket.emit(SOCKET_NAME, { type: "navyLaunchRequest", targetGmId: gm.id, sceneId: canvas.scene?.id, requesterUserId: game.user.id, requesterUserName: game.user.name, tokenId: token.document.id, tokenName: token.document.name, muster });
      ui.notifications.info(`Navy launch request sent to GM ${gm.name}.`);
      return;
    }
    try { validateNavyFieldingCapacity(token, muster); } catch (err) { ui.notifications.error(err.message || "Could not field this navy."); return; }
    await launchNavyFromMuster(token, muster);
    revealForCurrentPlayerPieces();
  }

  async function handleArmyMusterRequest(message) {
    if (!game.user.isGM) return;
    if (message.targetGmId && String(message.targetGmId) !== String(game.user.id)) return;
    if (message.sceneId && String(message.sceneId) !== String(canvas.scene?.id)) return;
    const token = canvas.tokens.placeables.find(token => token.document.id === message.tokenId);
    if (!token) { ui.notifications.warn(`Army muster request failed: ${message.tokenName || message.tokenId} not found.`); return; }
    try { await reserveManpowerForMuster(token, message.muster); } catch (err) { ui.notifications.error(err.message || "Could not reserve manpower for army muster."); return; }
    await savePendingArmyMuster(token, message.muster);
    ui.notifications.info(`Received army muster request from ${message.requesterUserName}.`);
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "Crown Armies" }), content: `<h2>Army Muster Requested</h2><p><strong>Player:</strong> ${escapeHtml(message.requesterUserName || "Unknown")}</p><p><strong>Commander:</strong> ${escapeHtml(message.muster?.linkedCharacterName || token.document.name)}</p><p><strong>Army:</strong> ${escapeHtml(message.muster?.armyName || "Host")}</p><p><strong>Strength:</strong> ${escapeHtml(Number(message.muster?.totalStrength || 0).toLocaleString())}</p><p>Use <strong>Process Army Musters</strong> after one turn to spawn the army token.</p>` });
  }

  function validateNavyFieldingCapacity(characterToken, muster) {
    const command = getNavyCommandCapacity(characterToken);
    const shipCapacity = getHouseShipCapacitySummaryForCharacter(characterToken, muster?.linkedCharacterId || "");
    const composition = muster?.shipComposition || muster?.composition || {};
    const classAccess = validateNavyShipClassUnlocks(characterToken, composition);
    const totalShips = Math.max(0, Math.floor(Number(muster?.totalShips || getNavyTotalShips(composition))));
    const maxShips = Math.min(command.ships, shipCapacity.available);
    if (totalShips > command.ships) throw new Error(`Commander capacity exceeded: ${totalShips.toLocaleString()} ships requested, but Martial ${command.martial} can command ${command.ships.toLocaleString()} ship(s) (${command.mobEquivalent.toLocaleString()} Mob-equivalent).`);
    if (totalShips > shipCapacity.available) throw new Error(`House ship capacity exceeded: ${totalShips.toLocaleString()} ships requested, but only ${shipCapacity.available.toLocaleString()} of ${shipCapacity.max.toLocaleString()} ship-capacity is available.`);
    return { command, shipCapacity, classAccess, maxShips, totalShips };
  }

  async function handleNavyMusterRequest(message) {
    if (!game.user.isGM) return;
    if (message.targetGmId && String(message.targetGmId) !== String(game.user.id)) return;
    if (message.sceneId && String(message.sceneId) !== String(canvas.scene?.id)) return;
    const token = canvas.tokens.placeables.find(token => token.document.id === message.tokenId);
    if (!token) { ui.notifications.warn(`Navy request failed: ${message.tokenName || message.tokenId} not found.`); return; }
    try {
      validateNavyFieldingCapacity(token, message.muster);
      if (message.type === "navyLaunchRequest" || message.muster?.status === "launch") {
        await launchNavyFromMuster(token, message.muster);
        ui.notifications.info(`Launched navy request from ${message.requesterUserName}.`);
        revealForCurrentPlayerPieces();
        return;
      }
      await savePendingNavyMuster(token, message.muster);
      ui.notifications.info(`Received navy muster request from ${message.requesterUserName}.`);
      await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "Crown Navies" }), content: `<h2>Navy Muster Requested</h2><p><strong>Player:</strong> ${escapeHtml(message.requesterUserName || "Unknown")}</p><p><strong>Commander:</strong> ${escapeHtml(message.muster?.linkedCharacterName || token.document.name)}</p><p><strong>Navy:</strong> ${escapeHtml(message.muster?.navyName || "Fleet")}</p><p><strong>Ships:</strong> ${escapeHtml(Number(message.muster?.totalShips || 0).toLocaleString())}</p><p>Use <strong>Process Military Musters</strong> after one turn to spawn the fleet token.</p>` });
    } catch (err) {
      console.error("Navy request failed", err, message);
      ui.notifications.error(err.message || "Navy request failed.");
    }
  }

  async function spawnArmyTokenFromMuster(characterToken, muster) {
    const character = getCharacterDataFromToken(characterToken) || {};
    const characterPiece = getWorldPiece(characterToken) || {};
    const entry = getTileEntryByNameOrId(muster.currentTileId) || getTileEntryByNameOrId(muster.currentTileName) || getCurrentTileEntryForToken(characterToken, characterPiece);
    if (!entry) throw new Error(`Could not find muster tile for ${muster.armyName}.`);
    const ownerUser = getUserByIdOrName(muster.ownerUserId, muster.ownerUserName) || getUserByIdOrName(character.playerUserId, character.playerName);
    const image = DEFAULT_IMAGES.army;
    const folder = await getOrCreateWorldMapFolder();
    const actorType = getSafeActorType();
    const now = new Date().toISOString();
    const armyPiece = {
      name: muster.armyName,
      pieceType: "army",
      faction: muster.house || character.house || characterPiece.faction || "",
      house: muster.house || character.house || "",
      linkedCharacterId: muster.linkedCharacterId || character.characterId,
      linkedCharacterName: muster.linkedCharacterName || character.characterName || characterPiece.name,
      commanderCharacterId: muster.linkedCharacterId || character.characterId,
      commanderName: muster.linkedCharacterName || character.characterName || characterPiece.name,
      commanderMartial: getCharacterMartialValue(characterToken),
      composition: muster.composition || {},
      strengthMax: Number(muster.strengthMax || muster.totalStrength || 0),
      strengthCurrent: Number(muster.strengthCurrent || muster.totalStrength || 0),
      totalStrength: Number(muster.totalStrength || 0),
      upkeep: muster.upkeep || calculateArmyUpkeep(muster.composition || {}),
      siegeEngines: Number(muster.siegeEngines || 0),
      followCharacter: muster.followCharacter !== false,
      detached: false,
      siegeTurns: 1,
      movementMax: Number(characterPiece.movementMax || character.landMovement || 3),
      movementUsed: 0,
      allowedTileTypes: getAllowedTileTypes("army"),
      currentTileId: getTileId(entry),
      currentTileName: getTileName(entry),
      currentRegion: entry.tile?.region || "",
      ownerUserId: ownerUser?.id || muster.ownerUserId || "",
      ownerUserName: ownerUser?.name || muster.ownerUserName || "",
      playerOwnerUserId: ownerUser?.id || muster.ownerUserId || "",
      playerOwnerUserName: ownerUser?.name || muster.ownerUserName || "",
      status: "Active",
      version: `Crown Overview Tools ${MODULE_VERSION}`,
      musteredAt: now,
      musteredBy: game.user.name,
      manpowerReserved: Number(muster.manpowerReserved || muster.totalStrength || 0)
    };
    const actor = await Actor.create({
      name: muster.armyName,
      type: actorType,
      folder: folder.id,
      img: image,
      flags: { [FLAG_SCOPE]: { [WORLD_PIECE_KEY]: foundry.utils.deepClone(armyPiece) } },
      prototypeToken: {
        name: muster.armyName,
        actorLink: true,
        width: 1,
        height: 1,
        disposition: CONST.TOKEN_DISPOSITIONS.FRIENDLY,
        sight: { enabled: true },
        texture: { src: image },
        flags: { [FLAG_SCOPE]: { [WORLD_PIECE_KEY]: foundry.utils.deepClone(armyPiece) } }
      }
    });
    if (ownerUser) {
      const ownership = foundry.utils.deepClone(actor.ownership || {});
      for (const user of getPlayerUsers()) ownership[user.id] = CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE;
      ownership[ownerUser.id] = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
      await actor.update({ ownership });
    }
    const center = getDrawingCenter(entry);
    const gridSize = getGridSize();
    const occupants = getOccupantsForTile(entry.tile, null);
    const offset = getSlotOffset(occupants.length + 1, gridSize);
    const tokenData = actor.prototypeToken.toObject();
    tokenData.actorId = actor.id;
    tokenData.actorLink = true;
    tokenData.name = muster.armyName;
    tokenData.x = Math.round(center.x + offset.x - gridSize / 2);
    tokenData.y = Math.round(center.y + offset.y - gridSize / 2);
    tokenData.width = 1;
    tokenData.height = 1;
    tokenData.hidden = false;
    tokenData.texture = tokenData.texture || {};
    tokenData.texture.src = image;
    tokenData.flags = tokenData.flags || {};
    tokenData.flags[FLAG_SCOPE] = tokenData.flags[FLAG_SCOPE] || {};
    tokenData.flags[FLAG_SCOPE][WORLD_PIECE_KEY] = foundry.utils.deepClone(armyPiece);
    const created = await canvas.scene.createEmbeddedDocuments("Token", [tokenData]);
    return { actor, tokenDocument: created?.[0], piece: armyPiece, entry };
  }

  async function spawnNavyTokenFromMuster(characterToken, muster) {
    const character = getCharacterDataFromToken(characterToken) || {};
    const characterPiece = getWorldPiece(characterToken) || {};
    const entry = getTileEntryByNameOrId(muster.currentTileId) || getTileEntryByNameOrId(muster.currentTileName) || getCurrentTileEntryForToken(characterToken, characterPiece);
    if (!entry) throw new Error(`Could not find muster tile for ${muster.navyName}.`);
    const ownerUser = getUserByIdOrName(muster.ownerUserId, muster.ownerUserName) || getUserByIdOrName(character.playerUserId, character.playerName);
    const image = DEFAULT_IMAGES.fleet;
    const folder = await getOrCreateWorldMapFolder();
    const actorType = getSafeActorType();
    const now = new Date().toISOString();
    const composition = muster.shipComposition || muster.composition || {};
    const totalShips = Number(muster.totalShips || getNavyTotalShips(composition));
    const fleetPiece = {
      name: muster.navyName || `${character.characterName || characterPiece.name}'s Fleet`,
      pieceType: "fleet",
      forceType: "navy",
      faction: muster.house || character.house || characterPiece.faction || "",
      house: muster.house || character.house || "",
      linkedCharacterId: muster.linkedCharacterId || character.characterId,
      linkedCharacterName: muster.linkedCharacterName || character.characterName || characterPiece.name,
      commanderCharacterId: muster.linkedCharacterId || character.characterId,
      commanderName: muster.linkedCharacterName || character.characterName || characterPiece.name,
      shipComposition: composition,
      composition,
      totalShips,
      strengthMax: totalShips,
      strengthCurrent: Number(muster.strengthCurrent || totalShips),
      totalStrength: totalShips,
      upkeep: muster.upkeep || calculateNavyUpkeep(composition),
      carryCharacter: muster.carryCharacter !== false,
      followCharacter: muster.followCharacter !== false,
      detached: false,
      movementMax: Number(muster.movementMax || getCharacterNavalMovementValue(characterToken) || 3),
      movementUsed: 0,
      allowedTileTypes: getAllowedTileTypes("fleet"),
      currentTileId: getTileId(entry),
      currentTileName: getTileName(entry),
      currentRegion: entry.tile?.region || "",
      ownerUserId: ownerUser?.id || muster.ownerUserId || "",
      ownerUserName: ownerUser?.name || muster.ownerUserName || "",
      playerOwnerUserId: ownerUser?.id || muster.ownerUserId || "",
      playerOwnerUserName: ownerUser?.name || muster.ownerUserName || "",
      status: "Active",
      version: `Crown Overview Tools ${MODULE_VERSION}`,
      musteredAt: now,
      musteredBy: game.user.name
    };
    if (muster.lockMovementOnSummon) {
      fleetPiece.movementUsed = Math.max(Number(fleetPiece.movementUsed || 0), Number(fleetPiece.movementMax || 0));
      fleetPiece.movementLockedRoundKey = getCurrentActionRoundKey();
      fleetPiece.movementLockedReason = "Summoned / launched navy this turn.";
      fleetPiece.movementLockedAt = now;
      fleetPiece.movementLockedBy = game.user.name;
    }
    const actor = await Actor.create({
      name: fleetPiece.name,
      type: actorType,
      folder: folder.id,
      img: image,
      flags: { [FLAG_SCOPE]: { [WORLD_PIECE_KEY]: foundry.utils.deepClone(fleetPiece) } },
      prototypeToken: { name: fleetPiece.name, actorLink: true, width: 1, height: 1, disposition: CONST.TOKEN_DISPOSITIONS.FRIENDLY, sight: { enabled: true }, texture: { src: image }, flags: { [FLAG_SCOPE]: { [WORLD_PIECE_KEY]: foundry.utils.deepClone(fleetPiece) } } }
    });
    if (ownerUser) {
      const ownership = foundry.utils.deepClone(actor.ownership || {});
      for (const user of getPlayerUsers()) ownership[user.id] = CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE;
      ownership[ownerUser.id] = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
      await actor.update({ ownership });
    }
    const center = getDrawingCenter(entry);
    const gridSize = getGridSize();
    const occupants = getOccupantsForTile(entry.tile, null);
    const offset = getSlotOffset(occupants.length + 1, gridSize);
    const tokenData = actor.prototypeToken.toObject();
    tokenData.actorId = actor.id;
    tokenData.actorLink = true;
    tokenData.name = fleetPiece.name;
    tokenData.x = Math.round(center.x + offset.x - gridSize / 2);
    tokenData.y = Math.round(center.y + offset.y - gridSize / 2);
    tokenData.width = 1;
    tokenData.height = 1;
    tokenData.hidden = false;
    tokenData.texture = tokenData.texture || {};
    tokenData.texture.src = image;
    tokenData.flags = tokenData.flags || {};
    tokenData.flags[FLAG_SCOPE] = tokenData.flags[FLAG_SCOPE] || {};
    tokenData.flags[FLAG_SCOPE][WORLD_PIECE_KEY] = foundry.utils.deepClone(fleetPiece);
    const created = await canvas.scene.createEmbeddedDocuments("Token", [tokenData]);
    return { actor, tokenDocument: created?.[0], piece: fleetPiece, entry };
  }

  async function processArmyMusters() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can process military musters."); return; }
    let processed = 0, skipped = 0, failed = 0;
    const rows = [];
    for (const characterToken of getCharacterTokens()) {
      const character = getCharacterDataFromToken(characterToken) || {};
      const armyMuster = getPendingArmyMuster(characterToken);
      if (armyMuster && armyMuster.status === "pending") {
        if (getExistingArmyForCharacter(armyMuster.linkedCharacterId || character.characterId)) skipped++;
        else {
          try {
            const spawned = await spawnArmyTokenFromMuster(characterToken, armyMuster);
            const done = { ...armyMuster, status: "spawned", spawnedAt: new Date().toISOString(), spawnedBy: game.user.name, armyTokenId: spawned.tokenDocument?.id || "" };
            await savePendingArmyMuster(characterToken, done);
            processed++;
            rows.push(`<li><strong>${escapeHtml(done.armyName)}</strong> — ${escapeHtml(done.totalStrength.toLocaleString())} men at ${escapeHtml(spawned.entry ? getTileName(spawned.entry) : done.currentTileName)}</li>`);
          } catch (err) { failed++; console.error("Army muster failed", characterToken, armyMuster, err); }
        }
      }
      const navyMuster = getPendingNavyMuster(characterToken);
      if (navyMuster && navyMuster.status === "pending") {
        if (getExistingNavyForCharacter(navyMuster.linkedCharacterId || character.characterId)) skipped++;
        else {
          try {
            const spawned = await spawnNavyTokenFromMuster(characterToken, navyMuster);
            const done = { ...navyMuster, status: "spawned", spawnedAt: new Date().toISOString(), spawnedBy: game.user.name, navyTokenId: spawned.tokenDocument?.id || "" };
            await savePendingNavyMuster(characterToken, done);
            processed++;
            rows.push(`<li><strong>${escapeHtml(done.navyName || spawned.piece.name)}</strong> — ${escapeHtml(Number(done.totalShips || 0).toLocaleString())} ships at ${escapeHtml(spawned.entry ? getTileName(spawned.entry) : done.currentTileName)}</li>`);
          } catch (err) { failed++; console.error("Navy muster failed", characterToken, navyMuster, err); }
        }
      }
    }
    ui.notifications.info(`Processed ${processed} military muster(s). ${skipped ? `${skipped} skipped. ` : ""}${failed ? `${failed} failed.` : ""}`);
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "Crown Musters" }), content: `<h2>Military Musters Processed</h2><p><strong>Spawned:</strong> ${escapeHtml(processed)}</p><p><strong>Skipped:</strong> ${escapeHtml(skipped)}</p><p><strong>Failed:</strong> ${escapeHtml(failed)}</p>${rows.length ? `<ul>${rows.join("")}</ul>` : ""}` });
    revealForCurrentPlayerPieces();
  }

  async function moveLinkedArmyToCharacter(characterToken, characterPiece, destinationEntry) {
    if (!characterToken || normalize(characterPiece?.pieceType) !== "character" || !destinationEntry?.tile) return;
    const character = getCharacterDataFromToken(characterToken) || {};
    const characterId = character.characterId || characterPiece.characterId;
    if (!characterId) return;
    const linkedArmies = getArmyTokens().filter(token => {
      const army = getWorldPiece(token) || {};
      return String(army.linkedCharacterId || army.commanderCharacterId || "") === String(characterId) && army.followCharacter !== false && !army.detached && !army.siegeStatus;
    });
    for (const armyToken of linkedArmies) {
      const army = foundry.utils.deepClone(getWorldPiece(armyToken) || {});
      army.previousTileId = army.currentTileId;
      army.previousTileName = army.currentTileName;
      army.currentTileId = getTileId(destinationEntry);
      army.currentTileName = getTileName(destinationEntry);
      army.currentRegion = destinationEntry.tile?.region || "";
      army.lastMovedAt = new Date().toISOString();
      army.lastMovedBy = game.user.name;
      army.lastMovedSource = `Following ${character.characterName || characterPiece.name}`;
      await saveWorldPiece(armyToken, army);
      const pos = getTokenTopLeftForTileSlot(armyToken, destinationEntry);
      await armyToken.document.update({ x: pos.x, y: pos.y }, { animate: true, worldMovementBypass: true, bypassWorldMovementWatcher: true, followCharacterBypass: true });
    }
  }

  async function moveLinkedCharacterWithFleet(fleetToken, fleetPiece, destinationEntry) {
    if (!fleetToken || normalize(fleetPiece?.pieceType) !== "fleet" || !destinationEntry?.tile) return;
    if (fleetPiece.carryCharacter === false || fleetPiece.followCharacter === false || fleetPiece.detached) return;
    const characterId = fleetPiece.linkedCharacterId || fleetPiece.commanderCharacterId;
    if (!characterId) return;
    const characterToken = getCharacterTokenById(characterId);
    if (!characterToken) return;
    const character = foundry.utils.deepClone(getCharacterDataFromToken(characterToken) || {});
    const characterPiece = foundry.utils.deepClone(getWorldPiece(characterToken) || {});
    character.currentTileId = getTileId(destinationEntry);
    character.currentTileName = getTileName(destinationEntry);
    character.currentRegion = destinationEntry.tile?.region || "";
    character.embarkedFleetTokenId = fleetToken.document.id;
    character.embarkedFleetName = fleetPiece.name || fleetToken.document.name;
    characterPiece.previousTileId = characterPiece.currentTileId;
    characterPiece.previousTileName = characterPiece.currentTileName;
    characterPiece.currentTileId = character.currentTileId;
    characterPiece.currentTileName = character.currentTileName;
    characterPiece.currentRegion = character.currentRegion;
    characterPiece.embarkedFleetTokenId = fleetToken.document.id;
    characterPiece.embarkedFleetName = fleetPiece.name || fleetToken.document.name;
    characterPiece.lastMovedAt = new Date().toISOString();
    characterPiece.lastMovedBy = game.user.name;
    characterPiece.lastMovedSource = `Carried by ${fleetPiece.name || fleetToken.document.name}`;
    await characterToken.document.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, character);
    if (characterToken.actor) await characterToken.actor.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, foundry.utils.deepClone(character));
    await saveWorldPiece(characterToken, characterPiece);
    const pos = getTokenTopLeftForTileSlot(characterToken, destinationEntry);
    await characterToken.document.update({ x: pos.x, y: pos.y }, { animate: true, worldMovementBypass: true, bypassWorldMovementWatcher: true, fleetCarryBypass: true });
  }

  function getSceneTokenById(tokenId) {
    const id = String(tokenId || "").trim();
    if (!id) return null;
    return canvas.tokens.get(id) || canvas.tokens.placeables.find(token => String(token.document.id) === id) || null;
  }

  function getPieceOwnerId(piece = {}) {
    return String(piece.ownerUserId || piece.playerOwnerUserId || piece.controllerPlayerUserId || "").trim();
  }

  function getPieceOwnerName(piece = {}) {
    return String(piece.ownerUserName || piece.playerOwnerUserName || piece.controllerPlayerName || "").trim();
  }

  function isArmyPieceToken(token) {
    return normalize(getWorldPiece(token)?.pieceType) === "army";
  }

  function isFleetPieceToken(token) {
    return normalize(getWorldPiece(token)?.pieceType) === "fleet";
  }

  function getArmyCommanderToken(armyPiece = {}) {
    return getCharacterTokenById(armyPiece.linkedCharacterId || armyPiece.commanderCharacterId || "");
  }

  function getArmyTokenForCommander(characterToken) {
    const character = getCharacterDataFromToken(characterToken) || {};
    const piece = getWorldPiece(characterToken) || {};
    const id = character.characterId || piece.characterId || piece.linkedCharacterId || "";
    if (!id) return null;
    return getExistingArmyForCharacter(id);
  }

  function getFleetTokenById(tokenId) {
    const token = getSceneTokenById(tokenId);
    if (!token || !isFleetPieceToken(token)) return null;
    return token;
  }

  function getArmyTokenById(tokenId) {
    const token = getSceneTokenById(tokenId);
    if (!token || !isArmyPieceToken(token)) return null;
    return token;
  }

  function getSelectedArmyOrCommanderArmy() {
    const selectedArmies = canvas.tokens.controlled.filter(isArmyPieceToken);
    if (selectedArmies.length === 1) return selectedArmies[0];
    if (selectedArmies.length > 1) throw new Error("Select only one army, or select the character commanding the army.");
    const selectedCharacters = canvas.tokens.controlled.filter(token => isCharacterToken(token));
    if (selectedCharacters.length !== 1) throw new Error("Select one army token, or select the character who commands the army.");
    const armyToken = getArmyTokenForCommander(selectedCharacters[0]);
    if (!armyToken) throw new Error(`${getCharacterDataFromToken(selectedCharacters[0])?.characterName || selectedCharacters[0].document.name} does not have an active army token.`);
    return armyToken;
  }

  function getSeaEntriesAdjacentToEntry(entry) {
    if (!entry?.tile) return [];
    const seen = new Set();
    const results = [];
    const add = candidate => {
      if (!candidate?.tile || !isSeaTile(candidate.tile)) return;
      const id = String(getTileId(candidate) || "");
      if (!id || seen.has(id)) return;
      seen.add(id);
      results.push(candidate);
    };

    for (const id of getAdjacentIds(entry.tile)) add(getEntryById(id));
    if (isActivePort(entry.tile)) for (const seaEntry of getConnectedSeaEntriesForPort(entry)) add(seaEntry);
    return results;
  }

  function getLandEntriesAdjacentToSeaEntry(seaEntry) {
    if (!seaEntry?.tile) return [];
    const seen = new Set();
    const results = [];
    const seaId = String(getTileId(seaEntry) || "");
    const add = candidate => {
      if (!candidate?.tile || !isLandLike(candidate.tile) || isSeaTile(candidate.tile)) return;
      const id = String(getTileId(candidate) || "");
      if (!id || seen.has(id)) return;
      seen.add(id);
      results.push(candidate);
    };

    for (const id of getAdjacentIds(seaEntry.tile)) add(getEntryById(id));
    for (const entry of getWorldTileEntries()) {
      if (!isActivePort(entry.tile)) continue;
      const portSeaIds = getPortSeaIds(entry.tile).map(String);
      if (portSeaIds.includes(seaId)) add(entry);
    }
    return results.sort((a, b) => String(a.tile.region || "").localeCompare(String(b.tile.region || "")) || getTileName(a).localeCompare(getTileName(b)));
  }

  function getFleetTransportCapacity(fleetPiece = {}) {
    const composition = getNavyComposition(fleetPiece);
    const totalShips = Number(fleetPiece.strengthCurrent ?? fleetPiece.totalShips ?? getNavyTotalShips(composition) ?? 0);
    return Math.max(0, Math.floor(totalShips) * 100);
  }

  function getEmbarkedArmyTokensForFleet(fleetToken) {
    const fleetId = String(fleetToken?.document?.id || "");
    if (!fleetId) return [];
    return getArmyTokens().filter(token => {
      const army = getWorldPiece(token) || {};
      if (army.embarked !== true) return false;
      return String(army.embarkedFleetTokenId || "") === fleetId || String(army.transportFleetTokenId || "") === fleetId;
    });
  }

  function getFleetUsedTransportCapacity(fleetToken, excludeArmyTokenId = "") {
    const exclude = String(excludeArmyTokenId || "");
    return getEmbarkedArmyTokensForFleet(fleetToken).reduce((total, armyToken) => {
      if (exclude && String(armyToken.document.id) === exclude) return total;
      const army = getWorldPiece(armyToken) || {};
      return total + Math.max(0, Number(army.strengthCurrent ?? army.totalStrength ?? getArmyTotalStrength(getArmyComposition(army)) ?? 0));
    }, 0);
  }

  function getArmyCurrentStrength(piece = {}) {
    return Math.max(0, Math.floor(Number(piece.strengthCurrent ?? piece.totalStrength ?? getArmyTotalStrength(getArmyComposition(piece)) ?? 0)));
  }

  function scaleArmyCompositionToMen(composition = {}, targetMen = 0) {
    const original = getArmyTotalStrength(composition);
    const target = Math.max(0, Math.floor(Number(targetMen || 0)));
    const result = {};
    for (const troop of ARMY_TROOP_TYPES) result[troop.key] = 0;
    if (!original || !target) return result;
    if (original <= target) {
      for (const troop of ARMY_TROOP_TYPES) result[troop.key] = Math.max(0, Math.floor(Number(composition[troop.key] || 0)));
      return result;
    }

    const step = 50;
    const ratio = target / original;
    let used = 0;
    const remainders = [];
    for (const troop of ARMY_TROOP_TYPES) {
      const raw = Math.max(0, Number(composition[troop.key] || 0)) * ratio;
      const rounded = Math.min(Math.max(0, Number(composition[troop.key] || 0)), Math.floor(raw / step) * step);
      result[troop.key] = rounded;
      used += rounded;
      remainders.push({ key: troop.key, original: Math.max(0, Number(composition[troop.key] || 0)), remainder: raw - rounded });
    }

    remainders.sort((a, b) => b.remainder - a.remainder);
    while (used + step <= target) {
      const next = remainders.find(item => result[item.key] + step <= item.original);
      if (!next) break;
      result[next.key] += step;
      used += step;
      next.remainder = 0;
      remainders.sort((a, b) => b.remainder - a.remainder);
    }

    return result;
  }

  function getArmyTransportInfo(armyPiece = {}, fleetToken = null) {
    const fleetPiece = fleetToken ? getWorldPiece(fleetToken) || {} : {};
    const capacity = fleetToken ? getFleetTransportCapacity(fleetPiece) : 0;
    const used = fleetToken ? getFleetUsedTransportCapacity(fleetToken, armyPiece.tokenId || "") : 0;
    const remaining = Math.max(0, capacity - used);
    const currentMen = getArmyCurrentStrength(armyPiece);
    return { capacity, used, remaining, currentMen, embarkMen: Math.min(currentMen, remaining), surplusMen: Math.max(0, currentMen - remaining) };
  }

  function buildFleetOptionHtml(fleets, selectedId = "") {
    return fleets.map(item => {
      const fleetToken = item.token || item;
      const fleet = getWorldPiece(fleetToken) || {};
      const capacity = getFleetTransportCapacity(fleet);
      const used = getFleetUsedTransportCapacity(fleetToken);
      const remaining = Math.max(0, capacity - used);
      const entry = item.entry || getCurrentTileEntryForToken(fleetToken, fleet) || getTileById(fleet.currentTileId);
      const label = `${fleet.name || fleetToken.document.name} — ${getTileName(entry)} — ${remaining.toLocaleString()} / ${capacity.toLocaleString()} capacity free`;
      return `<option value="${escapeHtml(fleetToken.document.id)}" ${String(fleetToken.document.id) === String(selectedId) ? "selected" : ""}>${escapeHtml(label)}</option>`;
    }).join("");
  }

  function findOwnedAdjacentFleetsForArmy(armyToken, armyPiece = getWorldPiece(armyToken), actingUserId = game.user.id) {
    const armyEntry = getCurrentTileEntryForToken(armyToken, armyPiece) || getTileById(armyPiece.currentTileId);
    if (!armyEntry?.tile) return [];
    const seaIds = new Set(getSeaEntriesAdjacentToEntry(armyEntry).map(entry => String(getTileId(entry))));
    return getFleetTokens().map(token => {
      const fleet = getWorldPiece(token) || {};
      const fleetEntry = getCurrentTileEntryForToken(token, fleet) || getTileById(fleet.currentTileId);
      return { token, fleet, entry: fleetEntry };
    }).filter(item => {
      if (!item.entry?.tile || !seaIds.has(String(getTileId(item.entry)))) return false;
      if (getFleetTransportCapacity(item.fleet) - getFleetUsedTransportCapacity(item.token, armyToken.document.id) <= 0) return false;
      if (game.user.isGM) return true;
      const ownerId = getPieceOwnerId(item.fleet);
      if (ownerId && String(ownerId) === String(actingUserId || "")) return true;
      return canUserControlWorldPieceForUser(item.token, item.fleet, game.users.get(actingUserId) || game.user);
    });
  }

  function getDisembarkableArmiesForSelection() {
    const selectedArmies = canvas.tokens.controlled.filter(isArmyPieceToken);
    if (selectedArmies.length === 1) {
      const army = getWorldPiece(selectedArmies[0]) || {};
      if (army.embarkedFleetTokenId) return [selectedArmies[0]];
      throw new Error(`${army.name || selectedArmies[0].document.name} is not embarked on a navy.`);
    }
    const selectedCharacters = canvas.tokens.controlled.filter(token => isCharacterToken(token));
    if (selectedCharacters.length === 1) {
      const armyToken = getArmyTokenForCommander(selectedCharacters[0]);
      if (!armyToken) throw new Error(`${getCharacterDataFromToken(selectedCharacters[0])?.characterName || selectedCharacters[0].document.name} does not command an active army.`);
      const army = getWorldPiece(armyToken) || {};
      if (!army.embarkedFleetTokenId) throw new Error(`${army.name || armyToken.document.name} is not embarked on a navy.`);
      return [armyToken];
    }
    const selectedFleets = canvas.tokens.controlled.filter(isFleetPieceToken);
    if (selectedFleets.length === 1) {
      const armies = getEmbarkedArmyTokensForFleet(selectedFleets[0]);
      if (!armies.length) throw new Error(`${selectedFleets[0].document.name} has no embarked army.`);
      return armies;
    }
    throw new Error("Select the army, the army commander, or the carrying navy.");
  }

  async function updateCharacterEmbarkState(characterToken, destinationEntry, fleetToken, fleetPiece, { lock = true, clear = false, reason = "Embarked by navy" } = {}) {
    if (!characterToken || !destinationEntry?.tile) return;
    const character = foundry.utils.deepClone(getCharacterDataFromToken(characterToken) || {});
    const charPiece = foundry.utils.deepClone(getWorldPiece(characterToken) || {});
    const tileId = getTileId(destinationEntry);
    const tileName = getTileName(destinationEntry);
    character.currentTileId = tileId;
    character.currentTileName = tileName;
    character.currentRegion = destinationEntry.tile.region || "";
    charPiece.previousTileId = charPiece.currentTileId || "";
    charPiece.previousTileName = charPiece.currentTileName || "";
    charPiece.currentTileId = tileId;
    charPiece.currentTileName = tileName;
    charPiece.currentRegion = destinationEntry.tile.region || "";
    if (clear) {
      character.embarked = false;
      charPiece.embarked = false;
      delete character.embarkedFleetTokenId;
      delete character.embarkedFleetName;
      delete character.embarkedArmyTokenId;
      delete character.transportFleetTokenId;
      delete character.transportFleetName;
      delete character.carriedByFleetTokenId;
      delete character.carriedByFleetName;
      delete character.carriedByNavyTokenId;
      delete character.carriedByNavyName;
      delete character.fleetTokenId;
      delete character.fleetName;
      delete charPiece.embarkedFleetTokenId;
      delete charPiece.embarkedFleetName;
      delete charPiece.embarkedArmyTokenId;
      delete charPiece.transportFleetTokenId;
      delete charPiece.transportFleetName;
      delete charPiece.carriedByFleetTokenId;
      delete charPiece.carriedByFleetName;
      delete charPiece.carriedByNavyTokenId;
      delete charPiece.carriedByNavyName;
      delete charPiece.fleetTokenId;
      delete charPiece.fleetName;
    } else if (fleetToken) {
      character.embarkedFleetTokenId = fleetToken.document.id;
      character.embarkedFleetName = fleetPiece?.name || fleetToken.document.name;
      charPiece.embarkedFleetTokenId = fleetToken.document.id;
      charPiece.embarkedFleetName = fleetPiece?.name || fleetToken.document.name;
    }
    charPiece.lastMovedAt = new Date().toISOString();
    charPiece.lastMovedBy = game.user.name;
    charPiece.lastMovedSource = reason;
    if (lock) {
      charPiece.movementUsed = Math.max(Number(charPiece.movementUsed || 0), Number(charPiece.movementMax || 0));
      charPiece.movementLockedRoundKey = getCurrentActionRoundKey();
      charPiece.movementLockedReason = reason;
      charPiece.movementLockedAt = new Date().toISOString();
      charPiece.movementLockedBy = game.user.name;
    }
    await characterToken.document.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, character);
    if (characterToken.actor) await characterToken.actor.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, foundry.utils.deepClone(character));
    await saveWorldPiece(characterToken, charPiece);
    const pos = getTokenTopLeftForTileSlot(characterToken, destinationEntry);
    await characterToken.document.update({ x: pos.x, y: pos.y }, { animate: true, worldMovementBypass: true, bypassWorldMovementWatcher: true, embarkBypass: true });
  }

  async function applyEmbarkArmyToFleet(armyToken, fleetToken, { actingUserId = game.user.id, actingUserName = game.user.name } = {}) {
    const army = foundry.utils.deepClone(getWorldPiece(armyToken) || {});
    const fleet = foundry.utils.deepClone(getWorldPiece(fleetToken) || {});
    if (normalize(army.pieceType) !== "army") throw new Error("Embark Army needs an army token or its commanding character.");
    if (normalize(fleet.pieceType) !== "fleet") throw new Error("Embark Army needs a navy/fleet in an adjacent sea tile.");
    if (army.embarkedFleetTokenId) throw new Error(`${army.name || armyToken.document.name} is already embarked.`);

    const actingUser = game.users.get(actingUserId) || { id: actingUserId, name: actingUserName, isGM: false };
    if (!canUserControlWorldPieceForUser(armyToken, army, actingUser)) throw new Error(`${actingUserName} does not control ${army.name || armyToken.document.name}.`);
    if (!canUserControlWorldPieceForUser(fleetToken, fleet, actingUser)) throw new Error(`${actingUserName} does not control ${fleet.name || fleetToken.document.name}.`);

    const armyMoveLock = strategicMovementLockReason(army);
    if (armyMoveLock) throw new Error(armyMoveLock);

    const movementCommander = getArmyCommanderToken(army);
    if (movementCommander) {
      const commanderPiece = getWorldPiece(movementCommander) || {};
      const commanderMoveLock = strategicMovementLockReason(commanderPiece);
      if (commanderMoveLock) throw new Error(commanderMoveLock);
    }

    const armyEntry = getCurrentTileEntryForToken(armyToken, army) || getTileById(army.currentTileId);
    const fleetEntry = getCurrentTileEntryForToken(fleetToken, fleet) || getTileById(fleet.currentTileId);
    if (!armyEntry?.tile || !isLandLike(armyEntry.tile) || isSeaTile(armyEntry.tile)) throw new Error("The army must be on a land/port tile to embark.");
    if (!fleetEntry?.tile || !isSeaTile(fleetEntry.tile)) throw new Error("The navy must be in a sea tile adjacent to the army.");
    const adjacentSeaIds = new Set(getSeaEntriesAdjacentToEntry(armyEntry).map(entry => String(getTileId(entry))));
    if (!adjacentSeaIds.has(String(getTileId(fleetEntry)))) throw new Error(`${fleet.name || fleetToken.document.name} is not in an adjacent sea tile.`);

    const capacity = getFleetTransportCapacity(fleet);
    const used = getFleetUsedTransportCapacity(fleetToken, armyToken.document.id);
    const remaining = Math.max(0, capacity - used);
    if (remaining <= 0) throw new Error(`${fleet.name || fleetToken.document.name} has no transport capacity left.`);

    let composition = getArmyComposition(army);
    let currentStrength = getArmyCurrentStrength(army);
    if (currentStrength <= 0) throw new Error(`${army.name || armyToken.document.name} has no remaining strength to embark.`);
    if (getArmyTotalStrength(composition) > currentStrength) composition = scaleArmyCompositionToMen(composition, currentStrength);

    let embarkedStrength = currentStrength;
    let surplus = 0;
    let returnedManpower = 0;
    if (currentStrength > remaining) {
      embarkedStrength = remaining;
      surplus = currentStrength - remaining;
      const confirmed = await Dialog.confirm({
        title: "Fleet Capacity Exceeded",
        content: `<p><strong>${escapeHtml(fleet.name || fleetToken.document.name)}</strong> can carry only <strong>${escapeHtml(remaining.toLocaleString())}</strong> more troops.</p><p><strong>${escapeHtml(army.name || armyToken.document.name)}</strong> has <strong>${escapeHtml(currentStrength.toLocaleString())}</strong> troops.</p><p>If you continue, <strong>${escapeHtml(embarkedStrength.toLocaleString())}</strong> will embark and <strong>${escapeHtml(surplus.toLocaleString())}</strong> surplus troops will be dismissed from the field, removing their upkeep.</p>`,
        yes: () => true,
        no: () => false,
        defaultYes: false
      });
      if (!confirmed) return null;
      composition = scaleArmyCompositionToMen(composition, embarkedStrength);
      const commanderForReturn = getArmyCommanderToken(army);
      if (commanderForReturn && surplus > 0) {
        try { returnedManpower = await changeHouseManpower(commanderForReturn, surplus); }
        catch (err) { console.warn("Could not return surplus embarked troops to manpower pool", err); }
      }
    }

    const now = new Date().toISOString();
    army.previousTileId = army.currentTileId || "";
    army.previousTileName = army.currentTileName || "";
    army.currentTileId = getTileId(fleetEntry);
    army.currentTileName = getTileName(fleetEntry);
    army.currentRegion = fleetEntry.tile.region || "";
    army.embarked = true;
    army.embarkedFleetTokenId = fleetToken.document.id;
    army.embarkedFleetName = fleet.name || fleetToken.document.name;
    army.transportFleetTokenId = fleetToken.document.id;
    army.transportFleetName = fleet.name || fleetToken.document.name;
    army.embarkedAt = now;
    army.embarkedBy = actingUserName;
    army.composition = composition;
    army.armyComposition = composition;
    army.totalStrength = embarkedStrength;
    army.strengthCurrent = embarkedStrength;
    army.strengthMax = embarkedStrength;
    army.upkeep = calculateArmyUpkeep(composition);
    army.movementUsed = Math.max(Number(army.movementUsed || 0), Number(army.movementMax || 0));
    army.movementLockedRoundKey = getCurrentActionRoundKey();
    army.movementLockedReason = "Embarked on a navy this turn.";
    army.detached = true;
    army.followCharacter = false;
    await saveWorldPiece(armyToken, army);

    const fleetEmbarked = Array.isArray(fleet.embarkedArmies) ? fleet.embarkedArmies.filter(item => String(item.armyTokenId || "") !== String(armyToken.document.id)) : [];
    fleetEmbarked.push({
      armyTokenId: armyToken.document.id,
      armyName: army.name || armyToken.document.name,
      commanderCharacterId: army.linkedCharacterId || army.commanderCharacterId || "",
      commanderName: army.linkedCharacterName || army.commanderName || "",
      strength: embarkedStrength,
      embarkedAt: now,
      embarkedBy: actingUserName
    });
    fleet.embarkedArmies = fleetEmbarked;
    fleet.transportCapacity = capacity;
    fleet.transportUsed = used + embarkedStrength;
    fleet.updatedAt = now;
    fleet.updatedBy = game.user.name;
    await saveWorldPiece(fleetToken, fleet);

    const armyPos = getTokenTopLeftForTileSlot(armyToken, fleetEntry);
    await armyToken.document.update({ x: armyPos.x, y: armyPos.y, hidden: true }, { animate: true, worldMovementBypass: true, bypassWorldMovementWatcher: true, embarkArmyBypass: true });

    const commanderToken = getArmyCommanderToken(army);
    if (commanderToken) {
      await updateCharacterEmbarkState(commanderToken, fleetEntry, fleetToken, fleet, { lock: true, reason: `Embarked with ${army.name || armyToken.document.name}.` });
      const commanderCharacter = foundry.utils.deepClone(getCharacterDataFromToken(commanderToken) || {});
      const commanderPiece = foundry.utils.deepClone(getWorldPiece(commanderToken) || {});
      commanderCharacter.embarkedArmyTokenId = armyToken.document.id;
      commanderPiece.embarkedArmyTokenId = armyToken.document.id;
      await commanderToken.document.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, commanderCharacter);
      if (commanderToken.actor) await commanderToken.actor.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, foundry.utils.deepClone(commanderCharacter));
      await saveWorldPiece(commanderToken, commanderPiece);
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Embarkation" }),
      content: `<h2>Army Embarked</h2><p><strong>Army:</strong> ${escapeHtml(army.name || armyToken.document.name)}</p><p><strong>Navy:</strong> ${escapeHtml(fleet.name || fleetToken.document.name)}</p><p><strong>From:</strong> ${escapeHtml(getTileName(armyEntry))}</p><p><strong>Sea Tile:</strong> ${escapeHtml(getTileName(fleetEntry))}</p><p><strong>Embarked Troops:</strong> ${escapeHtml(embarkedStrength.toLocaleString())}</p>${surplus ? `<p><strong>Surplus Dismissed:</strong> ${escapeHtml(surplus.toLocaleString())}${returnedManpower ? ` (${escapeHtml(returnedManpower.toLocaleString())} returned to manpower pool)` : ""}</p>` : ""}<p><strong>Army Upkeep Now:</strong> ${escapeHtml(resourceMapToText(army.upkeep))}</p><p>Embarking ends the army and commander's movement for this turn, consuming any remaining movement. The army is now cargo; move the navy to transport it.</p>`
    });
    revealForCurrentPlayerPieces();
    return { army, fleet };
  }

  async function embarkArmy() {
    if (!requireOverviewScene()) return;
    let armyToken;
    try { armyToken = getSelectedArmyOrCommanderArmy(); }
    catch (err) { ui.notifications.warn(err.message || "Select an army or army commander."); return; }
    const army = getWorldPiece(armyToken) || {};
    if (!canUserControlWorldPiece(armyToken, army)) { ui.notifications.warn("You can only embark armies you control."); return; }
    const lockedReason = strategicMovementLockReason(army);
    if (lockedReason) { ui.notifications.warn(lockedReason); return; }
    const fleets = findOwnedAdjacentFleetsForArmy(armyToken, army, game.user.id);
    if (!fleets.length) { ui.notifications.warn("No owned navy with spare capacity was found in an adjacent sea tile."); return; }
    const selectedFleetId = fleets[0].token.document.id;
    const fleetId = fleets.length === 1 ? selectedFleetId : await new Promise(resolve => {
      new Dialog({
        title: "Embark Army",
        content: `<form><p>Select the adjacent navy to embark onto.</p><div class="form-group"><label>Navy</label><select name="fleetTokenId" style="width:100%;">${buildFleetOptionHtml(fleets, selectedFleetId)}</select></div></form>`,
        buttons: { embark: { label: "Embark", callback: html => resolve(String(html[0].querySelector("form").fleetTokenId.value || selectedFleetId)) }, cancel: { label: "Cancel", callback: () => resolve(null) } },
        default: "embark"
      }).render(true);
    });
    if (!fleetId) return;
    if (!game.user.isGM) {
      const gm = findActiveGmForScene(canvas.scene?.id);
      if (!gm) { ui.notifications.warn("No active GM online to embark this army."); return; }
      game.socket.emit(SOCKET_NAME, { type: "embarkArmyRequest", targetGmId: gm.id, sceneId: canvas.scene?.id, requesterUserId: game.user.id, requesterUserName: game.user.name, armyTokenId: armyToken.document.id, armyTokenName: armyToken.document.name, fleetTokenId: fleetId });
      ui.notifications.info(`Embark Army request sent to GM ${gm.name}.`);
      return;
    }
    await applyEmbarkArmyToFleet(armyToken, getFleetTokenById(fleetId), { actingUserId: game.user.id, actingUserName: game.user.name });
  }

  async function handleEmbarkArmyRequest(message) {
    if (!game.user.isGM) return;
    if (message.targetGmId && String(message.targetGmId) !== String(game.user.id)) return;
    if (message.sceneId && String(message.sceneId) !== String(canvas.scene?.id)) return;
    const armyToken = getArmyTokenById(message.armyTokenId);
    const fleetToken = getFleetTokenById(message.fleetTokenId);
    if (!armyToken || !fleetToken) { ui.notifications.warn(`Embark request failed: army or navy token not found.`); return; }
    try { await applyEmbarkArmyToFleet(armyToken, fleetToken, { actingUserId: message.requesterUserId, actingUserName: message.requesterUserName || "Player" }); }
    catch (err) {
      console.error("Embark Army request failed", err, message);
      ui.notifications.error(err.message || "Embark Army request failed.");
      await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "Crown Embarkation" }), whisper: ChatMessage.getWhisperRecipients("GM").map(u => u.id), content: `<h2>Embark Army Failed</h2><p><strong>Player:</strong> ${escapeHtml(message.requesterUserName || "Unknown")}</p><p><strong>Reason:</strong> ${escapeHtml(err.message || err)}</p>` });
    }
  }

  function buildDisembarkArmyOptions(armies, selectedId = "") {
    return armies.map(token => {
      const army = getWorldPiece(token) || {};
      const label = `${army.name || token.document.name} — ${getArmyCurrentStrength(army).toLocaleString()} troops`;
      return `<option value="${escapeHtml(token.document.id)}" ${String(token.document.id) === String(selectedId) ? "selected" : ""}>${escapeHtml(label)}</option>`;
    }).join("");
  }

  function buildDisembarkTileOptions(entries, selectedId = "") {
    return entries.map(entry => {
      const id = getTileId(entry);
      const label = `${getTileName(entry)}${entry.tile.region ? " — " + entry.tile.region : ""}`;
      return `<option value="${escapeHtml(id)}" ${String(id) === String(selectedId) ? "selected" : ""}>${escapeHtml(label)}</option>`;
    }).join("");
  }

  async function applyDisembarkArmyFromFleet(armyToken, destinationEntry, { actingUserId = game.user.id, actingUserName = game.user.name } = {}) {
    const army = foundry.utils.deepClone(getWorldPiece(armyToken) || {});
    if (normalize(army.pieceType) !== "army") throw new Error("Disembark Army needs an embarked army.");
    if (!army.embarkedFleetTokenId) throw new Error(`${army.name || armyToken.document.name} is not embarked on a navy.`);
    const fleetToken = getFleetTokenById(army.embarkedFleetTokenId);
    if (!fleetToken) throw new Error("Could not find the navy carrying this army.");
    const fleet = foundry.utils.deepClone(getWorldPiece(fleetToken) || {});
    const actingUser = game.users.get(actingUserId) || { id: actingUserId, name: actingUserName, isGM: false };
    if (!canUserControlWorldPieceForUser(armyToken, army, actingUser)) throw new Error(`${actingUserName} does not control ${army.name || armyToken.document.name}.`);
    if (!canUserControlWorldPieceForUser(fleetToken, fleet, actingUser)) throw new Error(`${actingUserName} does not control ${fleet.name || fleetToken.document.name}.`);

    const armyMoveLock = strategicMovementLockReason(army);
    if (armyMoveLock) throw new Error(armyMoveLock);
    if (Number(army.movementUsed || 0) > 0) throw new Error(`${army.name || armyToken.document.name} has already spent movement this turn. Disembarking requires the army's entire movement allowance.`);

    const movementCommander = getArmyCommanderToken(army);
    if (movementCommander) {
      const commanderPiece = getWorldPiece(movementCommander) || {};
      const commanderMoveLock = strategicMovementLockReason(commanderPiece);
      if (commanderMoveLock) throw new Error(commanderMoveLock);
      if (Number(commanderPiece.movementUsed || 0) > 0) throw new Error(`${movementCommander.document.name} has already spent movement this turn. Disembarking requires the commander's entire movement allowance.`);
    }

    if (!destinationEntry?.tile || !isLandLike(destinationEntry.tile) || isSeaTile(destinationEntry.tile)) throw new Error("Choose a land/port tile to disembark onto.");
    const fleetEntry = getCurrentTileEntryForToken(fleetToken, fleet) || getTileById(fleet.currentTileId);
    const legalIds = new Set(getLandEntriesAdjacentToSeaEntry(fleetEntry).map(entry => String(getTileId(entry))));
    if (!legalIds.has(String(getTileId(destinationEntry)))) throw new Error(`${getTileName(destinationEntry)} is not adjacent to the carrying navy's sea tile.`);

    const now = new Date().toISOString();
    const oldFleetName = army.embarkedFleetName || fleet.name || fleetToken.document.name;
    army.previousTileId = army.currentTileId || "";
    army.previousTileName = army.currentTileName || "";
    army.currentTileId = getTileId(destinationEntry);
    army.currentTileName = getTileName(destinationEntry);
    army.currentRegion = destinationEntry.tile.region || "";
    army.embarked = false;
    army.disembarked = true;
    delete army.embarkedFleetTokenId;
    delete army.embarkedFleetName;
    delete army.transportFleetTokenId;
    delete army.transportFleetName;
    delete army.carriedByFleetTokenId;
    delete army.carriedByFleetName;
    delete army.carriedByNavyTokenId;
    delete army.carriedByNavyName;
    delete army.fleetTokenId;
    delete army.fleetName;
    army.disembarkedAt = now;
    army.disembarkedBy = actingUserName;
    army.movementUsed = Math.max(Number(army.movementUsed || 0), Number(army.movementMax || 0));
    army.movementLockedRoundKey = getCurrentActionRoundKey();
    army.movementLockedReason = "Disembarked from a navy this turn.";
    army.detached = false;
    army.followCharacter = true;
    await saveWorldPiece(armyToken, army);

    const disembarkingCommanderId = String(army.linkedCharacterId || army.commanderCharacterId || "").trim();
    fleet.embarkedArmies = Array.isArray(fleet.embarkedArmies) ? fleet.embarkedArmies.filter(item => String(item.armyTokenId || item.tokenId || "") !== String(armyToken.document.id)) : [];
    fleet.transportedArmies = Array.isArray(fleet.transportedArmies) ? fleet.transportedArmies.filter(item => String(item.armyTokenId || item.tokenId || "") !== String(armyToken.document.id)) : [];
    fleet.cargoArmies = Array.isArray(fleet.cargoArmies) ? fleet.cargoArmies.filter(item => String(item.armyTokenId || item.tokenId || "") !== String(armyToken.document.id)) : [];
    if (disembarkingCommanderId && String(fleet.linkedCharacterId || fleet.commanderCharacterId || "") === disembarkingCommanderId) {
      fleet.carryCharacter = false;
      fleet.followCharacter = false;
      fleet.detached = true;
      fleet.detachedReason = "Linked commander disembarked with an army.";
    }
    fleet.transportCapacity = getFleetTransportCapacity(fleet);
    fleet.transportUsed = Array.isArray(fleet.embarkedArmies) ? fleet.embarkedArmies.reduce((sum, item) => sum + Math.max(0, Number(item.strength || item.troops || 0)), 0) : 0;
    fleet.updatedAt = now;
    fleet.updatedBy = game.user.name;
    await saveWorldPiece(fleetToken, fleet);

    const armyPos = getTokenTopLeftForTileSlot(armyToken, destinationEntry);
    await armyToken.document.update({ x: armyPos.x, y: armyPos.y, hidden: false }, { animate: true, worldMovementBypass: true, bypassWorldMovementWatcher: true, disembarkArmyBypass: true });

    const commanderToken = getArmyCommanderToken(army);
    if (commanderToken) {
      await updateCharacterEmbarkState(commanderToken, destinationEntry, fleetToken, fleet, { lock: true, clear: true, reason: `Disembarked with ${army.name || armyToken.document.name}.` });
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Embarkation" }),
      content: `<h2>Army Disembarked</h2><p><strong>Army:</strong> ${escapeHtml(army.name || armyToken.document.name)}</p><p><strong>From Navy:</strong> ${escapeHtml(oldFleetName)}</p><p><strong>Landing:</strong> ${escapeHtml(getTileName(destinationEntry))}</p><p><strong>Troops:</strong> ${escapeHtml(getArmyCurrentStrength(army).toLocaleString())}</p><p>Disembarking consumed the army and commander's full movement for this turn. Neither can move again until movement resets.</p>`
    });
    revealForCurrentPlayerPieces();
    return { army, fleet };
  }

  async function disembarkArmy() {
    if (!requireOverviewScene()) return;
    let armies;
    try { armies = getDisembarkableArmiesForSelection(); }
    catch (err) { ui.notifications.warn(err.message || "Select an embarked army, its commander, or the carrying navy."); return; }
    armies = armies.filter(token => canUserControlWorldPiece(token, getWorldPiece(token)));
    if (!armies.length) { ui.notifications.warn("No embarked army you control was found."); return; }
    const defaultArmyId = armies[0].document.id;
    const defaultArmy = getWorldPiece(armies[0]) || {};
    const fleetToken = getFleetTokenById(defaultArmy.embarkedFleetTokenId);
    if (!fleetToken) { ui.notifications.warn("Could not find the carrying navy."); return; }
    const fleet = getWorldPiece(fleetToken) || {};
    if (!canUserControlWorldPiece(fleetToken, fleet)) { ui.notifications.warn("You must control the carrying navy to disembark this army."); return; }
    const fleetEntry = getCurrentTileEntryForToken(fleetToken, fleet) || getTileById(fleet.currentTileId);
    const landingEntries = getLandEntriesAdjacentToSeaEntry(fleetEntry);
    if (!landingEntries.length) { ui.notifications.warn("No adjacent land/port tiles are available for disembarkation."); return; }
    const defaultLandingId = getTileId(landingEntries[0]);
    const result = await new Promise(resolve => {
      new Dialog({
        title: "Disembark Army",
        content: `<form><p>Choose the embarked army and landing tile.</p><div class="form-group"><label>Army</label><select name="armyTokenId" style="width:100%;">${buildDisembarkArmyOptions(armies, defaultArmyId)}</select></div><div class="form-group"><label>Landing Tile</label><select name="destinationTileId" style="width:100%;">${buildDisembarkTileOptions(landingEntries, defaultLandingId)}</select></div></form>`,
        buttons: { land: { label: "Disembark", callback: html => { const form = html[0].querySelector("form"); resolve({ armyTokenId: String(form.armyTokenId.value || defaultArmyId), destinationTileId: String(form.destinationTileId.value || defaultLandingId) }); } }, cancel: { label: "Cancel", callback: () => resolve(null) } },
        default: "land"
      }, { width: 620, height: 420, resizable: true }).render(true);
    });
    if (!result) return;
    if (!game.user.isGM) {
      const gm = findActiveGmForScene(canvas.scene?.id);
      if (!gm) { ui.notifications.warn("No active GM online to disembark this army."); return; }
      game.socket.emit(SOCKET_NAME, { type: "disembarkArmyRequest", targetGmId: gm.id, sceneId: canvas.scene?.id, requesterUserId: game.user.id, requesterUserName: game.user.name, armyTokenId: result.armyTokenId, destinationTileId: result.destinationTileId });
      ui.notifications.info(`Disembark Army request sent to GM ${gm.name}.`);
      return;
    }
    const armyToken = getArmyTokenById(result.armyTokenId);
    const destinationEntry = getEntryById(result.destinationTileId);
    await applyDisembarkArmyFromFleet(armyToken, destinationEntry, { actingUserId: game.user.id, actingUserName: game.user.name });
  }

  async function handleDisembarkArmyRequest(message) {
    if (!game.user.isGM) return;
    if (message.targetGmId && String(message.targetGmId) !== String(game.user.id)) return;
    if (message.sceneId && String(message.sceneId) !== String(canvas.scene?.id)) return;
    const armyToken = getArmyTokenById(message.armyTokenId);
    const destinationEntry = getEntryById(message.destinationTileId);
    if (!armyToken || !destinationEntry) { ui.notifications.warn(`Disembark request failed: army or destination not found.`); return; }
    try { await applyDisembarkArmyFromFleet(armyToken, destinationEntry, { actingUserId: message.requesterUserId, actingUserName: message.requesterUserName || "Player" }); }
    catch (err) {
      console.error("Disembark Army request failed", err, message);
      ui.notifications.error(err.message || "Disembark Army request failed.");
      await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "Crown Embarkation" }), whisper: ChatMessage.getWhisperRecipients("GM").map(u => u.id), content: `<h2>Disembark Army Failed</h2><p><strong>Player:</strong> ${escapeHtml(message.requesterUserName || "Unknown")}</p><p><strong>Reason:</strong> ${escapeHtml(err.message || err)}</p>` });
    }
  }

  async function moveEmbarkedArmiesWithFleet(fleetToken, fleetPiece, destinationEntry) {
    if (!fleetToken || normalize(fleetPiece?.pieceType) !== "fleet" || !destinationEntry?.tile) return;
    const armies = getEmbarkedArmyTokensForFleet(fleetToken);
    for (const armyToken of armies) {
      const army = foundry.utils.deepClone(getWorldPiece(armyToken) || {});
      if (army.embarked !== true || (String(army.embarkedFleetTokenId || army.transportFleetTokenId || "") !== String(fleetToken.document.id))) continue;
      army.previousTileId = army.currentTileId || "";
      army.previousTileName = army.currentTileName || "";
      army.currentTileId = getTileId(destinationEntry);
      army.currentTileName = getTileName(destinationEntry);
      army.currentRegion = destinationEntry.tile.region || "";
      army.lastMovedAt = new Date().toISOString();
      army.lastMovedBy = game.user.name;
      army.lastMovedSource = `Embarked aboard ${fleetPiece.name || fleetToken.document.name}`;
      await saveWorldPiece(armyToken, army);
      const pos = getTokenTopLeftForTileSlot(armyToken, destinationEntry);
      await armyToken.document.update({ x: pos.x, y: pos.y, hidden: true }, { animate: false, worldMovementBypass: true, bypassWorldMovementWatcher: true, fleetCargoBypass: true });

      const commanderToken = getArmyCommanderToken(army);
      if (commanderToken) {
        await updateCharacterEmbarkState(commanderToken, destinationEntry, fleetToken, fleetPiece, { lock: false, reason: `Carried by ${fleetPiece.name || fleetToken.document.name}.` });
      }
    }
  }


  async function editSelectedArmy() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can edit armies."); return; }
    const selected = canvas.tokens.controlled.filter(token => ["army", "fleet"].includes(normalize(getWorldPiece(token)?.pieceType)));
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one army or navy token to edit."); return; }
    const token = selected[0];
    const piece = foundry.utils.deepClone(getWorldPiece(token));
    const isFleet = normalize(piece.pieceType) === "fleet";
    const composition = isFleet ? getNavyComposition(piece) : getArmyComposition(piece);
    const compositionHtml = isFleet
      ? NAVY_SHIP_TYPES.map(ship => `<div class="form-group"><label>${escapeHtml(ship.label)}</label><input type="number" name="ship_${escapeHtml(ship.key)}" value="${escapeHtml(composition[ship.key] || 0)}" min="0" step="1" style="width:100%;" /><p class="notes">${escapeHtml(ship.gold)} Gold / 5, ${escapeHtml(ship.food)} Food / 5</p></div>`).join("")
      : ARMY_TROOP_TYPES.map(troop => `<div class="form-group"><label>${escapeHtml(troop.label)}</label><input type="number" name="troop_${escapeHtml(troop.key)}" value="${escapeHtml(composition[troop.key] || 0)}" min="0" step="50" style="width:100%;" /></div>`).join("");
    const result = await new Promise(resolve => {
      new Dialog({
        title: `Edit ${isFleet ? "Navy" : "Army"} — ${piece.name || token.document.name}`,
        content: `<form>
          <div class="form-group"><label>${isFleet ? "Navy" : "Army"} Name</label><input type="text" name="forceName" value="${escapeHtml(piece.name || token.document.name)}" style="width:100%;" /></div>
          <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:8px;">${compositionHtml}</div>
          ${isFleet ? "" : `<div class="form-group"><label>Siege Engines</label><input type="number" name="siegeEngines" value="${escapeHtml(piece.siegeEngines || 0)}" min="0" step="1" style="width:100%;" /></div><div class="form-group"><label>Siege Turns</label><input type="number" name="siegeTurns" value="${escapeHtml(piece.siegeTurns || 1)}" min="1" step="1" style="width:100%;" /></div>`}
          <div class="form-group"><label><input type="checkbox" name="followCharacter" ${piece.followCharacter !== false ? "checked" : ""} /> ${isFleet ? "Carry linked character when moved" : "Follow linked character"}</label></div>
          <div class="form-group"><label><input type="checkbox" name="detached" ${piece.detached ? "checked" : ""} /> Detached / holds position</label></div>
        </form>`,
        buttons: { save: { label: `Save ${isFleet ? "Navy" : "Army"}`, callback: html => {
          const form = html[0].querySelector("form");
          resolve({ forceName: String(form.forceName.value || "").trim(), composition: isFleet ? readNavyCompositionForm(form) : readArmyCompositionForm(form), siegeEngines: isFleet ? Number(piece.siegeEngines || 0) : Math.max(0, Number(form.siegeEngines.value || 0)), siegeTurns: isFleet ? Number(piece.siegeTurns || 1) : Math.max(1, Number(form.siegeTurns.value || 1)), followCharacter: form.followCharacter.checked, detached: form.detached.checked });
        }}, cancel: { label: "Cancel", callback: () => resolve(null) } },
        default: "save"
      }, { width: 760, height: 760, resizable: true }).render(true);
    });
    if (!result) return;
    if (isFleet) {
      const linkedCharacter = getCharacterTokenById(piece.linkedCharacterId || piece.commanderCharacterId);
      if (linkedCharacter) {
        try { validateNavyShipClassUnlocks(linkedCharacter, result.composition); }
        catch (err) { ui.notifications.error(err.message || "This House lacks the naval infrastructure for that ship class."); return; }
      }
    }
    piece.name = result.forceName || token.document.name;
    piece.composition = result.composition;
    if (isFleet) {
      piece.shipComposition = result.composition;
      piece.totalShips = getNavyTotalShips(result.composition);
      piece.totalStrength = piece.totalShips;
      piece.strengthMax = piece.totalShips;
      piece.strengthCurrent = Math.min(Number(piece.strengthCurrent || piece.totalShips), piece.totalShips);
      piece.upkeep = calculateNavyUpkeep(result.composition);
      piece.carryCharacter = result.followCharacter;
    } else {
      piece.totalStrength = getArmyTotalStrength(result.composition);
      piece.strengthMax = piece.totalStrength;
      piece.strengthCurrent = Math.min(Number(piece.strengthCurrent || piece.totalStrength), piece.totalStrength);
      piece.upkeep = calculateArmyUpkeep(result.composition);
    }
    piece.siegeEngines = result.siegeEngines;
    piece.siegeTurns = result.siegeTurns;
    piece.followCharacter = result.followCharacter;
    piece.detached = result.detached;
    piece.updatedAt = new Date().toISOString();
    piece.updatedBy = game.user.name;
    await saveWorldPiece(token, piece);
    await token.document.update({ name: piece.name }, { worldMovementBypass: true, bypassWorldMovementWatcher: true });
    if (token.actor) await token.actor.update({ name: piece.name });
    ui.notifications.info(`Updated ${isFleet ? "navy" : "army"}: ${piece.name}.`);
  }

  async function dismissForceToken(token, piece = getWorldPiece(token)) {
    const characterToken = getCharacterTokenById(piece.linkedCharacterId || piece.commanderCharacterId);
    if (characterToken) {
      const character = foundry.utils.deepClone(getCharacterDataFromToken(characterToken) || {});
      const charPiece = foundry.utils.deepClone(getWorldPiece(characterToken) || {});
      if (character.pendingArmyMuster) delete character.pendingArmyMuster;
      if (character.pendingNavyMuster) delete character.pendingNavyMuster;
      if (charPiece.pendingArmyMuster) delete charPiece.pendingArmyMuster;
      if (charPiece.pendingNavyMuster) delete charPiece.pendingNavyMuster;
      if (character.embarkedFleetTokenId === token.document.id) { delete character.embarkedFleetTokenId; delete character.embarkedFleetName; }
      await characterToken.document.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, character);
      if (characterToken.actor) await characterToken.actor.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, foundry.utils.deepClone(character));
      await saveWorldPiece(characterToken, charPiece);
    }
    if (normalize(piece.pieceType) === "army" && characterToken) {
      const survivors = Math.max(0, Math.floor(Number(piece.strengthCurrent ?? piece.totalStrength ?? 0)));
      if (survivors > 0) {
        const returned = await changeHouseManpower(characterToken, survivors);
        if (returned > 0) ui.notifications.info(`${returned.toLocaleString()} surviving soldiers returned to the manpower pool.`);
      }
    }
    await token.document.delete();
    ui.notifications.info(`Dismissed ${normalize(piece.pieceType) === "fleet" ? "navy" : "army"}: ${piece.name || token.document.name}.`);
  }

  async function requestGmDismissForce(token, piece) {
    const gm = findActiveGmForScene(canvas.scene?.id);
    if (!gm) { ui.notifications.warn("No active GM online to dismiss this force."); return; }
    game.socket.emit(SOCKET_NAME, { type: "dismissForceRequest", targetGmId: gm.id, sceneId: canvas.scene?.id, requesterUserId: game.user.id, requesterUserName: game.user.name, tokenId: token.document.id, tokenName: token.document.name });
    ui.notifications.info(`Dismiss request sent to GM ${gm.name}.`);
  }

  async function handleDismissForceRequest(message) {
    if (!game.user.isGM) return;
    if (message.targetGmId && String(message.targetGmId) !== String(game.user.id)) return;
    if (message.sceneId && String(message.sceneId) !== String(canvas.scene?.id)) return;
    const token = canvas.tokens.placeables.find(token => token.document.id === message.tokenId);
    if (!token) { ui.notifications.warn(`Dismiss request failed: ${message.tokenName || message.tokenId} not found.`); return; }
    const piece = getWorldPiece(token) || {};
    const ownerId = String(piece.ownerUserId || piece.playerOwnerUserId || "");
    if (ownerId && String(ownerId) !== String(message.requesterUserId || "")) { ui.notifications.warn(`${message.requesterUserName || "Player"} cannot dismiss ${piece.name || token.document.name}; they do not own it.`); return; }
    await dismissForceToken(token, piece);
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "Crown Forces" }), content: `<h2>Force Dismissed</h2><p><strong>Player:</strong> ${escapeHtml(message.requesterUserName || "Unknown")}</p><p><strong>Force:</strong> ${escapeHtml(piece.name || token.document.name)}</p>` });
  }

  async function dismissSelectedArmy() {
    if (!requireOverviewScene()) return;
    const selected = canvas.tokens.controlled.filter(token => ["army", "fleet"].includes(normalize(getWorldPiece(token)?.pieceType)));
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one army or navy token to dismiss."); return; }
    const token = selected[0];
    const piece = getWorldPiece(token) || {};
    if (!canUserControlWorldPiece(token, piece)) { ui.notifications.warn("You can only dismiss armies or navies you control."); return; }
    const confirmed = await Dialog.confirm({ title: "Dismiss Army / Navy?", content: `<p>Dismiss <strong>${escapeHtml(token.document.name)}</strong> from the map?</p><p class="notes">This stops its upkeep from being charged in future rounds.</p>`, yes: () => true, no: () => false, defaultYes: false });
    if (!confirmed) return;
    if (!game.user.isGM) { await requestGmDismissForce(token, piece); return; }
    await dismissForceToken(token, piece);
  }

  function getFortificationLevelForHouse(house = {}, clock = getClock()) {
    const explicit = numberOrBlank(house.fortificationLevel ?? house.fortification ?? "");
    if (explicit !== "") return Math.max(0, Math.min(3, Number(explicit)));
    const state = getActiveBuildingLineState(house, clock).get("watchtower");
    if (state?.level) return Math.max(0, Math.min(3, Number(state.level.level || 0)));
    const built = getActiveBuiltBuildings(house, clock);
    if (built.includes("Castles")) return 3;
    if (built.includes("Holdfasts")) return 2;
    if (built.includes("Watchtowers")) return 1;
    return 0;
  }

  function getSiegeSettlementKey(house = {}, clock = getClock()) {
    const activeLevel = getActiveBuildingSlotCount(house, clock);
    const level = Math.max(0, Math.min(4, Number(activeLevel || 0)));
    return ["ruin", "hamlet", "village", "town", "city"][level] || "ruin";
  }

  function siegeSettlementLabel(key) {
    const labels = { ruin: "Ruin", hamlet: "Hamlet", village: "Village", town: "Town", city: "City" };
    return labels[key] || titleCase(key);
  }

  function getSiegeEngineBonus(count) {
    const engines = Math.max(0, Number(count || 0));
    if (engines <= 0) return 0;
    if (engines <= 5) return 5;
    if (engines <= 10) return 10;
    if (engines <= 15) return 15;
    if (engines <= 20) return 20;
    if (engines <= 25) return 25;
    return 30;
  }

  function getSiegeDurationBonus(turns) {
    const t = Math.max(1, Number(turns || 1));
    return Math.min(21, Math.max(0, (t - 1) * 3));
  }

  function getSiegeManpowerBonus(strength) {
    return Math.min(20, Math.floor(Math.max(0, Number(strength || 0)) / 500));
  }

  function getDefendingArmiesOnTile(entry, attackingOwnerId) {
    const tileId = String(getTileId(entry) || "");
    return getArmyTokens().filter(token => {
      const army = getWorldPiece(token) || {};
      const sameTile = String(army.currentTileId || "") === tileId || getCurrentTileEntryForToken(token, army)?.tile?.id === tileId;
      if (!sameTile) return false;
      const ownerId = String(army.ownerUserId || army.playerOwnerUserId || "");
      return ownerId && String(ownerId) !== String(attackingOwnerId || "");
    });
  }

  function getSiegeOutcome(roll, chance) {
    if (roll <= 5) return { key: "decisive", label: "Decisive Storm", success: true, casualtyPercent: 5, text: "The settlement falls with reduced attacker casualties." };
    if (roll >= 96) return { key: "autoCatastrophe", label: "Catastrophe (Automatic)", success: false, casualtyPercent: 40, text: "The assault goes disastrously wrong." };
    if (roll <= chance) return { key: "success", label: "Successful Storm", success: true, casualtyPercent: 10, text: "The settlement falls with normal assault casualties." };
    const miss = roll - chance;
    if (miss <= 10) return { key: "foothold", label: "Foothold", success: false, foothold: true, casualtyPercent: 5, text: "The city holds, but attackers gain +10% on the next storm attempt if the siege continues." };
    if (miss <= 25) return { key: "repulsed", label: "Repulsed", success: false, casualtyPercent: 10, text: "The assault fails. Moderate casualties." };
    if (miss <= 40) return { key: "bloodyRepulse", label: "Bloody Repulse", success: false, casualtyPercent: 20, text: "The assault fails. Heavy casualties." };
    return { key: "catastrophe", label: "Catastrophe", success: false, casualtyPercent: 30, text: "Severe casualties and possible commander consequences." };
  }

  function calculateSiegeCasualties(currentStrength, outcome) {
    const before = Math.max(0, Math.floor(Number(currentStrength || 0)));
    const percent = Math.max(0, Number(outcome?.casualtyPercent || 0));
    const lost = before > 0 && percent > 0 ? Math.max(1, Math.floor(before * percent / 100)) : 0;
    return { before, percent, lost, after: Math.max(0, before - lost) };
  }

  function getConqueringHouseName(attackerPiece = {}, actingUserId = "", actingUserName = "") {
    const linkedCharacter = getCharacterTokenById(attackerPiece.linkedCharacterId || attackerPiece.commanderCharacterId || "");
    if (linkedCharacter) {
      const controller = getCharacterControllerIdentity(linkedCharacter, actingUserId, actingUserName);
      const canonical = getCanonicalHouseNameForCharacter(
        linkedCharacter,
        controller.id || actingUserId,
        controller.name || actingUserName
      );
      if (canonical) return canonical;
    }

    // An army may carry an allegiance separately from its original/local House.
    // Political allegiance wins over a legacy House/faction stamp for conquest.
    return String(attackerPiece.allegiance || attackerPiece.house || attackerPiece.faction || "").trim();
  }

  function applyProvinceTransferData(worldTile, house, { houseName = "", actingUserId = "", actingUserName = "", source = "Transfer", actorName = "", metadata = {} } = {}) {
    const ownerUser = game.users.get(actingUserId) || null;
    const controllerId = ownerUser?.id || actingUserId || "";
    const controllerName = ownerUser?.name || actingUserName || "";
    const allegianceHouseName = String(houseName || controllerName || "Player").trim();
    const localHouseName = String(house.originalHouseName || house.house || worldTile.house || worldTile.owner || "").trim();
    const now = new Date().toISOString();

    // Province identity and political allegiance are intentionally separate.
    // Conquest changes who the province is sworn to / controlled by, but it does
    // NOT rename the local House or replace its ruler.
    if (localHouseName && !house.originalHouseName) house.originalHouseName = localHouseName;

    worldTile.ownershipType = "Player";
    worldTile.ownerUserId = controllerId;
    worldTile.ownerUserName = controllerName;
    worldTile.playerOwnerUserId = controllerId;
    worldTile.playerOwnerUserName = controllerName;
    worldTile.swornToType = "Player";
    worldTile.swornToPlayerName = controllerName;
    worldTile.swornToPlayerUserId = controllerId;
    worldTile.allegiance = allegianceHouseName;
    const localHouseIsGeneric = ["", "neutral", "npc", "none", "unaligned"].includes(normalize(localHouseName));
    if (localHouseName) {
      worldTile.owner = localHouseName;
      worldTile.house = localHouseName;
    }
    worldTile.publicOwnerLabel = localHouseIsGeneric ? allegianceHouseName : (localHouseName || worldTile.publicOwnerLabel || allegianceHouseName);
    worldTile.updatedAt = now;
    worldTile.updatedBy = game.user.name;

    house.ownershipType = "Player";
    house.ownerUserId = controllerId;
    house.ownerUserName = controllerName;
    house.playerOwnerUserId = controllerId;
    house.playerOwnerUserName = controllerName;
    house.swornToType = "Player";
    house.swornToPlayerName = controllerName;
    house.swornToPlayerUserId = controllerId;
    house.allegiance = allegianceHouseName;
    if (localHouseName) house.house = localHouseName;
    house.publicOwnerLabel = localHouseIsGeneric ? allegianceHouseName : (localHouseName || house.publicOwnerLabel || allegianceHouseName);
    house.lastControllerChange = { source, userId: controllerId, userName: controllerName, allegiance: allegianceHouseName, localHouse: localHouseName, actorName, at: now, ...metadata };
    house.updatedAt = now;
    house.updatedBy = game.user.name;

    return { worldTile, house, houseName: allegianceHouseName, allegiance: allegianceHouseName, localHouseName, controllerId, controllerName, at: now };
  }

  async function verifyProvinceAllegiance(entry, expectedAllegiance, expectedControllerId = "", expectedControllerName = "") {
    const expectedKey = normalize(expectedAllegiance);
    if (!expectedKey) throw new Error("Province transfer has no conquering allegiance to save.");

    const savedTile = entry.drawing.document.getFlag(FLAG_SCOPE, WORLD_TILE_KEY) || {};
    const savedHouse = entry.drawing.document.getFlag(FLAG_SCOPE, HOUSE_KEY) || {};
    const tileAllegiance = String(savedTile.allegiance || "").trim();
    const houseAllegiance = String(savedHouse.allegiance || "").trim();

    if (normalize(tileAllegiance) !== expectedKey || normalize(houseAllegiance) !== expectedKey) {
      throw new Error(
        `Province transfer allegiance verification failed. Expected "${expectedAllegiance}", ` +
        `but World Tile stored "${tileAllegiance || "blank"}" and House Data stored "${houseAllegiance || "blank"}".`
      );
    }

    const savedControllerId = String(getTileOwnerUserId(savedTile, savedHouse) || "").trim();
    const savedControllerName = String(getTileOwnerUserName(savedTile, savedHouse) || "").trim();
    if (expectedControllerId && savedControllerId && savedControllerId !== String(expectedControllerId)) {
      throw new Error(`Province transfer controller verification failed. Expected user ${expectedControllerId}, stored ${savedControllerId}.`);
    }
    if (!expectedControllerId && expectedControllerName && savedControllerName &&
        normalize(savedControllerName) !== normalize(expectedControllerName)) {
      throw new Error(`Province transfer controller verification failed. Expected ${expectedControllerName}, stored ${savedControllerName}.`);
    }

    return { tileAllegiance, houseAllegiance, controllerId: savedControllerId, controllerName: savedControllerName };
  }

  async function transferProvinceToHouse(entry, attackerPiece, actingUserId, actingUserName, source = "Transfer", metadata = {}) {
    const originalWorldTile = foundry.utils.deepClone(entry.tile || {});
    const originalHouse = foundry.utils.deepClone(getHouseData(entry.drawing) || {});
    const linkedCharacter = getCharacterTokenById(attackerPiece?.linkedCharacterId || attackerPiece?.commanderCharacterId || "");
    const controller = linkedCharacter
      ? getCharacterControllerIdentity(linkedCharacter, actingUserId, actingUserName)
      : { id: actingUserId || attackerPiece?.playerOwnerUserId || attackerPiece?.ownerUserId || "",
          name: actingUserName || attackerPiece?.playerOwnerUserName || attackerPiece?.ownerUserName || "" };

    const conqueringHouse = getConqueringHouseName(
      attackerPiece,
      controller.id || actingUserId,
      controller.name || actingUserName
    );
    if (!conqueringHouse) throw new Error("Could not determine the conquering player's House allegiance.");

    const result = applyProvinceTransferData(
      foundry.utils.deepClone(originalWorldTile),
      foundry.utils.deepClone(originalHouse),
      {
        houseName: conqueringHouse,
        actingUserId: controller.id || actingUserId,
        actingUserName: controller.name || actingUserName,
        source,
        actorName: attackerPiece?.name || "",
        metadata
      }
    );

    try {
      await entry.drawing.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, result.worldTile);
      await entry.drawing.document.setFlag(FLAG_SCOPE, HOUSE_KEY, result.house);
      await verifyProvinceAllegiance(
        entry,
        result.allegiance,
        result.controllerId,
        result.controllerName
      );
      return result;
    } catch (err) {
      console.error("Province transfer failed; attempting rollback.", err);
      try {
        await entry.drawing.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, originalWorldTile);
        await entry.drawing.document.setFlag(FLAG_SCOPE, HOUSE_KEY, originalHouse);
      } catch (rollbackErr) {
        console.error("Province transfer rollback also failed.", rollbackErr);
      }
      throw new Error(`Province transfer failed and was rolled back where possible: ${err?.message || err}`);
    }
  }

  async function resolveSiegeStorm({ token, piece, entry, options, actingUserId = game.user.id, actingUserName = game.user.name } = {}) {
    if (!token || !piece || !entry?.tile) throw new Error("Missing army or target tile for siege.");
    const house = getHouseData(entry.drawing) || {};
    const ownerId = getTileOwnerUserId(entry.tile, house);
    const ownerName = getTileOwnerUserName(entry.tile, house);
    const attackerOwnerId = piece.ownerUserId || piece.playerOwnerUserId || actingUserId || game.user.id;
    const attackerHouseKey = normalize(getConqueringHouseName(piece, actingUserId, actingUserName));
    const defenderHouseKey = normalize(house.house || entry.tile?.house || entry.tile?.owner || "");
    const siegeRoundKey = getCurrentActionRoundKey();
    if (piece.lastSiegeRoundKey && String(piece.lastSiegeRoundKey) === String(siegeRoundKey)) throw new Error("This army has already attempted a siege this turn.");
    if (attackerHouseKey && defenderHouseKey && attackerHouseKey === defenderHouseKey) throw new Error(`${getTileName(entry)} already belongs to this army's House.`);
    if (ownerId && String(ownerId) === String(attackerOwnerId)) throw new Error(`${getTileName(entry)} is already controlled by this army's owner.`);

    const defendingArmies = getDefendingArmiesOnTile(entry, attackerOwnerId);
    if (ownerId && defendingArmies.length) {
      const gmUsers = game.users.contents.filter(user => user.isGM).map(user => user.id);
      const content = `<h2>Pitched Battle Declared</h2><p><strong>Location:</strong> ${escapeHtml(getTileName(entry))}</p><p><strong>Attacker:</strong> ${escapeHtml(piece.name || token.document.name)} — ${escapeHtml(Number(piece.strengthCurrent || piece.totalStrength || 0).toLocaleString())} men</p><p><strong>Defender:</strong> ${defendingArmies.map(t => `${escapeHtml(t.document.name)} — ${escapeHtml(Number(getWorldPiece(t)?.strengthCurrent || getWorldPiece(t)?.totalStrength || 0).toLocaleString())} men`).join("<br>")}</p><p>Resolve manually, simulate, or move to the battle minigame. Quick Siege is not rolled while a defending player army is present.</p>`;
      await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "Crown Siege" }), whisper: gmUsers.length ? gmUsers : undefined, content });
      ui.notifications.info("Defending army present: pitched battle card sent to GM.");
      return null;
    }

    const result = options || { siegeEngines: Math.max(0, Number(piece.siegeEngines || 0)), siegeTurns: Math.max(1, Number(piece.siegeTurns || 1)) };
    const linkedCommander = getCharacterTokenById(piece.linkedCharacterId || piece.commanderCharacterId);
    const martial = Number(piece.commanderMartial || (linkedCommander ? getCharacterMartialValue(linkedCommander) : 0) || 0);
    const strength = Number(piece.strengthCurrent || piece.totalStrength || 0);
    const settlementKey = getSiegeSettlementKey(house);
    const fortLevel = getFortificationLevelForHouse(house);
    const settlementDc = SIEGE_DC_TABLE[settlementKey]?.[fortLevel] ?? 15;
    const martialBonus = martial * 2;
    const manpowerBonus = getSiegeManpowerBonus(strength);
    const engineBonus = getSiegeEngineBonus(result.siegeEngines);
    const durationBonus = getSiegeDurationBonus(result.siegeTurns);
    const footholdBonus = Number(piece.footholdBonus || 0);
    const rawChance = 50 + martialBonus + manpowerBonus + engineBonus + durationBonus + footholdBonus - settlementDc;
    const chance = Math.max(5, Math.min(95, Math.round(rawChance * 100) / 100));
    const roll = await new Roll("1d100").evaluate({ async: true });
    const d100 = Number(roll.total || 0);
    const outcome = getSiegeOutcome(d100, chance);

    const updatedPiece = foundry.utils.deepClone(piece || {});
    const casualties = calculateSiegeCasualties(strength, outcome);
    updatedPiece.siegeEngines = result.siegeEngines;
    updatedPiece.siegeTurns = outcome.success ? 1 : Number(result.siegeTurns || 1) + 1;
    updatedPiece.siegeStatus = outcome.success ? "resolved" : "under siege";
    updatedPiece.footholdBonus = outcome.foothold ? 10 : 0;
    updatedPiece.detached = !outcome.success;
    updatedPiece.followCharacter = outcome.success ? updatedPiece.followCharacter : false;
    updatedPiece.strengthCurrent = casualties.after;
    updatedPiece.lastSiegeRoundKey = siegeRoundKey;
    updatedPiece.lastSiegeOutcome = outcome.key;
    updatedPiece.lastSiegeAt = new Date().toISOString();
    updatedPiece.movementUsed = Math.max(Number(updatedPiece.movementUsed || 0), Number(updatedPiece.movementMax || 0));
    updatedPiece.movementLockedRoundKey = siegeRoundKey;
    updatedPiece.movementLockedReason = "This army committed a siege this turn.";
    await saveWorldPiece(token, updatedPiece);

    let siegeTransfer = null;
    if (outcome.success) siegeTransfer = await transferProvinceToHouse(
      entry,
      updatedPiece,
      actingUserId || attackerOwnerId || game.user.id,
      actingUserName || updatedPiece.ownerUserName || updatedPiece.playerOwnerUserName || game.user.name,
      "Siege",
      { outcome: outcome.key, armyId: token.document.id }
    );

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Siege" }),
      content: `<h2>Quick Siege — ${escapeHtml(outcome.label)}</h2>
        <p><strong>Army:</strong> ${escapeHtml(updatedPiece.name || token.document.name)}</p>
        <p><strong>Target:</strong> ${escapeHtml(getTileName(entry))}</p>
        <p><strong>Roll:</strong> ${escapeHtml(d100)} on d100</p>
        <p><strong>Storm Chance:</strong> ${escapeHtml(chance)}%</p>
        <p><strong>Formula:</strong> 50 + Martial ${escapeHtml(martial)}×2 (${escapeHtml(martialBonus)}) + Manpower ${escapeHtml(manpowerBonus)} + Engines ${escapeHtml(engineBonus)} + Duration ${escapeHtml(durationBonus)}${footholdBonus ? ` + Foothold ${escapeHtml(footholdBonus)}` : ""} - DC ${escapeHtml(settlementDc)}</p>
        <p><strong>Settlement:</strong> ${escapeHtml(siegeSettlementLabel(settlementKey))}; <strong>Fortification:</strong> ${escapeHtml(fortLevel)}</p>
        <p>${escapeHtml(outcome.text)}</p>
        <p><strong>Attacker Casualties:</strong> ${escapeHtml(casualties.percent)}% — ${escapeHtml(casualties.lost.toLocaleString())} lost. <strong>Strength Remaining:</strong> ${escapeHtml(casualties.after.toLocaleString())} / ${escapeHtml(Number(updatedPiece.strengthMax || updatedPiece.totalStrength || casualties.before).toLocaleString())}</p>
        <p><strong>Movement:</strong> Siege committed; this army cannot move again until movement resets.</p>
        ${outcome.success ? `<p><strong>Control:</strong> ${escapeHtml(getTileName(entry))} now changes allegiance to ${escapeHtml(siegeTransfer?.houseName || actingUserName || updatedPiece.ownerUserName || updatedPiece.playerOwnerUserName || game.user.name)}. The local ruler is not automatically replaced.</p>` : `<p><strong>Next Attempt:</strong> Siege turns will count as ${escapeHtml(updatedPiece.siegeTurns)}.${outcome.foothold ? " Foothold +10% has been stored." : ""}</p>`}`
    });
    revealForCurrentPlayerPieces();
    return outcome;
  }

  async function requestGmSiegeStorm({ token, piece, entry, options }) {
    const gm = findActiveGmForScene(canvas.scene?.id);
    if (!gm) { ui.notifications.warn("No active GM online to resolve the siege."); return false; }
    game.socket.emit(SOCKET_NAME, {
      type: "siegeStormRequest",
      targetGmId: gm.id,
      sceneId: canvas.scene?.id,
      requesterUserId: game.user.id,
      requesterUserName: game.user.name,
      tokenId: token.document.id,
      tokenName: token.document.name,
      drawingId: entry.drawing.document.id,
      tileId: getTileId(entry),
      tileName: getTileName(entry),
      options
    });
    ui.notifications.info(`Siege / Storm request sent to GM ${gm.name}.`);
    return true;
  }

  async function siegeStorm() {
    if (!requireOverviewScene()) return;
    const selected = canvas.tokens.controlled.filter(token => normalize(getWorldPiece(token)?.pieceType) === "army");
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one army token on the target tile."); return; }
    const token = selected[0];
    const piece = foundry.utils.deepClone(getWorldPiece(token));
    if (!canUserControlWorldPiece(token, piece)) { ui.notifications.warn("You can only siege with an army you control."); return; }
    const lockedReason = strategicMovementLockReason(piece);
    if (lockedReason) { ui.notifications.warn(lockedReason); return; }
    const entry = getCurrentTileEntryForToken(token, piece);
    if (!entry) { ui.notifications.warn("The selected army is not currently inside a world tile."); return; }
    const house = getHouseData(entry.drawing) || {};
    const ownerId = getTileOwnerUserId(entry.tile, house);
    const ownerName = getTileOwnerUserName(entry.tile, house);
    const attackerOwnerId = piece.ownerUserId || piece.playerOwnerUserId || game.user.id;
    if (ownerId && String(ownerId) === String(attackerOwnerId)) { ui.notifications.warn(`${getTileName(entry)} is already controlled by this army's owner.`); return; }

    const defaultTurns = Math.max(1, Number(piece.siegeTurns || 1));
    const defaultEngines = Math.max(0, Number(piece.siegeEngines || 0));
    const result = await new Promise(resolve => {
      const settlementKey = getSiegeSettlementKey(house);
      const fortLevel = getFortificationLevelForHouse(house);
      const settlementDc = SIEGE_DC_TABLE[settlementKey]?.[fortLevel] ?? 15;
      new Dialog({
        title: `Siege / Storm — ${getTileName(entry)}`,
        content: `<form>
          <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;">
            <strong>Attacking Army:</strong> ${escapeHtml(piece.name || token.document.name)}<br>
            <strong>Target:</strong> ${escapeHtml(getTileName(entry))}<br>
            <strong>Current Owner:</strong> ${escapeHtml(ownerName || house.house || entry.tile.owner || "NPC / Neutral")}<br>
            <strong>Settlement:</strong> ${escapeHtml(siegeSettlementLabel(settlementKey))}<br>
            <strong>Fortification:</strong> ${escapeHtml(fortLevel)}<br>
            <strong>Settlement/Fortification DC:</strong> ${escapeHtml(settlementDc)}
          </div>
          <div class="form-group"><label>Siege Engines</label><input type="number" name="siegeEngines" value="${escapeHtml(defaultEngines)}" min="0" step="1" style="width:100%;" /></div>
          <div class="form-group"><label>Turns Under Siege</label><input type="number" name="siegeTurns" value="${escapeHtml(defaultTurns)}" min="1" step="1" style="width:100%;" /></div>
          <p class="notes">Quick Siege uses settlement + fortification only. If a player-owned tile has a defending army present, the GM gets a pitched battle alert instead.</p>
        </form>`,
        buttons: { roll: { label: "Roll Storm", callback: html => { const form = html[0].querySelector("form"); resolve({ siegeEngines: Math.max(0, Number(form.siegeEngines.value || 0)), siegeTurns: Math.max(1, Number(form.siegeTurns.value || 1)) }); }}, cancel: { label: "Cancel", callback: () => resolve(null) } },
        default: "roll"
      }, { width: 620, height: 520, resizable: true }).render(true);
    });
    if (!result) return;
    if (!game.user.isGM) { await requestGmSiegeStorm({ token, piece, entry, options: result }); return; }
    try {
      await resolveSiegeStorm({ token, piece, entry, options: result, actingUserId: game.user.id, actingUserName: game.user.name });
    } catch (err) {
      ui.notifications.error(err.message || "Siege / Storm failed.");
      console.error(err);
    }
  }

  async function handleSiegeStormRequest(message) {
    if (!game.user.isGM) return;
    if (message.targetGmId && String(message.targetGmId) !== String(game.user.id)) return;
    if (message.sceneId && String(message.sceneId) !== String(canvas.scene?.id)) return;
    const token = canvas.tokens.placeables.find(token => token.document.id === message.tokenId);
    if (!token) { ui.notifications.warn(`Siege request failed: token ${message.tokenName || message.tokenId} not found.`); return; }
    const piece = foundry.utils.deepClone(getWorldPiece(token) || {});
    const entry = getEntryById(message.drawingId) || getEntryById(message.tileId) || getCurrentTileEntryForToken(token, piece);
    try {
      await resolveSiegeStorm({ token, piece, entry, options: message.options || {}, actingUserId: message.requesterUserId, actingUserName: message.requesterUserName });
      ui.notifications.info(`Resolved siege request from ${message.requesterUserName}.`);
    } catch (err) {
      ui.notifications.error(err.message || "Siege request failed.");
      console.error("Siege request failed", err, message);
    }
  }

  function getDiplomacyValue(piece = {}, character = {}) {
    const value = numberOrBlank(character.diplomacy ?? character.stats?.diplomacy ?? piece.diplomacy ?? piece.stats?.diplomacy);
    return value === "" ? 0 : Number(value);
  }

  function getFirstNumberOrBlank(...values) {
    for (const value of values) {
      const parsed = numberOrBlank(value);
      if (parsed !== "") return Number(parsed);
    }
    return "";
  }

  function getCharacterIdentityForToken(token) {
    const piece = getWorldPiece(token) || {};
    const character = getCharacterDataFromToken(token) || {};
    return String(character.characterId || character.id || piece.characterId || piece.linkedCharacterId || token?.document?.id || "").trim();
  }

  function characterTokenMatchesId(token, wantedId) {
    const target = String(wantedId || "").trim();
    if (!target) return false;
    const piece = getWorldPiece(token) || {};
    const character = getCharacterDataFromToken(token) || {};
    const ids = [
      character.characterId,
      character.id,
      piece.characterId,
      piece.linkedCharacterId,
      token?.document?.id,
      token?.actor?.id
    ].map(value => String(value || "").trim()).filter(Boolean);
    return ids.includes(target);
  }

  function isCharacterTokenOnTile(token, tileId) {
    const piece = getWorldPiece(token) || {};
    const character = getCharacterDataFromToken(token) || {};
    const wanted = String(tileId || "").trim();
    if (!wanted) return false;
    if (String(character.currentTileId || "").trim() === wanted) return true;
    if (String(piece.currentTileId || "").trim() === wanted) return true;
    return String(getCurrentTileEntryForToken(token, piece)?.tile?.id || "").trim() === wanted;
  }

  function isCharacterTokenOwnedBy(token, userId, userName = "") {
    const piece = getWorldPiece(token) || {};
    const character = getCharacterDataFromToken(token) || {};
    const wantedId = String(userId || "").trim();
    const wantedName = normalize(userName || "");
    const ids = [character.playerUserId, character.ownerUserId, piece.playerOwnerUserId, piece.ownerUserId]
      .map(value => String(value || "").trim())
      .filter(Boolean);
    if (wantedId && ids.includes(wantedId)) return true;
    const names = [character.playerName, character.ownerUserName, piece.playerOwnerUserName, piece.ownerUserName]
      .map(value => normalize(value || ""))
      .filter(Boolean);
    return Boolean(wantedName && names.includes(wantedName));
  }

  function sortDefenderCandidatesByDiplomacy(candidates) {
    return candidates.sort((a, b) => getDiplomacyValue(getWorldPiece(b), getCharacterDataFromToken(b)) - getDiplomacyValue(getWorldPiece(a), getCharacterDataFromToken(a)));
  }

  function findDefenderCharacterForTile(entry, attackerToken, actingUserId, worldTile = entry?.tile || {}, house = {}) {
    const tileId = getTileId(entry);
    const sameTileCharacters = getCharacterTokens().filter(token => {
      if (token.document.id === attackerToken.document.id) return false;
      return isCharacterTokenOnTile(token, tileId);
    });

    const explicitDefenderIds = [
      house.npcDefenderCharacterId,
      worldTile.npcDefenderCharacterId,
      house.rulingCharacterId,
      worldTile.rulingCharacterId
    ].map(value => String(value || "").trim()).filter(Boolean);

    if (explicitDefenderIds.length) {
      const explicitMatches = sameTileCharacters.filter(token => explicitDefenderIds.some(id => characterTokenMatchesId(token, id)));
      if (explicitMatches.length) return sortDefenderCandidatesByDiplomacy(explicitMatches)[0] || null;
    }

    const currentOwnerId = getTileOwnerUserId(worldTile, house);
    const currentOwnerName = getTileOwnerUserName(worldTile, house);
    const ownershipType = normalize(inferOwnershipType(worldTile, house));

    if (ownershipType === "player" && (currentOwnerId || currentOwnerName)) {
      const ownerCandidates = sameTileCharacters.filter(token => {
        if (actingUserId && String(actingUserId) === String(currentOwnerId || "")) return false;
        return isCharacterTokenOwnedBy(token, currentOwnerId, currentOwnerName);
      });
      if (ownerCandidates.length) return sortDefenderCandidatesByDiplomacy(ownerCandidates)[0] || null;
    }

    return null;
  }

  function getTextComparisonModifier(attackerValue, defenderValue, sameLabel, differentLabel) {
    const a = normalize(attackerValue);
    const d = normalize(defenderValue);
    if (!a || !d) return { modifier: 0, label: "", kind: "unknown" };
    if (a === d) return { modifier: -2, label: sameLabel, kind: "same" };
    return { modifier: 2, label: differentLabel, kind: "different" };
  }

  function getDefenderDiplomacyValue(house = {}, worldTile = {}, defenderToken = null) {
    if (defenderToken) return getDiplomacyValue(getWorldPiece(defenderToken), getCharacterDataFromToken(defenderToken));
    const value = getFirstNumberOrBlank(
      house.npcDefenderDiplomacy,
      house.npcDiplomacy,
      house.rulerDiplomacy,
      worldTile.npcDefenderDiplomacy,
      worldTile.npcDiplomacy,
      worldTile.rulerDiplomacy
    );
    return value === "" ? 3 : Number(value);
  }

  async function rollDieTotal(formula) {
    const roll = await new Roll(formula).evaluate({ async: true });
    return Number(roll.total || 0);
  }

  async function applyDiplomaticTakeover({ token, piece, entry, actingUserId, actingUserName }) {
    if (!token || !piece || !entry) throw new Error("Diplomatic takeover needs one character token on a world tile.");
    const actingUser = game.users.get(actingUserId) || { id: actingUserId, name: actingUserName, isGM: false };
    if (!canUserControlWorldPieceForUser(token, piece, actingUser)) throw new Error(`${actingUserName} does not control ${piece.name || token.document.name}.`);
    if (normalize(piece.pieceType) !== "character") throw new Error("Diplomatic Takeover must be attempted with a character token.");

    const character = getCharacterDataFromToken(token);
    const worldTile = foundry.utils.deepClone(entry.tile);
    const house = foundry.utils.deepClone(entry.drawing.document.getFlag(FLAG_SCOPE, HOUSE_KEY) || {});
    const currentOwnerId = getTileOwnerUserId(worldTile, house);
    const tileName = getTileName(entry);
    const diplomacyRoundKey = getCurrentActionRoundKey();
    if (hasDiplomacyAttemptThisRound(character, piece)) throw new Error(`${character.characterName || piece.name} has already attempted diplomacy this turn.`);
    if (currentOwnerId && String(currentOwnerId) === String(actingUserId)) throw new Error(`${tileName} is already controlled by ${actingUserName}.`);
    if (csvBoolean(house.diplomaticTakeoverAllowed ?? worldTile.diplomaticTakeoverAllowed, getTileType(worldTile) !== "sea") === false) throw new Error(`${tileName} cannot be taken by diplomacy.`);
    if (csvBoolean(house.marriageProtected ?? worldTile.marriageProtected, false)) {
      const protectedBy = house.marriageProtectedPlayerName || worldTile.marriageProtectedPlayerName || "another player family";
      throw new Error(`${tileName} is marriage-protected by ${protectedBy}; diplomacy is blocked.`);
    }

    const defenderToken = findDefenderCharacterForTile(entry, token, actingUserId, worldTile, house);
    const defenderPiece = defenderToken ? getWorldPiece(defenderToken) : null;
    const defenderCharacter = defenderToken ? getCharacterDataFromToken(defenderToken) : null;
    const defenderName = defenderCharacter?.characterName || house.npcDefenderName || house.lord || `${tileName} NPC Defender`;
    const attackerDiplomacy = getDiplomacyValue(piece, character);
    const defenderDiplomacy = getDefenderDiplomacyValue(house, worldTile, defenderToken);
    const attackerCulture = character.culture || piece.culture || "";
    const defenderCulture = defenderCharacter?.culture || defenderPiece?.culture || house.culture || worldTile.culture || "";
    const attackerReligion = character.religion || piece.religion || "";
    const defenderReligion = defenderCharacter?.religion || defenderPiece?.religion || house.religion || worldTile.religion || "";
    const cultureMod = getTextComparisonModifier(attackerCulture, defenderCulture, "Same Culture", "Different Culture");
    const religionMod = getTextComparisonModifier(attackerReligion, defenderReligion, "Same Religion", "Different Religion");
    const swornToPlayerId = String(house.swornToPlayerUserId || worldTile.swornToPlayerUserId || currentOwnerId || "").trim();
    const swornToType = normalize(house.swornToType || worldTile.swornToType || (currentOwnerId ? "Player" : ""));
    const swornModifier = swornToType === "player" && swornToPlayerId && String(swornToPlayerId) !== String(actingUserId) ? 4 : 0;
    const baseDc = 10;
    const finalDc = baseDc + defenderDiplomacy + cultureMod.modifier + religionMod.modifier + swornModifier;
    const d20 = await rollDieTotal("1d20");
    const finalRoll = d20 + attackerDiplomacy;
    const success = finalRoll >= finalDc;
    const controller = getCharacterControllerIdentity(token, actingUserId, actingUserName);
    const ownerUser = game.users.get(controller.id) || null;
    const now = new Date().toISOString();
    const conqueringHouse = getCanonicalHouseNameForCharacter(token, controller.id || actingUserId, controller.name || actingUserName);
    const math = { d20, attackerDiplomacy, finalRoll, baseDc, defenderDiplomacy, cultureModifier: cultureMod.modifier, religionModifier: religionMod.modifier, swornModifier, finalDc, attackerCulture, defenderCulture, attackerReligion, defenderReligion };

    if (success) {
      if (!conqueringHouse) throw new Error(`Could not determine ${character.characterName || piece.name || actingUserName}'s House. Assign a House to the character or one of ${actingUserName}'s existing holdings and try again.`);
      const transfer = applyProvinceTransferData(worldTile, house, {
        houseName: conqueringHouse,
        actingUserId: controller.id || actingUserId,
        actingUserName: controller.name || actingUserName,
        source: "Diplomacy",
        actorName: character.characterName || piece.name || "",
        metadata: { attackerCharacterId: character.characterId || "", requesterUserId: actingUserId || "", requesterUserName: actingUserName || "", controllerSource: controller.source }
      });
      house.lord = house.lord || defenderName;
      house.npcDefenderName = defenderName;
      house.lastDiplomaticTakeover = { success: true, attackerCharacterId: character.characterId, attackerName: character.characterName, defenderName, requesterUserId: actingUserId, requesterUserName: actingUserName, controllerUserId: transfer.controllerId, controllerUserName: transfer.controllerName, house: transfer.houseName, at: now, math };
    } else {
      house.npcDefenderName = defenderName;
      house.lord = house.lord || defenderName;
      house.lastDiplomaticTakeover = { success: false, attackerCharacterId: character.characterId, attackerName: character.characterName, defenderName, userId: actingUserId, userName: actingUserName, at: now, math };
      worldTile.ownershipType = worldTile.ownershipType || house.ownershipType || inferOwnershipType(worldTile, house);
    }
    const updatedCharacter = foundry.utils.deepClone(character || {});
    const updatedPiece = foundry.utils.deepClone(piece || {});
    updatedCharacter.lastDiplomacyRoundKey = diplomacyRoundKey;
    updatedCharacter.lastDiplomacyAttemptAt = now;
    updatedCharacter.lastDiplomacyOutcome = success ? "success" : "failure";
    updatedPiece.lastDiplomacyRoundKey = diplomacyRoundKey;
    updatedPiece.lastDiplomacyAttemptAt = now;
    updatedPiece.lastDiplomacyOutcome = success ? "success" : "failure";
    if (!success) {
      updatedPiece.movementUsed = Math.max(Number(updatedPiece.movementUsed || 0), Number(updatedPiece.movementMax || 0));
      updatedPiece.movementLockedRoundKey = diplomacyRoundKey;
      updatedPiece.movementLockedReason = "Failed diplomacy attempt this turn.";
    }
    await token.document.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, updatedCharacter);
    if (token.actor) await token.actor.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, foundry.utils.deepClone(updatedCharacter));
    await saveWorldPiece(token, updatedPiece);

    worldTile.updatedAt = now;
    worldTile.updatedBy = game.user.name;
    house.updatedAt = now;
    house.updatedBy = game.user.name;
    await entry.drawing.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, worldTile);
    await entry.drawing.document.setFlag(FLAG_SCOPE, HOUSE_KEY, house);
    if (success) {
      await verifyProvinceAllegiance(
        entry,
        conqueringHouse,
        controller.id || actingUserId,
        controller.name || actingUserName
      );
    }

    const publicContent = success
      ? `<h2>Diplomatic Takeover</h2><p><strong>${escapeHtml(character.characterName || piece.name)}</strong> has won over <strong>${escapeHtml(tileName)}</strong>.</p><p><strong>Local House:</strong> ${escapeHtml(house.house || worldTile.house || worldTile.owner || "Unknown")}</p><p><strong>New allegiance:</strong> ${escapeHtml(house.allegiance || worldTile.allegiance || conqueringHouse || ownerUser?.name || actingUserName || "Player")}</p><p>The local House and ruler remain in place; only allegiance/control changes.</p>`
      : `<h2>Diplomatic Takeover Failed</h2><p><strong>${escapeHtml(character.characterName || piece.name)}</strong> failed to win over <strong>${escapeHtml(tileName)}</strong>.</p><p>The tile remains under <strong>${escapeHtml(getTileOwnerUserName(worldTile, house) || house.house || worldTile.owner || "NPC")}</strong> control.</p>`;
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "Crown Diplomacy" }), content: publicContent });
    const gmUsers = game.users.contents.filter(user => user.isGM).map(user => user.id);
    if (gmUsers.length) {
      const modifierLines = [
        cultureMod.label ? `${cultureMod.label}: ${cultureMod.modifier >= 0 ? "+" : ""}${cultureMod.modifier}` : "Culture: no modifier",
        religionMod.label ? `${religionMod.label}: ${religionMod.modifier >= 0 ? "+" : ""}${religionMod.modifier}` : "Religion: no modifier",
        swornModifier ? `Sworn to another player: +${swornModifier}` : "Sworn to another player: 0"
      ].join("<br>");
      await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "Crown Diplomacy GM" }), whisper: gmUsers, content: `<h2>Diplomacy Check — GM Details</h2><p><strong>Attacker:</strong> ${escapeHtml(character.characterName || piece.name)} — Diplomacy ${escapeHtml(attackerDiplomacy)}</p><p><strong>Defender:</strong> ${escapeHtml(defenderName)} — Diplomacy ${escapeHtml(defenderDiplomacy)}</p><p><strong>Roll:</strong> d20 ${escapeHtml(d20)} + Diplomacy ${escapeHtml(attackerDiplomacy)} = <strong>${escapeHtml(finalRoll)}</strong></p><p><strong>DC:</strong> 10 + Defender ${escapeHtml(defenderDiplomacy)} + modifiers = <strong>${escapeHtml(finalDc)}</strong></p><p>${modifierLines}</p><p><strong>Result:</strong> ${success ? "Success" : "Failure"}</p>` });
    }
    revealForCurrentPlayerPieces();
    return success;
  }

  async function requestGmDiplomacy({ token, piece, entry }) {
    const gm = findActiveGmForScene(canvas.scene?.id);
    if (!gm) { ui.notifications.warn("No active GM online to resolve the diplomatic takeover."); return false; }
    game.socket.emit(SOCKET_NAME, {
      type: "diplomacyRequest",
      targetGmId: gm.id,
      sceneId: canvas.scene?.id,
      requesterUserId: game.user.id,
      requesterUserName: game.user.name,
      tokenId: token.document.id,
      tokenName: token.document.name,
      drawingId: entry.drawing.document.id,
      tileId: getTileId(entry),
      tileName: getTileName(entry)
    });
    ui.notifications.info(`Diplomatic takeover request sent to GM ${gm.name}.`);
    return true;
  }

  async function diplomaticTakeover() {
    if (!requireOverviewScene()) return;
    const selected = canvas.tokens.controlled.filter(token => isCharacterToken(token));
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one character token on the target tile."); return; }
    const token = selected[0];
    const piece = getWorldPiece(token);
    if (!piece) { ui.notifications.warn("Selected character is missing world-piece data."); return; }
    if (!canUserControlWorldPiece(token, piece)) { ui.notifications.warn("You can only attempt diplomacy with a character you control."); return; }
    const entry = getCurrentTileEntryForToken(token, piece);
    if (!entry) { ui.notifications.warn("The selected character is not currently inside a world tile."); return; }
    const confirmed = await Dialog.confirm({ title: "Diplomatic Takeover", content: `<p>Attempt to diplomatically take over <strong>${escapeHtml(getTileName(entry))}</strong> using <strong>${escapeHtml(piece.name || token.document.name)}</strong>?</p><p class="notes">Players will not see hidden NPC stats. The GM receives the exact comparison.</p>`, yes: () => true, no: () => false, defaultYes: true });
    if (!confirmed) return;
    if (!game.user.isGM) { await requestGmDiplomacy({ token, piece, entry }); return; }
    try {
      await applyDiplomaticTakeover({ token, piece, entry, actingUserId: game.user.id, actingUserName: game.user.name });
    } catch (err) {
      ui.notifications.error(err.message || "Diplomatic takeover failed.");
      console.error(err);
    }
  }

  async function handleDiplomacyRequest(message) {
    if (!game.user.isGM) return;
    if (message.targetGmId && String(message.targetGmId) !== String(game.user.id)) return;
    if (message.sceneId && String(message.sceneId) !== String(canvas.scene?.id)) return;
    const token = canvas.tokens.placeables.find(token => token.document.id === message.tokenId);
    if (!token) { ui.notifications.warn(`Diplomacy request failed: token ${message.tokenName || message.tokenId} not found.`); return; }
    const piece = getWorldPiece(token);
    const entry = getCurrentTileEntryForToken(token, piece);
    try {
      await applyDiplomaticTakeover({ token, piece, entry, actingUserId: message.requesterUserId, actingUserName: message.requesterUserName });
      ui.notifications.info(`Resolved diplomacy request from ${message.requesterUserName}.`);
    } catch (err) {
      ui.notifications.error(err.message || "Diplomacy request failed.");
      console.error("Diplomacy request failed", err);
    }
  }


  function getDuelArmorMeta(armor) {
    const key = String(armor || "Unarmored").trim();
    return DUEL_ARMORS.find(item => item.key === key || normalize(item.key) === normalize(key)) || DUEL_ARMORS[0];
  }

  function getDuelArmorBonus(armor) {
    return Number(getDuelArmorMeta(armor).bonus || 0);
  }

  function getDuelWeaponAdvantage(attacker, defender) {
    const a = DUEL_WEAPONS.find(w => normalize(w) === normalize(attacker)) || inferDuelWeapon(attacker) || "";
    const d = DUEL_WEAPONS.find(w => normalize(w) === normalize(defender)) || inferDuelWeapon(defender) || "";
    return DUEL_WEAPON_ADVANTAGE[a]?.includes(d) ? 5 : 0;
  }

  function inferDuelWeapon(value) {
    const text = normalize(value);
    if (!text) return "Sword";
    if (text.includes("spear") || text.includes("pike")) return "Spear";
    if (text.includes("bow") || text.includes("crossbow")) return "Bow";
    if (text.includes("polearm") || text.includes("halberd") || text.includes("glaive")) return "Polearm";
    if (text.includes("mace") || text.includes("hammer")) return "Mace";
    if (text.includes("axe")) return "Axe";
    if (text.includes("sword") || text.includes("blade")) return "Sword";
    return "Sword";
  }

  function characterHasPreferredDuelWeapon(character = {}, weapon = "") {
    const preferred = String(character.preferredWeapons || "");
    if (!preferred.trim()) return false;
    const inferred = inferDuelWeapon(preferred);
    return normalize(inferred) === normalize(weapon);
  }

  function getDuelNumber(value, fallback = 0) {
    const number = Number(String(value ?? "").replaceAll(",", "").trim());
    return Number.isFinite(number) ? number : fallback;
  }

  async function rollDuelDie(sides) {
    const roll = await new Roll(`1d${Number(sides)}`).evaluate({ async: true });
    return Number(roll.total || 0);
  }

  function duelSeverityName(roll) {
    const value = Number(roll || 0);
    if (value <= 2) return "Scratch";
    if (value <= 4) return "Wound";
    if (value <= 6) return "Sprain";
    if (value <= 8) return "Break";
    if (value === 9) return "Near Amputation";
    return "Amputation";
  }

  function duelEffectIsLethal(effect) {
    const text = normalize(effect);
    return text.includes("possible death") || text.includes("possible end of fight");
  }

  function duelInjuryScore(injury) {
    let score = Number(injury?.severityRoll || 0) * 10;
    if (duelEffectIsLethal(injury?.effect)) score += 25;
    return score;
  }

  async function makeDuelInjury() {
    const locationRoll = await rollDuelDie(36);
    const severityRoll = await rollDuelDie(10);
    const location = DUEL_HIT_LOCATIONS[Math.max(0, Math.min(DUEL_HIT_LOCATIONS.length - 1, locationRoll - 1))] || DUEL_HIT_LOCATIONS[0];
    return {
      locationRoll,
      location: location.location,
      effect: location.effect,
      severityRoll,
      severity: duelSeverityName(severityRoll)
    };
  }

  async function resolveDuelInjuryForArmor(armor) {
    const first = await makeDuelInjury();
    const firstIsAmputation = first.severity === "Amputation";
    const firstIsLethal = duelEffectIsLethal(first.effect);
    const armorKey = getDuelArmorMeta(armor).key;

    if (armorKey === "Unarmored") return { injury: first, rerolled: false, armorRule: "Unarmored: no injury protection." };

    if (armorKey === "Lightly Armored") {
      if (firstIsAmputation) return { injury: await makeDuelInjury(), rerolled: true, armorRule: "Light armor rerolled Amputation once; second result stands." };
      return { injury: first, rerolled: false, armorRule: "Light armor did not trigger a reroll." };
    }

    if (armorKey === "Medium Armored") {
      if (firstIsAmputation || firstIsLethal) return { injury: await makeDuelInjury(), rerolled: true, armorRule: "Medium armor rerolled lethal/Amputation once; second result stands." };
      return { injury: first, rerolled: false, armorRule: "Medium armor did not trigger a reroll." };
    }

    if (armorKey === "Heavy Armored") {
      if (firstIsAmputation || firstIsLethal) {
        const second = await makeDuelInjury();
        const kept = duelInjuryScore(second) < duelInjuryScore(first) ? second : first;
        return { injury: kept, rerolled: true, armorRule: "Heavy armor rolled a second injury and kept the less severe result.", first, second };
      }
      return { injury: first, rerolled: false, armorRule: "Heavy armor did not trigger a second injury." };
    }

    return { injury: first, rerolled: false, armorRule: "No armor rule applied." };
  }

  function buildDuelWeaponOptions(selected = "") {
    const current = inferDuelWeapon(selected);
    return DUEL_WEAPONS.map(weapon => `<option value="${escapeHtml(weapon)}" ${normalize(weapon) === normalize(current) ? "selected" : ""}>${escapeHtml(weapon)}</option>`).join("");
  }

  function buildDuelArmorOptions(selected = "Unarmored") {
    const current = getDuelArmorMeta(selected).key;
    return DUEL_ARMORS.map(armor => `<option value="${escapeHtml(armor.key)}" ${armor.key === current ? "selected" : ""}>${escapeHtml(armor.label)} — ${escapeHtml(armor.note)}</option>`).join("");
  }

  function buildDuelSideForm(prefix, token) {
    const character = getCharacterDataFromToken(token) || {};
    const weapon = inferDuelWeapon(character.preferredWeapons || "Sword");
    const showStats = game.user.isGM || canUserControlWorldPiece(token, getWorldPiece(token));
    const statLine = showStats
      ? `<p class="notes">Prowess ${escapeHtml(character.prowess || 0)}; Martial ${escapeHtml(character.martial || 0)}.</p>`
      : `<p class="notes">Stats hidden from non-owners. The GM-side resolver uses the stored character stats.</p>`;
    return `<div style="padding:8px;border:1px solid #777;border-radius:6px;">
      <h3 style="margin-top:0;">${prefix === "a" ? "Combatant A" : "Combatant B"}: ${escapeHtml(character.characterName || token.document.name)}</h3>
      ${statLine}
      <div class="form-group"><label>Weapon</label><select name="${prefix}_weapon" style="width:100%;">${buildDuelWeaponOptions(weapon)}</select></div>
      <div class="form-group"><label>Armor</label><select name="${prefix}_armor" style="width:100%;">${buildDuelArmorOptions("Unarmored")}</select></div>
      <div class="form-group"><label><input type="checkbox" name="${prefix}_valyrian" /> Valyrian Steel?</label></div>
      <div class="form-group"><label>Secondary Bonus</label><input type="number" name="${prefix}_secondary" value="0" step="1" style="width:100%;" /></div>
    </div>`;
  }

  async function getDuelDialogOptions(tokenA, tokenB) {
    return await new Promise(resolve => {
      new Dialog({
        title: "Duel",
        content: `<form>
          <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;">
            Select two character tokens, then choose weapon, armor, Valyrian steel, and any temporary secondary bonus. The combat formula follows the corrected Google Sheet roller: d30 + Prowess + Martial/2 + armor + weapon advantage + Valyrian bonus + secondary bonus.
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            ${buildDuelSideForm("a", tokenA)}
            ${buildDuelSideForm("b", tokenB)}
          </div>
        </form>`,
        buttons: {
          roll: { label: "Roll Duel", callback: html => {
            const form = html[0].querySelector("form");
            resolve({
              a: {
                weapon: form.elements.a_weapon.value,
                armor: form.elements.a_armor.value,
                valyrian: Boolean(form.elements.a_valyrian.checked),
                secondary: getDuelNumber(form.elements.a_secondary.value, 0)
              },
              b: {
                weapon: form.elements.b_weapon.value,
                armor: form.elements.b_armor.value,
                valyrian: Boolean(form.elements.b_valyrian.checked),
                secondary: getDuelNumber(form.elements.b_secondary.value, 0)
              }
            });
          }},
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "roll"
      }, { width: 820, height: 680, resizable: true }).render(true);
    });
  }

  function buildDuelCombatant(token, options = {}) {
    const character = getCharacterDataFromToken(token) || {};
    const weapon = options.weapon || inferDuelWeapon(character.preferredWeapons || "Sword");
    const armor = getDuelArmorMeta(options.armor || "Unarmored").key;
    const prowess = getDuelNumber(character.prowess, 0);
    const martial = getDuelNumber(character.martial, 0);
    const secondary = getDuelNumber(options.secondary, 0);
    return {
      tokenId: token.document.id,
      tokenName: token.document.name,
      characterId: character.characterId || token.document.id,
      name: character.characterName || token.document.name,
      house: character.house || "",
      preferredWeapons: character.preferredWeapons || "",
      weapon,
      armor,
      armorBonus: getDuelArmorBonus(armor),
      valyrian: Boolean(options.valyrian),
      prowess,
      martial,
      martialBonus: martial / 2,
      secondary
    };
  }

  function formatDuelBreakdown(combatant) {
    return `d30 ${combatant.d30} + Prowess ${combatant.prowess} + Martial/2 ${combatant.martialBonus} + Armor ${combatant.armorBonus} + Weapon ${combatant.weaponBonus} + Valyrian ${combatant.vsBonus} + Secondary ${combatant.secondary} = ${combatant.final}`;
  }

  function formatDuelInjury(injuryResult, defenderName) {
    if (!injuryResult?.injury) return "No injury.";
    const injury = injuryResult.injury;
    return `${defenderName} suffers a ${injury.severity} to the ${injury.location}${injury.effect ? ` — ${injury.effect}` : ""}`;
  }

  async function resolveDuel({ tokenA, tokenB, options = {}, requesterUserName = game.user.name }) {
    if (!tokenA || !tokenB) throw new Error("Duel requires two character tokens.");
    if (!isCharacterToken(tokenA) || !isCharacterToken(tokenB)) throw new Error("Duel can only be rolled between character tokens.");

    const a = buildDuelCombatant(tokenA, options.a || {});
    const b = buildDuelCombatant(tokenB, options.b || {});

    a.d30 = await rollDuelDie(30);
    b.d30 = await rollDuelDie(30);

    a.vsBonus = a.valyrian && !b.valyrian ? 5 : 0;
    b.vsBonus = b.valyrian && !a.valyrian ? 5 : 0;

    a.weaponBonus = getDuelWeaponAdvantage(a.weapon, b.weapon);
    b.weaponBonus = getDuelWeaponAdvantage(b.weapon, a.weapon);
    if (a.valyrian && !b.valyrian) b.weaponBonus = 0;
    if (b.valyrian && !a.valyrian) a.weaponBonus = 0;

    a.final = a.prowess + a.martialBonus + a.secondary + a.d30 + a.armorBonus + a.weaponBonus + a.vsBonus;
    b.final = b.prowess + b.martialBonus + b.secondary + b.d30 + b.armorBonus + b.weaponBonus + b.vsBonus;

    const margin = Math.abs(a.final - b.final);
    const winner = a.final > b.final ? a.name : b.final > a.final ? b.name : "Tie";

    a.d100 = await rollDuelDie(100);
    b.d100 = await rollDuelDie(100);

    let injuryResult = null;
    let injuryAttacker = null;
    let injuryDefender = null;
    if (a.final > b.final) {
      injuryAttacker = a;
      injuryDefender = b;
      if (a.d100 <= a.final) injuryResult = await resolveDuelInjuryForArmor(b.armor);
    } else if (b.final > a.final) {
      injuryAttacker = b;
      injuryDefender = a;
      if (b.d100 <= b.final) injuryResult = await resolveDuelInjuryForArmor(a.armor);
    }

    const injuryCheckText = !injuryAttacker
      ? "Tie — no injury check."
      : `${injuryAttacker.name} injury check: d100 ${injuryAttacker.d100} vs final combat ${injuryAttacker.final} — ${injuryResult ? "INJURY" : "No injury"}`;
    const injuryText = injuryResult ? formatDuelInjury(injuryResult, injuryDefender.name) : "No injury inflicted.";

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Duel" }),
      content: `<h2>Duel — ${escapeHtml(winner === "Tie" ? "Tie" : `${winner} Wins`)}</h2>
        <p><strong>Combatant A:</strong> ${escapeHtml(a.name)} — ${escapeHtml(a.weapon)}, ${escapeHtml(a.armor)}${a.valyrian ? ", Valyrian Steel" : ""}</p>
        <p><strong>Combatant B:</strong> ${escapeHtml(b.name)} — ${escapeHtml(b.weapon)}, ${escapeHtml(b.armor)}${b.valyrian ? ", Valyrian Steel" : ""}</p>
        <p><strong>Winner:</strong> ${escapeHtml(winner)}</p>
        <p><strong>Margin:</strong> ${escapeHtml(margin)}</p>
        <p><strong>Injury Check:</strong> ${escapeHtml(injuryCheckText)}</p>
        <p><strong>Injury:</strong> ${escapeHtml(injuryText)}</p>`
    });

    const gmUsers = game.users.contents.filter(user => user.isGM).map(user => user.id);
    if (gmUsers.length) {
      const armorLine = injuryResult?.armorRule ? `<p><strong>Armor Rule:</strong> ${escapeHtml(injuryResult.armorRule)}</p>` : "";
      const rerollLine = injuryResult?.first && injuryResult?.second
        ? `<p><strong>First Injury:</strong> ${escapeHtml(formatDuelInjury({ injury: injuryResult.first }, injuryDefender.name))}<br><strong>Second Injury:</strong> ${escapeHtml(formatDuelInjury({ injury: injuryResult.second }, injuryDefender.name))}</p>`
        : "";
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ alias: "Crown Duel GM" }),
        whisper: gmUsers,
        content: `<h2>Duel Details — GM</h2>
          <p><strong>Requested by:</strong> ${escapeHtml(requesterUserName || game.user.name)}</p>
          <p><strong>${escapeHtml(a.name)}:</strong> ${escapeHtml(formatDuelBreakdown(a))}</p>
          <p><strong>${escapeHtml(b.name)}:</strong> ${escapeHtml(formatDuelBreakdown(b))}</p>
          <p><strong>A d100:</strong> ${escapeHtml(a.d100)}; <strong>B d100:</strong> ${escapeHtml(b.d100)}</p>
          ${armorLine}${rerollLine}
          <p class="notes">The module reports injuries from the sheet logic. Wounds/status are not auto-applied; GM should edit the character if the injury changes the campaign state.</p>`
      });
    }

    return { a, b, winner, margin, injuryResult };
  }

  async function requestGmDuel({ tokenA, tokenB, options }) {
    const gm = findActiveGmForScene(canvas.scene?.id);
    if (!gm) { ui.notifications.warn("No active GM online to resolve this duel."); return false; }
    game.socket.emit(SOCKET_NAME, {
      type: "duelRequest",
      targetGmId: gm.id,
      sceneId: canvas.scene?.id,
      requesterUserId: game.user.id,
      requesterUserName: game.user.name,
      tokenAId: tokenA.document.id,
      tokenAName: tokenA.document.name,
      tokenBId: tokenB.document.id,
      tokenBName: tokenB.document.name,
      options
    });
    ui.notifications.info(`Duel request sent to GM ${gm.name}.`);
    return true;
  }

  async function duel() {
    if (!requireOverviewScene()) return;
    const selected = canvas.tokens.controlled.filter(token => isCharacterToken(token));
    if (selected.length !== 2) { ui.notifications.warn("Select exactly two character tokens, then click Duel."); return; }
    const [tokenA, tokenB] = selected;
    if (!game.user.isGM && !selected.some(token => canUserControlWorldPiece(token, getWorldPiece(token)))) {
      ui.notifications.warn("You must control at least one selected character to request a duel.");
      return;
    }
    const options = await getDuelDialogOptions(tokenA, tokenB);
    if (!options) return;
    if (!game.user.isGM) { await requestGmDuel({ tokenA, tokenB, options }); return; }
    try {
      await resolveDuel({ tokenA, tokenB, options, requesterUserName: game.user.name });
    } catch (err) {
      ui.notifications.error(err.message || "Duel failed.");
      console.error("Duel failed", err);
    }
  }

  async function handleDuelRequest(message) {
    if (!game.user.isGM) return;
    if (message.targetGmId && String(message.targetGmId) !== String(game.user.id)) return;
    if (message.sceneId && String(message.sceneId) !== String(canvas.scene?.id)) return;
    const tokenA = canvas.tokens.placeables.find(token => token.document.id === message.tokenAId);
    const tokenB = canvas.tokens.placeables.find(token => token.document.id === message.tokenBId);
    if (!tokenA || !tokenB) { ui.notifications.warn(`Duel request failed: missing token ${message.tokenAName || message.tokenAId} or ${message.tokenBName || message.tokenBId}.`); return; }
    try {
      await resolveDuel({ tokenA, tokenB, options: message.options || {}, requesterUserName: message.requesterUserName || "Player" });
      ui.notifications.info(`Resolved duel request from ${message.requesterUserName || "player"}.`);
    } catch (err) {
      ui.notifications.error(err.message || "Duel request failed.");
      console.error("Duel request failed", err, message);
    }
  }

  async function assignPieceOwner() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can assign world piece owners."); return; }

    const selected = canvas.tokens.controlled.filter(token => Boolean(getWorldPiece(token)));
    if (!selected.length) { ui.notifications.warn("Select one or more World Piece tokens first."); return; }

    const users = getPlayerUsers();
    const firstPiece = getWorldPiece(selected[0]);
    const currentOwnerId = firstPiece?.ownerUserId || firstPiece?.playerOwnerUserId || "";
    const userOptions = [
      `<option value="" ${!currentOwnerId ? "selected" : ""}>Unassigned / clear owner</option>`,
      ...users.map(user => `<option value="${escapeHtml(user.id)}" ${String(user.id) === String(currentOwnerId) ? "selected" : ""}>${escapeHtml(user.name)}</option>`)
    ].join("");

    const result = await new Promise(resolve => {
      new Dialog({
        title: "Assign Piece Owner",
        content: `<form>
          <p>Assign selected world piece token(s) to a Foundry player.</p>
          <div class="form-group"><label>Player Owner / Controller</label><select name="ownerUserId" style="width:100%;">${userOptions}</select></div>
          <div class="form-group"><label><input type="checkbox" name="clearOthers" checked /> Remove other non-GM ownership</label></div>
        </form>`,
        buttons: {
          save: { label: "Assign", callback: html => {
            const form = html[0].querySelector("form");
            resolve({ ownerUserId: String(form.ownerUserId.value || ""), clearOthers: form.clearOthers.checked });
          }},
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "save"
      }, { width: 540, height: 310, resizable: true }).render(true);
    });

    if (!result) return;

    const ownerUser = result.ownerUserId ? game.users.get(result.ownerUserId) : null;
    let updated = 0;
    const rows = [];

    for (const token of selected) {
      const piece = getWorldPiece(token);
      const updatedPiece = await applyWorldPieceOwner(token, piece, ownerUser, result.clearOthers);
      rows.push(`<li><strong>${escapeHtml(updatedPiece.name || token.document.name)}</strong> → ${escapeHtml(ownerUser?.name || "Unassigned")}</li>`);
      updated++;
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Piece Owner" }),
      content: `<h2>World Piece Owner Assigned</h2><p><strong>Player Owner:</strong> ${escapeHtml(ownerUser?.name || "Unassigned")}</p><p><strong>Pieces Updated:</strong> ${escapeHtml(updated)}</p><ul>${rows.join("")}</ul>`
    });

    ui.notifications.info(`Assigned owner for ${updated} world piece(s): ${ownerUser?.name || "Unassigned"}.`);
  }

  async function editWorldPiece() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can edit world pieces."); return; }

    const selected = canvas.tokens.controlled.filter(token => Boolean(getWorldPiece(token)));
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one World Piece token to edit."); return; }

    const token = selected[0];
    const piece = foundry.utils.deepClone(getWorldPiece(token));
    const currentOwnerId = piece.ownerUserId || piece.playerOwnerUserId || "";
    const ownerOptions = [
      `<option value="" ${!currentOwnerId ? "selected" : ""}>Unassigned / GM only</option>`,
      ...getPlayerUsers().map(user => `<option value="${escapeHtml(user.id)}" ${String(user.id) === String(currentOwnerId) ? "selected" : ""}>${escapeHtml(user.name)}</option>`)
    ].join("");

    const typeOptions = ["character", "army", "fleet", "dragon"].map(type => {
      const label = type === "dragon" ? "Dragon / Flying Unit" : titleCase(type);
      return `<option value="${escapeHtml(type)}" ${normalize(piece.pieceType || "army") === type ? "selected" : ""}>${escapeHtml(label)}</option>`;
    }).join("");

    const result = await new Promise(resolve => {
      new Dialog({
        title: `Edit World Piece — ${piece.name || token.document.name}`,
        content: `<form>
          <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;">
            <strong>Token:</strong> ${escapeHtml(token.document.name)}<br>
            <strong>Current Tile:</strong> ${escapeHtml(piece.currentTileName || getCurrentTileEntryForToken(token, piece)?.tile?.name || "Unknown")}
          </div>
          <div class="form-group"><label>Piece Name</label><input type="text" name="pieceName" value="${escapeHtml(piece.name || token.document.name)}" style="width:100%;" /></div>
          <div class="form-group"><label>Piece Type</label><select name="pieceType" style="width:100%;">${typeOptions}</select></div>
          <div class="form-group"><label>Movement Points Per Turn</label><input type="number" name="movementMax" value="${escapeHtml(piece.movementMax ?? 3)}" min="0" step="1" style="width:100%;" /></div>
          <div class="form-group"><label>Movement Used</label><input type="number" name="movementUsed" value="${escapeHtml(piece.movementUsed ?? 0)}" min="0" step="1" style="width:100%;" /></div>
          <div class="form-group"><label>Faction / Owner</label><input type="text" name="faction" value="${escapeHtml(piece.faction || "")}" style="width:100%;" /></div>
          <div class="form-group"><label>Statecraft</label><input type="number" name="statecraft" value="${escapeHtml(piece.statecraft ?? piece.stats?.statecraft ?? "")}" min="0" step="1" style="width:100%;" /><p class="notes">Used for building tier requirements when filled in.</p></div>
          <div class="form-group"><label>Player Owner / Controller</label><select name="ownerUserId" style="width:100%;">${ownerOptions}</select></div>
          <div class="form-group"><label>Token Image Path</label><input type="text" name="imagePath" value="${escapeHtml(token.document.texture?.src || token.actor?.img || "")}" style="width:100%;" /></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div class="form-group"><label>Token Width</label><input type="number" name="tokenWidth" value="${escapeHtml(token.document.width || 1)}" min="0.25" step="0.25" style="width:100%;" /></div>
            <div class="form-group"><label>Token Height</label><input type="number" name="tokenHeight" value="${escapeHtml(token.document.height || 1)}" min="0.25" step="0.25" style="width:100%;" /></div>
          </div>
          <div class="form-group"><label><input type="checkbox" name="syncCurrentTile" checked /> Sync current tile from token position</label></div>
          <div class="form-group"><label><input type="checkbox" name="resetMovement" /> Reset movement used to 0</label></div>
        </form>`,
        buttons: {
          save: { label: "Save", callback: html => {
            const form = html[0].querySelector("form");
            resolve({
              name: String(form.pieceName.value || token.document.name).trim(),
              pieceType: normalize(form.pieceType.value || "army"),
              movementMax: Math.max(0, Number(form.movementMax.value || 0)),
              movementUsed: Math.max(0, Number(form.movementUsed.value || 0)),
              faction: String(form.faction.value || "").trim(),
              statecraft: String(form.statecraft.value || "").trim(),
              ownerUserId: String(form.ownerUserId.value || ""),
              imagePath: String(form.imagePath.value || "").trim(),
              width: Math.max(0.25, Number(form.tokenWidth.value || 1)),
              height: Math.max(0.25, Number(form.tokenHeight.value || 1)),
              syncCurrentTile: form.syncCurrentTile.checked,
              resetMovement: form.resetMovement.checked
            });
          }},
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "save"
      }, { width: 620, height: 720, resizable: true }).render(true);
    });

    if (!result) return;

    const ownerUser = result.ownerUserId ? game.users.get(result.ownerUserId) : null;
    const updatedPiece = foundry.utils.deepClone(piece);
    updatedPiece.name = result.name || token.document.name;
    updatedPiece.pieceType = result.pieceType;
    updatedPiece.faction = result.faction;
    if (result.statecraft === "") delete updatedPiece.statecraft;
    else updatedPiece.statecraft = Math.max(0, Number(result.statecraft || 0));
    updatedPiece.movementMax = result.movementMax;
    updatedPiece.movementUsed = result.resetMovement ? 0 : Math.min(result.movementUsed, result.movementMax);
    updatedPiece.allowedTileTypes = getAllowedTileTypes(result.pieceType);

    if (result.syncCurrentTile) {
      const entry = getCurrentTileEntryForToken(token, updatedPiece);
      if (entry?.tile) {
        updatedPiece.currentTileId = entry.tile.id || entry.drawing.document.id;
        updatedPiece.currentTileName = entry.tile.name || "Unnamed Tile";
      }
    }

    updatedPiece.editedAt = new Date().toISOString();
    updatedPiece.editedBy = game.user.name;
    updatedPiece.editedSource = `Crown Overview Tools ${MODULE_VERSION}`;

    await saveWorldPiece(token, updatedPiece);
    const ownedPiece = await applyWorldPieceOwner(token, updatedPiece, ownerUser, true);

    const tokenUpdate = { name: ownedPiece.name, width: result.width, height: result.height };
    if (result.imagePath) tokenUpdate.texture = { src: result.imagePath };
    await token.document.update(tokenUpdate);

    if (token.actor) {
      const actorUpdate = { name: ownedPiece.name };
      if (result.imagePath) actorUpdate.img = result.imagePath;
      await token.actor.update(actorUpdate);
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Piece" }),
      content: `<h2>World Piece Updated</h2><p><strong>Piece:</strong> ${escapeHtml(ownedPiece.name)}</p><p><strong>Type:</strong> ${escapeHtml(ownedPiece.pieceType)}</p><p><strong>Faction:</strong> ${escapeHtml(ownedPiece.faction || "None")}</p><p><strong>Player Owner:</strong> ${escapeHtml(ownerUser?.name || "Unassigned")}</p><p><strong>Movement:</strong> ${escapeHtml(ownedPiece.movementUsed || 0)} / ${escapeHtml(ownedPiece.movementMax || 0)} used</p>`
    });

    ui.notifications.info(`Updated world piece: ${ownedPiece.name}.`);
    revealForCurrentPlayerPieces();
  }

  async function createWorldPiece() {
    if (!requireOverviewScene()) return;
    const selected = canvas.drawings.controlled;
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one World Tile drawing where the piece should spawn."); return; }
    const drawing = selected[0];
    const worldTile = getWorldTile(drawing);
    if (!worldTile) { ui.notifications.warn("The selected drawing has not been assigned as a World Tile."); return; }
    const tileType = getTileType(worldTile);

    const playerOwnerOptions = [
      `<option value="">Unassigned / GM only</option>`,
      ...getPlayerUsers().map(user => `<option value="${escapeHtml(user.id)}">${escapeHtml(user.name)}</option>`)
    ].join("");

    const details = await new Promise(resolve => {
      new Dialog({
        title: "Create World Piece",
        content: `<form>
          <div style="padding:8px;margin-bottom:12px;border:1px solid #777;border-radius:6px;">
            <strong>Spawn Tile:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}<br>
            <strong>Region:</strong> ${escapeHtml(worldTile.region || "None")}<br>
            <strong>Terrain:</strong> ${escapeHtml(worldTile.terrainLabel || worldTile.terrainKey || tileType)}<br>
            <strong>Tile Type:</strong> ${escapeHtml(tileType)}
          </div>
          <div class="form-group"><label>Piece Name</label><input type="text" name="pieceName" style="width:100%;" placeholder="Northern Host, Redwyne Fleet, Daemon..." /></div>
          <div class="form-group"><label>Piece Type</label><select name="pieceType" style="width:100%;"><option value="character">Character</option><option value="army" selected>Army</option><option value="fleet">Fleet</option><option value="dragon">Dragon / Flying Unit</option></select></div>
          <div class="form-group"><label>Movement Points Per Turn</label><input type="number" name="movementMax" value="3" min="0" step="1" style="width:100%;" /></div>
          <div class="form-group"><label>Faction / Owner</label><input type="text" name="faction" placeholder="Stark, Lannister, Neutral..." style="width:100%;" /></div>
          <div class="form-group"><label>Statecraft</label><input type="number" name="statecraft" min="0" step="1" style="width:100%;" placeholder="Optional; used for building tier requirements" /></div>
          <div class="form-group"><label>Player Owner / Controller</label><select name="ownerUserId" style="width:100%;">${playerOwnerOptions}</select><p class="notes">This controls which player can select and move the piece.</p></div>
          <div class="form-group"><label>Token Image Path</label><input type="text" name="imagePath" placeholder="Leave blank for default icon" style="width:100%;" /></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div class="form-group"><label>Token Width</label><input type="number" name="tokenWidth" value="1" min="0.25" step="0.25" style="width:100%;" /></div>
            <div class="form-group"><label>Token Height</label><input type="number" name="tokenHeight" value="1" min="0.25" step="0.25" style="width:100%;" /></div>
          </div>
        </form>`,
        buttons: {
          create: { label: "Create & Spawn", callback: html => {
            const form = html[0].querySelector("form");
            resolve({
              name: String(form.pieceName.value || "").trim(),
              pieceType: normalize(form.pieceType.value || "army"),
              movementMax: Math.max(0, Number(form.movementMax.value || 3)),
              faction: String(form.faction.value || "").trim(),
              statecraft: String(form.statecraft.value || "").trim(),
              ownerUserId: String(form.ownerUserId.value || ""),
              imagePath: String(form.imagePath.value || "").trim(),
              width: Math.max(0.25, Number(form.tokenWidth.value || 1)),
              height: Math.max(0.25, Number(form.tokenHeight.value || 1))
            });
          }},
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "create"
      }, { width: 600, height: 740, resizable: true }).render(true);
    });
    if (!details) return;
    if (!details.name) { ui.notifications.warn("Give the World Piece a name."); return; }
    if (!getAllowedTileTypes(details.pieceType).includes(tileType)) {
      ui.notifications.error(`${details.name} cannot spawn on ${worldTile.name || "this World Tile"}. ${details.pieceType} pieces may only occupy: ${getAllowedTileTypes(details.pieceType).join(", ")}.`);
      return;
    }

    const image = details.imagePath || DEFAULT_IMAGES[details.pieceType] || "icons/svg/mystery-man.svg";
    const folder = await getOrCreateWorldMapFolder();
    const actorType = getSafeActorType();
    const ownerUser = details.ownerUserId ? game.users.get(details.ownerUserId) : null;
    const pieceData = {
      name: details.name,
      pieceType: details.pieceType,
      faction: details.faction,
      ...(details.statecraft !== "" ? { statecraft: Math.max(0, Number(details.statecraft || 0)) } : {}),
      movementMax: details.movementMax,
      movementUsed: 0,
      allowedTileTypes: getAllowedTileTypes(details.pieceType),
      currentTileId: worldTile.id || drawing.document.id,
      currentTileName: worldTile.name || "Unnamed Tile",
      previousTileId: null,
      previousTileName: null,
      ownerUserId: ownerUser?.id || "",
      ownerUserName: ownerUser?.name || "",
      playerOwnerUserId: ownerUser?.id || "",
      playerOwnerUserName: ownerUser?.name || "",
      version: `Crown Overview Tools ${MODULE_VERSION}`,
      assignedAt: new Date().toISOString(),
      assignedBy: game.user.name,
      spawnedAt: new Date().toISOString(),
      spawnedBy: game.user.name
    };

    const actor = await Actor.create({
      name: details.name,
      type: actorType,
      folder: folder.id,
      img: image,
      flags: { [FLAG_SCOPE]: { [WORLD_PIECE_KEY]: foundry.utils.deepClone(pieceData) } },
      prototypeToken: {
        name: details.name,
        actorLink: true,
        width: details.width,
        height: details.height,
        disposition: CONST.TOKEN_DISPOSITIONS.NEUTRAL,
        sight: { enabled: true },
        texture: { src: image },
        flags: { [FLAG_SCOPE]: { [WORLD_PIECE_KEY]: foundry.utils.deepClone(pieceData) } }
      }
    });

    if (ownerUser) {
      const ownership = foundry.utils.deepClone(actor.ownership || {});
      for (const user of getPlayerUsers()) {
        ownership[user.id] = CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE;
      }
      ownership[ownerUser.id] = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
      await actor.update({ ownership });
    }

    const center = getDrawingCenter(drawing);
    const gridSize = getGridSize();
    const tokenData = actor.prototypeToken.toObject();
    tokenData.actorId = actor.id;
    tokenData.actorLink = true;
    tokenData.name = details.name;
    tokenData.x = center.x - (details.width * gridSize) / 2;
    tokenData.y = center.y - (details.height * gridSize) / 2;
    tokenData.width = details.width;
    tokenData.height = details.height;
    tokenData.hidden = false;
    tokenData.sight = tokenData.sight || {};
    tokenData.sight.enabled = true;
    tokenData.texture = tokenData.texture || {};
    tokenData.texture.src = image;
    tokenData.flags = tokenData.flags || {};
    tokenData.flags[FLAG_SCOPE] = tokenData.flags[FLAG_SCOPE] || {};
    tokenData.flags[FLAG_SCOPE][WORLD_PIECE_KEY] = foundry.utils.deepClone(pieceData);
    await canvas.scene.createEmbeddedDocuments("Token", [tokenData]);
    ui.notifications.info(`Created ${details.name} (${details.pieceType}) in ${worldTile.name || "selected World Tile"}${ownerUser ? " for " + ownerUser.name : ""}.`);
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "World Piece" }), content: `<h2>World Piece Created</h2><p><strong>Name:</strong> ${escapeHtml(details.name)}</p><p><strong>Type:</strong> ${escapeHtml(details.pieceType)}</p><p><strong>Faction:</strong> ${escapeHtml(details.faction || "None")}</p><p><strong>Player Owner:</strong> ${escapeHtml(ownerUser?.name || "Unassigned")}</p><p><strong>Spawned At:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}</p><p><strong>Movement:</strong> 0 / ${escapeHtml(details.movementMax)} used</p>` });
  }

  async function resetMovement() {
    if (!requireOverviewScene()) return;
    let resetCount = 0;
    for (const token of canvas.tokens.placeables) {
      const piece = getWorldPiece(token);
      if (!piece) continue;
      const updated = foundry.utils.deepClone(piece);
      updated.movementUsed = 0;
      delete updated.movementLockedRoundKey;
      delete updated.movementLockedReason;
      delete updated.lastSiegeRoundKey;
      delete updated.lastDiplomacyRoundKey;
      updated.lastMovementResetAt = new Date().toISOString();
      updated.lastMovementResetBy = game.user.name;
      updated.lastMovementResetSource = `Crown Overview Tools ${MODULE_VERSION}`;
      await saveWorldPiece(token, updated);
      resetCount++;
    }
    ui.notifications.info(`Movement reset for ${resetCount} world piece(s).`);
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "World Movement" }), content: `<h2>World Movement Reset</h2><p><strong>World Pieces Reset:</strong> ${resetCount}</p><p>All World Pieces now have their full movement available.</p>` });
  }

  async function roundClock() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can adjust the world clock."); return; }
    let clock = getClock();
    if (!clock) {
      clock = getDefaultClock();
      await saveClock(clock);
      await resetMovement();
      ui.notifications.info(`World clock initialized: ${getDateLabel(clock)}.`);
      return;
    }
    const currentLabel = getDateLabel(clock);
    const nextClock = advanceClockData(clock);
    const previousClock = rewindClockData(clock);
    const result = await new Promise(resolve => {
      new Dialog({
        title: "World Round Clock",
        content: `<div style="text-align:center;padding:12px;"><div style="font-size:14px;opacity:0.8;margin-bottom:5px;">Current Date</div><div style="font-size:28px;font-weight:bold;margin-bottom:16px;">${escapeHtml(currentLabel)}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px;border:1px solid #777;border-radius:6px;margin-bottom:12px;"><div><strong>Previous:</strong><br>${escapeHtml(getDateLabel(previousClock))}</div><div><strong>Next:</strong><br>${escapeHtml(getDateLabel(nextClock))}</div></div><p class="notes">Advance/back changes the campaign clock. Advancing collects economy and charges active army/navy upkeep once for the new round. Use Reset Economy Ledger if you reset/rewind during testing and need to collect again.</p></div>`,
        buttons: {
          advance: { label: "Advance Round + Economy", callback: () => resolve("advance") },
          back: { label: "Go Back One Round", callback: () => resolve("back") },
          collect: { label: "Collect Current Round", callback: () => resolve("collect") },
          resetLedger: { label: "Reset Economy Ledger", callback: () => resolve("resetLedger") },
          resetMovement: { label: "Reset Movement Only", callback: () => resolve("resetMovement") },
          resetClock: { label: "Reset Clock", callback: () => resolve("resetClock") },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "advance"
      }, { width: 620, height: 500, resizable: true }).render(true);
    });
    if (!result) return;
    if (result === "resetMovement") { await resetMovement(); return; }
    if (result === "collect") { await collectEconomyForRound(clock, { scope: "all", force: false, silent: false }); return; }
    if (result === "resetLedger") {
      const confirmed = await Dialog.confirm({ title: "Reset Economy Ledger?", content: `<p>This clears collection locks so the current/all rounds can be collected again.</p><p><strong>Use this only for testing or corrections.</strong></p>`, yes: () => true, no: () => false, defaultYes: false });
      if (!confirmed) return;
      await clearEconomyLedger("all");
      await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "Crown Economy" }), content: `<h2>Economy Ledger Reset</h2><p>All economy collection ledger entries were cleared. Income can now be collected again for any round.</p>` });
      ui.notifications.info("Economy ledger reset.");
      return;
    }
    if (result === "resetClock") {
      const confirmed = await Dialog.confirm({ title: "Reset World Clock?", content: "<p>This will reset the campaign clock to <strong>Spring 1, 100 AF</strong> and reset movement. It does <strong>not</strong> clear the economy ledger unless you use Reset Economy Ledger.</p>", yes: () => true, no: () => false, defaultYes: false });
      if (!confirmed) return;
      const newClock = getDefaultClock();
      await saveClock(newClock);
      await resetMovement();
      return;
    }
    if (result === "back") {
      const oldClock = foundry.utils.deepClone(clock);
      const newClock = rewindClockData(clock);
      await saveClock(newClock);
      await resetMovement();
      await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "World Round Clock" }), content: `<h2>Round Rewound</h2><p><strong>Previous:</strong> ${escapeHtml(getDateLabel(oldClock))}</p><p><strong>Current:</strong> ${escapeHtml(getDateLabel(newClock))}</p><p>Movement has been reset. Economy was not automatically collected while rewinding.</p>` });
      return;
    }
    if (result === "advance") {
      const oldClock = foundry.utils.deepClone(clock);
      const newClock = advanceClockData(clock);
      await saveClock(newClock);
      await resetMovement();
      const manpowerRecovery = await recoverManpowerForRound();
      const economySummary = await collectEconomyForRound(newClock, { scope: "all", force: false, silent: false });
      await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "World Round Clock" }), content: `<h2>Round Advanced</h2><p><strong>Previous:</strong> ${escapeHtml(getDateLabel(oldClock))}</p><p><strong>Current:</strong> ${escapeHtml(getDateLabel(newClock))}</p><p>All World Pieces now have their full movement available.</p><p><strong>Economy:</strong> ${economySummary.skipped ? "Already collected" : `${escapeHtml(economySummary.applied)} tile(s) paid ${escapeHtml(resourceMapToText(economySummary.totals))}`}</p><p><strong>Military Upkeep:</strong> ${escapeHtml(resourceMapToText(economySummary.militaryUpkeep || {}, "None"))}</p><p><strong>Manpower Recovery:</strong> ${escapeHtml(Number(manpowerRecovery.recovered || 0).toLocaleString())} men across ${escapeHtml(Number(manpowerRecovery.provinces || 0))} province(s).</p>` });
    }
  }

  function buildRouteModeOptions(piece) {
    const pieceType = normalize(piece?.pieceType || "army");
    if (pieceType === "fleet") return `<option value="best" selected>Best Available Route</option><option value="sea">Sea / Port Route only</option><option value="default">Piece Default Route</option>`;
    if (pieceType === "army" || pieceType === "character") return `<option value="best" selected>Best Available Route</option><option value="land">Land Route only</option><option value="default">Piece Default Route</option>`;
    return `<option value="best" selected>Best Available Route</option><option value="land">Land Route only</option><option value="sea">Sea / Port Route only</option><option value="default">Piece Default Route</option>`;
  }

  function buildRegionOptions(selectedRegion, piece) {
    return getRegions().filter(region => getLegalTilesInRegion(region, piece).length).map(region => `<option value="${escapeHtml(region)}" ${region === selectedRegion ? "selected" : ""}>${escapeHtml(region)}</option>`).join("");
  }

  function buildTileOptionsForRegion(region, selectedTileId, piece) {
    return getLegalTilesInRegion(region, piece).map(entry => {
      const tile = entry.tile;
      let label = `${tile.name} [${tile.tileType || "land"}]`;
      if (tile.id === selectedTileId) label += " — Current";
      return `<option value="${escapeHtml(tile.id)}" ${tile.id === selectedTileId ? "selected" : ""}>${escapeHtml(label)}</option>`;
    }).join("");
  }

  async function askDestination(piece, startTile) {
    return await new Promise(resolve => {
      let startRegion = getRegionName(startTile);
      if (!getLegalTilesInRegion(startRegion, piece).length) startRegion = getRegions().find(region => getLegalTilesInRegion(region, piece).length) || startRegion;
      new Dialog({
        title: "World Path Move",
        content: `<form>
          <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;"><strong>Piece:</strong> ${escapeHtml(piece.name || "World Piece")}<br><strong>Type:</strong> ${escapeHtml(piece.pieceType || "army")}<br><strong>Current Tile:</strong> ${escapeHtml(startTile?.name || "Unknown")}<br><strong>Current Region:</strong> ${escapeHtml(getRegionName(startTile))}<br><strong>Movement:</strong> ${escapeHtml(Number(piece.movementUsed || 0))} / ${escapeHtml(Number(piece.movementMax || 0))} used</div>
          <div class="form-group"><label><strong>Destination Region</strong></label><select name="destinationRegion" style="width:100%;">${buildRegionOptions(startRegion, piece)}</select></div>
          <div class="form-group"><label><strong>Destination Tile</strong></label><select name="destinationTileId" style="width:100%;">${buildTileOptionsForRegion(startRegion, startTile?.id, piece)}</select></div>
          <div class="form-group"><label><strong>Route Mode</strong></label><select name="routeMode" style="width:100%;">${buildRouteModeOptions(piece)}</select></div>
          <div class="form-group"><label>Pause Between Tiles, milliseconds</label><input type="number" name="pauseMs" value="500" min="0" step="100" /></div>
          <p class="notes"><strong>Army / Character:</strong> Land, Port, and Mixed tiles only.<br><strong>Fleet:</strong> Sea and Port tiles only.<br><strong>Dragon:</strong> All terrain types.</p>
        </form>`,
        buttons: {
          move: { label: "Move", callback: html => {
            const form = html[0].querySelector("form");
            resolve({ destinationTileId: String(form.destinationTileId.value || ""), routeMode: String(form.routeMode.value || "best"), pauseMs: Math.max(0, Number(form.pauseMs.value || 500)) });
          }},
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "move",
        render: html => {
          const form = html[0].querySelector("form");
          const regionSelect = form.querySelector('[name="destinationRegion"]');
          const tileSelect = form.querySelector('[name="destinationTileId"]');
          regionSelect.addEventListener("change", () => {
            const selectedRegion = String(regionSelect.value || "");
            tileSelect.innerHTML = buildTileOptionsForRegion(selectedRegion, startTile?.id, piece);
            tileSelect.disabled = !tileSelect.options.length;
          });
        }
      }, { width: 660, height: 520, resizable: true }).render(true);
    });
  }

  function getCharacterTurnStatusForMenu(token) {
    const piece = getWorldPiece(token) || {};
    const character = getCharacterDataFromToken(token) || {};
    const roundKey = getCurrentActionRoundKey();
    const movementUsed = Math.max(0, Number(piece.movementUsed || 0));
    const movementMax = Math.max(0, Number(piece.movementMax || 0));
    const movementRemaining = Math.max(0, movementMax - movementUsed);
    const diplomacyUsed = hasDiplomacyAttemptThisRound(character, piece);
    const linkedArmy = character.characterId ? getExistingArmyForCharacter(character.characterId) : null;
    const linkedArmyPiece = linkedArmy ? (getWorldPiece(linkedArmy) || {}) : {};
    const linkedNavy = character.characterId ? getExistingNavyForCharacter(character.characterId) : null;
    const linkedNavyPiece = linkedNavy ? (getWorldPiece(linkedNavy) || {}) : {};
    const siegeUsed = Boolean(linkedArmy && linkedArmyPiece.lastSiegeRoundKey && String(linkedArmyPiece.lastSiegeRoundKey) === String(roundKey));
    const lockReason = strategicMovementLockReason(piece);
    const entry = getCurrentTileEntryForToken(token, piece);
    const armyCurrent = linkedArmy ? Math.max(0, Number(linkedArmyPiece.strengthCurrent ?? linkedArmyPiece.totalStrength ?? 0)) : 0;
    const armyMax = linkedArmy ? Math.max(armyCurrent, Number(linkedArmyPiece.strengthMax ?? linkedArmyPiece.totalStrength ?? armyCurrent)) : 0;
    const navyShips = linkedNavy ? Math.max(0, Math.floor(Number(linkedNavyPiece.shipsCurrent ?? linkedNavyPiece.totalShips ?? getNavyTotalShips(getNavyComposition(linkedNavyPiece)) ?? 0))) : 0;
    const navyMovementUsed = linkedNavy ? Math.max(0, Number(linkedNavyPiece.movementUsed || 0)) : 0;
    const navyMovementMax = linkedNavy ? Math.max(0, Number(linkedNavyPiece.movementMax || 0)) : 0;
    const navyMovementRemaining = Math.max(0, navyMovementMax - navyMovementUsed);
    const navyLockReason = linkedNavy ? strategicMovementLockReason(linkedNavyPiece) : "";
    const navyEntry = linkedNavy ? (getCurrentTileEntryForToken(linkedNavy, linkedNavyPiece) || (linkedNavyPiece.currentTileId ? getTileById(linkedNavyPiece.currentTileId) : null)) : null;
    const navyComposition = linkedNavy ? navyCompositionText(getNavyComposition(linkedNavyPiece)) : "None";
    const transportCapacity = linkedNavy ? Math.max(0, Number(getFleetTransportCapacity(linkedNavyPiece) || 0)) : 0;
    const liveEmbarkedArmies = linkedNavy ? getEmbarkedArmyTokensForFleet(linkedNavy) : [];
    const transportUsed = linkedNavy ? Math.max(0, Number(getFleetUsedTransportCapacity(linkedNavy) || 0)) : 0;
    const embarkedArmyCount = liveEmbarkedArmies.length;
    const armyComposition = linkedArmy ? armyCompositionText(getArmyComposition(linkedArmyPiece)) : "None";
    const armyUpkeep = linkedArmy ? resourceMapToText(linkedArmyPiece.upkeep || calculateArmyUpkeep(getArmyComposition(linkedArmyPiece))) : "None";
    const statsText = `Statecraft ${character.statecraft ?? piece.statecraft ?? 0}; Intrigue ${character.intrigue ?? piece.intrigue ?? 0}; Lore ${character.lore ?? piece.lore ?? 0}; Prowess ${character.prowess ?? piece.prowess ?? 0}; Martial ${character.martial ?? piece.martial ?? 0}; Diplomacy ${character.diplomacy ?? piece.diplomacy ?? 0}`;
    const secondaryStatsText = `Land ${character.landMovement ?? piece.landMovement ?? piece.movementMax ?? 0}; Naval ${character.navalMovement ?? piece.navalMovement ?? 0}; Wounds ${character.wounds ?? piece.wounds ?? 0}; Command ${character.commandPoints ?? piece.commandPoints ?? 0}`;
    return { token, piece, character, linkedArmy, linkedArmyPiece, linkedNavy, linkedNavyPiece, movementUsed, movementMax, movementRemaining, diplomacyUsed, siegeUsed, lockReason, armyCurrent, armyMax, armyComposition, armyUpkeep, navyShips, navyMovementUsed, navyMovementMax, navyMovementRemaining, navyLockReason, navyComposition, transportCapacity, transportUsed, embarkedArmyCount, navyLocation: navyEntry ? getTileName(navyEntry) : (linkedNavyPiece.currentTileName || "Unknown"), location: entry ? getTileName(entry) : (piece.currentTileName || "Unknown"), statsText, secondaryStatsText };
  }

  async function selectCharacterTokenFromMenu(token, { action = "select" } = {}) {
    if (!token) return;
    const piece = getWorldPiece(token);
    if (!piece) { ui.notifications.warn("That token is not a world character."); return; }
    if (!game.user.isGM) {
      const controller = getCharacterControllerIdentity(token);
      const explicitlyAssigned =
        (controller.id && String(controller.id) === String(game.user.id)) ||
        (controller.name && normalize(controller.name) === normalize(game.user.name));
      if (!explicitlyAssigned && !canUserControlWorldPiece(token, piece)) {
        ui.notifications.warn("You can only select characters assigned to you.");
        return;
      }
    }
    token.control({ releaseOthers: true });
    const center = getTokenCenter(token);
    if (center && canvas?.animatePan) await canvas.animatePan({ x: center.x, y: center.y, duration: 250 });
    if (action === "move") await pathMove();
    if (action === "diplomacy") await diplomaticTakeover();
    if (action === "build") await buildOnCurrentTile();
  }

  async function selectArmyFromCharacterMenu(characterToken, linkedArmy, action = "select") {
    if (!linkedArmy) { ui.notifications.warn("This character does not currently have a linked army."); return; }
    const armyPiece = getWorldPiece(linkedArmy);
    if (!armyPiece || !canUserControlWorldPiece(linkedArmy, armyPiece)) { ui.notifications.warn("You do not control this character's linked army."); return; }
    linkedArmy.control({ releaseOthers: true });
    const center = getTokenCenter(linkedArmy);
    if (center && canvas?.animatePan) await canvas.animatePan({ x: center.x, y: center.y, duration: 250 });
    if (action === "siege") await siegeStorm();
  }

  async function selectNavyFromCharacterMenu(linkedNavy, action = "select") {
    if (!linkedNavy) { ui.notifications.warn("This character does not currently have a linked navy."); return; }
    const navyPiece = getWorldPiece(linkedNavy);
    if (!navyPiece || !canUserControlWorldPiece(linkedNavy, navyPiece)) { ui.notifications.warn("You do not control this character's linked navy."); return; }
    linkedNavy.control({ releaseOthers: true });
    const center = getTokenCenter(linkedNavy);
    if (center && canvas?.animatePan) await canvas.animatePan({ x: center.x, y: center.y, duration: 250 });
    if (action === "move") await pathMove();
    if (action === "disembark") await disembarkArmy();
  }

  async function selectAssignedActorMenu() {
    if (!requireOverviewScene()) return;
    const characters = getCharacterTokens()
      .filter(token => {
        const piece = getWorldPiece(token);
        if (!piece) return false;
        if (game.user.isGM) return true;
        const controller = getCharacterControllerIdentity(token);
        if (controller.id) return String(controller.id) === String(game.user.id);
        if (controller.name) return normalize(controller.name) === normalize(game.user.name);
        return canUserControlWorldPiece(token, piece);
      })
      .map(getCharacterTurnStatusForMenu)
      .sort((a, b) => String(a.character.characterName || a.piece.name || a.token.document.name)
        .localeCompare(String(b.character.characterName || b.piece.name || b.token.document.name)));

    if (!characters.length) {
      ui.notifications.warn("You do not currently have any assigned character tokens on this map.");
      return;
    }

    const rows = characters.map(status => {
      const name = status.character.characterName || status.piece.name || status.token.document.name;
      const houseName = status.character.house || status.piece.house || status.piece.faction || "No House";
      return `<button type="button" data-assigned-actor-token-id="${escapeHtml(status.token.document.id)}"
        style="width:100%;text-align:left;margin:0 0 6px 0;padding:8px 10px;">
        <strong>${escapeHtml(name)}</strong><br>
        <span class="notes">${escapeHtml(houseName)} — ${escapeHtml(status.location)}</span>
      </button>`;
    }).join("");

    let dialog = null;
    dialog = new Dialog({
      title: "Select My Assigned Actor",
      content: `<div style="margin-bottom:8px;"><span class="notes">Choose one of your assigned characters. The module will select that character token and center the map on it.</span></div>
        <div style="max-height:520px;overflow-y:auto;padding-right:4px;">${rows}</div>`,
      buttons: { close: { label: "Close" } },
      render: html => {
        for (const button of html[0].querySelectorAll("[data-assigned-actor-token-id]")) {
          button.addEventListener("click", async event => {
            event.preventDefault();
            const tokenId = String(button.dataset.assignedActorTokenId || "");
            const token = canvas.tokens.placeables.find(candidate => String(candidate.document.id) === tokenId);
            if (!token) {
              ui.notifications.warn("That assigned character token is no longer available on this scene.");
              return;
            }
            dialog?.close();
            await selectCharacterTokenFromMenu(token, { action: "select" });
          });
        }
      }
    }, { width: 430, height: "auto", resizable: true });
    dialog.render(true);
  }

  async function characterMoveMenu() {
    if (!requireOverviewScene()) return;
    const characters = getCharacterTokens()
      .filter(token => {
        const piece = getWorldPiece(token);
        if (!piece) return false;
        if (game.user.isGM) return true;
        const controller = getCharacterControllerIdentity(token);
        if (controller.id) return String(controller.id) === String(game.user.id);
        if (controller.name) return normalize(controller.name) === normalize(game.user.name);
        return canUserControlWorldPiece(token, piece);
      })
      .map(getCharacterTurnStatusForMenu)
      .sort((a, b) => String(a.character.characterName || a.piece.name || a.token.document.name).localeCompare(String(b.character.characterName || b.piece.name || b.token.document.name)));
    if (!characters.length) { ui.notifications.warn("You do not currently have any assigned character tokens on this map."); return; }

    const rows = characters.map(status => {
      const name = status.character.characterName || status.piece.name || status.token.document.name;
      const houseName = status.character.house || status.piece.house || status.piece.faction || "No House";
      const movementText = `${status.movementUsed} / ${status.movementMax} used — ${status.movementRemaining} remaining`;
      const diplomacyText = status.diplomacyUsed ? "Taken" : "Available";
      const siegeText = status.linkedArmy ? (status.siegeUsed ? "Taken" : "Available") : "No army";
      const armyText = status.linkedArmy ? `${status.armyCurrent.toLocaleString()} / ${status.armyMax.toLocaleString()}` : "None";
      const armyBreakdown = status.linkedArmy ? `${status.armyComposition}; Upkeep: ${status.armyUpkeep}` : "—";
      const navyText = status.linkedNavy ? `${status.navyShips.toLocaleString()} ships — ${status.navyLocation}` : "None";
      const navyMovementText = status.linkedNavy ? `${status.navyMovementUsed} / ${status.navyMovementMax} used — ${status.navyMovementRemaining} remaining` : "—";
      const transportText = status.linkedNavy ? `${status.transportUsed.toLocaleString()} / ${status.transportCapacity.toLocaleString()} troops (${status.embarkedArmyCount} embarked ${status.embarkedArmyCount === 1 ? "army" : "armies"})` : "—";
      const moveDisabled = status.movementRemaining <= 0 || Boolean(status.lockReason);
      const diplomacyDisabled = status.diplomacyUsed;
      const siegeDisabled = !status.linkedArmy || status.siegeUsed;
      const navyMoveDisabled = !status.linkedNavy || status.navyMovementRemaining <= 0 || Boolean(status.navyLockReason);
      const disembarkDisabled = !status.linkedNavy || status.embarkedArmyCount <= 0;
      return `<div style="display:grid;grid-template-columns:minmax(180px,1.15fr) minmax(360px,2.2fr) minmax(250px,auto);gap:10px;align-items:center;padding:10px;border:1px solid #777;border-radius:6px;margin-bottom:8px;">
        <div><strong>${escapeHtml(name)}</strong><br><span class="notes">${escapeHtml(houseName)}</span><br><strong>Current Tile:</strong> ${escapeHtml(status.location)}</div>
        <div style="font-size:12px;line-height:1.45;">
          <strong>Stats:</strong> ${escapeHtml(status.statsText)}<br>
          <strong>Secondary:</strong> ${escapeHtml(status.secondaryStatsText)}<br>
          <strong>Character Movement:</strong> ${escapeHtml(movementText)}<br>
          <strong>Army:</strong> ${escapeHtml(armyText)}<br>
          ${status.linkedArmy ? `<strong>Army Breakdown:</strong> ${escapeHtml(armyBreakdown)}<br>` : ""}
          <strong>Diplomacy:</strong> ${escapeHtml(diplomacyText)} &nbsp; <strong>Siege:</strong> ${escapeHtml(siegeText)}
          ${status.lockReason ? `<br><strong>Character movement locked:</strong> ${escapeHtml(status.lockReason)}` : ""}
          <hr style="margin:5px 0;">
          <strong>Navy:</strong> ${escapeHtml(navyText)}<br>
          ${status.linkedNavy ? `<strong>Navy Movement:</strong> ${escapeHtml(navyMovementText)}<br><strong>Ships:</strong> ${escapeHtml(status.navyComposition)}<br><strong>Transport:</strong> ${escapeHtml(transportText)}${status.navyLockReason ? `<br><strong>Navy movement locked:</strong> ${escapeHtml(status.navyLockReason)}` : ""}` : ""}
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;">
          <button type="button" data-character-token-id="${escapeHtml(status.token.document.id)}" data-character-action="select">Character</button>
          <button type="button" data-character-token-id="${escapeHtml(status.token.document.id)}" data-character-action="move" ${moveDisabled ? "disabled" : ""}>Move Character</button>
          <button type="button" data-character-token-id="${escapeHtml(status.token.document.id)}" data-character-action="diplomacy" ${diplomacyDisabled ? "disabled" : ""}>Diplomacy</button>
          <button type="button" data-character-token-id="${escapeHtml(status.token.document.id)}" data-character-action="build">Build / Upgrade</button>
          <button type="button" data-character-token-id="${escapeHtml(status.token.document.id)}" data-character-action="army" ${status.linkedArmy ? "" : "disabled"}>Army</button>
          <button type="button" data-character-token-id="${escapeHtml(status.token.document.id)}" data-character-action="siege" ${siegeDisabled ? "disabled" : ""}>Siege</button>
          <button type="button" data-character-token-id="${escapeHtml(status.token.document.id)}" data-character-action="navy" ${status.linkedNavy ? "" : "disabled"}>Navy</button>
          <button type="button" data-character-token-id="${escapeHtml(status.token.document.id)}" data-character-action="navyMove" ${navyMoveDisabled ? "disabled" : ""}>Move Navy</button>
          <button type="button" data-character-token-id="${escapeHtml(status.token.document.id)}" data-character-action="embark" ${status.linkedArmy && status.linkedNavy ? "" : "disabled"}>Embark Army</button>
          <button type="button" data-character-token-id="${escapeHtml(status.token.document.id)}" data-character-action="disembark" ${disembarkDisabled ? "disabled" : ""}>Disembark</button>
        </div>
      </div>`;
    }).join("");

    let dialog = null;
    dialog = new Dialog({
      title: "My Turn — Characters",
      content: `<div style="margin-bottom:10px;"><strong>${escapeHtml(game.user.name)}</strong><br><span class="notes">Manage your assigned characters, linked armies, and linked navies from one place. Character and navy movement are tracked separately; all existing movement, embarkation, Diplomacy, and Siege rules still apply.</span></div><div style="max-height:640px;overflow-y:auto;padding-right:4px;">${rows}</div>`,
      buttons: { close: { label: "Close" } },
      render: html => {
        for (const button of html[0].querySelectorAll("[data-character-action]")) {
          button.addEventListener("click", async event => {
            event.preventDefault();
            const tokenId = String(button.dataset.characterTokenId || "");
            const action = String(button.dataset.characterAction || "select");
            const token = canvas.tokens.placeables.find(candidate => String(candidate.document.id) === tokenId);
            if (!token) { ui.notifications.warn("That character token is no longer available on this scene."); return; }
            const status = getCharacterTurnStatusForMenu(token);
            if (["move", "diplomacy", "build", "siege", "navyMove", "embark", "disembark"].includes(action)) dialog?.close();
            if (action === "army") await selectArmyFromCharacterMenu(token, status.linkedArmy, "select");
            else if (action === "siege") await selectArmyFromCharacterMenu(token, status.linkedArmy, "siege");
            else if (action === "navy") await selectNavyFromCharacterMenu(status.linkedNavy, "select");
            else if (action === "navyMove") await selectNavyFromCharacterMenu(status.linkedNavy, "move");
            else if (action === "embark") {
              await selectArmyFromCharacterMenu(token, status.linkedArmy, "select");
              await embarkArmy();
            }
            else if (action === "disembark") await selectNavyFromCharacterMenu(status.linkedNavy, "disembark");
            else await selectCharacterTokenFromMenu(token, { action });
          });
        }
      }
    }, { width: 900, height: "auto", resizable: true });
    dialog.render(true);
  }

  async function pathMove() {
    if (!requireOverviewScene()) return;
    const selected = canvas.tokens.controlled;
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one world-map piece token."); return; }

    const token = selected[0];
    const piece = getWorldPiece(token);
    if (!piece) { ui.notifications.warn("Selected token is not a world piece."); return; }
    if (!canUserControlWorldPiece(token, piece)) { ui.notifications.warn("You can only move world pieces you control."); return; }
    const lockedReason = strategicMovementLockReason(piece);
    if (lockedReason) { ui.notifications.warn(lockedReason); return; }

    let startEntry = findTileAtPoint(getTokenCenter(token));
    if (!startEntry && piece.currentTileId) startEntry = getTileById(piece.currentTileId);
    if (!startEntry) { ui.notifications.warn("The selected piece is not currently inside a world tile."); return; }

    const startTile = startEntry.tile;
    const options = await askDestination(piece, startTile);
    if (!options || !options.destinationTileId) return;

    const destinationEntry = getTileById(options.destinationTileId);
    if (!destinationEntry) { ui.notifications.error("Could not find destination tile."); return; }

    const destinationTile = destinationEntry.tile;
    if (!isTileAllowedForPiece(piece, destinationTile)) { ui.notifications.warn(`${piece.name || token.document.name} cannot enter ${destinationTile.name}.`); return; }

    const path = getPathForMode(startTile, destinationTile, piece, options.routeMode);
    if (!path) { ui.notifications.warn(`No valid ${routeModeLabel(options.routeMode)} from ${startTile.name} to ${destinationTile.name}.`); return; }

    const remaining = getMovementRemaining(piece);
    if (path.cost > remaining) { ui.notifications.warn(`Move blocked: needs ${path.cost} movement, but only has ${remaining} remaining.`); return; }
    if (path.cost === 0) { ui.notifications.info(`Already in ${destinationTile.name}.`); return; }

    await executeWorldPathMove(token, piece, startTile, destinationTile, path, options.pauseMs, "World Path Move");
  }

  function getAdjacentIds(tile) { return Array.isArray(tile?.adjacentTileIds) ? [...tile.adjacentTileIds] : []; }
  function getAdjacentNames(tile) { return Array.isArray(tile?.adjacentTileNames) ? [...tile.adjacentTileNames] : []; }
  function addUnique(array, value) { if (!array.includes(value)) array.push(value); }
  function removeValue(array, value) { return array.filter(item => item !== value); }
  function removeNormalizedName(array, value) { const target = normalize(value); return array.filter(item => normalize(item) !== target); }

  async function linkTiles() {
    if (!requireOverviewScene()) return;
    const selected = canvas.drawings.controlled;
    if (selected.length !== 2) { ui.notifications.warn("Select exactly two world tile drawings to link them."); return; }
    const [first, second] = selected;
    const firstTile = foundry.utils.deepClone(getWorldTile(first));
    const secondTile = foundry.utils.deepClone(getWorldTile(second));
    if (!firstTile || !secondTile) { ui.notifications.error("Both selected drawings must already be assigned as world tiles."); return; }
    addUnique(firstTile.adjacentTileIds = getAdjacentIds(firstTile), secondTile.id);
    addUnique(secondTile.adjacentTileIds = getAdjacentIds(secondTile), firstTile.id);
    addUnique(firstTile.adjacentTileNames = getAdjacentNames(firstTile), secondTile.name);
    addUnique(secondTile.adjacentTileNames = getAdjacentNames(secondTile), firstTile.name);
    await first.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, firstTile);
    await second.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, secondTile);
    ui.notifications.info(`Linked ${firstTile.name} ↔ ${secondTile.name}`);
  }

  async function unlinkTiles() {
    if (!requireOverviewScene()) return;
    const selected = canvas.drawings.controlled;
    if (selected.length !== 2) { ui.notifications.warn("Select exactly two world tile drawings to unlink them."); return; }
    const [first, second] = selected;
    const firstTile = foundry.utils.deepClone(getWorldTile(first));
    const secondTile = foundry.utils.deepClone(getWorldTile(second));
    if (!firstTile || !secondTile) { ui.notifications.error("Both selected drawings must be world tiles."); return; }
    firstTile.adjacentTileIds = getAdjacentIds(firstTile).filter(id => id !== secondTile.id);
    secondTile.adjacentTileIds = getAdjacentIds(secondTile).filter(id => id !== firstTile.id);
    firstTile.adjacentTileNames = removeNormalizedName(getAdjacentNames(firstTile), secondTile.name);
    secondTile.adjacentTileNames = removeNormalizedName(getAdjacentNames(secondTile), firstTile.name);
    await first.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, firstTile);
    await second.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, secondTile);
    ui.notifications.info(`Unlinked ${firstTile.name} ↔ ${secondTile.name}`);
  }

  function clearLinkOverlay() {
    const viewer = globalThis[LINK_VIEWER_KEY];
    if (viewer?.overlay) { viewer.overlay.clear(); viewer.overlay.destroy(); }
    globalThis[LINK_VIEWER_KEY] = null;
  }

  async function viewLinks() {
    if (!requireOverviewScene()) return;
    const selected = canvas.drawings.controlled;
    const mode = await new Promise(resolve => {
      new Dialog({
        title: "View World Tile Links",
        content: `<form><p>Show links for selected tiles or the whole scene.</p><div class="form-group"><label>Mode</label><select name="mode"><option value="selected" selected>Selected tile(s)</option><option value="all">All tile links</option><option value="clear">Clear visual overlay</option></select></div><div class="form-group"><label><input type="checkbox" name="drawLines" checked /> Draw temporary link lines</label></div></form>`,
        buttons: { apply: { label: "Apply", callback: html => { const form = html[0].querySelector("form"); resolve({ mode: form.mode.value, drawLines: form.drawLines.checked }); } }, cancel: { label: "Cancel", callback: () => resolve(null) } },
        default: "apply"
      }, { width: 560, height: 320, resizable: true }).render(true);
    });
    if (!mode) return;
    if (mode.mode === "clear") { clearLinkOverlay(); return; }
    const allEntries = getWorldTileEntries();
    const byId = new Map(allEntries.map(entry => [entry.tile.id, entry]));
    const entriesToShow = mode.mode === "all" ? allEntries : selected.map(drawing => ({ drawing, tile: getWorldTile(drawing) })).filter(entry => entry.tile);
    if (!entriesToShow.length) { ui.notifications.warn("No world tiles selected/found."); return; }
    let linksDrawn = 0;
    if (mode.drawLines) {
      clearLinkOverlay();
      const overlay = new PIXI.Graphics();
      overlay.name = "coa-world-tile-link-viewer-overlay";
      overlay.zIndex = 999998;
      overlay.eventMode = "none";
      overlay.interactive = false;
      canvas.stage.sortableChildren = true;
      canvas.stage.addChild(overlay);
      globalThis[LINK_VIEWER_KEY] = { overlay };
      const drawnPairs = new Set();
      for (const entry of entriesToShow) {
        const from = getDrawingCenter(entry.drawing);
        for (const adjacentId of getAdjacentIds(entry.tile)) {
          const linked = byId.get(adjacentId);
          if (!linked) continue;
          const pairKey = [entry.tile.id, linked.tile.id].sort().join("|");
          if (drawnPairs.has(pairKey)) continue;
          drawnPairs.add(pairKey);
          const to = getDrawingCenter(linked.drawing);
          overlay.lineStyle(5, 0x00ccff, 0.85);
          overlay.moveTo(from.x, from.y);
          overlay.lineTo(to.x, to.y);
          overlay.beginFill(0x00ccff, 0.95);
          overlay.drawCircle(from.x, from.y, 9);
          overlay.drawCircle(to.x, to.y, 9);
          overlay.endFill();
          linksDrawn++;
        }
      }
    }
    const rows = entriesToShow.map(entry => {
      const names = getAdjacentIds(entry.tile).map(id => byId.get(id)?.tile?.name || id);
      return `<tr><td style="padding:4px 6px;border:1px solid #999;"><strong>${escapeHtml(entry.tile.name || "Unnamed Tile")}</strong></td><td style="padding:4px 6px;border:1px solid #999;">${escapeHtml(entry.tile.region || "")}</td><td style="padding:4px 6px;border:1px solid #999;">${escapeHtml(entry.tile.tileType || "land")}</td><td style="padding:4px 6px;border:1px solid #999;">${escapeHtml(names.length ? names.join(", ") : "No links")}</td></tr>`;
    }).join("");
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "World Tile Links" }), content: `<h2>World Tile Links</h2><p><strong>Tiles shown:</strong> ${entriesToShow.length}</p><p><strong>Visual links drawn:</strong> ${linksDrawn}</p><table style="border-collapse:collapse;width:100%;"><thead><tr><th style="padding:4px 6px;border:1px solid #999;text-align:left;">Tile</th><th style="padding:4px 6px;border:1px solid #999;text-align:left;">Region</th><th style="padding:4px 6px;border:1px solid #999;text-align:left;">Type</th><th style="padding:4px 6px;border:1px solid #999;text-align:left;">Linked To</th></tr></thead><tbody>${rows}</tbody></table>` });
  }

  async function togglePort() {
    if (!requireOverviewScene()) return;
    const selected = canvas.drawings.controlled;
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one World Tile drawing."); return; }
    const drawing = selected[0];
    const worldTile = getWorldTile(drawing);
    if (!worldTile) { ui.notifications.warn("The selected drawing has not been assigned as a World Tile."); return; }
    if (isSeaTile(worldTile)) { ui.notifications.warn("A Sea tile cannot itself be converted into a Port."); return; }
    const portEntry = { drawing, tile: worldTile };
    const portId = getTileId(portEntry);
    const portName = getTileName(portEntry);
    const seaEntries = getWorldTileEntries().filter(entry => isSeaTile(entry.tile)).sort((a, b) => (String(a.tile.region || "") || "").localeCompare(String(b.tile.region || "")) || getTileName(a).localeCompare(getTileName(b)));
    const existingPortSeaIds = Array.isArray(worldTile.portSeaTileIds) ? [...worldTile.portSeaTileIds] : [];
    const seaCheckboxes = seaEntries.map(entry => `<label style="display:block;padding:4px 6px;margin:2px 0;border-bottom:1px solid rgba(255,255,255,0.08);"><input type="checkbox" name="seaTile" value="${escapeHtml(getTileId(entry))}" ${existingPortSeaIds.includes(getTileId(entry)) ? "checked" : ""}> <strong>${escapeHtml(getTileName(entry))}</strong> — ${escapeHtml(entry.tile.region || "Unassigned")}</label>`).join("");
    const portActive = worldTile.portActive === true;
    const result = await new Promise(resolve => {
      new Dialog({
        title: portActive ? "Edit Port" : "Create Port",
        content: `<form><div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;"><strong>Tile:</strong> ${escapeHtml(portName)}<br><strong>Current Type:</strong> ${escapeHtml(getTileType(worldTile))}</div><h3>Connected Sea Tiles</h3><p class="notes">Check every Sea tile that physically touches this Port.</p><div style="max-height:360px;overflow-y:auto;border:1px solid #777;border-radius:6px;padding:6px;">${seaCheckboxes || "<em>No Sea tiles found.</em>"}</div></form>`,
        buttons: {
          save: { label: portActive ? "Save Port" : "Create Port", callback: html => { const form = html[0].querySelector("form"); resolve({ action: "save", seaIds: Array.from(form.querySelectorAll('input[name="seaTile"]:checked')).map(input => String(input.value)) }); } },
          ...(portActive ? { disable: { label: "Disable Port", callback: () => resolve({ action: "disable", seaIds: [] }) } } : {}),
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "save"
      }, { width: 620, height: 600, resizable: true }).render(true);
    });
    if (!result) return;

    for (const oldSeaId of existingPortSeaIds) {
      const seaEntry = getEntryById(oldSeaId);
      if (!seaEntry) continue;
      const seaData = foundry.utils.deepClone(seaEntry.tile);
      const autoPortLinks = Array.isArray(seaData.autoPortLinks) ? [...seaData.autoPortLinks] : [];
      if (autoPortLinks.includes(portId)) {
        seaData.adjacentTileIds = removeValue(getAdjacentIds(seaData), portId);
        seaData.adjacentTileNames = removeNormalizedName(getAdjacentNames(seaData), portName);
        seaData.autoPortLinks = removeValue(autoPortLinks, portId);
        await seaEntry.drawing.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, seaData);
      }
    }

    const updatedPort = foundry.utils.deepClone(worldTile);
    let portAdjacentIds = getAdjacentIds(updatedPort);
    let portAdjacentNames = getAdjacentNames(updatedPort);
    for (const oldSeaId of existingPortSeaIds) {
      const seaEntry = getEntryById(oldSeaId);
      if (!seaEntry) continue;
      portAdjacentIds = removeValue(portAdjacentIds, oldSeaId);
      portAdjacentNames = removeNormalizedName(portAdjacentNames, getTileName(seaEntry));
    }

    if (result.action === "disable") {
      updatedPort.tileType = updatedPort.prePortTileType || "land";
      updatedPort.portActive = false;
      updatedPort.portSeaTileIds = [];
      updatedPort.adjacentTileIds = portAdjacentIds;
      updatedPort.adjacentTileNames = portAdjacentNames;
      updatedPort.portDisabledAt = new Date().toISOString();
      updatedPort.portDisabledBy = game.user.name;
      await drawing.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, updatedPort);
      ui.notifications.info(`${portName} is no longer an active Port.`);
      return;
    }

    if (!updatedPort.portActive) {
      const oldType = getTileType(updatedPort);
      updatedPort.prePortTileType = oldType === "port" ? "land" : oldType;
    }
    updatedPort.tileType = "port";
    updatedPort.portActive = true;
    updatedPort.portSeaTileIds = [...result.seaIds];
    updatedPort.portEnabledAt = updatedPort.portEnabledAt || new Date().toISOString();
    updatedPort.portUpdatedAt = new Date().toISOString();
    updatedPort.portUpdatedBy = game.user.name;

    for (const seaId of result.seaIds) {
      const seaEntry = getEntryById(seaId);
      if (!seaEntry) continue;
      const seaName = getTileName(seaEntry);
      addUnique(portAdjacentIds, seaId);
      if (!portAdjacentNames.map(normalize).includes(normalize(seaName))) portAdjacentNames.push(seaName);
      const seaData = foundry.utils.deepClone(seaEntry.tile);
      const seaAdjacentIds = getAdjacentIds(seaData);
      const seaAdjacentNames = getAdjacentNames(seaData);
      addUnique(seaAdjacentIds, portId);
      if (!seaAdjacentNames.map(normalize).includes(normalize(portName))) seaAdjacentNames.push(portName);
      seaData.adjacentTileIds = seaAdjacentIds;
      seaData.adjacentTileNames = seaAdjacentNames;
      const autoPortLinks = Array.isArray(seaData.autoPortLinks) ? [...seaData.autoPortLinks] : [];
      addUnique(autoPortLinks, portId);
      seaData.autoPortLinks = autoPortLinks;
      await seaEntry.drawing.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, seaData);
    }

    updatedPort.adjacentTileIds = portAdjacentIds;
    updatedPort.adjacentTileNames = portAdjacentNames;
    await drawing.document.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, updatedPort);
    ui.notifications.info(`${portName} is now an active Port linked to ${result.seaIds.length} Sea tile(s).`);
  }

  function getPortSeaIds(tile) { return Array.isArray(tile?.portSeaTileIds) ? [...tile.portSeaTileIds] : []; }
  function getAdjacentSeaIds(seaTile) { return getAdjacentIds(seaTile).filter(id => { const entry = getEntryById(id); return entry && isSeaTile(entry.tile); }); }

  function getReachableSeaIds(sourcePort) {
    const sourceSeaIds = getPortSeaIds(sourcePort.tile);
    const reachable = new Set(sourceSeaIds);
    for (const sourceSeaId of sourceSeaIds) {
      const seaEntry = getEntryById(sourceSeaId);
      if (!seaEntry || !isSeaTile(seaEntry.tile)) continue;
      for (const adjacentId of getAdjacentSeaIds(seaEntry.tile)) reachable.add(adjacentId);
    }
    return { sourceSeaIds, reachableSeaIds: [...reachable] };
  }

  function getCrossingDestinations(sourcePort) {
    const sourcePortId = getTileId(sourcePort);
    const network = getReachableSeaIds(sourcePort);
    const sourceSeaSet = new Set(network.sourceSeaIds);
    const reachableSet = new Set(network.reachableSeaIds);
    const destinations = [];
    for (const entry of getWorldTileEntries()) {
      if (getTileId(entry) === sourcePortId) continue;
      if (!isActivePort(entry.tile)) continue;
      const sharedReachable = getPortSeaIds(entry.tile).filter(id => reachableSet.has(id));
      if (!sharedReachable.length) continue;
      const sameSea = sharedReachable.some(id => sourceSeaSet.has(id));
      destinations.push({ entry, crossingType: sameSea ? "same-sea" : "adjacent-sea", connectingSeaIds: sharedReachable });
    }
    destinations.sort((a, b) => (String(a.entry.tile.region || "")).localeCompare(String(b.entry.tile.region || "")) || getTileName(a.entry).localeCompare(getTileName(b.entry)));
    return destinations;
  }

  async function portCrossing() {
    if (!requireOverviewScene()) return;
    const selected = canvas.tokens.controlled;
    if (selected.length !== 1) { ui.notifications.warn("Select exactly one World Piece."); return; }
    const token = selected[0];
    const originalPiece = getWorldPiece(token);
    if (!originalPiece) { ui.notifications.warn("The selected token is not a World Piece."); return; }
    if (!canUserControlWorldPiece(token, originalPiece)) { ui.notifications.warn("You can only use Port Crossing with world pieces you control."); return; }
    const lockedReason = strategicMovementLockReason(originalPiece);
    if (lockedReason) { ui.notifications.warn(lockedReason); return; }
    const pieceType = normalize(originalPiece.pieceType);
    if (pieceType !== "army" && pieceType !== "character") { ui.notifications.warn("Port Crossing is only used by Armies and Characters."); return; }
    let sourcePort = findCurrentTileForToken(token);
    if (!sourcePort && originalPiece.currentTileId) sourcePort = getEntryById(originalPiece.currentTileId);
    if (!sourcePort) { ui.notifications.warn("Could not determine the World Piece's current tile."); return; }
    if (!isActivePort(sourcePort.tile)) { ui.notifications.warn("Port Crossing can only begin from an active Port."); return; }
    if (!getPortSeaIds(sourcePort.tile).length) { ui.notifications.warn("This Port is not linked to any Sea tiles."); return; }
    const movementRemaining = getMovementRemaining(originalPiece);
    const crossingCost = 1;
    if (movementRemaining < crossingCost) { ui.notifications.warn(`This piece needs ${crossingCost} movement point(s), but only has ${movementRemaining} remaining.`); return; }
    const destinations = getCrossingDestinations(sourcePort);
    if (!destinations.length) { ui.notifications.warn("No Ports are within crossing range of this Port."); return; }

    const destinationOptions = destinations.map(destination => {
      const entry = destination.entry;
      const label = `${entry.tile.region ? entry.tile.region + " — " : ""}${getTileName(entry)} ${destination.crossingType === "same-sea" ? "[Same Sea]" : "[Adjacent Sea]"}`;
      return `<option value="${escapeHtml(getTileId(entry))}">${escapeHtml(label)}</option>`;
    }).join("");

    const details = await new Promise(resolve => {
      new Dialog({
        title: "Port Crossing",
        content: `<form><div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;"><strong>Piece:</strong> ${escapeHtml(originalPiece.name || token.document.name)}<br><strong>Type:</strong> ${escapeHtml(pieceType)}<br><strong>Current Port:</strong> ${escapeHtml(getTileName(sourcePort))}<br><strong>Movement:</strong> ${escapeHtml(originalPiece.movementUsed || 0)} / ${escapeHtml(originalPiece.movementMax || 0)} used</div><div class="form-group"><label><strong>Destination Port</strong></label><select name="destinationPortId" style="width:100%;">${destinationOptions}</select></div>${pieceType === "army" ? `<div class="form-group"><label><strong>Current Army Strength</strong></label><input type="number" name="armyStrength" value="${escapeHtml(originalPiece.strengthCurrent ?? "")}" min="1" step="1" style="width:100%;" /><p class="notes">Required for crossing casualties.</p></div>` : ""}<div style="padding:8px;margin-top:10px;border:1px solid #777;border-radius:6px;"><strong>Crossing Check</strong><br>${pieceType === "army" ? "1–5 — Safe<br>6–7 — Lose 1d10%<br>8–9 — Lose 20%<br>10 — Lose 30%" : "1–9 — Safe<br>10 — Gain 1 Wound"}<br><br><strong>Movement Cost:</strong> ${crossingCost}</div></form>`,
        buttons: { cross: { label: "Make Crossing", callback: html => { const form = html[0].querySelector("form"); resolve({ destinationPortId: String(form.destinationPortId.value || ""), armyStrength: pieceType === "army" ? Number(form.armyStrength.value || 0) : null }); } }, cancel: { label: "Cancel", callback: () => resolve(null) } },
        default: "cross"
      }, { width: 580, height: pieceType === "army" ? 560 : 500, resizable: true }).render(true);
    });
    if (!details) return;
    if (pieceType === "army" && (!Number.isFinite(details.armyStrength) || details.armyStrength <= 0)) { ui.notifications.warn("Enter the Army's current strength before crossing."); return; }
    const destinationData = destinations.find(destination => getTileId(destination.entry) === details.destinationPortId);
    if (!destinationData) { ui.notifications.error("Could not locate destination Port."); return; }
    const destinationPort = destinationData.entry;
    const crossingRoll = await (new Roll("1d10")).evaluate();
    const crossingResult = Number(crossingRoll.total);
    const piece = foundry.utils.deepClone(originalPiece);
    let lossPercent = 0;
    let soldiersLost = 0;
    let woundGained = false;
    let secondaryRoll = null;
    if (pieceType === "army") {
      const currentStrength = Math.max(1, Math.floor(details.armyStrength));
      piece.strengthCurrent = currentStrength;
      if (piece.strengthMax === undefined || piece.strengthMax === null || Number(piece.strengthMax) < currentStrength) piece.strengthMax = currentStrength;
      if (crossingResult <= 5) lossPercent = 0;
      else if (crossingResult <= 7) { secondaryRoll = await (new Roll("1d10")).evaluate(); lossPercent = Number(secondaryRoll.total); }
      else if (crossingResult <= 9) lossPercent = 20;
      else lossPercent = 30;
      if (lossPercent > 0) { soldiersLost = Math.ceil(currentStrength * (lossPercent / 100)); piece.strengthCurrent = Math.max(0, currentStrength - soldiersLost); }
    }
    if (pieceType === "character" && crossingResult === 10) { piece.wounds = Number(piece.wounds || 0) + 1; woundGained = true; }
    piece.movementUsed = Number(piece.movementUsed || 0) + crossingCost;
    piece.previousTileId = getTileId(sourcePort);
    piece.previousTileName = getTileName(sourcePort);
    piece.currentTileId = getTileId(destinationPort);
    piece.currentTileName = getTileName(destinationPort);
    piece.lastMoveCost = crossingCost;
    piece.lastRouteMode = "crossing";
    piece.lastCrossingRoll = crossingResult;
    piece.lastCrossingLossPercent = lossPercent;
    piece.lastCrossingLosses = soldiersLost;
    piece.lastCrossingFrom = getTileName(sourcePort);
    piece.lastCrossingTo = getTileName(destinationPort);
    piece.lastCrossingType = destinationData.crossingType;
    piece.lastCrossedAt = new Date().toISOString();
    piece.lastCrossedBy = game.user.name;
    piece.lastMovedAt = new Date().toISOString();
    piece.lastMovedBy = game.user.name;
    piece.lastMovedSource = `Crown Overview Tools ${MODULE_VERSION}`;
    const position = getTokenTopLeftForTileSlot(token, destinationPort);
    await saveWorldPiece(token, piece);
    await token.document.update({ x: position.x, y: position.y }, { animate: true, worldMovementBypass: true, bypassWorldMovementWatcher: true, portCrossingBypass: true });
    let resultText = "";
    if (pieceType === "army") resultText = lossPercent === 0 ? `<p><strong>Result:</strong> Safe crossing. No soldiers lost.</p>` : `<p><strong>Result:</strong> ${escapeHtml(lossPercent)}% losses.</p><p><strong>Soldiers Lost:</strong> ${escapeHtml(soldiersLost.toLocaleString())}</p><p><strong>Army Strength Remaining:</strong> ${escapeHtml(Number(piece.strengthCurrent).toLocaleString())} / ${escapeHtml(Number(piece.strengthMax).toLocaleString())}</p>`;
    if (pieceType === "character") resultText = woundGained ? `<p><strong>Result:</strong> Dangerous crossing! The character gains 1 Wound.</p><p><strong>Total Wounds:</strong> ${escapeHtml(piece.wounds)}</p>` : `<p><strong>Result:</strong> Safe crossing. No wound suffered.</p>`;
    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ alias: "Port Crossing" }), content: `<h2>Port Crossing</h2><p><strong>Piece:</strong> ${escapeHtml(piece.name || token.document.name)}</p><p><strong>From:</strong> ${escapeHtml(getTileName(sourcePort))}</p><p><strong>To:</strong> ${escapeHtml(getTileName(destinationPort))}</p><p><strong>Route:</strong> ${destinationData.crossingType === "same-sea" ? "Same Sea Tile" : "Adjacent Sea Tile"}</p><p><strong>Crossing Check:</strong> ${escapeHtml(crossingResult)} on 1d10</p>${secondaryRoll ? `<p><strong>Loss Roll:</strong> ${escapeHtml(secondaryRoll.total)}%</p>` : ""}${resultText}<p><strong>Movement Spent:</strong> ${escapeHtml(crossingCost)}</p><p><strong>Total Movement Used:</strong> ${escapeHtml(piece.movementUsed)} / ${escapeHtml(piece.movementMax || 0)}</p>` });
  }


  function getRoundKey(clock = getClock()) {
    if (!clock) return null;
    return `${Number(clock.year ?? 100)}|${String(clock.season ?? "Spring")}|${Number(clock.round ?? 1)}`;
  }

  function getCurrentTileEntryForToken(token, piece = getWorldPiece(token)) {
    let entry = findTileAtPoint(getTokenCenter(token));
    if (!entry && piece?.currentTileId) entry = getTileById(piece.currentTileId);
    return entry || null;
  }

  function getBuildLedger() {
    return canvas.scene?.getFlag(FLAG_SCOPE, BUILD_LEDGER_KEY) ?? {};
  }

  async function saveBuildLedger(ledger) {
    await canvas.scene.setFlag(FLAG_SCOPE, BUILD_LEDGER_KEY, ledger);
  }

  function getAlreadyBuiltForRound(ledger, roundKey, userId) {
    return ledger?.[roundKey]?.users?.[userId] ?? null;
  }

  function buildBuildingOptions(existingBuildings, house = {}, piece = {}) {
    return renderOptionGroups(buildCatalogBuildingOptions(house, piece));
  }

  function resourceKey(value) {
    let text = String(value ?? "")
      .trim()
      .replace(/[：]/g, ":")
      .replace(/[=:\s]+$/g, "")
      .replace(/^[:=\s]+/g, "")
      .replace(/\s+/g, " ");

    // Legacy v0.2.6 could accidentally store keys like "Gold:".
    // Normalise those back to "Gold" so old bad keys do not survive forever.
    text = text.replace(/[=:]+$/g, "").trim();

    if (!text) return "";

    const lower = text.toLowerCase();
    const known = DEFAULT_RESOURCE_NAMES.find(name => name.toLowerCase() === lower);
    return known || titleCase(text);
  }

  function normalizeResourceMap(value) {
    if (!value) return {};
    const output = {};

    if (typeof value === "string") {
      const parts = value.split(/[;,\n]/).map(part => part.trim()).filter(Boolean);
      for (const part of parts) {
        // Accept Gold: 6, Gold:: 6, Gold = 6, Gold 6.
        const match = part.match(/^(.+?)(?:[:=]+|\s+)\s*([-+]?(?:\d+(?:\.\d+)?|\.\d+))$/);
        if (!match) continue;
        const key = resourceKey(match[1]);
        const amount = Number(match[2]);
        if (key && Number.isFinite(amount)) output[key] = Number(output[key] || 0) + amount;
      }
      return output;
    }

    if (Array.isArray(value)) {
      for (const entry of value) {
        if (!entry) continue;
        const key = resourceKey(entry.name ?? entry.resource ?? entry.key);
        const amount = Number(entry.amount ?? entry.value ?? entry.qty ?? 0);
        if (key && Number.isFinite(amount)) output[key] = Number(output[key] || 0) + amount;
      }
      return output;
    }

    if (typeof value === "object") {
      const canonicalSeen = new Set();
      for (const [rawKey, rawValue] of Object.entries(value)) {
        const key = resourceKey(rawKey);
        const amount = Number(rawValue);
        if (!key || !Number.isFinite(amount)) continue;

        const rawClean = String(rawKey ?? "").trim().replace(/[=:\s]+$/g, "").replace(/^[:=\s]+/g, "").replace(/\s+/g, " ");
        const canonical = normalize(rawClean) === normalize(key);

        // If both a clean key (Gold) and a legacy malformed key (Gold:) exist,
        // keep the clean one rather than adding a phantom duplicate.
        if (!Object.prototype.hasOwnProperty.call(output, key)) {
          output[key] = amount;
          if (canonical) canonicalSeen.add(key);
        } else if (canonical) {
          output[key] = amount;
          canonicalSeen.add(key);
        } else if (!canonicalSeen.has(key)) {
          output[key] = amount;
        }
      }
    }

    return output;
  }

  function resourceDisplayRank(resourceName) {
    const key = resourceKey(resourceName);
    if (key === "Gold") return 0;
    if (key === "Food") return 1;
    return 10;
  }

  function resourceMapToText(map, emptyText = "None") {
    const normalized = normalizeResourceMap(map);
    const parts = Object.entries(normalized)
      .filter(([, value]) => Number(value) !== 0)
      .sort((a, b) => {
        const rankA = resourceDisplayRank(a[0]);
        const rankB = resourceDisplayRank(b[0]);
        if (rankA !== rankB) return rankA - rankB;
        return a[0].localeCompare(b[0]);
      })
      .map(([key, value]) => `${key}: ${Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}`);
    return parts.length ? parts.join("; ") : emptyText;
  }


  function getTradeGoodByName(name) {
    const target = normalize(name);
    if (!target) return null;
    return TRADE_GOODS.find(good => normalize(good.name) === target) || null;
  }

  function buildTradeGoodOptions(selectedName = "") {
    const selected = normalize(selectedName);
    let html = '<option value="">None</option>';
    const grouped = new Map();
    for (const good of TRADE_GOODS) {
      if (!grouped.has(good.category)) grouped.set(good.category, []);
      grouped.get(good.category).push(good);
    }
    for (const [category, goods] of grouped.entries()) {
      html += `<optgroup label="${escapeHtml(category)}">`;
      for (const good of goods) {
        const isSelected = normalize(good.name) === selected ? "selected" : "";
        html += `<option value="${escapeHtml(good.name)}" ${isSelected}>${escapeHtml(good.name)} — G${escapeHtml(good.goldValue)} / F${escapeHtml(good.foodValue)}</option>`;
      }
      html += "</optgroup>";
    }
    return html;
  }

  function getHouseTradeGoods(house = {}) {
    const primaryName = house.tradeGoods?.primary?.name || house.primaryTradeGood || house.primaryExport || house.exports || "";
    const secondaryName = house.tradeGoods?.secondary?.name || house.secondaryTradeGood || house.secondaryExport || "";
    const primary = getTradeGoodByName(primaryName);
    const secondary = getTradeGoodByName(secondaryName);
    return { primary, secondary };
  }

  function setHouseTradeGoods(house, primaryName, secondaryName) {
    const primary = getTradeGoodByName(primaryName);
    const secondary = getTradeGoodByName(secondaryName);
    house.tradeGoods = {
      primary: primary ? foundry.utils.deepClone(primary) : null,
      secondary: secondary ? foundry.utils.deepClone(secondary) : null
    };
    house.primaryTradeGood = primary?.name || "";
    house.secondaryTradeGood = secondary?.name || "";
    house.primaryExport = primary?.name || String(primaryName || "").trim();
    house.secondaryExport = secondary?.name || String(secondaryName || "").trim();
    return house;
  }

  function getDefaultMarketForces() {
    const output = {};
    for (const season of ROUND_ORDER.map(item => item.season).filter((value, index, array) => array.indexOf(value) === index)) {
      output[season] = {};
      for (const category of TRADE_GOOD_CATEGORIES) output[season][category] = { gold: 1, food: 1 };
    }
    return output;
  }

  function normalizeMarketForces(value = {}) {
    const output = getDefaultMarketForces();
    for (const [season, categories] of Object.entries(value || {})) {
      if (!output[season]) output[season] = {};
      for (const [category, raw] of Object.entries(categories || {})) {
        const matchedCategory = TRADE_GOOD_CATEGORIES.find(cat => normalize(cat) === normalize(category));
        if (!matchedCategory) continue;
        if (typeof raw === "number" || typeof raw === "string") {
          const amount = Number(raw);
          if (Number.isFinite(amount)) output[season][matchedCategory] = { gold: amount, food: amount };
        } else if (raw && typeof raw === "object") {
          const gold = Number(raw.gold ?? raw.value ?? 1);
          const food = Number(raw.food ?? raw.value ?? gold);
          output[season][matchedCategory] = {
            gold: Number.isFinite(gold) ? gold : 1,
            food: Number.isFinite(food) ? food : 1
          };
        }
      }
    }
    return output;
  }

  function getMarketForces() {
    return normalizeMarketForces(canvas.scene?.getFlag(FLAG_SCOPE, MARKET_FORCES_KEY) ?? {});
  }

  async function saveMarketForces(forces) {
    await canvas.scene.setFlag(FLAG_SCOPE, MARKET_FORCES_KEY, normalizeMarketForces(forces));
  }

  function parseMarketForcesText(text, existing, season) {
    const forces = normalizeMarketForces(existing);
    const lines = String(text || "").split(/\n|;/).map(line => line.trim()).filter(Boolean);
    for (const line of lines) {
      // Accept both 0.5 and .5 so quick spreadsheet-style values do not silently reset to 1.
      const match = line.match(/^(.+?)(?:[:=]+)\s*([-+]?(?:\d+(?:\.\d+)?|\.\d+))(?:\s*[,/]\s*([-+]?(?:\d+(?:\.\d+)?|\.\d+)))?$/);
      if (!match) continue;
      const category = TRADE_GOOD_CATEGORIES.find(cat => normalize(cat) === normalize(match[1]));
      if (!category) continue;
      const gold = Number(match[2]);
      const food = match[3] !== undefined ? Number(match[3]) : gold;
      forces[season][category] = {
        gold: Number.isFinite(gold) ? gold : 1,
        food: Number.isFinite(food) ? food : (Number.isFinite(gold) ? gold : 1)
      };
    }
    return forces;
  }

  function marketForcesToText(forces, season) {
    const normalized = normalizeMarketForces(forces);
    return TRADE_GOOD_CATEGORIES
      .map(category => `${category}: ${normalized[season]?.[category]?.gold ?? 1}, ${normalized[season]?.[category]?.food ?? 1}`)
      .join("\n");
  }

  function getDevelopmentEconomyBonus(house = {}, clock = getClock()) {
    const activeLevel = getActiveBuildingSlotCount(house, clock);
    const level = Math.max(0, Math.min(4, Number(activeLevel || 0)));
    return DEVELOPMENT_ECONOMY_BONUSES[level] || DEVELOPMENT_ECONOMY_BONUSES[0];
  }

  function getTradeGoodIncomeBreakdown(house = {}, clock = getClock()) {
    const forces = getMarketForces();
    const season = String(clock?.season || "Spring");
    const goods = getHouseTradeGoods(house);
    const selectedGoods = [goods.primary, goods.secondary].filter(Boolean);
    let gold = 0;
    let food = 0;
    const rows = [];

    for (const good of selectedGoods) {
      const force = forces[season]?.[good.category] || { gold: 1, food: 1 };
      const goldValue = Math.round(Number(good.goldValue || 0) * Number(force.gold || 1) * 100) / 100;
      const foodValue = Math.round(Number(good.foodValue || 0) * Number(force.food || 1) * 100) / 100;
      gold += goldValue;
      food += foodValue;
      rows.push({ ...good, finalGoldValue: goldValue, finalFoodValue: foodValue, goldMultiplier: force.gold, foodMultiplier: force.food });
    }

    const rawDev = getDevelopmentEconomyBonus(house, clock);
    const developmentMarketMultipliers = getGeneralMarketMultipliers(clock);
    const dev = {
      ...rawDev,
      rawGold: Number(rawDev.gold || 0),
      rawFood: Number(rawDev.food || 0),
      seasonMultiplier: getGeneralMarketMultiplierText(clock),
      gold: Math.round(Number(rawDev.gold || 0) * Number(developmentMarketMultipliers.Gold || 1) * 100) / 100,
      food: Math.round(Number(rawDev.food || 0) * Number(developmentMarketMultipliers.Food || 1) * 100) / 100
    };

    gold += Number(dev.gold || 0);
    food += Number(dev.food || 0);

    gold = Math.round(gold * 100) / 100;
    food = Math.round(food * 100) / 100;

    return {
      goods,
      rows,
      development: dev,
      gold,
      food,
      income: { Gold: gold, Food: food },
      text: `Gold: ${gold.toLocaleString(undefined, { maximumFractionDigits: 2 })}; Food: ${food.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    };
  }

  function tradeGoodSummaryText(house = {}, emptyText = "None") {
    const goods = getHouseTradeGoods(house);
    const parts = [];
    if (goods.primary) parts.push(`${goods.primary.name} (${goods.primary.category}, G${goods.primary.goldValue}/F${goods.primary.foodValue})`);
    if (goods.secondary) parts.push(`${goods.secondary.name} (${goods.secondary.category}, G${goods.secondary.goldValue}/F${goods.secondary.foodValue})`);
    return parts.length ? parts.join("; ") : emptyText;
  }

  function getTileEconomyBreakdownText(house = {}, clock = getClock()) {
    const breakdown = getTradeGoodIncomeBreakdown(house, clock);
    const manual = getHouseResourceIncome(house);
    const building = getActiveBuildingIncome(house, clock);
    const manualAndBuildings = scaleResourceMapByGeneralMarket(addResourceMaps(manual, building), clock);
    const total = addResourceMaps(manualAndBuildings, breakdown.income);
    return {
      trade: breakdown,
      manualAndBuildings,
      total,
      totalText: resourceMapToText(total)
    };
  }

  function addResourceMaps(...maps) {
    const output = {};
    for (const map of maps) {
      const normalized = normalizeResourceMap(map);
      for (const [key, value] of Object.entries(normalized)) {
        output[key] = Number(output[key] || 0) + Number(value || 0);
      }
    }
    return output;
  }

  function scaleResourceMap(map, multiplier = 1) {
    const output = {};
    for (const [key, value] of Object.entries(normalizeResourceMap(map))) {
      const result = Number(value || 0) * Number(multiplier || 0);
      output[key] = Number.isInteger(result) ? result : Math.round(result * 100) / 100;
    }
    return output;
  }

  function hasAnyResources(map) {
    return Object.values(normalizeResourceMap(map)).some(value => Number(value) !== 0);
  }

  function getHouseResourceIncome(house = {}) {
    // v0.4.1: manual income is its own field. Once deliberately cleared, old legacy fields
    // must never refill the dialog or income calculation.
    if (house.manualResourceIncomeCleared === true) return {};

    if (Object.prototype.hasOwnProperty.call(house, "manualResourceIncome")) {
      return normalizeResourceMap(house.manualResourceIncome);
    }

    // Legacy one-time fallback for tiles created before manualResourceIncome existed.
    return normalizeResourceMap(
      house.resourceIncome ??
      house.resourcesIncome ??
      house.naturalResources ??
      house.resourceProduction ??
      house.baseResourceIncome ??
      house.manualBaseResourceIncome ??
      house.manualBaseIncome ??
      {}
    );
  }

  function deleteLegacyManualIncomeFields(house = {}) {
    delete house.resourceIncome;
    delete house.resourcesIncome;
    delete house.naturalResources;
    delete house.resourceProduction;
    delete house.baseResourceIncome;
    delete house.manualBaseResourceIncome;
    delete house.manualBaseIncome;
    return house;
  }

  function getHouseResourceStockpile(house = {}) {
    const stockpile = normalizeResourceMap(house.resourceStockpile ?? house.resources ?? house.stockpile);
    if (house.treasury !== "" && house.treasury !== undefined && house.treasury !== null) {
      const treasury = Number(house.treasury);
      if (Number.isFinite(treasury) && stockpile.Gold === undefined) stockpile.Gold = treasury;
    }
    return stockpile;
  }

  function isEconomyEnabled(house = {}) {
    return house.economyEnabled === true ||
      hasAnyResources(getHouseResourceIncome(house)) ||
      hasAnyResources(getHouseResourceStockpile(house)) ||
      Boolean(getHouseTradeGoods(house).primary || getHouseTradeGoods(house).secondary);
  }

  function getSeasonMultiplier(clock = getClock()) {
    const season = String(clock?.season ?? "Spring");
    const value = SEASON_INCOME_MULTIPLIERS[season];
    return Number.isFinite(Number(value)) ? Number(value) : 1;
  }

  function nearlyEqual(a, b) {
    return Math.abs(Number(a || 0) - Number(b || 0)) < 0.000001;
  }

  function getGeneralMarketMultipliers(clock = getClock()) {
    const season = String(clock?.season ?? "Spring");
    const forces = getMarketForces();
    const seasonForces = forces[season] || {};
    const goldValues = [];
    const foodValues = [];

    for (const category of TRADE_GOOD_CATEGORIES) {
      const raw = seasonForces[category] || { gold: 1, food: 1 };
      const gold = Number(raw.gold ?? 1);
      const food = Number(raw.food ?? 1);
      goldValues.push(Number.isFinite(gold) ? gold : 1);
      foodValues.push(Number.isFinite(food) ? food : 1);
    }

    const firstGold = goldValues.length ? goldValues[0] : 1;
    const firstFood = foodValues.length ? foodValues[0] : 1;
    const uniformGold = goldValues.every(value => nearlyEqual(value, firstGold));
    const uniformFood = foodValues.every(value => nearlyEqual(value, firstFood));
    const uniformAll = uniformGold && uniformFood && nearlyEqual(firstGold, firstFood);

    return {
      Gold: uniformGold ? firstGold : 1,
      Food: uniformFood ? firstFood : 1,
      all: uniformAll ? firstGold : 1,
      appliesGlobally: uniformGold || uniformFood || uniformAll
    };
  }

  function getGeneralMarketMultiplierText(clock = getClock()) {
    const multipliers = getGeneralMarketMultipliers(clock);
    const parts = [];
    parts.push(`Gold ${Number(multipliers.Gold).toLocaleString(undefined, { maximumFractionDigits: 2 })}`);
    parts.push(`Food ${Number(multipliers.Food).toLocaleString(undefined, { maximumFractionDigits: 2 })}`);
    if (multipliers.all !== 1 && nearlyEqual(multipliers.Gold, multipliers.Food)) {
      return Number(multipliers.all).toLocaleString(undefined, { maximumFractionDigits: 2 });
    }
    return parts.join("; ");
  }

  function scaleResourceMapByGeneralMarket(map, clock = getClock()) {
    const multipliers = getGeneralMarketMultipliers(clock);
    const output = {};

    for (const [key, value] of Object.entries(normalizeResourceMap(map))) {
      let multiplier = 1;
      if (key === "Gold") multiplier = multipliers.Gold;
      else if (key === "Food") multiplier = multipliers.Food;
      else multiplier = multipliers.all;

      const result = Number(value || 0) * Number(multiplier || 1);
      output[key] = Number.isInteger(result) ? result : Math.round(result * 100) / 100;
    }

    return output;
  }

  function getNextClockData(clock = getClock()) {
    if (!clock) return null;
    return advanceClockData(clock);
  }

  function roundSortValueFromParts(year, roundIndex) {
    return Number(year ?? 100) * ROUND_ORDER.length + Number(roundIndex ?? 0);
  }

  function roundSortValue(clock = getClock()) {
    if (!clock) return 0;
    return roundSortValueFromParts(clock.year ?? 100, clock.roundIndex ?? 0);
  }

  function roundSortValueFromBuildMeta(meta = {}) {
    if (meta.activeFromSort !== undefined) return Number(meta.activeFromSort || 0);
    if (meta.activeFromYear !== undefined || meta.activeFromRoundIndex !== undefined) return roundSortValueFromParts(meta.activeFromYear ?? 100, meta.activeFromRoundIndex ?? 0);
    return 0;
  }

  function getBuildingRule(building, house = {}) {
    const meta = getBuildingMetaByName(building);
    if (meta) {
      return {
        cost: getBuildingTierCost(meta.level.level, meta.line, house),
        income: getBuildingIncomeForLevel(meta.line, meta.level, house),
        effect: getBuildingDisplayEffect(meta.line, meta.level, house),
        group: meta.line.group,
        lineKey: meta.line.key,
        lineLabel: meta.line.label,
        level: meta.level.level,
        statecraftRequired: getBuildingStatecraftRequirement(meta.level.level)
      };
    }
    return BUILDING_RULES[building] || { cost: {}, income: {}, effect: "" };
  }

  function getActiveBuildingIncome(house = {}, clock = getClock()) {
    const built = Array.isArray(house.builtBuildings) ? house.builtBuildings : [];
    const details = Array.isArray(house.buildingData) ? house.buildingData : [];
    const detailsByName = new Map(details.map(item => [String(item.name || item.building || ""), item]));
    const currentSort = roundSortValue(clock);
    let total = {};

    for (const building of built) {
      const meta = detailsByName.get(String(building));
      const isActive = !meta || roundSortValueFromBuildMeta(meta) <= currentSort;
      if (!isActive) continue;
      total = addResourceMaps(total, getBuildingRule(building, house).income);
    }

    return total;
  }

  function getTileTotalIncome(house = {}, clock = getClock()) {
    return getTileEconomyBreakdownText(house, clock).total;
  }

  function getMissingResources(stockpile, cost) {
    const have = normalizeResourceMap(stockpile);
    const need = normalizeResourceMap(cost);
    const missing = {};
    for (const [key, amount] of Object.entries(need)) {
      const deficit = Number(amount || 0) - Number(have[key] || 0);
      if (deficit > 0) missing[key] = deficit;
    }
    return missing;
  }

  function spendResources(stockpile, cost) {
    const result = normalizeResourceMap(stockpile);
    for (const [key, amount] of Object.entries(normalizeResourceMap(cost))) {
      result[key] = Number(result[key] || 0) - Number(amount || 0);
    }
    return result;
  }

  function addResourceIncomeToStockpile(stockpile, income) {
    return addResourceMaps(stockpile, income);
  }

  function syncTreasuryFromResources(house) {
    const stockpile = getHouseResourceStockpile(house);
    house.resourceStockpile = stockpile;
    if (stockpile.Gold !== undefined) house.treasury = stockpile.Gold;
    return house;
  }

  function getEconomyLedger() {
    return canvas.scene?.getFlag(FLAG_SCOPE, ECONOMY_LEDGER_KEY) ?? {};
  }

  async function saveEconomyLedger(ledger) {
    await canvas.scene.setFlag(FLAG_SCOPE, ECONOMY_LEDGER_KEY, ledger);
  }


  async function clearEconomyLedger(scope = "all") {
    if (scope === "all") {
      await canvas.scene.unsetFlag(FLAG_SCOPE, ECONOMY_LEDGER_KEY);
      return { cleared: "all" };
    }
    const clock = getClock();
    const roundKey = getRoundKey(clock);
    const ledger = foundry.utils.deepClone(getEconomyLedger() || {});
    let cleared = 0;
    for (const key of Object.keys(ledger)) {
      if (!roundKey || key.startsWith(`${roundKey}|`)) {
        delete ledger[key];
        cleared++;
      }
    }
    await saveEconomyLedger(ledger);
    return { cleared };
  }

  function addRoundsToClockData(clock = getClock(), rounds = 1) {
    const base = clock || getDefaultClock();
    const step = Math.max(1, Math.floor(Number(rounds || 1)));
    const totalIndex = Number(base.roundIndex ?? 0) + step;
    const nextYear = Number(base.year ?? 100) + Math.floor(totalIndex / ROUND_ORDER.length);
    const nextIndex = ((totalIndex % ROUND_ORDER.length) + ROUND_ORDER.length) % ROUND_ORDER.length;
    const nextRound = ROUND_ORDER[nextIndex] || ROUND_ORDER[0];
    return { year: nextYear, roundIndex: nextIndex, season: nextRound.season, round: nextRound.round, version: MODULE_VERSION, updatedAt: new Date().toISOString(), updatedBy: game.user.name };
  }

  function getNextRoundActivation(clock = getClock(), constructionRounds = 1) {
    const next = addRoundsToClockData(clock || getDefaultClock(), constructionRounds);
    return {
      activeFromRoundKey: getRoundKey(next),
      activeFromDateLabel: getDateLabel(next),
      activeFromYear: Number(next.year ?? 100),
      activeFromRoundIndex: Number(next.roundIndex ?? 0),
      activeFromSort: roundSortValue(next),
      constructionRounds: Math.max(1, Math.floor(Number(constructionRounds || 1)))
    };
  }

  function canUserBuildOnTileForUser(worldTile, house = null, user = game.user) {
    if (!user) return false;
    if (user.isGM) return true;

    const ownerUserId = getTileOwnerUserId(worldTile, house);
    if (ownerUserId) return String(ownerUserId) === String(user.id);

    const ownerUserName = getTileOwnerUserName(worldTile, house);
    if (ownerUserName) return normalize(ownerUserName) === normalize(user.name);

    return false;
  }

  function findActiveGmForScene(sceneId = canvas.scene?.id) {
    const activeGms = game.users.contents.filter(user => user.isGM && user.active);
    if (!activeGms.length) return null;

    return activeGms.find(user => String(user.viewedScene || "") === String(sceneId || "")) || activeGms[0];
  }

  function getPendingBuildRequestsFromPiece(piece) {
    return Array.isArray(piece?.pendingBuildRequests) ? [...piece.pendingBuildRequests] : [];
  }

  function hasPendingBuildForRound(roundKey, userId) {
    if (!roundKey || !userId) return null;
    for (const token of canvas.tokens.placeables) {
      const piece = getWorldPiece(token);
      if (!piece) continue;
      const requests = getPendingBuildRequestsFromPiece(piece);
      const found = requests.find(request =>
        request &&
        request.status === PENDING_BUILD_STATUS_PENDING &&
        String(request.roundKey || "") === String(roundKey) &&
        String(request.requesterUserId || "") === String(userId)
      );
      if (found) return { token, piece, request: found };
    }
    return null;
  }

  async function savePendingBuildRequest({ token, piece, entry, building }) {
    const clock = getClock();
    const roundKey = getRoundKey(clock);
    const dateLabel = clock ? getDateLabel(clock) : "Unknown Date";
    const existingPending = hasPendingBuildForRound(roundKey, game.user.id);

    if (existingPending) {
      ui.notifications.warn(`You already have a pending build this round: ${existingPending.request.building} at ${existingPending.request.tileName}.`);
      return false;
    }

    const updatedPiece = foundry.utils.deepClone(piece || getWorldPiece(token) || {});
    const requests = getPendingBuildRequestsFromPiece(updatedPiece);
    const request = {
      id: foundry.utils.randomID(16),
      status: PENDING_BUILD_STATUS_PENDING,
      sceneId: canvas.scene?.id,
      sceneName: canvas.scene?.name,
      roundKey,
      dateLabel,
      requesterUserId: game.user.id,
      requesterUserName: game.user.name,
      tokenId: token.document.id,
      tokenName: token.document.name,
      pieceName: updatedPiece.name || token.document.name,
      drawingId: entry.drawing.document.id,
      tileId: entry.tile.id || entry.drawing.document.id,
      tileName: entry.tile.name || "Unnamed Tile",
      building,
      requestedAt: new Date().toISOString(),
      requestedSource: `Crown Overview Tools ${MODULE_VERSION}`
    };

    requests.push(request);
    updatedPiece.pendingBuildRequests = requests;
    updatedPiece.pendingBuildRoundKey = roundKey;
    updatedPiece.pendingBuildBuilding = building;
    updatedPiece.pendingBuildTileId = request.tileId;
    updatedPiece.pendingBuildTileName = request.tileName;
    updatedPiece.pendingBuildRequestedAt = request.requestedAt;
    updatedPiece.lastBuildRoundKey = roundKey;
    updatedPiece.lastBuiltBuilding = building;
    updatedPiece.lastBuiltTileId = request.tileId;
    updatedPiece.lastBuiltTileName = request.tileName;
    updatedPiece.lastBuiltAt = request.requestedAt;
    updatedPiece.lastBuiltBy = game.user.name;
    updatedPiece.lastBuildStatus = PENDING_BUILD_STATUS_PENDING;

    await saveWorldPiece(token, updatedPiece);

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Build" }),
      content: `<h2>Build Request Queued</h2>
        <p><strong>Player:</strong> ${escapeHtml(game.user.name)}</p>
        <p><strong>Piece:</strong> ${escapeHtml(updatedPiece.name || token.document.name)}</p>
        <p><strong>Tile:</strong> ${escapeHtml(request.tileName)}</p>
        <p><strong>Building:</strong> ${escapeHtml(building)}</p>
        <p><strong>Date:</strong> ${escapeHtml(dateLabel)}</p>
        <p>No active GM was online, so this has been saved as a pending request. A GM can apply it later with <strong>Process Pending Builds</strong>.</p>`
    });

    ui.notifications.info(`No active GM online. Queued pending build: ${building} at ${request.tileName}.`);
    return true;
  }

  async function requestGmBuild({ token, entry, building }) {
    const gm = findActiveGmForScene(canvas.scene?.id);

    if (!gm) {
      const piece = getWorldPiece(token);
      return await savePendingBuildRequest({ token, piece, entry, building });
    }

    const payload = {
      type: "buildRequest",
      targetGmId: gm.id,
      sceneId: canvas.scene?.id,
      sceneName: canvas.scene?.name,
      requesterUserId: game.user.id,
      requesterUserName: game.user.name,
      tokenId: token.document.id,
      tokenName: token.document.name,
      drawingId: entry.drawing.document.id,
      tileId: entry.tile.id || entry.drawing.document.id,
      tileName: entry.tile.name || "Unnamed Tile",
      building
    };

    game.socket.emit(SOCKET_NAME, payload);
    ui.notifications.info(`Build request sent to GM ${gm.name} for ${entry.tile.name || "selected tile"}.`);
    return true;
  }

  async function applyBuildToTile({ token, piece, entry, building, builderUserId, builderUserName }) {
    const builderUser = game.users.get(builderUserId) || null;
    const builderIsGm = Boolean(builderUser?.isGM);
    const worldTile = entry.tile;
    const drawing = entry.drawing;
    const doc = drawing.document;
    const clock = getClock();
    const roundKey = getRoundKey(clock);

    if (!roundKey) throw new Error("World Round Clock is not initialized.");
    if (isSeaByTile(worldTile)) throw new Error("Sea tiles cannot build settlements/buildings.");
    if (!canUserControlWorldPieceForUser(token, piece, builderUser || { id: builderUserId, name: builderUserName, isGM: false })) throw new Error(`${builderUserName} does not control ${piece.name || token.document.name}.`);

    const house = foundry.utils.deepClone(doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {});

    if (!canUserBuildOnTileForUser(worldTile, house, builderUser || { id: builderUserId, name: builderUserName, isGM: false })) {
      throw new Error(getBuildBlockedReason(worldTile, house));
    }

    const existingBuildings = Array.isArray(house.builtBuildings) ? [...house.builtBuildings].map(String) : [];
    const targetMeta = getBuildingMetaByName(building);
    const currentLineState = targetMeta ? getBuildingLineState(house).get(targetMeta.line.key) : null;
    const isUpgrade = Boolean(targetMeta && currentLineState && Number(targetMeta.level.level) > Number(currentLineState.level.level));
    const currentSlotCount = getBuildingSlotCount(house);

    if (!targetMeta && existingBuildings.length >= 4) throw new Error(`${worldTile.name || "This tile"} already has the maximum of 4 buildings.`);
    if (targetMeta && !currentLineState && currentSlotCount >= 4) throw new Error(`${worldTile.name || "This tile"} already has the maximum of 4 building lines.`);
    if (existingBuildings.includes(building)) throw new Error(`${building} already exists in ${worldTile.name || "this tile"}.`);
    if (targetMeta && currentLineState && !isUpgrade) throw new Error(`${worldTile.name || "This tile"} already has ${currentLineState.level.name} in the ${targetMeta.line.label} line.`);

    const ledger = foundry.utils.deepClone(getBuildLedger());
    const existingBuildThisRound = getAlreadyBuiltForRound(ledger, roundKey, builderUserId);

    if (!builderIsGm && existingBuildThisRound) {
      throw new Error(`${builderUserName} has already built this turn: ${existingBuildThisRound.building} at ${existingBuildThisRound.tileName}.`);
    }

    // v0.2.4+: the scene build ledger and pending-build queue are the source of truth for one-build-per-round.
    // Older piece-level lastBuildRoundKey flags can become stale when a GM rewinds the round clock or edits test data.

    const rule = getBuildingRule(building, house);
    const statecraftRequired = Number(rule.statecraftRequired || 0);
    const pieceStatecraft = getPieceStatecraft(piece);
    if (!builderIsGm && pieceStatecraft !== null && statecraftRequired > 0 && pieceStatecraft < statecraftRequired) {
      throw new Error(`${piece.name || token.document.name} needs Statecraft ${statecraftRequired} to build ${building}, but has ${pieceStatecraft}.`);
    }

    const economyActive = isEconomyEnabled(house);
    const currentStockpile = getHouseResourceStockpile(house);
    const buildingCost = normalizeResourceMap(rule.cost);
    const missingResources = economyActive ? getMissingResources(currentStockpile, buildingCost) : {};

    if (economyActive && hasAnyResources(missingResources)) {
      throw new Error(`${worldTile.name || "This tile"} lacks the resources for ${building}. Missing: ${resourceMapToText(missingResources)}.`);
    }

    const stockpileAfterCost = economyActive ? spendResources(currentStockpile, buildingCost) : currentStockpile;
    const activation = getNextRoundActivation(clock, Math.max(1, Number(rule.level || 1)));

    const updatedBuildings = getBuiltBuildingsAfterCatalogChange(house, building).slice(0, 4);
    const updatedBuildingSlots = getBuildingSlotsAfterCatalogChange(house, building);
    const developmentLevel = Math.min(updatedBuildings.length, 4);
    const developmentLabel = DEVELOPMENT_LEVELS[developmentLevel]?.label || "City";
    const oldPopulation = house.population;
    const population = randomPopulation(developmentLevel);
    const now = new Date().toISOString();
    const dateLabel = getDateLabel(clock);
    const cleanManualIncome = getHouseResourceIncome(house);

    const buildingData = Array.isArray(house.buildingData) ? house.buildingData : [];
    const filteredBuildingData = targetMeta
      ? buildingData.filter(item => getBuildingMetaByName(String(item.name || item.building || ""))?.line?.key !== targetMeta.line.key)
      : buildingData.filter(item => String(item.name || item.building || "") !== String(building));

    const updatedHouse = {
      ...house,
      house: house.house || worldTile.owner || "Neutral",
      lord: house.lord || "",
      region: house.region || worldTile.region || "",
      culture: house.culture || "",
      developmentLevel,
      developmentLabel,
      population,
      builtBuildings: updatedBuildings,
      buildingSlots: updatedBuildingSlots,
      economyEnabled: economyActive || house.economyEnabled === true,
      resourceStockpile: stockpileAfterCost,
      manualResourceIncome: cleanManualIncome,
      manualResourceIncomeCleared: !hasAnyResources(cleanManualIncome),
      buildingData: [
        ...filteredBuildingData,
        {
          name: building,
          building,
          lineKey: rule.lineKey || "legacy",
          lineLabel: rule.lineLabel || building,
          group: rule.group || "Legacy",
          level: rule.level || 1,
          cost: buildingCost,
          income: normalizeResourceMap(rule.income),
          effect: rule.effect || "",
          statecraftRequired,
          statecraftUsed: pieceStatecraft,
          upgradedFrom: currentLineState?.level?.name || "",
          builtRoundKey: roundKey,
          builtDateLabel: dateLabel,
          builtByUserId: builderUserId,
          builtByUserName: builderUserName,
          ...activation
        }
      ],
      worldTileId: doc.id,
      worldTileName: worldTile.name || "Unnamed Tile",
      lastBuiltBuilding: building,
      lastBuiltAction: isUpgrade ? "upgrade" : "build",
      lastBuiltRoundKey: roundKey,
      lastBuiltDateLabel: dateLabel,
      lastBuiltByUserId: builderUserId,
      lastBuiltByUserName: builderUserName,
      lastBuiltByPieceId: token.document.id,
      lastBuiltByPieceName: piece.name || token.document.name,
      lastBuiltAt: now,
      buildLog: [
        ...(Array.isArray(house.buildLog) ? house.buildLog : []),
        {
          building,
          action: isUpgrade ? "upgrade" : "build",
          upgradedFrom: currentLineState?.level?.name || "",
          roundKey,
          dateLabel,
          userId: builderUserId,
          userName: builderUserName,
          pieceId: token.document.id,
          pieceName: piece.name || token.document.name,
          builtAt: now
        }
      ],
      version: `Crown Overview Tools ${MODULE_VERSION}`,
      updatedAt: now,
      updatedBy: game.user.name
    };

    deleteLegacyManualIncomeFields(updatedHouse);
    syncTreasuryFromResources(updatedHouse);

    await doc.unsetFlag(FLAG_SCOPE, HOUSE_KEY);
    await doc.setFlag(FLAG_SCOPE, HOUSE_KEY, updatedHouse);

    const updatedPiece = foundry.utils.deepClone(piece);
    updatedPiece.lastBuildRoundKey = roundKey;
    updatedPiece.lastBuiltBuilding = building;
    updatedPiece.lastBuiltTileId = worldTile.id || doc.id;
    updatedPiece.lastBuiltTileName = worldTile.name || "Unnamed Tile";
    updatedPiece.lastBuiltAt = now;
    updatedPiece.lastBuiltBy = builderUserName;
    await saveWorldPiece(token, updatedPiece);

    ledger[roundKey] = ledger[roundKey] || { dateLabel, users: {}, builds: [] };
    ledger[roundKey].dateLabel = dateLabel;
    ledger[roundKey].users = ledger[roundKey].users || {};
    ledger[roundKey].builds = Array.isArray(ledger[roundKey].builds) ? ledger[roundKey].builds : [];
    ledger[roundKey].users[builderUserId] = {
      userName: builderUserName,
      building,
      action: isUpgrade ? "upgrade" : "build",
      tileId: worldTile.id || doc.id,
      tileName: worldTile.name || "Unnamed Tile",
      pieceId: token.document.id,
      pieceName: piece.name || token.document.name,
      builtAt: now
    };
    ledger[roundKey].builds.push(ledger[roundKey].users[builderUserId]);
    await saveBuildLedger(ledger);

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Build" }),
      content: `<h2>${isUpgrade ? "Building Upgrade Started" : "Building Construction Started"}</h2>
        <p><strong>Player:</strong> ${escapeHtml(builderUserName)}</p>
        <p><strong>Piece:</strong> ${escapeHtml(piece.name || token.document.name)}</p>
        <p><strong>Tile:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}</p>
        <p><strong>Tile Owner:</strong> ${escapeHtml(getTileOwnerUserName(worldTile, updatedHouse) || "Unassigned")}</p>
        <p><strong>Building:</strong> ${escapeHtml(building)}</p>
        ${isUpgrade ? `<p><strong>Upgraded From:</strong> ${escapeHtml(currentLineState?.level?.name || "Unknown")}</p>` : ""}
        ${statecraftRequired ? `<p><strong>Statecraft Required:</strong> ${escapeHtml(statecraftRequired)}${pieceStatecraft !== null ? ` — Piece has ${escapeHtml(pieceStatecraft)}` : " — not checked because no Statecraft is stored on this piece yet"}</p>` : ""}
        ${economyActive ? `<p><strong>Cost Paid:</strong> ${escapeHtml(resourceMapToText(buildingCost))}</p><p><strong>Tile Stockpile:</strong> ${escapeHtml(resourceMapToText(stockpileAfterCost))}</p><p><strong>Bonuses Unlock:</strong> ${escapeHtml(activation.activeFromDateLabel)} after ${escapeHtml(activation.constructionRounds)} round(s) — ${escapeHtml(resourceMapToText(rule.income))}</p>` : `<p><strong>Economy:</strong> Not enabled for this tile, so no resource cost was charged.</p>`}
        <p><strong>Development:</strong> ${escapeHtml(developmentLabel)} (${escapeHtml(developmentLevel)} / 4)</p>
        <p><strong>Population:</strong> ${escapeHtml(Number(population).toLocaleString())}${oldPopulation !== undefined && oldPopulation !== "" ? ` <span style="opacity:0.75;">previously ${escapeHtml(oldPopulation)}</span>` : ""}</p>
        <p><strong>Date:</strong> ${escapeHtml(dateLabel)}</p>`
    });

    ui.notifications.info(`${building} ${isUpgrade ? "upgrade" : "construction"} started in ${worldTile.name || "selected tile"}. Bonuses unlock on ${activation.activeFromDateLabel}.`);
    return true;
  }

  async function handleBuildRequest(message) {
    if (!game.user.isGM) return;
    if (message.targetGmId && String(message.targetGmId) !== String(game.user.id)) return;

    if (String(message.sceneId || "") !== String(canvas.scene?.id || "")) {
      ui.notifications.warn(`Build request from ${message.requesterUserName || "player"} ignored: GM is not on ${message.sceneName || "the requested scene"}.`);
      return;
    }

    try {
      const token = canvas.tokens.get(message.tokenId) || canvas.tokens.placeables.find(t => t.document.id === message.tokenId);
      if (!token) throw new Error(`Could not find world piece token ${message.tokenName || message.tokenId}.`);

      const piece = getWorldPiece(token);
      if (!piece) throw new Error(`${token.document.name} is not a world piece.`);

      const entry = canvas.drawings.placeables
        .map(drawing => ({ drawing, tile: getWorldTile(drawing) }))
        .find(candidate => candidate.drawing.document.id === message.drawingId || candidate.tile?.id === message.tileId);

      if (!entry?.tile) throw new Error(`Could not find target tile ${message.tileName || message.tileId}.`);

      ui.notifications.info(`Processing build request from ${message.requesterUserName}: ${message.building} at ${entry.tile.name || "selected tile"}.`);

      await applyBuildToTile({
        token,
        piece,
        entry,
        building: message.building,
        builderUserId: message.requesterUserId,
        builderUserName: message.requesterUserName || "Player"
      });
    } catch (err) {
      console.error("Crown Overview build request failed:", err, message);
      ui.notifications.error(`Build request from ${message.requesterUserName || "player"} failed: ${err.message || err}`);
      const requester = game.users.get(String(message.requesterUserId || ""));
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ alias: "Crown Build" }),
        whisper: requester ? [requester.id, ...ChatMessage.getWhisperRecipients("GM").map(u => u.id)] : undefined,
        content: `<h2>Build Request Failed</h2><p><strong>Player:</strong> ${escapeHtml(message.requesterUserName || "Unknown")}</p><p><strong>Reason:</strong> ${escapeHtml(err.message || err)}</p>`
      });
      if (requester && game.socket) game.socket.emit(SOCKET_NAME, { type: "playerNotification", targetUserId: requester.id, level: "error", message: `Build failed: ${err.message || err}` });
    }
  }

  function registerSocketHandlers() {
    if (!game.socket) return;
    game.socket.on(SOCKET_NAME, async message => {
      if (!message) return;
      if (message.type === "playerNotification") {
        if (!message.targetUserId || String(message.targetUserId) === String(game.user.id)) {
          const fn = message.level === "error" ? ui.notifications.error : message.level === "warn" ? ui.notifications.warn : ui.notifications.info;
          fn.call(ui.notifications, message.message || "Crown Overview notification.");
        }
        return;
      }
      if (message.type === "buildRequest") {
        await handleBuildRequest(message);
        return;
      }
      if (message.type === "diplomacyRequest") {
        await handleDiplomacyRequest(message);
        return;
      }
      if (message.type === "armyMusterRequest") {
        await handleArmyMusterRequest(message);
        return;
      }
      if (message.type === "navyMusterRequest" || message.type === "navyLaunchRequest") {
        await handleNavyMusterRequest(message);
        return;
      }
      if (message.type === "siegeStormRequest") {
        await handleSiegeStormRequest(message);
        return;
      }
      if (message.type === "duelRequest") {
        await handleDuelRequest(message);
        return;
      }
      if (message.type === "spreadSelectedRequest") {
        await handleSpreadSelectedRequest(message);
        return;
      }
      if (message.type === "embarkArmyRequest") {
        await handleEmbarkArmyRequest(message);
        return;
      }
      if (message.type === "disembarkArmyRequest") {
        await handleDisembarkArmyRequest(message);
        return;
      }
      if (message.type === "dismissForceRequest") {
        await handleDismissForceRequest(message);
        return;
      }
    });
  }

  function getPendingBuildEntries() {
    const entries = [];
    for (const token of canvas.tokens.placeables) {
      const piece = getWorldPiece(token);
      if (!piece) continue;
      const requests = getPendingBuildRequestsFromPiece(piece).filter(request => request?.status === PENDING_BUILD_STATUS_PENDING);
      for (const request of requests) entries.push({ token, piece, request });
    }
    return entries;
  }

  async function markPendingBuildRequest(token, piece, requestId, status, extra = {}) {
    const updatedPiece = foundry.utils.deepClone(piece || getWorldPiece(token) || {});
    const requests = getPendingBuildRequestsFromPiece(updatedPiece).map(request => {
      if (String(request.id || "") !== String(requestId || "")) return request;
      return {
        ...request,
        status,
        ...extra,
        resolvedAt: new Date().toISOString(),
        resolvedBy: game.user.name
      };
    });

    updatedPiece.pendingBuildRequests = requests;

    const stillPending = requests.find(request => request?.status === PENDING_BUILD_STATUS_PENDING);
    if (!stillPending) {
      delete updatedPiece.pendingBuildRoundKey;
      delete updatedPiece.pendingBuildBuilding;
      delete updatedPiece.pendingBuildTileId;
      delete updatedPiece.pendingBuildTileName;
      delete updatedPiece.pendingBuildRequestedAt;
      if (status === PENDING_BUILD_STATUS_FAILED) {
        delete updatedPiece.lastBuildRoundKey;
        delete updatedPiece.lastBuiltBuilding;
        delete updatedPiece.lastBuiltTileId;
        delete updatedPiece.lastBuiltTileName;
        delete updatedPiece.lastBuiltAt;
        delete updatedPiece.lastBuiltBy;
      }
    }

    updatedPiece.lastBuildStatus = status;
    await saveWorldPiece(token, updatedPiece);
    return updatedPiece;
  }

  async function processPendingBuilds() {
    if (!requireOverviewScene()) return;

    if (!game.user.isGM) {
      ui.notifications.warn("Only the GM can process pending builds.");
      return;
    }

    const pending = getPendingBuildEntries();
    if (!pending.length) {
      ui.notifications.info("There are no pending build requests on this scene.");
      return;
    }

    const rows = pending.map((entry, index) => {
      const request = entry.request;
      return `<label style="display:block;margin:5px 0;padding:5px;border-bottom:1px solid rgba(255,255,255,0.12);">
        <input type="checkbox" name="requestIndex" value="${escapeHtml(index)}" checked>
        <strong>${escapeHtml(request.requesterUserName || "Player")}</strong> — ${escapeHtml(request.building || "Building")} at ${escapeHtml(request.tileName || "Unknown Tile")}
        <br><span style="opacity:0.75;font-size:12px;">Piece: ${escapeHtml(request.pieceName || request.tokenName || entry.token.document.name)} | Date: ${escapeHtml(request.dateLabel || request.roundKey || "Unknown")}</span>
      </label>`;
    }).join("");

    const result = await new Promise(resolve => {
      new Dialog({
        title: "Process Pending Builds",
        content: `<form>
          <p>Select pending builds to apply. Failed requests will be marked and reported in chat.</p>
          <div style="max-height:360px;overflow-y:auto;border:1px solid #777;border-radius:6px;padding:6px;">${rows}</div>
        </form>`,
        buttons: {
          apply: {
            label: "Apply Selected",
            callback: html => {
              const form = html[0].querySelector("form");
              const indexes = Array.from(form.querySelectorAll('input[name="requestIndex"]:checked')).map(input => Number(input.value));
              resolve({ action: "apply", indexes });
            }
          },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "apply"
      }, { width: 650, height: 520, resizable: true }).render(true);
    });

    if (!result || result.action !== "apply") return;
    if (!result.indexes.length) {
      ui.notifications.warn("No pending builds selected.");
      return;
    }

    let applied = 0;
    let failed = 0;
    let summary = "";

    for (const index of result.indexes) {
      const item = pending[index];
      if (!item) continue;
      const { token, request } = item;
      const piece = getWorldPiece(token);
      if (!piece) continue;

      try {
        const entry = canvas.drawings.placeables
          .map(drawing => ({ drawing, tile: getWorldTile(drawing) }))
          .find(candidate => candidate.drawing.document.id === request.drawingId || candidate.tile?.id === request.tileId);

        if (!entry?.tile) throw new Error(`Could not find target tile ${request.tileName || request.tileId}.`);

        await applyBuildToTile({
          token,
          piece,
          entry,
          building: request.building,
          builderUserId: request.requesterUserId,
          builderUserName: request.requesterUserName || "Player"
        });

        await markPendingBuildRequest(token, getWorldPiece(token), request.id, PENDING_BUILD_STATUS_APPLIED, { appliedBuilding: request.building });
        applied++;
        summary += `<li><strong>Applied:</strong> ${escapeHtml(request.requesterUserName || "Player")} — ${escapeHtml(request.building)} at ${escapeHtml(request.tileName)}</li>`;
      } catch (err) {
        console.error("Pending build failed:", err, request);
        await markPendingBuildRequest(token, getWorldPiece(token), request.id, PENDING_BUILD_STATUS_FAILED, { failedReason: String(err.message || err) });
        failed++;
        summary += `<li><strong>Failed:</strong> ${escapeHtml(request.requesterUserName || "Player")} — ${escapeHtml(request.building)} at ${escapeHtml(request.tileName)}<br><span style="color:#ff9999;">${escapeHtml(err.message || err)}</span></li>`;
      }
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Build" }),
      content: `<h2>Pending Builds Processed</h2><p><strong>Applied:</strong> ${escapeHtml(applied)}</p><p><strong>Failed:</strong> ${escapeHtml(failed)}</p><ul>${summary}</ul>`
    });

    ui.notifications.info(`Pending builds processed: ${applied} applied, ${failed} failed.`);
  }

  function buildRecordMatchesUser(record, targetUserId, targetUserName) {
    if (!record) return false;
    if (String(record.userId || "") === String(targetUserId || "")) return true;
    if (String(record.builderUserId || "") === String(targetUserId || "")) return true;
    if (String(record.requesterUserId || "") === String(targetUserId || "")) return true;
    if (normalize(record.userName || "") && normalize(record.userName || "") === normalize(targetUserName || "")) return true;
    if (normalize(record.builderUserName || "") && normalize(record.builderUserName || "") === normalize(targetUserName || "")) return true;
    if (normalize(record.requesterUserName || "") && normalize(record.requesterUserName || "") === normalize(targetUserName || "")) return true;
    return false;
  }

  function pieceBuildBelongsToTarget(piece, targetAllPlayers, targetUserId, targetUserName) {
    if (targetAllPlayers) return true;
    if (!piece) return false;
    if (String(piece.ownerUserId || piece.playerOwnerUserId || piece.controllerUserId || "") === String(targetUserId || "")) return true;
    if (String(piece.lastBuiltByUserId || piece.lastBuildUserId || "") === String(targetUserId || "")) return true;
    if (String(piece.pendingBuildRequesterUserId || "") === String(targetUserId || "")) return true;
    if (normalize(piece.ownerUserName || piece.playerOwnerUserName || piece.controllerUserName || "") === normalize(targetUserName || "")) return true;
    if (normalize(piece.lastBuiltBy || piece.lastBuiltByUserName || "") === normalize(targetUserName || "")) return true;
    return false;
  }

  function pendingRequestMatchesTarget(request, targetAllPlayers, targetUserId, targetUserName) {
    if (targetAllPlayers) return true;
    if (!request) return false;
    if (String(request.requesterUserId || "") === String(targetUserId || "")) return true;
    if (String(request.builderUserId || "") === String(targetUserId || "")) return true;
    if (normalize(request.requesterUserName || "") === normalize(targetUserName || "")) return true;
    if (normalize(request.builderUserName || "") === normalize(targetUserName || "")) return true;
    return false;
  }

  async function clearBuildTracking({ playerId = "all", scope = "current", clearPieceFlags = true, clearPending = true, forceAllLedger = false } = {}) {
    const clock = getClock();
    const roundKey = getRoundKey(clock);
    const targetAllPlayers = playerId === "all" || forceAllLedger;
    const targetUser = targetAllPlayers ? null : game.users.get(playerId);
    const targetUserName = targetUser?.name || "";

    const ledger = foundry.utils.deepClone(getBuildLedger() || {});
    let ledgerCleared = 0;

    const clearLedgerRound = key => {
      if (!ledger?.[key]) return;
      const round = ledger[key];

      if (targetAllPlayers) {
        ledgerCleared += Object.keys(round.users || {}).length;
        ledgerCleared += Array.isArray(round.builds) ? round.builds.length : 0;
        delete ledger[key];
        return;
      }

      if (round.users) {
        for (const userKey of Object.keys(round.users)) {
          const record = round.users[userKey];
          if (String(userKey) === String(playerId) || buildRecordMatchesUser(record, playerId, targetUserName)) {
            delete round.users[userKey];
            ledgerCleared++;
          }
        }
      }

      if (Array.isArray(round.builds)) {
        const before = round.builds.length;
        round.builds = round.builds.filter(build => !buildRecordMatchesUser(build, playerId, targetUserName));
        ledgerCleared += before - round.builds.length;
      }

      if (!Object.keys(round.users || {}).length && !(round.builds || []).length) delete ledger[key];
    };

    if (scope === "all" || forceAllLedger) {
      for (const key of Object.keys(ledger || {})) clearLedgerRound(key);
    } else if (roundKey) {
      clearLedgerRound(roundKey);
    }

    if (scope === "all" && targetAllPlayers) await canvas.scene.unsetFlag(FLAG_SCOPE, BUILD_LEDGER_KEY);
    else await saveBuildLedger(ledger || {});

    let piecesCleared = 0;
    let pendingCleared = 0;

    if (clearPieceFlags || clearPending || forceAllLedger) {
      for (const token of canvas.tokens.placeables) {
        const piece = getWorldPiece(token);
        if (!piece) continue;

        const belongsToTarget = pieceBuildBelongsToTarget(piece, targetAllPlayers, playerId, targetUserName);
        if (!belongsToTarget) continue;

        const updatedPiece = foundry.utils.deepClone(piece);
        let changed = false;

        const lockMatchesScope = scope === "all" || forceAllLedger || String(updatedPiece.lastBuildRoundKey || "") === String(roundKey || "");
        if ((clearPieceFlags || forceAllLedger) && lockMatchesScope) {
          for (const key of [
            "lastBuildRoundKey", "lastBuiltBuilding", "lastBuiltTileId", "lastBuiltTileName", "lastBuiltAt", "lastBuiltBy",
            "lastBuiltByUserId", "lastBuiltByUserName", "lastBuildStatus", "pendingBuildRoundKey", "pendingBuildBuilding",
            "pendingBuildTileId", "pendingBuildTileName", "pendingBuildRequestedAt", "pendingBuildRequesterUserId"
          ]) delete updatedPiece[key];
          changed = true;
        }

        if ((clearPending || forceAllLedger) && Array.isArray(updatedPiece.pendingBuildRequests)) {
          const before = updatedPiece.pendingBuildRequests.length;
          updatedPiece.pendingBuildRequests = updatedPiece.pendingBuildRequests.filter(request => {
            const requestMatchesScope = scope === "all" || forceAllLedger || String(request.roundKey || "") === String(roundKey || "");
            if (!requestMatchesScope) return true;
            return !pendingRequestMatchesTarget(request, targetAllPlayers, playerId, targetUserName);
          });
          pendingCleared += before - updatedPiece.pendingBuildRequests.length;
          if (updatedPiece.pendingBuildRequests.length !== before) changed = true;
        }

        const pendingStillActive = Array.isArray(updatedPiece.pendingBuildRequests) && updatedPiece.pendingBuildRequests.some(request => request?.status === PENDING_BUILD_STATUS_PENDING);
        if (!pendingStillActive) {
          delete updatedPiece.pendingBuildRoundKey;
          delete updatedPiece.pendingBuildBuilding;
          delete updatedPiece.pendingBuildTileId;
          delete updatedPiece.pendingBuildTileName;
          delete updatedPiece.pendingBuildRequestedAt;
        }

        if (changed) {
          updatedPiece.lastBuildResetAt = new Date().toISOString();
          updatedPiece.lastBuildResetBy = game.user.name;
          updatedPiece.lastBuildResetSource = `Crown Overview Tools ${MODULE_VERSION}`;
          await saveWorldPiece(token, updatedPiece);
          piecesCleared++;
        }
      }
    }

    return { ledgerCleared, piecesCleared, pendingCleared, roundKey };
  }

  async function clearSelectedWorldPieceBuildLocks({ scope = "current", roundKey = null } = {}) {
    const selectedTokens = canvas.tokens.controlled.filter(token => Boolean(getWorldPiece(token)));
    let piecesCleared = 0;
    let pendingCleared = 0;

    for (const token of selectedTokens) {
      const piece = getWorldPiece(token);
      if (!piece) continue;

      const updatedPiece = foundry.utils.deepClone(piece);
      let changed = false;
      const lockMatchesScope = scope === "all" || String(updatedPiece.lastBuildRoundKey || "") === String(roundKey || "");

      if (lockMatchesScope) {
        for (const key of [
          "lastBuildRoundKey", "lastBuiltBuilding", "lastBuiltTileId", "lastBuiltTileName", "lastBuiltAt", "lastBuiltBy",
          "lastBuiltByUserId", "lastBuiltByUserName", "lastBuildStatus", "pendingBuildRoundKey", "pendingBuildBuilding",
          "pendingBuildTileId", "pendingBuildTileName", "pendingBuildRequestedAt", "pendingBuildRequesterUserId"
        ]) delete updatedPiece[key];
        changed = true;
      }

      if (Array.isArray(updatedPiece.pendingBuildRequests)) {
        const before = updatedPiece.pendingBuildRequests.length;
        updatedPiece.pendingBuildRequests = updatedPiece.pendingBuildRequests.filter(request => {
          const requestMatchesScope = scope === "all" || String(request.roundKey || "") === String(roundKey || "");
          return !requestMatchesScope;
        });
        pendingCleared += before - updatedPiece.pendingBuildRequests.length;
        if (updatedPiece.pendingBuildRequests.length !== before) changed = true;
      }

      const pendingStillActive = Array.isArray(updatedPiece.pendingBuildRequests) && updatedPiece.pendingBuildRequests.some(request => request?.status === PENDING_BUILD_STATUS_PENDING);
      if (!pendingStillActive) {
        delete updatedPiece.pendingBuildRoundKey;
        delete updatedPiece.pendingBuildBuilding;
        delete updatedPiece.pendingBuildTileId;
        delete updatedPiece.pendingBuildTileName;
        delete updatedPiece.pendingBuildRequestedAt;
        delete updatedPiece.pendingBuildRequesterUserId;
      }

      if (changed) {
        updatedPiece.lastBuildResetAt = new Date().toISOString();
        updatedPiece.lastBuildResetBy = game.user.name;
        updatedPiece.lastBuildResetSource = `Crown Overview Tools ${MODULE_VERSION} selected-piece reset`;
        await saveWorldPiece(token, updatedPiece);
        piecesCleared++;
      }
    }

    return { piecesCleared, pendingCleared, selectedCount: selectedTokens.length };
  }

  async function resetBuildCapacity() {
    if (!requireOverviewScene()) return;

    if (!game.user.isGM) {
      ui.notifications.warn("Only the GM can reset build uses.");
      return;
    }

    const clock = getClock();
    const roundKey = getRoundKey(clock);
    const currentLabel = clock ? getDateLabel(clock) : "Current Round";
    const selectedWorldPieces = canvas.tokens.controlled.filter(token => Boolean(getWorldPiece(token)));
    const players = getPlayerUsers();
    const playerOptions = [
      `<option value="all" selected>All players</option>`,
      ...players.map(user => `<option value="${escapeHtml(user.id)}">${escapeHtml(user.name)}</option>`)
    ].join("");

    const result = await new Promise(resolve => {
      new Dialog({
        title: "Reset Build Uses",
        content: `<form>
          <p>Clear one-build-per-round tracking. This does not remove buildings from tiles.</p>
          <div class="form-group">
            <label>Player</label>
            <select name="playerId" style="width:100%;">${playerOptions}</select>
          </div>
          <div class="form-group">
            <label>Reset Scope</label>
            <select name="scope" style="width:100%;">
              <option value="current" selected>Current round only — ${escapeHtml(currentLabel)}</option>
              <option value="all">All rounds / full build ledger</option>
            </select>
          </div>
          <div class="form-group"><label><input type="checkbox" name="clearPieceFlags" checked> Clear world piece build locks</label></div>
          <div class="form-group"><label><input type="checkbox" name="clearPending" checked> Clear pending build requests for the selected scope</label></div>
          ${selectedWorldPieces.length ? `<div class="form-group"><label><input type="checkbox" name="clearSelectedPieces" checked> Force-clear selected world piece token(s): ${escapeHtml(selectedWorldPieces.length)}</label></div>` : ""}
          <p class="notes">If a player is stuck, select their world piece and use Current round, or choose All players + All rounds / Repair Build Locks.</p>
        </form>`,
        buttons: {
          reset: { label: "Reset Build Uses", callback: html => {
            const form = html[0].querySelector("form");
            resolve({
              playerId: String(form.playerId.value || "all"),
              scope: String(form.scope.value || "current"),
              clearPieceFlags: form.clearPieceFlags.checked,
              clearPending: form.clearPending.checked,
              clearSelectedPieces: Boolean(form.clearSelectedPieces?.checked)
            });
          }},
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "reset"
      }, { width: 560, height: 410, resizable: true }).render(true);
    });

    if (!result) return;
    if (result.scope === "current" && !roundKey) {
      ui.notifications.warn("The World Round Clock is not initialized, so there is no current round to reset.");
      return;
    }

    const targetName = result.playerId === "all" ? "All players" : (game.users.get(result.playerId)?.name || result.playerId);
    const summary = await clearBuildTracking(result);

    if (result.clearSelectedPieces) {
      const selectedSummary = await clearSelectedWorldPieceBuildLocks({ scope: result.scope, roundKey });
      summary.piecesCleared += selectedSummary.piecesCleared;
      summary.pendingCleared += selectedSummary.pendingCleared;
      summary.selectedPiecesChecked = selectedSummary.selectedCount;
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Build" }),
      content: `<h2>Build Uses Reset</h2><p><strong>Player:</strong> ${escapeHtml(targetName)}</p><p><strong>Scope:</strong> ${escapeHtml(result.scope === "all" ? "All rounds" : currentLabel)}</p><p><strong>Ledger entries cleared:</strong> ${escapeHtml(summary.ledgerCleared)}</p><p><strong>Pending requests cleared:</strong> ${escapeHtml(summary.pendingCleared)}</p><p><strong>World pieces unlocked:</strong> ${escapeHtml(summary.piecesCleared)}</p>${summary.selectedPiecesChecked ? `<p><strong>Selected pieces force-checked:</strong> ${escapeHtml(summary.selectedPiecesChecked)}</p>` : ""}`
    });

    ui.notifications.info(`Build uses reset for ${targetName}. World pieces unlocked: ${summary.piecesCleared}.`);
  }

  async function repairBuildLocks() {
    if (!requireOverviewScene()) return;

    if (!game.user.isGM) {
      ui.notifications.warn("Only the GM can repair build locks.");
      return;
    }

    const confirmed = await Dialog.confirm({
      title: "Repair Build Locks?",
      content: `<p>This will hard-clear the scene build ledger, pending build requests, and build-lock fields from every World Piece on this scene.</p><p><strong>It will not remove buildings from holdings.</strong></p>`
    });

    if (!confirmed) return;

    const summary = await clearBuildTracking({ playerId: "all", scope: "all", clearPieceFlags: true, clearPending: true, forceAllLedger: true });

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Build" }),
      content: `<h2>Build Locks Repaired</h2><p><strong>Scene:</strong> ${escapeHtml(canvas.scene?.name || "Unknown")}</p><p><strong>Ledger entries cleared:</strong> ${escapeHtml(summary.ledgerCleared)}</p><p><strong>Pending requests cleared:</strong> ${escapeHtml(summary.pendingCleared)}</p><p><strong>World pieces unlocked:</strong> ${escapeHtml(summary.piecesCleared)}</p><p>Existing buildings on tiles were not changed.</p>`
    });

    ui.notifications.info(`Build locks repaired. World pieces unlocked: ${summary.piecesCleared}.`);
  }

  async function buildOnCurrentTile() {
    if (!requireOverviewScene()) return;

    const selected = canvas.tokens.controlled;
    if (selected.length !== 1) {
      ui.notifications.warn("Select exactly one world piece first.");
      return;
    }

    const token = selected[0];
    const piece = getWorldPiece(token);

    if (!piece) {
      ui.notifications.warn("Selected token is not a world piece.");
      return;
    }

    if (!canUserControlWorldPiece(token, piece)) {
      ui.notifications.warn("You can only build with world pieces you control.");
      return;
    }

    const clock = getClock();
    const roundKey = getRoundKey(clock);

    if (!roundKey) {
      ui.notifications.warn("Initialize the World Round Clock before building, so the one-building-per-turn rule can be tracked.");
      return;
    }

    const entry = getCurrentTileEntryForToken(token, piece);
    if (!entry) {
      ui.notifications.warn("Could not determine which world tile this piece occupies.");
      return;
    }

    const worldTile = entry.tile;
    const drawing = entry.drawing;
    const doc = drawing.document;

    if (isSeaByTile(worldTile)) {
      ui.notifications.warn("Sea tiles cannot build settlements/buildings.");
      return;
    }

    const house = foundry.utils.deepClone(doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {});

    if (!canUserBuildOnTile(worldTile, house)) {
      ui.notifications.warn(getBuildBlockedReason(worldTile, house));
      return;
    }

    const existingBuildings = Array.isArray(house.builtBuildings) ? [...house.builtBuildings] : [];
    const existingBuildingSlots = getBuildingSlotCount(house);

    const ledger = foundry.utils.deepClone(getBuildLedger());
    const existingBuildThisRound = getAlreadyBuiltForRound(ledger, roundKey, game.user.id);
    const pendingBuildThisRound = hasPendingBuildForRound(roundKey, game.user.id);

    if (!game.user.isGM && pendingBuildThisRound) {
      ui.notifications.warn(`You already have a pending build this turn: ${pendingBuildThisRound.request.building} at ${pendingBuildThisRound.request.tileName}.`);
      return;
    }

    if (!game.user.isGM && existingBuildThisRound) {
      ui.notifications.warn(`You have already built this turn: ${existingBuildThisRound.building} at ${existingBuildThisRound.tileName}.`);
      return;
    }

    // v0.2.4: do not block on piece.lastBuildRoundKey.
    // The player build ledger and pending-build queue handle one-build-per-round.
    // This avoids stale token locks after GM testing, rollback, or manual house edits.

    const buildingOptions = buildBuildingOptions(existingBuildings, house, piece);
    if (!buildingOptions) {
      ui.notifications.warn("No available buildings or upgrades remain for this tile.");
      return;
    }

    const currentLevel = Math.min(existingBuildingSlots, 4);
    const nextLevel = Math.min(existingBuildingSlots + 1, 4);
    const currentDevelopment = DEVELOPMENT_LEVELS[currentLevel]?.label || "Ruins";
    const nextDevelopment = DEVELOPMENT_LEVELS[nextLevel]?.label || "City";
    const dateLabel = getDateLabel(clock);

    const details = await new Promise(resolve => {
      new Dialog({
        title: `Build — ${worldTile.name || "World Tile"}`,
        content: `<form>
          <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;">
            <strong>Piece:</strong> ${escapeHtml(piece.name || token.document.name)}<br>
            <strong>Tile:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}<br>
            <strong>Region:</strong> ${escapeHtml(worldTile.region || house.region || "None")}<br>
            <strong>Player Owner:</strong> ${escapeHtml(getTileOwnerUserName(worldTile, house) || (game.user.isGM ? "GM Override" : "Unassigned"))}<br>
            <strong>Date:</strong> ${escapeHtml(dateLabel)}<br>
            <strong>Building Lines:</strong> ${escapeHtml(existingBuildingSlots)} / 4<br>
            <strong>Development:</strong> ${escapeHtml(currentDevelopment)} → ${escapeHtml(nextDevelopment)}<br>
            <strong>Resources:</strong> ${escapeHtml(resourceMapToText(getHouseResourceStockpile(house)))}<br>
            <strong>Builder Statecraft:</strong> ${escapeHtml(getPieceStatecraft(piece) ?? "Not set")}
          </div>

          <div class="form-group">
            <label><strong>Building to construct</strong></label>
            <select name="building" style="width:100%;">
              ${buildingOptions}
            </select>
          </div>

          <div style="padding:8px;margin-top:10px;border:1px solid #777;border-radius:6px;">
            <strong>Existing Buildings:</strong><br>
            ${existingBuildings.length ? escapeHtml(existingBuildings.join(", ")) : "None"}
          </div>

          <div style="padding:8px;margin-top:10px;border:1px solid #777;border-radius:6px;">
            <strong>Rules:</strong><br>
            Building lines can be upgraded. New lines use one of the four building slots. Upgrades replace the old tier and do not consume a new slot.<br>
            Tier requirements: 1 = Statecraft 5, 2 = Statecraft 10, 3 = Statecraft 12, 4 = Statecraft 16.<br>
            Costs: Tier 1 = Gold 4, Tier 2 = Gold 12, Tier 3 = Gold 24, Tier 4 = Gold 48.
          </div>

          <p class="notes">Players may build or upgrade once per world round. Resource costs are enforced once economy is enabled for this tile. If a piece has no Statecraft value saved yet, Statecraft is not enforced for that piece.</p>
        </form>`,
        buttons: {
          build: {
            label: "Build",
            callback: html => {
              const form = html[0].querySelector("form");
              resolve({ building: String(form.building.value || "").trim() });
            }
          },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "build"
      }, { width: 560, height: 430, resizable: true }).render(true);
    });

    if (!details?.building) return;

    const selectedRule = getBuildingRule(details.building, house);
    const selectedReq = Number(selectedRule.statecraftRequired || 0);
    const selectedStatecraft = getPieceStatecraft(piece);
    if (!game.user.isGM && selectedStatecraft !== null && selectedReq > 0 && selectedStatecraft < selectedReq) {
      ui.notifications.warn(`${piece.name || token.document.name} needs Statecraft ${selectedReq} to build ${details.building}, but has ${selectedStatecraft}.`);
      return;
    }

    if (existingBuildings.includes(details.building)) {
      ui.notifications.warn(`${details.building} already exists in ${worldTile.name}.`);
      return;
    }

    if (!game.user.isGM) {
      await requestGmBuild({ token, entry, building: details.building });
      return;
    }

    await applyBuildToTile({
      token,
      piece,
      entry,
      building: details.building,
      builderUserId: game.user.id,
      builderUserName: game.user.name
    });
  }

  async function assignTileOwner() {
    if (!requireOverviewScene()) return;

    if (!game.user.isGM) {
      ui.notifications.warn("Only the GM can assign tile owners.");
      return;
    }

    const selected = canvas.drawings.controlled
      .map(drawing => ({ drawing, tile: getWorldTile(drawing) }))
      .filter(entry => Boolean(entry.tile));

    if (!selected.length) {
      ui.notifications.warn("Select one or more world tile drawings first.");
      return;
    }

    const players = getPlayerUsers();
    if (!players.length) {
      ui.notifications.warn("No non-GM player users found.");
      return;
    }

    const currentHouse = selected.length === 1 ? getHouseData(selected[0].drawing) : null;
    const currentTile = selected.length === 1 ? selected[0].tile : null;
    const currentOwnerId = getTileOwnerUserId(currentTile, currentHouse);
    const currentOwnerName = getTileOwnerUserName(currentTile, currentHouse);

    const userOptions = [
      `<option value="" ${!currentOwnerId ? "selected" : ""}>Unassigned / clear owner</option>`,
      ...players.map(user => `<option value="${escapeHtml(user.id)}" ${String(user.id) === String(currentOwnerId) ? "selected" : ""}>${escapeHtml(user.name)}</option>`)
    ].join("");

    const result = await new Promise(resolve => {
      new Dialog({
        title: "Assign Tile Owner",
        content: `<form>
          <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;">
            <strong>Tiles selected:</strong> ${escapeHtml(selected.length)}<br>
            ${selected.length === 1 ? `<strong>Tile:</strong> ${escapeHtml(selected[0].tile.name || "Unnamed Tile")}<br>` : ""}
            <strong>Current Player Owner:</strong> ${escapeHtml(currentOwnerName || "Unassigned")}
          </div>

          <div class="form-group">
            <label><strong>Player Owner</strong></label>
            <select name="ownerUserId" style="width:100%;">
              ${userOptions}
            </select>
            <p class="notes">Players can build only on tiles assigned to their Foundry player account.</p>
          </div>

          <div class="form-group">
            <label>Ruler Display Name</label>
            <input type="text" name="rulerName" value="${escapeHtml(currentHouse?.lord || currentOwnerName || "")}" style="width:100%;" />
            <p class="notes">This is the visible Ruler field shown in the hover tooltip. It can be character flavour; the actual build permission uses the selected player above.</p>
          </div>

          <div class="form-group">
            <label>
              <input type="checkbox" name="updateRuler" checked />
              Update Lord / Ruler display field
            </label>
          </div>
        </form>`,
        buttons: {
          save: {
            label: "Assign Owner",
            callback: html => {
              const form = html[0].querySelector("form");
              resolve({
                ownerUserId: String(form.ownerUserId.value || ""),
                rulerName: String(form.rulerName.value || "").trim(),
                updateRuler: form.updateRuler.checked
              });
            }
          },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "save"
      }, { width: 560, height: 410, resizable: true }).render(true);
    });

    if (!result) return;

    const ownerUser = result.ownerUserId ? game.users.get(result.ownerUserId) : null;
    const ownerName = ownerUser?.name || "";
    const now = new Date().toISOString();
    let updated = 0;
    const rows = [];

    for (const entry of selected) {
      const drawing = entry.drawing;
      const doc = drawing.document;
      const worldTile = foundry.utils.deepClone(entry.tile || {});
      const house = foundry.utils.deepClone(doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {});

      if (ownerUser) {
        worldTile.ownerUserId = ownerUser.id;
        worldTile.ownerUserName = ownerUser.name;
        worldTile.playerOwnerUserId = ownerUser.id;
        worldTile.playerOwnerUserName = ownerUser.name;

        house.ownerUserId = ownerUser.id;
        house.ownerUserName = ownerUser.name;
        house.playerOwnerUserId = ownerUser.id;
        house.playerOwnerUserName = ownerUser.name;
      } else {
        delete worldTile.ownerUserId;
        delete worldTile.ownerUserName;
        delete worldTile.playerOwnerUserId;
        delete worldTile.playerOwnerUserName;

        delete house.ownerUserId;
        delete house.ownerUserName;
        delete house.playerOwnerUserId;
        delete house.playerOwnerUserName;
      }

      if (result.updateRuler) {
        house.lord = result.rulerName || ownerName || "";
      }

      house.region = house.region || worldTile.region || "";
      house.worldTileId = doc.id;
      house.worldTileName = worldTile.name || "Unnamed Tile";
      house.ownerAssignedAt = now;
      house.ownerAssignedBy = game.user.name;
      house.ownerAssignedSource = `Crown Overview Tools ${MODULE_VERSION}`;
      house.version = `Crown Overview Tools ${MODULE_VERSION}`;
      house.updatedAt = now;
      house.updatedBy = game.user.name;

      worldTile.ownerAssignedAt = now;
      worldTile.ownerAssignedBy = game.user.name;
      worldTile.ownerAssignedSource = `Crown Overview Tools ${MODULE_VERSION}`;

      await doc.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, worldTile);
      await doc.unsetFlag(FLAG_SCOPE, HOUSE_KEY);
      await doc.setFlag(FLAG_SCOPE, HOUSE_KEY, house);

      updated++;
      rows.push(`<li><strong>${escapeHtml(worldTile.name || "Unnamed Tile")}</strong> → ${escapeHtml(ownerName || "Unassigned")}${house.lord ? `, ruler display: ${escapeHtml(house.lord)}` : ""}</li>`);
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Tile Owner" }),
      content: `<h2>Tile Owner Assigned</h2>
        <p><strong>Updated:</strong> ${escapeHtml(updated)}</p>
        <p><strong>Player Owner:</strong> ${escapeHtml(ownerName || "Unassigned")}</p>
        <ul>${rows.join("")}</ul>`
    });

    ui.notifications.info(`Assigned owner for ${updated} tile(s): ${ownerName || "Unassigned"}.`);
  }

  async function setSelectedTerritoryNeutral() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) {
      ui.notifications.warn("Only the GM can make a territory neutral.");
      return;
    }

    const selected = canvas.drawings.controlled.filter(drawing => Boolean(getWorldTile(drawing)));
    if (selected.length !== 1) {
      ui.notifications.warn("Select exactly one world tile drawing first.");
      return;
    }

    const drawing = selected[0];
    const doc = drawing.document;
    const worldTile = foundry.utils.deepClone(doc.getFlag(FLAG_SCOPE, WORLD_TILE_KEY) || {});
    if (!worldTile || !Object.keys(worldTile).length) {
      ui.notifications.warn("This drawing has not been assigned as a World Tile.");
      return;
    }
    const house = foundry.utils.deepClone(doc.getFlag(FLAG_SCOPE, HOUSE_KEY) || {});
    const tileName = String(worldTile.name || drawing.document.text || "Unnamed Territory").trim();
    const localHouse = String(house.house || worldTile.house || worldTile.localHouse || "").trim();

    const confirmed = await Dialog.confirm({
      title: "Make Territory Neutral / Unaligned",
      content: `<p>Reset <strong>${escapeHtml(tileName)}</strong> to neutral political control?</p>
        <p>The local House${localHouse ? ` (<strong>${escapeHtml(localHouse)}</strong>)` : ""} will be preserved, but its allegiance and player ownership will be cleared.</p>
        <p>This territory will be removed from every player's <strong>My Holdings</strong> and manpower pool.</p>`
    });
    if (!confirmed) return;

    const now = new Date().toISOString();

    const clearPoliticalFields = data => {
      data.allegiance = "Unaligned";
      data.ownershipType = "Neutral";
      data.ownerType = "Neutral";

      data.ownerUserId = "";
      data.ownerUserName = "";
      data.playerOwnerUserId = "";
      data.playerOwnerUserName = "";
      data.controllerPlayerUserId = "";
      data.controllerPlayerName = "";

      data.swornToType = "Neutral";
      data.swornToPlayerUserId = "";
      data.swornToPlayerName = "";
      data.swornToHouse = "";
      data.swornTo = "";

      data.lastControllerChange = {
        source: "GM Neutral Reset",
        userId: "",
        userName: "",
        allegiance: "Unaligned",
        localHouse,
        actorName: game.user.name,
        at: now
      };
      data.ownerAssignedAt = now;
      data.ownerAssignedBy = game.user.name;
      data.ownerAssignedSource = `Crown Overview Tools ${MODULE_VERSION} — Neutral Reset`;
      data.updatedAt = now;
      data.updatedBy = game.user.name;
      return data;
    };

    clearPoliticalFields(worldTile);
    clearPoliticalFields(house);

    // Preserve the territory's original/local House identity.
    if (localHouse) {
      house.house = localHouse;
      worldTile.house = worldTile.house || localHouse;
      house.publicOwnerLabel = localHouse;
    }

    await doc.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, worldTile);
    await doc.setFlag(FLAG_SCOPE, HOUSE_KEY, house);

    // Verify the reset actually persisted.
    const savedTile = doc.getFlag(FLAG_SCOPE, WORLD_TILE_KEY) || {};
    const savedHouse = doc.getFlag(FLAG_SCOPE, HOUSE_KEY) || {};
    if (normalize(savedTile.allegiance) !== "unaligned" || normalize(savedHouse.allegiance) !== "unaligned") {
      throw new Error(`Neutral reset failed for ${tileName}: allegiance did not save as Unaligned.`);
    }
    if (getTileOwnerUserId(savedTile, savedHouse) || getTileOwnerUserName(savedTile, savedHouse)) {
      throw new Error(`Neutral reset failed for ${tileName}: player ownership is still present.`);
    }

    ui.notifications.info(`${tileName} is now Neutral / Unaligned.`);
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Territory Control" }),
      content: `<h2>Territory Made Neutral</h2>
        <p><strong>Territory:</strong> ${escapeHtml(tileName)}</p>
        <p><strong>Local House:</strong> ${escapeHtml(localHouse || "None")}</p>
        <p><strong>Allegiance:</strong> Unaligned</p>
        <p>Player ownership has been cleared.</p>`
    });
    refreshSceneFeatures();
  }

  async function assignHouse() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can edit tile ownership / house data."); return; }
    const selected = canvas.drawings.controlled;
    if (selected.length !== 1) { ui.notifications.warn("Select one world tile drawing first."); return; }
    const drawing = selected[0];
    const doc = drawing.document;
    const worldTile = doc.getFlag(FLAG_SCOPE, WORLD_TILE_KEY);
    if (!worldTile) { ui.notifications.warn("This drawing has not been assigned as a World Tile."); return; }
    const isSea = isSeaByTile(worldTile);
    const existing = doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {};
    const existingBuildings = !isSea && Array.isArray(existing.builtBuildings) ? existing.builtBuildings : [];
    const currentBuildingCount = Math.min(existingBuildings.length, 4);
    const currentDevelopment = DEVELOPMENT_LEVELS[currentBuildingCount];
    const cultureValue = existing.culture || worldTile.culture || "";
    const religionValue = existing.religion || worldTile.religion || "";
    const cultureOptions = CULTURES.map(culture => `<option value="${escapeHtml(culture)}" ${cultureValue === culture ? "selected" : ""}>${escapeHtml(culture)}</option>`).join("");
    const buildingOptions = BUILDINGS.map(building => `<label style="display:block;margin:4px 0;"><input type="checkbox" name="building" value="${escapeHtml(building)}" ${existingBuildings.includes(building) ? "checked" : ""}> ${escapeHtml(building)}</label>`).join("");
    const currentOwnerId = getTileOwnerUserId(worldTile, existing) || "";
    const ownerOptions = [`<option value="" ${!currentOwnerId ? "selected" : ""}>Unassigned / NPC / Neutral</option>`, ...getPlayerUsers().map(user => `<option value="${escapeHtml(user.id)}" ${String(user.id) === String(currentOwnerId) ? "selected" : ""}>${escapeHtml(user.name)}</option>`)].join("");
    const swornId = existing.swornToPlayerUserId || worldTile.swornToPlayerUserId || "";
    const swornOptions = [`<option value="" ${!swornId ? "selected" : ""}>None / NPC</option>`, ...getPlayerUsers().map(user => `<option value="${escapeHtml(user.id)}" ${String(user.id) === String(swornId) ? "selected" : ""}>${escapeHtml(user.name)}</option>`)].join("");
    const protectedId = existing.marriageProtectedPlayerUserId || worldTile.marriageProtectedPlayerUserId || "";
    const protectedOptions = [`<option value="" ${!protectedId ? "selected" : ""}>No specific player</option>`, ...getPlayerUsers().map(user => `<option value="${escapeHtml(user.id)}" ${String(user.id) === String(protectedId) ? "selected" : ""}>${escapeHtml(user.name)}</option>`)].join("");
    const ownershipType = inferOwnershipType(worldTile, existing);
    const ownershipOptions = ["Player", "NPC", "Neutral", "None"].map(type => `<option value="${type}" ${normalize(ownershipType) === normalize(type) ? "selected" : ""}>${type}</option>`).join("");
    const swornTypeValue = existing.swornToType || worldTile.swornToType || (currentOwnerId ? "Player" : normalize(ownershipType) === "npc" ? "NPC" : "");
    const swornTypeOptions = ["", "Player", "NPC", "Neutral", "None"].map(type => `<option value="${escapeHtml(type)}" ${normalize(swornTypeValue) === normalize(type) ? "selected" : ""}>${escapeHtml(type || "None")}</option>`).join("");
    const religions = ["", "Faith of the Seven", "Old Gods", "Drowned God", "R'hllor", "Many-Faced God", "Other"];
    const religionOptions = religions.map(religion => `<option value="${escapeHtml(religion)}" ${religionValue === religion ? "selected" : ""}>${escapeHtml(religion || "Select Religion")}</option>`).join("");
    const developmentSection = isSea ? `<hr><h2>Sea Tile</h2><div style="padding:10px;border:1px solid #777;border-radius:6px;margin-bottom:10px;"><strong>Sea Terrain</strong><br><span style="font-size:12px;opacity:0.85;">Development, population, and built buildings do not apply to sea tiles.</span></div>` : `<hr><h2>Development</h2><div style="padding:8px;border:1px solid #777;border-radius:6px;margin-bottom:10px;"><strong>Current Development:</strong> ${escapeHtml(currentBuildingCount + " — " + currentDevelopment.label)}<br><strong>Built Buildings:</strong> ${escapeHtml(currentBuildingCount)} / 4</div><div class="form-group"><label>Population</label><input type="number" name="population" value="${escapeHtml(existing.population ?? "")}" style="width:100%;" /><p class="notes">Population rerolls automatically whenever the number of built buildings changes.</p></div>`;
    const buildingsSection = isSea ? "" : `<hr><h2>Built Buildings</h2><p>A tile may have a maximum of <strong>4 building lines</strong>.</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:2px 16px;">${buildingOptions}</div>`;
    new Dialog({
      title: `Tile Ownership / House Data — ${worldTile.name || "Unnamed World Tile"}`,
      content: `<form>
        <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;"><strong>World Tile:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}<br><strong>Tile ID:</strong> ${escapeHtml(worldTile.id || doc.id)}<br><strong>Region:</strong> ${escapeHtml(worldTile.region || "None")}<br><strong>Terrain:</strong> ${escapeHtml(worldTile.terrainLabel || worldTile.terrainKey || "None")}</div>
        <h2>Ownership</h2>
        <div class="form-group"><label>Ownership Type</label><select name="ownershipType" style="width:100%;">${ownershipOptions}</select></div>
        <div class="form-group"><label>Controller Player</label><select name="ownerUserId" style="width:100%;">${ownerOptions}</select><p class="notes">Use this for player-controlled tiles. NPC and Neutral tiles should usually be unassigned.</p></div>
        <div class="form-group"><label>Public Owner Label</label><input type="text" name="publicOwnerLabel" value="${escapeHtml(existing.publicOwnerLabel || worldTile.publicOwnerLabel || "")}" style="width:100%;" /></div>
        <h2>House / Ruler</h2>
        <div class="form-group"><label>House Name</label><input type="text" name="house" value="${escapeHtml(existing.house ?? worldTile.owner ?? "")}" style="width:100%;" /></div>
        <div class="form-group"><label>Lord / Ruler</label><input type="text" name="lord" value="${escapeHtml(existing.lord ?? worldTile.ruler ?? "")}" style="width:100%;" /></div>
        <div class="form-group"><label>Ruling Character ID</label><input type="text" name="rulingCharacterId" value="${escapeHtml(existing.rulingCharacterId || worldTile.rulingCharacterId || "")}" style="width:100%;" /></div>
        <div class="form-group"><label>Ruler Diplomacy</label><input type="number" name="rulerDiplomacy" value="${escapeHtml(existing.rulerDiplomacy ?? worldTile.rulerDiplomacy ?? "")}" step="0.25" style="width:100%;" /></div>
        <div class="form-group"><label>NPC Defender Diplomacy</label><input type="number" name="npcDefenderDiplomacy" value="${escapeHtml(existing.npcDefenderDiplomacy ?? worldTile.npcDefenderDiplomacy ?? existing.npcDiplomacy ?? worldTile.npcDiplomacy ?? "")}" step="0.25" style="width:100%;" /><p class="notes">Used as the hidden defender value when no defender character token is present.</p></div>
        <h2>Culture / Religion / Allegiance</h2>
        <div class="form-group"><label>Culture</label><select name="culture" style="width:100%;"><option value="">Select Culture</option>${cultureOptions}</select></div>
        <div class="form-group"><label>Custom Culture</label><input type="text" name="customCulture" value="${CULTURES.includes(cultureValue) ? "" : escapeHtml(cultureValue)}" placeholder="Use if not in dropdown" style="width:100%;" /></div>
        <div class="form-group"><label>Religion</label><select name="religion" style="width:100%;">${religionOptions}</select></div>
        <div class="form-group"><label>Custom Religion</label><input type="text" name="customReligion" value="${religions.includes(religionValue) ? "" : escapeHtml(religionValue)}" placeholder="Use if not in dropdown" style="width:100%;" /></div>
        <div class="form-group"><label>Sworn To Type</label><select name="swornToType" style="width:100%;">${swornTypeOptions}</select></div>
        <div class="form-group"><label>Sworn To Player</label><select name="swornToPlayerUserId" style="width:100%;">${swornOptions}</select></div>
        <div class="form-group"><label><input type="checkbox" name="marriageProtected" ${csvBoolean(existing.marriageProtected ?? worldTile.marriageProtected, false) ? "checked" : ""} /> Marriage protected / cannot be diplomatically swayed</label></div>
        <div class="form-group"><label>Marriage Protected Player</label><select name="marriageProtectedPlayerUserId" style="width:100%;">${protectedOptions}</select></div>
        <div class="form-group"><label><input type="checkbox" name="diplomaticTakeoverAllowed" ${csvBoolean(existing.diplomaticTakeoverAllowed ?? worldTile.diplomaticTakeoverAllowed, !isSea) ? "checked" : ""} /> Diplomatic takeover allowed</label></div>
        ${developmentSection}
        <hr><h2>Economy</h2>
        <div class="form-group"><label>Primary Export</label><input type="text" name="primaryExport" value="${escapeHtml(existing.primaryExport ?? existing.exports ?? "")}" style="width:100%;" /></div>
        <div class="form-group"><label>Secondary Export</label><input type="text" name="secondaryExport" value="${escapeHtml(existing.secondaryExport ?? "")}" style="width:100%;" /></div>
        <div class="form-group"><label>Treasury</label><input type="number" name="treasury" value="${escapeHtml(existing.treasury ?? "")}" style="width:100%;" /></div>
        <div class="form-group"><label>Allegiance Notes</label><input type="text" name="allegiance" value="${escapeHtml(existing.allegiance ?? "")}" style="width:100%;" /></div>
        <div class="form-group"><label>Ownership Notes</label><textarea name="ownershipNotes" style="width:100%;height:70px;">${escapeHtml(existing.ownershipNotes || worldTile.ownershipNotes || "")}</textarea></div>
        ${buildingsSection}
      </form>`,
      buttons: { save: { label: "Save Tile Data", callback: async html => {
        const form = html[0].querySelector("form");
        const buildings = isSea ? [] : Array.from(form.querySelectorAll('input[name="building"]:checked')).map(input => input.value);
        if (!isSea && buildings.length > 4) { ui.notifications.error("A world tile may have no more than 4 built building lines."); return; }
        const ownerUserId = String(form.ownerUserId.value || "");
        const ownerUser = ownerUserId ? game.users.get(ownerUserId) : null;
        const swornUserId = String(form.swornToPlayerUserId.value || "");
        const swornUser = swornUserId ? game.users.get(swornUserId) : null;
        const protectedUserId = String(form.marriageProtectedPlayerUserId.value || "");
        const protectedUser = protectedUserId ? game.users.get(protectedUserId) : null;
        const now = new Date().toISOString();
        let developmentLevel = null, developmentLabel = null, population = null;
        if (!isSea) {
          developmentLevel = buildings.length;
          developmentLabel = DEVELOPMENT_LEVELS[developmentLevel].label;
          const oldBuildingCount = Array.isArray(existing.builtBuildings) ? existing.builtBuildings.length : 0;
          const populationRaw = String(form.population.value ?? "").trim();
          population = populationRaw === "" ? "" : Number(populationRaw);
          if (oldBuildingCount !== buildings.length || population === "" || Number.isNaN(Number(population))) population = randomPopulation(developmentLevel);
        }
        const updatedWorldTile = foundry.utils.deepClone(worldTile || {});
        const ownershipTypeValue = String(form.ownershipType.value || inferOwnershipType(worldTile, existing)).trim();
        const culture = String(form.customCulture.value || form.culture.value || "").trim();
        const religion = String(form.customReligion.value || form.religion.value || "").trim();
        const rulerDiplomacy = numberOrBlank(form.rulerDiplomacy.value);
        const npcDefenderDiplomacy = numberOrBlank(form.npcDefenderDiplomacy.value);
        updatedWorldTile.ownershipType = ownershipTypeValue;
        updatedWorldTile.owner = String(form.house.value || "").trim();
        updatedWorldTile.ruler = String(form.lord.value || "").trim();
        updatedWorldTile.culture = culture;
        updatedWorldTile.religion = religion;
        updatedWorldTile.rulingCharacterId = String(form.rulingCharacterId.value || "").trim();
        updatedWorldTile.swornToType = String(form.swornToType.value || "").trim();
        updatedWorldTile.swornToPlayerName = swornUser?.name || "";
        updatedWorldTile.swornToPlayerUserId = swornUser?.id || "";
        updatedWorldTile.marriageProtected = form.marriageProtected.checked;
        updatedWorldTile.marriageProtectedPlayerName = protectedUser?.name || "";
        updatedWorldTile.marriageProtectedPlayerUserId = protectedUser?.id || "";
        updatedWorldTile.rulerDiplomacy = rulerDiplomacy;
        updatedWorldTile.npcDefenderDiplomacy = npcDefenderDiplomacy;
        updatedWorldTile.npcDiplomacy = npcDefenderDiplomacy === "" ? rulerDiplomacy : npcDefenderDiplomacy;
        updatedWorldTile.diplomaticTakeoverAllowed = form.diplomaticTakeoverAllowed.checked;
        updatedWorldTile.publicOwnerLabel = String(form.publicOwnerLabel.value || "").trim();
        updatedWorldTile.ownershipNotes = String(form.ownershipNotes.value || "").trim();
        updatedWorldTile.updatedAt = now;
        updatedWorldTile.updatedBy = game.user.name;
        const houseData = { ...existing,
          house: String(form.house.value || "").trim(), lord: String(form.lord.value || "").trim(), region: existing.region || worldTile.region || "", primaryExport: String(form.primaryExport.value || "").trim(), secondaryExport: String(form.secondaryExport.value || "").trim(), treasury: String(form.treasury.value || "").trim() === "" ? "" : Number(form.treasury.value), allegiance: String(form.allegiance.value || "").trim(), worldTileId: doc.id, worldTileName: worldTile.name,
          ownershipType: ownershipTypeValue, culture, religion, rulingCharacterId: updatedWorldTile.rulingCharacterId, swornToType: updatedWorldTile.swornToType, swornToPlayerName: updatedWorldTile.swornToPlayerName, swornToPlayerUserId: updatedWorldTile.swornToPlayerUserId, marriageProtected: updatedWorldTile.marriageProtected, marriageProtectedPlayerName: updatedWorldTile.marriageProtectedPlayerName, marriageProtectedPlayerUserId: updatedWorldTile.marriageProtectedPlayerUserId, rulerDiplomacy, npcDefenderDiplomacy, npcDiplomacy: updatedWorldTile.npcDiplomacy, diplomaticTakeoverAllowed: updatedWorldTile.diplomaticTakeoverAllowed, publicOwnerLabel: updatedWorldTile.publicOwnerLabel, ownershipNotes: updatedWorldTile.ownershipNotes,
          version: `Crown Overview Tools ${MODULE_VERSION}`, updatedAt: now, updatedBy: game.user.name
        };
        if (ownerUser && normalize(ownershipTypeValue) === "player") {
          updatedWorldTile.ownerUserId = ownerUser.id; updatedWorldTile.ownerUserName = ownerUser.name; updatedWorldTile.playerOwnerUserId = ownerUser.id; updatedWorldTile.playerOwnerUserName = ownerUser.name; updatedWorldTile.ownerAssignedAt = now; updatedWorldTile.ownerAssignedBy = game.user.name; updatedWorldTile.ownerAssignedSource = `Crown Overview Tools ${MODULE_VERSION} Tile Data`;
          houseData.ownerUserId = ownerUser.id; houseData.ownerUserName = ownerUser.name; houseData.playerOwnerUserId = ownerUser.id; houseData.playerOwnerUserName = ownerUser.name; houseData.ownerAssignedAt = now; houseData.ownerAssignedBy = game.user.name;
        } else {
          delete updatedWorldTile.ownerUserId; delete updatedWorldTile.ownerUserName; delete updatedWorldTile.playerOwnerUserId; delete updatedWorldTile.playerOwnerUserName; houseData.ownerUserId = ""; houseData.ownerUserName = ""; houseData.playerOwnerUserId = ""; houseData.playerOwnerUserName = "";
        }
        if (!isSea) { houseData.developmentLevel = developmentLevel; houseData.developmentLabel = developmentLabel; houseData.population = population; houseData.builtBuildings = buildings; }
        await doc.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, updatedWorldTile);
        await doc.unsetFlag(FLAG_SCOPE, HOUSE_KEY);
        await doc.setFlag(FLAG_SCOPE, HOUSE_KEY, houseData);
        ui.notifications.info(`Saved tile data for ${worldTile.name || "Unnamed Tile"}. Export Tile Ownership CSV will include these values.`);
      } }, cancel: { label: "Cancel" } },
      default: "save"
    }, { width: 740, height: 900, resizable: true }).render(true);
  }

  function getHoldingsForUser(user) {
    const entries = [];
    for (const entry of getWorldTileEntries()) {
      const house = getHouseData(entry.drawing) || {};
      const ownerId = getTileOwnerUserId(entry.tile, house);
      const ownerName = getTileOwnerUserName(entry.tile, house);
      const matches = user
        ? ((ownerId && String(ownerId) === String(user.id)) || (!ownerId && ownerName && normalize(ownerName) === normalize(user.name)))
        : Boolean(ownerId || ownerName);
      if (matches) entries.push({ ...entry, house });
    }
    entries.sort((a, b) => {
      const ar = String(a.house.region || a.tile.region || "");
      const br = String(b.house.region || b.tile.region || "");
      return ar.localeCompare(br) || String(a.tile.name || "").localeCompare(String(b.tile.name || ""));
    });
    return entries;
  }

  function numberText(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number.toLocaleString() : "0";
  }

  function holdingsSummary(entries) {
    let population = 0;
    let treasury = 0;
    let buildings = 0;
    let stockpile = {};
    let income = {};
    for (const entry of entries) {
      const house = entry.house || {};
      const pop = Number(house.population || 0);
      const cash = Number(house.treasury || 0);
      if (Number.isFinite(pop)) population += pop;
      if (Number.isFinite(cash)) treasury += cash;
      buildings += Array.isArray(house.builtBuildings) ? house.builtBuildings.length : 0;
      stockpile = addResourceMaps(stockpile, getHouseResourceStockpile(house));
      income = addResourceMaps(income, getTileTotalIncome(house, getClock()));
    }
    return { population, treasury, buildings, stockpile, income };
  }

  function goldFoodOnlyText(resourceMap, emptyText = "None") {
    const resources = normalizeResourceMap(resourceMap);
    const filtered = {};
    if (resources.Gold !== undefined) filtered.Gold = resources.Gold;
    if (resources.Food !== undefined) filtered.Food = resources.Food;
    return resourceMapToText(filtered, emptyText);
  }

  async function chooseHoldingsUser() {
    if (!game.user.isGM) return game.user;
    const users = getPlayerUsers();
    const options = users.map(user => `<option value="${escapeHtml(user.id)}">${escapeHtml(user.name)}</option>`).join("");
    return await new Promise(resolve => {
      new Dialog({
        title: "View Player Holdings",
        content: `
          <form>
            <p>Choose which player's assigned holdings to view.</p>
            <div class="form-group">
              <label>Player</label>
              <select name="userId" style="width:100%;">
                ${options}
              </select>
            </div>
          </form>
        `,
        buttons: {
          view: { label: "View Holdings", callback: html => {
            const form = html[0].querySelector("form");
            resolve(game.users.get(String(form.userId.value || "")) || null);
          } },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "view"
      }, { width: 520, height: 260, resizable: true }).render(true);
    });
  }

  async function showHoldings() {
    if (!requireOverviewScene()) return;
    const user = await chooseHoldingsUser();
    if (!user) return;

    const entries = getHoldingsForUser(user);
    const summary = holdingsSummary(entries);

    const rows = entries.map(entry => {
      const tile = entry.tile || {};
      const house = entry.house || {};
      const built = Array.isArray(house.builtBuildings) ? house.builtBuildings : [];
      const developmentLevel = built.length;
      const developmentLabel = house.developmentLabel || DEVELOPMENT_LEVELS[developmentLevel]?.label || "Ruins";
      const resources = [house.primaryExport || house.exports, house.secondaryExport].filter(Boolean).join(", ") || "None";
      const stockpileText = resourceMapToText(getHouseResourceStockpile(house));
      const incomeText = resourceMapToText(getTileTotalIncome(house, getClock()));
      return `
        <tr>
          <td style="padding:5px 7px;border:1px solid #777;"><strong>${escapeHtml(tile.name || "Unnamed Tile")}</strong><br><span style="opacity:0.75;">${escapeHtml(house.region || tile.region || "Unassigned")}</span></td>
          <td style="padding:5px 7px;border:1px solid #777;">${escapeHtml(house.house || tile.house || tile.owner || "None")}<br><span style="opacity:0.75;">Ruler: ${escapeHtml(house.lord || "None")}</span><br><span style="opacity:0.75;">Allegiance: ${escapeHtml(house.allegiance || tile.allegiance || "Independent")}</span></td>
          <td style="padding:5px 7px;border:1px solid #777;">${escapeHtml(developmentLabel)} (${escapeHtml(developmentLevel)}/4)<br><span style="opacity:0.75;">${escapeHtml(built.length ? built.join(", ") : "No buildings")}</span></td>
          <td style="padding:5px 7px;border:1px solid #777;">Pop: ${escapeHtml(numberText(house.population))}<br>Manpower: ${escapeHtml(getProvinceManpowerCurrent(house).toLocaleString())} / ${escapeHtml(getProvinceManpowerMax(house).toLocaleString())}<br>Ship Capacity: ${escapeHtml(getProvinceShipCapacity(house).toLocaleString())}<br>Treasury: ${escapeHtml(numberText(house.treasury))}<br>Stockpile: ${escapeHtml(stockpileText)}<br>Income: ${escapeHtml(incomeText)}</td>
          <td style="padding:5px 7px;border:1px solid #777;">${escapeHtml(resources)}</td>
        </tr>
      `;
    }).join("") || `<tr><td colspan="5" style="padding:8px;border:1px solid #777;">No holdings assigned to ${escapeHtml(user.name)} yet.</td></tr>`;

    new Dialog({
      title: `Holdings — ${user.name}`,
      content: `
        <div style="max-height:70vh;overflow:auto;">
          <h2 style="margin-top:0;">${escapeHtml(user.name)} Holdings</h2>
          <div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-bottom:10px;">
            <div style="padding:8px;border:1px solid #777;border-radius:6px;"><strong>Tiles</strong><br>${escapeHtml(entries.length)}</div>
            <div style="padding:8px;border:1px solid #777;border-radius:6px;"><strong>Buildings</strong><br>${escapeHtml(summary.buildings)}</div>
            <div style="padding:8px;border:1px solid #777;border-radius:6px;"><strong>Population</strong><br>${escapeHtml(summary.population.toLocaleString())}</div>
            <div style="padding:8px;border:1px solid #777;border-radius:6px;"><strong>Stockpile</strong><br>${escapeHtml(goldFoodOnlyText(summary.stockpile))}</div>
            <div style="padding:8px;border:1px solid #777;border-radius:6px;"><strong>Round Income</strong><br>${escapeHtml(resourceMapToText(summary.income))}</div>
          </div>
          <p><strong>Total Stockpile:</strong> ${escapeHtml(resourceMapToText(summary.stockpile))}</p>
          <table style="border-collapse:collapse;width:100%;font-size:13px;">
            <thead>
              <tr>
                <th style="padding:5px 7px;border:1px solid #777;text-align:left;">Tile</th>
                <th style="padding:5px 7px;border:1px solid #777;text-align:left;">House / Ruler</th>
                <th style="padding:5px 7px;border:1px solid #777;text-align:left;">Development</th>
                <th style="padding:5px 7px;border:1px solid #777;text-align:left;">Economy</th>
                <th style="padding:5px 7px;border:1px solid #777;text-align:left;">Exports</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `,
      buttons: { close: { label: "Close" } },
      default: "close"
    }, { width: 900, height: "auto", resizable: true }).render(true);
  }


  async function repairEconomyData() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) {
      ui.notifications.warn("Only the GM can repair economy data.");
      return;
    }

    const confirmed = await Dialog.confirm({
      title: "Repair Economy Data?",
      content: `<p>This will clean malformed resource keys on every world tile in this scene.</p><p>Example: <strong>Gold:: 6</strong> becomes <strong>Gold: 6</strong>.</p><p><strong>It will not delete buildings or change tile ownership.</strong></p>`,
      yes: () => true,
      no: () => false,
      defaultYes: false
    });

    if (!confirmed) return;

    let checked = 0;
    let repaired = 0;
    const rows = [];

    for (const entry of getWorldTileEntries()) {
      const doc = entry.drawing.document;
      const house = doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {};
      checked++;

      const oldIncomeText = resourceMapToText(house.manualResourceIncome ?? house.resourceIncome ?? house.resourcesIncome ?? house.naturalResources ?? house.resourceProduction, "");
      const oldStockText = resourceMapToText(house.resourceStockpile ?? house.resources ?? house.stockpile, "");

      const cleanIncome = getHouseResourceIncome(house);
      const cleanStockpile = getHouseResourceStockpile(house);
      const cleanIncomeText = resourceMapToText(cleanIncome, "");
      const cleanStockText = resourceMapToText(cleanStockpile, "");

      const hasLegacyKeys = Object.keys(house.manualResourceIncome ?? {}).some(key => resourceKey(key) !== key) ||
        Object.keys(house.resourceIncome ?? {}).some(key => resourceKey(key) !== key) ||
        Object.keys(house.resourceStockpile ?? {}).some(key => resourceKey(key) !== key) ||
        Object.keys(house.resources ?? {}).some(key => resourceKey(key) !== key) ||
        Object.keys(house.stockpile ?? {}).some(key => resourceKey(key) !== key) ||
        Object.prototype.hasOwnProperty.call(house, "resourcesIncome") ||
        Object.prototype.hasOwnProperty.call(house, "naturalResources") ||
        Object.prototype.hasOwnProperty.call(house, "resourceProduction") ||
        Object.prototype.hasOwnProperty.call(house, "baseResourceIncome") ||
        Object.prototype.hasOwnProperty.call(house, "manualBaseResourceIncome") ||
        Object.prototype.hasOwnProperty.call(house, "manualBaseIncome");

      if (!hasLegacyKeys && oldIncomeText === cleanIncomeText && oldStockText === cleanStockText) continue;

      const updatedHouse = {
        ...house,
        manualResourceIncome: cleanIncome,
        manualResourceIncomeCleared: !hasAnyResources(cleanIncome),
        resourceStockpile: cleanStockpile,
        treasury: cleanStockpile.Gold ?? house.treasury ?? "",
        resourceRepairedAt: new Date().toISOString(),
        resourceRepairedBy: game.user.name,
        resourceRepairedSource: `Crown Overview Tools ${MODULE_VERSION}`
      };

      deleteLegacyManualIncomeFields(updatedHouse);
      delete updatedHouse.resources;
      delete updatedHouse.stockpile;
      updatedHouse.buildingSlots = getBuildingSlotsAfterCatalogChange({ builtBuildings: Array.isArray(house.builtBuildings) ? house.builtBuildings : [], buildingSlots: house.buildingSlots || [] }, "");

      await doc.unsetFlag(FLAG_SCOPE, HOUSE_KEY);
      await doc.setFlag(FLAG_SCOPE, HOUSE_KEY, updatedHouse);
      repaired++;
      rows.push(`<li><strong>${escapeHtml(entry.tile.name || "Unnamed Tile")}</strong>: ${escapeHtml(cleanStockText || "No stockpile")}</li>`);
    }

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Economy" }),
      content: `<h2>Economy Data Repaired</h2><p><strong>Tiles checked:</strong> ${escapeHtml(checked)}</p><p><strong>Tiles repaired:</strong> ${escapeHtml(repaired)}</p><ul>${rows.join("") || "<li>No malformed resource records found.</li>"}</ul>`
    });

    ui.notifications.info(`Economy repair complete. Tiles repaired: ${repaired}.`);
  }


  async function manageMarketForces() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can manage market forces."); return; }

    const clock = getClock() || { season: "Spring" };
    const currentSeason = String(clock.season || "Spring");
    const forces = getMarketForces();
    const seasons = Object.keys(forces);
    const seasonOptions = seasons.map(season => `<option value="${escapeHtml(season)}" ${season === currentSeason ? "selected" : ""}>${escapeHtml(season)}</option>`).join("");

    const result = await new Promise(resolve => {
      new Dialog({
        title: "Manage Market Forces",
        content: `<form>
          <p>These multipliers modify trade-good output by category. Use one number for both Gold/Food, or two values as <code>gold, food</code>.</p>
          <div class="form-group">
            <label>Season</label>
            <select name="season" style="width:100%;">${seasonOptions}</select>
          </div>
          <div class="form-group">
            <label><strong>Category Multipliers</strong></label>
            <textarea name="marketForces" rows="12" style="width:100%;">${escapeHtml(marketForcesToText(forces, currentSeason))}</textarea>
            <p class="notes">Example: Grains & Field Crops: 1.25, 1.5 means +25% gold value and +50% food value for that category.</p>
          </div>
          <div class="form-group">
            <label><input type="checkbox" name="resetAll"> Reset all categories/seasons to 1</label>
          </div>
        </form>`,
        buttons: {
          save: { label: "Save Market Forces", callback: html => {
            const form = html[0].querySelector("form");
            resolve({
              season: String(form.season.value || currentSeason),
              marketForces: String(form.marketForces.value || ""),
              resetAll: form.resetAll.checked
            });
          } },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        render: html => {
          const form = html[0].querySelector("form");
          const seasonSelect = form.querySelector('[name="season"]');
          const textArea = form.querySelector('[name="marketForces"]');
          seasonSelect.addEventListener("change", () => {
            textArea.value = marketForcesToText(forces, seasonSelect.value);
          });
        },
        default: "save"
      }, { width: 700, height: 600, resizable: true }).render(true);
    });

    if (!result) return;
    const updated = result.resetAll ? getDefaultMarketForces() : parseMarketForcesText(result.marketForces, forces, result.season);
    await saveMarketForces(updated);
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Market" }),
      content: `<h2>Market Forces Updated</h2><p><strong>Season:</strong> ${escapeHtml(result.resetAll ? "All seasons reset" : result.season)}</p><pre style="white-space:pre-wrap;">${escapeHtml(result.resetAll ? marketForcesToText(updated, currentSeason) : marketForcesToText(updated, result.season))}</pre>`
    });
    ui.notifications.info("Market forces updated.");
  }

  async function manageTileEconomy() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can manage tile economy data."); return; }

    const selected = canvas.drawings.controlled;
    if (selected.length !== 1) { ui.notifications.warn("Select one world tile drawing first."); return; }

    const drawing = selected[0];
    const doc = drawing.document;
    const worldTile = getWorldTile(drawing);
    if (!worldTile) { ui.notifications.warn("This drawing is not a World Tile."); return; }

    const house = foundry.utils.deepClone(doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {});
    const stockpile = getHouseResourceStockpile(house);
    const income = getHouseResourceIncome(house);
    const breakdown = getTileEconomyBreakdownText(house, getClock());
    const goods = getHouseTradeGoods(house);

    const result = await new Promise(resolve => {
      new Dialog({
        title: `Economy — ${worldTile.name || "World Tile"}`,
        content: `<form>
          <div style="padding:8px;margin-bottom:10px;border:1px solid #777;border-radius:6px;">
            <strong>Tile:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}<br>
            <strong>House:</strong> ${escapeHtml(house.house || worldTile.owner || "None")}<br>
            <strong>Trade Goods:</strong> ${escapeHtml(tradeGoodSummaryText(house))}<br>
            <strong>Development Bonus:</strong> ${escapeHtml(breakdown.trade.development.label)} — Gold ${escapeHtml(breakdown.trade.development.gold)}, Food ${escapeHtml(breakdown.trade.development.food)}<br>
            <strong>Current round total income estimate:</strong> ${escapeHtml(breakdown.totalText)}
          </div>

          <div class="form-group">
            <label><input type="checkbox" name="economyEnabled" ${isEconomyEnabled(house) ? "checked" : ""}> Enable economy and resource costs for this tile</label>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div class="form-group">
              <label><strong>Primary Trade Good</strong></label>
              <select name="primaryTradeGood" style="width:100%;">${buildTradeGoodOptions(goods.primary?.name || house.primaryExport || "")}</select>
            </div>
            <div class="form-group">
              <label><strong>Secondary Trade Good</strong></label>
              <select name="secondaryTradeGood" style="width:100%;">${buildTradeGoodOptions(goods.secondary?.name || house.secondaryExport || "")}</select>
            </div>
          </div>

          <div class="form-group">
            <label><strong>Manual Base Resource Income Each Round</strong></label>
            <textarea name="resourceIncome" rows="3" style="width:100%;">${escapeHtml(resourceMapToText(income, ""))}</textarea>
            <p class="notes">Optional. Format: Gold: 2; Food: 1; Wool: 1. Trade goods and buildings are added automatically.</p>
          </div>

          <div class="form-group">
            <label><strong>Current Resource Stockpile</strong></label>
            <textarea name="resourceStockpile" rows="4" style="width:100%;">${escapeHtml(resourceMapToText(stockpile, ""))}</textarea>
            <p class="notes">Gold is mirrored into the old Treasury field for compatibility.</p>
          </div>

          <div class="form-group">
            <label><strong>Add / Subtract Stockpile Now</strong></label>
            <input type="text" name="resourceDelta" style="width:100%;" placeholder="Gold: -2; Food: 3" />
          </div>
        </form>`,
        buttons: {
          save: { label: "Save Economy", callback: html => {
            const form = html[0].querySelector("form");
            resolve({
              economyEnabled: form.economyEnabled.checked,
              primaryTradeGood: String(form.primaryTradeGood.value || ""),
              secondaryTradeGood: String(form.secondaryTradeGood.value || ""),
              resourceIncome: String(form.resourceIncome.value || ""),
              resourceStockpile: String(form.resourceStockpile.value || ""),
              resourceDelta: String(form.resourceDelta.value || "")
            });
          } },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "save"
      }, { width: 760, height: 690, resizable: true }).render(true);
    });

    if (!result) return;

    const updatedHouse = foundry.utils.deepClone(house);
    updatedHouse.economyEnabled = result.economyEnabled;
    setHouseTradeGoods(updatedHouse, result.primaryTradeGood, result.secondaryTradeGood);
    const cleanManualIncome = normalizeResourceMap(result.resourceIncome);
    updatedHouse.manualResourceIncome = cleanManualIncome;
    updatedHouse.manualResourceIncomeCleared = !hasAnyResources(cleanManualIncome);
    // Remove old legacy/manual fields that can refill the dialog after the user clears Manual Base Income.
    deleteLegacyManualIncomeFields(updatedHouse);
    updatedHouse.resourceStockpile = addResourceMaps(normalizeResourceMap(result.resourceStockpile), normalizeResourceMap(result.resourceDelta));
    if (updatedHouse.resourceStockpile.Gold !== undefined) updatedHouse.treasury = updatedHouse.resourceStockpile.Gold;
    updatedHouse.resourceUpdatedAt = new Date().toISOString();
    updatedHouse.resourceUpdatedBy = game.user.name;
    updatedHouse.version = `Crown Overview Tools ${MODULE_VERSION}`;
    syncTreasuryFromResources(updatedHouse);

    await doc.unsetFlag(FLAG_SCOPE, HOUSE_KEY);
    await doc.setFlag(FLAG_SCOPE, HOUSE_KEY, updatedHouse);

    const updatedBreakdown = getTileEconomyBreakdownText(updatedHouse, getClock());
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ alias: "Crown Economy" }),
      content: `<h2>Tile Economy Updated</h2><p><strong>Tile:</strong> ${escapeHtml(worldTile.name || "Unnamed Tile")}</p><p><strong>Trade Goods:</strong> ${escapeHtml(tradeGoodSummaryText(updatedHouse))}</p><p><strong>Manual Base Income:</strong> ${escapeHtml(resourceMapToText(updatedHouse.manualResourceIncome))}</p><p><strong>Current Total Income:</strong> ${escapeHtml(updatedBreakdown.totalText)}</p><p><strong>Stockpile:</strong> ${escapeHtml(resourceMapToText(updatedHouse.resourceStockpile))}</p><p><strong>Economy Enabled:</strong> ${updatedHouse.economyEnabled ? "Yes" : "No"}</p>`
    });

    ui.notifications.info(`Economy updated for ${worldTile.name || "selected tile"}.`);
  }

  function getEconomyTilesForScope(scope, userId = "") {
    let entries = getWorldTileEntries().map(entry => ({ ...entry, house: getHouseData(entry.drawing) ?? {} }));

    if (scope === "selected") {
      const selectedIds = new Set(canvas.drawings.controlled.map(d => d.document.id));
      entries = entries.filter(entry => selectedIds.has(entry.drawing.document.id));
    }

    if (scope === "player") {
      entries = entries.filter(entry => String(getTileOwnerUserId(entry.tile, entry.house) || "") === String(userId || ""));
    }

    return entries;
  }

  function getForceOwnerId(piece = {}) {
    return String(piece.ownerUserId || piece.playerOwnerUserId || piece.requesterUserId || "").trim();
  }

  function getForceOwnerName(piece = {}) {
    return String(piece.ownerUserName || piece.playerOwnerUserName || piece.requesterUserName || "").trim();
  }

  function getMilitaryForceUpkeep(piece = {}) {
    const type = normalize(piece.pieceType || piece.forceType || "");
    if (type === "fleet" || type === "navy") return hasAnyResources(piece.upkeep) ? normalizeResourceMap(piece.upkeep) : calculateNavyUpkeep(getNavyComposition(piece));
    if (type === "army") return hasAnyResources(piece.upkeep) ? normalizeResourceMap(piece.upkeep) : calculateArmyUpkeep(getArmyComposition(piece));
    return {};
  }

  function isActiveMilitaryForceForUpkeep(token) {
    const piece = getWorldPiece(token) || {};
    const type = normalize(piece.pieceType || piece.forceType || "");
    if (!['army', 'fleet', 'navy'].includes(type)) return false;
    if (normalize(piece.status || '') === 'dismissed') return false;
    if (Number(piece.strengthCurrent ?? piece.totalStrength ?? 1) <= 0) return false;
    return hasAnyResources(getMilitaryForceUpkeep(piece));
  }

  async function applyResourceDeltaToTile(entry, deltaMap, reason = "Resource adjustment") {
    if (!entry?.drawing?.document) return {};
    const house = foundry.utils.deepClone(getHouseData(entry.drawing) || {});
    const stockpile = addResourceMaps(getHouseResourceStockpile(house), deltaMap);
    house.resourceStockpile = stockpile;
    house.resourceUpdatedAt = new Date().toISOString();
    house.resourceUpdatedBy = game.user.name;
    house.resourceUpdatedReason = reason;
    syncTreasuryFromResources(house);
    await entry.drawing.document.unsetFlag(FLAG_SCOPE, HOUSE_KEY);
    await entry.drawing.document.setFlag(FLAG_SCOPE, HOUSE_KEY, house);
    return stockpile;
  }

  async function debitMilitaryUpkeepForRound(clock = getClock(), { scope = "all", userId = "", silent = false } = {}) {
    const includeUpkeep = scope === "all" || scope === "player";
    if (!includeUpkeep) return { applied: 0, totals: {}, lines: [], skipped: true };

    const ownerFilter = scope === "player" ? String(userId || "").trim() : "";
    const forces = getMilitaryForceTokens().filter(isActiveMilitaryForceForUpkeep).filter(token => {
      if (!ownerFilter) return true;
      return String(getForceOwnerId(getWorldPiece(token) || "")) === ownerFilter;
    });

    let totals = {};
    const ownerCosts = new Map();
    const lines = [];

    for (const token of forces) {
      const piece = getWorldPiece(token) || {};
      const upkeep = getMilitaryForceUpkeep(piece);
      if (!hasAnyResources(upkeep)) continue;
      const ownerId = getForceOwnerId(piece);
      const ownerName = getForceOwnerName(piece) || game.users.get(ownerId)?.name || "Unassigned";
      if (!ownerCosts.has(ownerId || ownerName)) ownerCosts.set(ownerId || ownerName, { ownerId, ownerName, cost: {}, forceLines: [] });
      const bucket = ownerCosts.get(ownerId || ownerName);
      bucket.cost = addResourceMaps(bucket.cost, upkeep);
      bucket.forceLines.push(`${piece.name || token.document.name}: ${resourceMapToText(upkeep)}`);
      totals = addResourceMaps(totals, upkeep);
    }

    let applied = 0;
    const failed = [];

    for (const bucket of ownerCosts.values()) {
      const entries = getEconomyTilesForScope("player", bucket.ownerId).filter(entry => !isSeaByTile(entry.tile));
      const treasuryEntry = entries.find(entry => isEconomyEnabled(getHouseData(entry.drawing) || {})) || entries[0];
      if (!treasuryEntry) {
        failed.push(`${bucket.ownerName || bucket.ownerId || "Unknown"}: no controlled tile stockpile found for ${resourceMapToText(bucket.cost)}`);
        continue;
      }
      const negativeCost = {};
      for (const [key, value] of Object.entries(normalizeResourceMap(bucket.cost))) negativeCost[key] = -Number(value || 0);
      await applyResourceDeltaToTile(treasuryEntry, negativeCost, `Military upkeep for ${getDateLabel(clock)}`);
      applied++;
      lines.push(`<li><strong>${escapeHtml(bucket.ownerName || bucket.ownerId || "Unknown")}</strong>: -${escapeHtml(resourceMapToText(bucket.cost))} from ${escapeHtml(getTileName(treasuryEntry))}<br><span style="opacity:0.85;">${bucket.forceLines.map(escapeHtml).join("; ")}</span></li>`);
    }

    for (const line of failed) lines.push(`<li><strong>Unpaid:</strong> ${escapeHtml(line)}</li>`);
    if (!silent && lines.length) ui.notifications.info(`Military upkeep applied: ${resourceMapToText(totals)}.`);
    return { applied, totals, lines, failed, skipped: false };
  }

  async function collectEconomyForRound(clock = getClock(), { scope = "all", userId = "", force = false, silent = false } = {}) {
    if (!clock) throw new Error("World Round Clock is not initialized.");

    const roundKey = getRoundKey(clock);
    const dateLabel = getDateLabel(clock);
    const ledger = foundry.utils.deepClone(getEconomyLedger());
    const ledgerKey = `${roundKey}|${scope}|${userId || "all"}`;

    if (!force && ledger[ledgerKey]?.collected) {
      if (!silent) ui.notifications.warn(`Economy has already been collected for ${dateLabel}. Use Force collect if this is a test/correction.`);
      return { applied: 0, skipped: true, totals: {}, dateLabel };
    }

    const entries = getEconomyTilesForScope(scope, userId);
    const seasonMultiplier = getGeneralMarketMultiplierText(clock);
    let applied = 0;
    let totals = {};
    const lines = [];

    for (const entry of entries) {
      const doc = entry.drawing.document;
      const house = foundry.utils.deepClone(doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {});
      if (!isEconomyEnabled(house)) continue;

      const income = getTileTotalIncome(house, clock);
      if (!hasAnyResources(income)) continue;

      const stockpile = addResourceIncomeToStockpile(getHouseResourceStockpile(house), income);
      const cleanManualIncome = getHouseResourceIncome(house);
      house.resourceStockpile = stockpile;
      house.manualResourceIncome = cleanManualIncome;
      house.manualResourceIncomeCleared = !hasAnyResources(cleanManualIncome);
      deleteLegacyManualIncomeFields(house);
      house.lastEconomyCollectedRoundKey = roundKey;
      house.lastEconomyCollectedDateLabel = dateLabel;
      house.lastEconomyCollectedAt = new Date().toISOString();
      house.lastEconomyCollectedBy = game.user.name;
      syncTreasuryFromResources(house);

      await doc.unsetFlag(FLAG_SCOPE, HOUSE_KEY);
      await doc.setFlag(FLAG_SCOPE, HOUSE_KEY, house);

      totals = addResourceMaps(totals, income);
      applied++;
      lines.push(`<li><strong>${escapeHtml(entry.tile.name || "Unnamed Tile")}</strong>: +${escapeHtml(resourceMapToText(income))}</li>`);
    }

    const upkeepSummary = await debitMilitaryUpkeepForRound(clock, { scope, userId, silent: true });

    ledger[ledgerKey] = {
      collected: true,
      scope,
      userId: userId || "",
      roundKey,
      dateLabel,
      season: clock.season || "Spring",
      seasonMultiplier,
      applied,
      totals,
      militaryUpkeep: upkeepSummary.totals || {},
      upkeepApplied: upkeepSummary.applied || 0,
      collectedAt: new Date().toISOString(),
      collectedBy: game.user.name
    };
    await saveEconomyLedger(ledger);

    if (!silent) {
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ alias: "Crown Economy" }),
        content: `<h2>Economy Collected</h2><p><strong>Date:</strong> ${escapeHtml(dateLabel)}</p><p><strong>Season Multiplier:</strong> ${escapeHtml(seasonMultiplier)}</p><p><strong>Tiles Paid:</strong> ${escapeHtml(applied)}</p><p><strong>Total Income:</strong> ${escapeHtml(resourceMapToText(totals))}</p><ul>${lines.join("") || "<li>No economy-enabled tiles produced resources.</li>"}</ul><h3>Military Upkeep</h3><p><strong>Total Upkeep:</strong> ${escapeHtml(resourceMapToText(upkeepSummary.totals || {}, "None"))}</p><ul>${(upkeepSummary.lines || []).join("") || "<li>No active armies or navies charged upkeep for this scope.</li>"}</ul>`
      });
      ui.notifications.info(`Economy collected for ${dateLabel}: ${resourceMapToText(totals)}.`);
    }

    return { applied, skipped: false, totals, militaryUpkeep: upkeepSummary.totals || {}, upkeepApplied: upkeepSummary.applied || 0, dateLabel };
  }

  async function collectEconomy() {
    if (!requireOverviewScene()) return;
    if (!game.user.isGM) { ui.notifications.warn("Only the GM can collect economy."); return; }

    const players = getPlayerUsers();
    const playerOptions = players.map(user => `<option value="${escapeHtml(user.id)}">${escapeHtml(user.name)}</option>`).join("");

    const result = await new Promise(resolve => {
      new Dialog({
        title: "Collect Economy",
        content: `<form>
          <p>Collect resource income into tile stockpiles for the current world round. All/player scopes also charge active army and navy upkeep once for the round.</p>
          <div class="form-group">
            <label>Scope</label>
            <select name="scope" style="width:100%;">
              <option value="all">All economy-enabled tiles</option>
              <option value="selected">Selected tile drawings only</option>
              <option value="player">One player's holdings</option>
            </select>
          </div>
          <div class="form-group">
            <label>Player, if using player scope</label>
            <select name="userId" style="width:100%;">${playerOptions}</select>
          </div>
          <div class="form-group">
            <label><input type="checkbox" name="force"> Force collect again for this round</label>
          </div>
        </form>`,
        buttons: {
          collect: { label: "Collect", callback: html => {
            const form = html[0].querySelector("form");
            resolve({ scope: String(form.scope.value || "all"), userId: String(form.userId.value || ""), force: form.force.checked });
          } },
          cancel: { label: "Cancel", callback: () => resolve(null) }
        },
        default: "collect"
      }, { width: 560, height: 370, resizable: true }).render(true);
    });

    if (!result) return;
    await collectEconomyForRound(getClock(), result);
  }

  async function exportRealm() {
    if (!requireOverviewScene()) return;
    const rows = [];
    for (const drawing of canvas.drawings.placeables) {
      const doc = drawing.document;
      const worldTile = doc.getFlag(FLAG_SCOPE, WORLD_TILE_KEY);
      if (!worldTile) continue;
      const house = doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {};
      const buildings = Array.isArray(house.builtBuildings) ? house.builtBuildings : [];
      const developmentLevel = Math.min(buildings.length, 4);
      rows.push({
        province: worldTile.name ?? "",
        drawingId: doc.id,
        region: house.region || worldTile.region || "",
        tileType: worldTile.tileType ?? "",
        terrain: worldTile.terrainLabel || worldTile.terrainKey || "",
        movementCost: worldTile.movementCost ?? "",
        house: house.house || worldTile.owner || "",
        lord: house.lord ?? "",
        culture: house.culture ?? "",
        developmentLevel,
        developmentType: DEVELOPMENT_LEVELS[developmentLevel]?.label ?? "Ruins",
        population: house.population ?? "",
        treasury: house.treasury ?? "",
        resourceIncome: resourceMapToText(getHouseResourceIncome(house), ""),
        resourceStockpile: resourceMapToText(getHouseResourceStockpile(house), ""),
        economyEnabled: isEconomyEnabled(house) ? "Yes" : "No",
        primaryTradeGood: getHouseTradeGoods(house).primary?.name || "",
        primaryTradeCategory: getHouseTradeGoods(house).primary?.category || "",
        primaryTradeGoldValue: getHouseTradeGoods(house).primary?.goldValue ?? "",
        primaryTradeFoodValue: getHouseTradeGoods(house).primary?.foodValue ?? "",
        secondaryTradeGood: getHouseTradeGoods(house).secondary?.name || "",
        secondaryTradeCategory: getHouseTradeGoods(house).secondary?.category || "",
        secondaryTradeGoldValue: getHouseTradeGoods(house).secondary?.goldValue ?? "",
        secondaryTradeFoodValue: getHouseTradeGoods(house).secondary?.foodValue ?? "",
        tradeFinalGoldValue: getTradeGoodIncomeBreakdown(house, getClock()).gold,
        tradeFinalFoodValue: getTradeGoodIncomeBreakdown(house, getClock()).food,
        developmentGoldBonus: getDevelopmentEconomyBonus(house, getClock()).gold,
        developmentFoodBonus: getDevelopmentEconomyBonus(house, getClock()).food,
        buildingData: JSON.stringify(Array.isArray(house.buildingData) ? house.buildingData : []),
        primaryExport: house.primaryExport || house.exports || "",
        secondaryExport: house.secondaryExport ?? "",
        allegiance: house.allegiance ?? "",
        builtBuildings: buildings.join("; "),
        buildingCount: buildings.length,
        adjacentTiles: Array.isArray(worldTile.adjacentTileNames) ? worldTile.adjacentTileNames.join("; ") : "",
        worldTileOwner: worldTile.owner ?? "",
        tileAssignedBy: worldTile.assignedBy ?? "",
        houseUpdatedBy: house.updatedBy ?? "",
        houseUpdatedAt: house.updatedAt ?? ""
      });
    }
    if (!rows.length) { ui.notifications.warn("No World Tiles were found on this scene."); return; }
    rows.sort((a, b) => String(a.region).localeCompare(String(b.region)) || String(a.province).localeCompare(String(b.province)));
    const columns = [
      ["Province / Tile", "province"], ["Drawing ID", "drawingId"], ["Region / Kingdom", "region"], ["Tile Type", "tileType"], ["Terrain", "terrain"], ["Movement Cost", "movementCost"], ["House", "house"], ["Lord / Ruler", "lord"], ["Culture", "culture"], ["Development Level", "developmentLevel"], ["Development Type", "developmentType"], ["Population", "population"], ["Treasury", "treasury"], ["Resource Income", "resourceIncome"], ["Resource Stockpile", "resourceStockpile"], ["Economy Enabled", "economyEnabled"], ["Primary Trade Good", "primaryTradeGood"], ["Primary Trade Category", "primaryTradeCategory"], ["Primary Trade Gold Value", "primaryTradeGoldValue"], ["Primary Trade Food Value", "primaryTradeFoodValue"], ["Secondary Trade Good", "secondaryTradeGood"], ["Secondary Trade Category", "secondaryTradeCategory"], ["Secondary Trade Gold Value", "secondaryTradeGoldValue"], ["Secondary Trade Food Value", "secondaryTradeFoodValue"], ["Trade Final Gold Value", "tradeFinalGoldValue"], ["Trade Final Food Value", "tradeFinalFoodValue"], ["Development Gold Bonus", "developmentGoldBonus"], ["Development Food Bonus", "developmentFoodBonus"], ["Building Data", "buildingData"], ["Primary Export", "primaryExport"], ["Secondary Export", "secondaryExport"], ["Allegiance", "allegiance"], ["Built Buildings", "builtBuildings"], ["Building Count", "buildingCount"], ["Adjacent Tiles", "adjacentTiles"], ["World Tile Owner", "worldTileOwner"], ["Tile Assigned By", "tileAssignedBy"], ["House Updated By", "houseUpdatedBy"], ["House Updated At", "houseUpdatedAt"]
    ];
    let csv = "\uFEFF" + columns.map(column => csvEscape(column[0])).join(",") + "\r\n";
    for (const row of rows) csv += columns.map(column => csvEscape(row[column[1]])).join(",") + "\r\n";
    const filename = `Crown_of_Ashes_${safeFilename(canvas.scene?.name || "World_Map")}_Realm_Data.csv`;
    saveDataToFile(csv, "text/csv;charset=utf-8", filename);
    ui.notifications.info(`Exported ${rows.length} world tiles and ${rows.filter(row => row.house).length} Houses.`);
  }

  async function importRealm() {
    if (!requireOverviewScene()) return;
    const file = await new Promise(resolve => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".csv,text/csv";
      input.addEventListener("change", () => resolve(input.files?.length ? input.files[0] : null));
      input.click();
    });
    if (!file) { ui.notifications.warn("No CSV file selected."); return; }
    let text = await file.text();
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
    const csvRows = parseCSV(text);
    if (csvRows.length < 2) { ui.notifications.error("This CSV contains no data rows."); return; }
    const headers = csvRows[0].map(header => String(header).trim());
    const getColumn = (row, name) => { const index = headers.indexOf(name); return index === -1 ? "" : row[index] ?? ""; };
    if (!headers.includes("Drawing ID")) { ui.notifications.error('The CSV is missing the required "Drawing ID" column.'); return; }
    const updates = [], missing = [], invalidBuildings = [], skipped = [];
    for (let i = 1; i < csvRows.length; i++) {
      const row = csvRows[i];
      const drawingId = String(getColumn(row, "Drawing ID")).trim();
      if (!drawingId) { skipped.push(i + 1); continue; }
      let drawing = canvas.drawings.placeables.find(drawing => drawing.document.id === drawingId);
      if (!drawing) {
        const provinceName = normalize(getColumn(row, "Province / Tile"));
        drawing = canvas.drawings.placeables.find(drawing => normalize(drawing.document.getFlag(FLAG_SCOPE, WORLD_TILE_KEY)?.name) === provinceName);
      }
      if (!drawing) { missing.push(drawingId || getColumn(row, "Province / Tile")); continue; }
      const doc = drawing.document;
      const existingWorld = doc.getFlag(FLAG_SCOPE, WORLD_TILE_KEY) ?? {};
      const existingHouse = doc.getFlag(FLAG_SCOPE, HOUSE_KEY) ?? {};
      const buildings = splitList(getColumn(row, "Built Buildings"));
      if (buildings.length > 4) { invalidBuildings.push({ row: i + 1, tile: getColumn(row, "Province / Tile"), count: buildings.length }); continue; }
      const developmentLevel = buildings.length;
      const developmentLabel = DEVELOPMENT_LEVELS[developmentLevel].label;
      let population = cleanNumber(getColumn(row, "Population"));
      if (population === "") population = randomPopulation(developmentLevel);
      const updatedWorld = {
        ...existingWorld,
        name: String(getColumn(row, "Province / Tile")).trim(),
        region: String(getColumn(row, "Region / Kingdom")).trim(),
        tileType: String(getColumn(row, "Tile Type")).trim(),
        terrainLabel: String(getColumn(row, "Terrain")).trim(),
        movementCost: cleanNumber(getColumn(row, "Movement Cost")),
        owner: String(getColumn(row, "World Tile Owner")).trim(),
        adjacentTileNames: splitList(getColumn(row, "Adjacent Tiles"))
      };
      const updatedHouse = {
        ...existingHouse,
        house: String(getColumn(row, "House")).trim(),
        lord: String(getColumn(row, "Lord / Ruler")).trim(),
        region: String(getColumn(row, "Region / Kingdom")).trim(),
        culture: String(getColumn(row, "Culture")).trim(),
        developmentLevel,
        developmentLabel,
        population,
        treasury: cleanNumber(getColumn(row, "Treasury")),
        manualResourceIncome: normalizeResourceMap(getColumn(row, "Resource Income")),
        manualResourceIncomeCleared: !hasAnyResources(normalizeResourceMap(getColumn(row, "Resource Income"))),
        resourceStockpile: normalizeResourceMap(getColumn(row, "Resource Stockpile")),
        economyEnabled: normalize(getColumn(row, "Economy Enabled")) === "yes" || normalize(getColumn(row, "Economy Enabled")) === "true",
        buildingData: (() => { try { const value = getColumn(row, "Building Data"); return value ? JSON.parse(value) : (Array.isArray(existingHouse.buildingData) ? existingHouse.buildingData : []); } catch (_) { return Array.isArray(existingHouse.buildingData) ? existingHouse.buildingData : []; } })(),
        primaryExport: String(getColumn(row, "Primary Export") || getColumn(row, "Primary Trade Good")).trim(),
        secondaryExport: String(getColumn(row, "Secondary Export") || getColumn(row, "Secondary Trade Good")).trim(),
        allegiance: String(getColumn(row, "Allegiance")).trim(),
        builtBuildings: buildings,
        worldTileId: drawingId,
        worldTileName: String(getColumn(row, "Province / Tile")).trim(),
        version: `Crown Overview Tools ${MODULE_VERSION}`,
        updatedAt: new Date().toISOString(),
        updatedBy: game.user.name
      };
      setHouseTradeGoods(updatedHouse, getColumn(row, "Primary Trade Good") || updatedHouse.primaryExport, getColumn(row, "Secondary Trade Good") || updatedHouse.secondaryExport);
      updatedHouse.buildingSlots = getBuildingSlotsAfterCatalogChange({ builtBuildings: buildings, buildingSlots: existingHouse.buildingSlots || [] }, "");
      delete updatedHouse.resourceIncome;
      delete updatedHouse.resourcesIncome;
      delete updatedHouse.naturalResources;
      delete updatedHouse.resourceProduction;
      syncTreasuryFromResources(updatedHouse);
      updates.push({ doc, world: updatedWorld, house: updatedHouse });
    }
    let summaryHtml = `<h2>Realm Import</h2><p><strong>${updates.length}</strong> world tiles are ready to update.</p>`;
    if (missing.length) summaryHtml += `<p><strong>${missing.length}</strong> Drawing IDs could not be found.</p>`;
    if (invalidBuildings.length) summaryHtml += `<p style="color:#ff7777;"><strong>${invalidBuildings.length}</strong> rows contain more than 4 buildings and will NOT be imported.</p><ul>${invalidBuildings.map(invalid => `<li>${escapeHtml(invalid.tile || "Unknown Tile")} — ${invalid.count} buildings</li>`).join("")}</ul>`;
    if (skipped.length) summaryHtml += `<p><strong>${skipped.length}</strong> rows had no Drawing ID and were skipped.</p>`;
    summaryHtml += `<hr><p>Development will automatically be calculated from the number of buildings. Drawing IDs will not be changed.</p>`;
    const confirmed = await Dialog.confirm({ title: "Import Crown of Ashes Realm", content: summaryHtml, yes: () => true, no: () => false, defaultYes: false });
    if (!confirmed) { ui.notifications.warn("Realm import cancelled."); return; }
    let updatedCount = 0, failedCount = 0;
    for (const update of updates) {
      try {
        await update.doc.setFlag(FLAG_SCOPE, WORLD_TILE_KEY, update.world);
        await update.doc.unsetFlag(FLAG_SCOPE, HOUSE_KEY);
        await update.doc.setFlag(FLAG_SCOPE, HOUSE_KEY, update.house);
        try { await update.doc.update({ text: update.world.name }); } catch (err) { console.warn("Could not update Drawing label:", update.doc.id, err); }
        updatedCount++;
      } catch (err) { failedCount++; console.error("Failed to import Drawing:", update.doc.id, err); }
    }
    ui.notifications.info(`Realm import complete — ${updatedCount} updated, ${failedCount} failed.`);
  }

  function isCrownOverviewToken(token) {
    return Boolean(getWorldPiece(token)) || isCharacterToken(token);
  }

  function getSpreadOffsetForIndex(index, count, gridSize) {
    if (count <= 1) return { x: 0, y: 0 };
    if (count === 2) return { x: (index === 0 ? -0.45 : 0.45) * gridSize, y: 0 };
    if (count === 3) {
      const pattern = [
        { x: 0, y: -0.55 * gridSize },
        { x: -0.55 * gridSize, y: 0.45 * gridSize },
        { x: 0.55 * gridSize, y: 0.45 * gridSize }
      ];
      return pattern[index] || { x: 0, y: 0 };
    }
    const radius = gridSize * Math.max(0.65, Math.min(1.65, count / 5));
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / count;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
  }

  function getSpreadTileEntryForToken(token) {
    const piece = getWorldPiece(token) || {};
    return getCurrentTileEntryForToken(token, piece) || (piece.currentTileId ? getTileById(piece.currentTileId) : null);
  }

  function getSpreadTileIdForToken(token) {
    const entry = getSpreadTileEntryForToken(token);
    if (entry) return getTileId(entry);
    const piece = getWorldPiece(token) || {};
    const character = getWorldCharacter(token) || {};
    return String(piece.currentTileId || character.currentTileId || "").trim();
  }

  function syncTokenLocationFlags(token, entry) {
    if (!token || !entry) return Promise.resolve();
    const tileId = getTileId(entry);
    const tileName = getTileName(entry);
    const region = entry.tile?.region || "";
    const tasks = [];

    const piece = foundry.utils.deepClone(getWorldPiece(token) || {});
    if (Object.keys(piece).length) {
      piece.currentTileId = tileId;
      piece.currentTileName = tileName;
      piece.currentRegion = region;
      tasks.push(saveWorldPiece(token, piece));
    }

    const character = foundry.utils.deepClone(getWorldCharacter(token) || {});
    if (character.characterName || character.characterId) {
      character.currentTileId = tileId;
      character.currentTileName = tileName;
      character.currentRegion = region;
      tasks.push(token.document.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, character));
      if (token.actor) tasks.push(token.actor.setFlag(FLAG_SCOPE, WORLD_CHARACTER_KEY, foundry.utils.deepClone(character)));
    }

    return Promise.all(tasks);
  }

  async function spreadTokenGroup(tokens, entry = null) {
    const cleanTokens = Array.from(new Map(tokens.filter(Boolean).map(token => [token.document.id, token])).values());
    if (cleanTokens.length <= 1) return 0;

    cleanTokens.sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
    const gridSize = getGridSize();
    const center = entry ? getDrawingCenter(entry) : cleanTokens.reduce((acc, token) => {
      const point = getTokenCenter(token);
      acc.x += point.x;
      acc.y += point.y;
      return acc;
    }, { x: 0, y: 0 });

    if (!entry) {
      center.x = center.x / cleanTokens.length;
      center.y = center.y / cleanTokens.length;
    }

    const updates = cleanTokens.map((token, index) => {
      const offset = getSpreadOffsetForIndex(index, cleanTokens.length, gridSize);
      const topLeft = getTokenTopLeftForPoint(token, { x: center.x + offset.x, y: center.y + offset.y });
      return { _id: token.document.id, x: Math.round(topLeft.x), y: Math.round(topLeft.y) };
    });

    await canvas.scene.updateEmbeddedDocuments("Token", updates, {
      animate: false,
      crownSpreadSelected: true,
      bypassCrownMovementWatcher: true,
      bypassWorldMovementWatcher: true,
      worldMovementBypass: true,
      teleport: true
    });

    if (entry) {
      for (const token of cleanTokens) await syncTokenLocationFlags(token, entry);
    }

    return cleanTokens.length;
  }

  async function spreadSelectedForUser({ tokenIds = [], tileId = "", expandTile = false, actingUserId = game.user.id, actingUserName = game.user.name } = {}) {
    const actingUser = game.users.get(actingUserId) || { id: actingUserId, name: actingUserName, isGM: false };
    let targets = [];

    const ids = Array.isArray(tokenIds) ? tokenIds.map(id => String(id || "").trim()).filter(Boolean) : [];
    if (ids.length) {
      targets = ids.map(id => canvas.tokens.get(id)).filter(Boolean).filter(isCrownOverviewToken);
    }

    if (expandTile && tileId) {
      const targetEntry = getTileById(tileId);
      targets = canvas.tokens.placeables.filter(token => {
        if (!isCrownOverviewToken(token)) return false;
        if (!canUserControlWorldPieceForUser(token, getWorldPiece(token) || {}, actingUser)) return false;
        return String(getSpreadTileIdForToken(token) || "") === String(tileId || "");
      });
      if (!targets.length && ids.length) targets = ids.map(id => canvas.tokens.get(id)).filter(Boolean).filter(isCrownOverviewToken);
      return await spreadTokenGroup(targets, targetEntry);
    }

    targets = targets.filter(token => canUserControlWorldPieceForUser(token, getWorldPiece(token) || {}, actingUser));

    if (targets.length <= 1 && ids.length === 1) {
      const token = canvas.tokens.get(ids[0]);
      const inferredTileId = getSpreadTileIdForToken(token);
      if (inferredTileId) return await spreadSelectedForUser({ tokenIds: ids, tileId: inferredTileId, expandTile: true, actingUserId, actingUserName });
    }

    const groups = new Map();
    for (const token of targets) {
      const tokenTileId = getSpreadTileIdForToken(token) || "manual";
      if (!groups.has(tokenTileId)) groups.set(tokenTileId, []);
      groups.get(tokenTileId).push(token);
    }

    let moved = 0;
    for (const [groupTileId, groupTokens] of groups.entries()) {
      const entry = groupTileId !== "manual" ? getTileById(groupTileId) : null;
      moved += await spreadTokenGroup(groupTokens, entry);
    }
    return moved;
  }

  async function requestGmSpreadSelected({ tokenIds = [], tileId = "", expandTile = false } = {}) {
    const gm = game.users.find(user => user.isGM && user.active);
    if (!gm) throw new Error("A GM must be logged in to spread pieces safely.");
    game.socket.emit(SOCKET_NAME, {
      type: "spreadSelectedRequest",
      requesterUserId: game.user.id,
      requesterUserName: game.user.name,
      tokenIds,
      tileId,
      expandTile
    });
    ui.notifications.info(`Spread request sent to GM ${gm.name}.`);
  }

  async function spreadSelected() {
    if (!requireOverviewScene()) return;
    const selectedTokens = canvas.tokens.controlled.filter(isCrownOverviewToken);
    const selectedDrawings = canvas.drawings.controlled.filter(drawing => Boolean(getWorldTile(drawing)));

    let tokenIds = selectedTokens.map(token => token.document.id);
    let tileId = "";
    let expandTile = false;

    if (selectedTokens.length >= 2) {
      expandTile = false;
    } else if (selectedTokens.length === 1) {
      tileId = getSpreadTileIdForToken(selectedTokens[0]);
      expandTile = true;
    } else if (game.user.isGM && selectedDrawings.length === 1) {
      tileId = getTileId({ drawing: selectedDrawings[0], tile: getWorldTile(selectedDrawings[0]) });
      expandTile = true;
    } else {
      ui.notifications.warn("Select 2+ Crown pieces, one stacked Crown piece, or as GM select one tile drawing.");
      return;
    }

    try {
      let moved = 0;
      if (!game.user.isGM) {
        await requestGmSpreadSelected({ tokenIds, tileId, expandTile });
        return;
      }
      moved = await spreadSelectedForUser({ tokenIds, tileId, expandTile, actingUserId: game.user.id, actingUserName: game.user.name });
      if (moved <= 1) ui.notifications.info("Only one eligible Crown piece found, nothing to spread.");
      else ui.notifications.info(`Spread ${moved} Crown piece(s).`);
    } catch (err) {
      ui.notifications.error(err.message || "Spread Selected failed.");
      console.error("Spread Selected failed", err);
    }
  }

  async function handleSpreadSelectedRequest(message) {
    if (!game.user.isGM) return;
    try {
      const moved = await spreadSelectedForUser({
        tokenIds: message.tokenIds || [],
        tileId: message.tileId || "",
        expandTile: Boolean(message.expandTile),
        actingUserId: message.requesterUserId,
        actingUserName: message.requesterUserName
      });
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ alias: "Crown Overview" }),
        whisper: ChatMessage.getWhisperRecipients("GM").map(user => user.id),
        content: `<h2>Spread Selected</h2><p><strong>Player:</strong> ${escapeHtml(message.requesterUserName || "Unknown")}</p><p><strong>Moved:</strong> ${escapeHtml(moved)}</p>`
      });
    } catch (err) {
      ui.notifications.error(err.message || "Spread Selected request failed.");
      console.error("Spread Selected request failed", err, message);
    }
  }

  async function hideTileText() {
    if (!requireOverviewScene()) return;
    const tileDrawings = canvas.drawings.placeables.filter(drawing => Boolean(getWorldTile(drawing)) && !drawing.document.getFlag(FLAG_SCOPE, "worldTileLabel"));
    let updated = 0, failed = 0;
    for (const drawing of tileDrawings) {
      try {
        await drawing.document.update({ text: "", textAlpha: 0, fillAlpha: 0.001, strokeAlpha: 0.001, strokeWidth: 1, hidden: false });
        updated++;
      } catch (err) { console.warn("Failed to hide original tile label:", drawing.document.name, err); failed++; }
    }
    ui.notifications.info(`Hidden original world tile labels: ${updated}. Failed: ${failed}.`);
  }

  async function auditProvinceHouseData() {
    if (!game.user.isGM) { ui.notifications.warn("GM only."); return; }
    if (!requireOverviewScene()) return;
    const issues = [];
    let checked = 0;

    for (const entry of getWorldTileEntries()) {
      if (isSeaByTile(entry.tile)) continue;
      checked++;
      const worldTile = entry.tile || {};
      const house = getHouseData(entry.drawing) || {};
      const tileName = getTileName(entry);
      const houseName = String(house.house || "").trim();
      const tileHouse = String(worldTile.house || worldTile.owner || "").trim();
      const controllerId = String(getTileOwnerUserId(worldTile, house) || "").trim();
      const controllerName = String(getTileOwnerUserName(worldTile, house) || "").trim();
      const houseControllerId = String(house.ownerUserId || house.playerOwnerUserId || "").trim();
      const tileControllerId = String(worldTile.ownerUserId || worldTile.playerOwnerUserId || "").trim();
      const max = getProvinceManpowerMax(house);
      const current = getProvinceManpowerCurrent(house);
      const rawCurrent = numberOrBlank(house.manpowerCurrent);

      const tileIssues = [];
      if (!houseName && controllerId) tileIssues.push("player-controlled province has no House Data house name");
      if (houseName && tileHouse && normalize(houseName) !== normalize(tileHouse)) tileIssues.push(`House mismatch: House Data '${houseName}' vs World Tile '${tileHouse}'`);
      if (houseControllerId && tileControllerId && houseControllerId !== tileControllerId) tileIssues.push("controller mismatch between House Data and World Tile");
      if (normalize(worldTile.ownershipType || house.ownershipType || "") === "player" && !controllerId) tileIssues.push("marked Player-owned but has no controller user id");
      if (rawCurrent !== "" && (Number(rawCurrent) < 0 || Number(rawCurrent) > max)) tileIssues.push(`manpower out of bounds: raw ${rawCurrent}/${max} (effective ${current})`);
      if (numberOrBlank(house.manpowerMaxCached) !== "" && Number(house.manpowerMaxCached) !== max) tileIssues.push(`cached manpower max ${house.manpowerMaxCached} differs from calculated ${max}`);
      if (controllerId && !game.users.get(controllerId)) tileIssues.push(`controller user id '${controllerId}' is not a current Foundry user`);

      if (tileIssues.length) issues.push({ tileName, houseName: houseName || tileHouse || "—", controllerName: controllerName || "—", issues: tileIssues });
    }

    const content = issues.length
      ? `<p>Checked <strong>${escapeHtml(checked)}</strong> land provinces and found <strong>${escapeHtml(issues.length)}</strong> with possible data problems.</p><div style="max-height:520px;overflow-y:auto;">${issues.map(item => `<div style="border:1px solid #777;border-radius:5px;padding:8px;margin:6px 0;"><strong>${escapeHtml(item.tileName)}</strong> — ${escapeHtml(item.houseName)} / ${escapeHtml(item.controllerName)}<br>${item.issues.map(issue => `• ${escapeHtml(issue)}`).join("<br>")}</div>`).join("")}</div>`
      : `<p>Checked <strong>${escapeHtml(checked)}</strong> land provinces. No House/controller/manpower inconsistencies were detected.</p>`;

    new Dialog({ title: "Province / House Data Audit", content, buttons: { close: { label: "Close" } } }, { width: 760, height: "auto", resizable: true }).render(true);
    ui.notifications.info(issues.length ? `Province audit found ${issues.length} possible issue(s).` : `Province audit clean: ${checked} province(s) checked.`);
    return { checked, issues };
  }

  function startSceneFeatures() {
    updateDateBanner();
    renderPanel();
    startHover();
    startVisibility();
  }

  function stopSceneFeatures() {
    removeDateBanner();
    removePanel();
    stopHover();
    stopRouteTooltip(false);
    stopPieceTooltip(false);
    stopClickMove(false);
    clearLinkOverlay();
    stopVisibility();
  }

  function refreshSceneFeatures() {
    if (isOverviewScene()) startSceneFeatures();
    else stopSceneFeatures();
  }

  const API = {
    version: MODULE_VERSION,
    isOverviewScene,
    refresh: refreshSceneFeatures,
    start: startSceneFeatures,
    stop: stopSceneFeatures,
    pathMove,
    selectAssignedActorMenu,
    characterMoveMenu,
    spreadSelected,
    toggleClickMove,
    toggleRouteTooltip,
    togglePieceTooltip,
    portCrossing,
    buildOnCurrentTile,
    showHoldings,
    summonArmy,
    summonNavy,
    embarkArmy,
    disembarkArmy,
    diplomaticTakeover,
    siegeStorm,
    duel,
    resetMovement,
    resetBuildCapacity,
    repairBuildLocks,
    processPendingBuilds,
    roundClock,
    createPiece: createWorldPiece,
    createCharacter,
    editSelectedCharacter,
    importCharacterCsv,
    exportCharacterCsv,
    processArmyMusters,
    editSelectedArmy,
    dismissSelectedArmy,
    importTileOwnershipCsv,
    exportTileOwnershipCsv,
    linkTiles,
    unlinkTiles,
    viewLinks,
    togglePort,
    assignTileOwner,
    assignPieceOwner,
    editWorldPiece,
    assignHouse,
    setSelectedTerritoryNeutral,
    auditProvinceHouseData,
    manageTileEconomy,
    manageMarketForces,
    collectEconomy,
    repairEconomyData,
    collectEconomyForRound,
    exportRealm,
    importRealm,
    hideTileText,
    setSceneOverviewMode: async value => {
      await canvas.scene.setFlag(FLAG_SCOPE, SCENE_MODE_KEY, Boolean(value));
      refreshSceneFeatures();
    }
  };

  Hooks.once("init", () => {
    game.settings.register(MODULE_ID, "autoStart", {
      name: "Auto-start on Crown overview scenes",
      hint: "Automatically shows the date banner, panel, hover tooltip, and tile visibility on Crown of Ashes overview scenes.",
      scope: "client",
      config: true,
      type: Boolean,
      default: true
    });
  });

  Hooks.once("ready", () => {
    globalThis.CROWN_OVERVIEW_TOOLS = API;
    registerSocketHandlers();
    if (game.settings.get(MODULE_ID, "autoStart")) refreshSceneFeatures();
  });

  Hooks.on("canvasReady", () => {
    if (game.settings.get(MODULE_ID, "autoStart")) refreshSceneFeatures();
  });

  Hooks.on("updateScene", (scene, changes) => {
    if (scene.id === canvas.scene?.id && (changes.name !== undefined || changes.flags !== undefined)) {
      if (game.settings.get(MODULE_ID, "autoStart")) refreshSceneFeatures();
    }
  });
})();
