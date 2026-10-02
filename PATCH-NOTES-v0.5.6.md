# Battle Army Tools v0.5.6

## Large-battle vision optimization
- Added **Optimize Battle Vision** world setting, enabled by default.
- With optimization enabled, ordinary battle-unit tokens retain their Foundry player ownership/control but have token sight disabled.
- General/commander tokens remain vision sources and are enforced at vision range 8.
- Existing battle units are normalized to the selected vision policy when Battle Army Tools starts/restarts on a battle Scene.
- Newly deployed units and units reassigned with **Assign Selected Units** immediately follow the same policy.
- Turning the setting off restores the legacy behavior: player-owned ordinary battle units can provide token vision again.

This is intended for very large battles where hundreds of individually controlled troop tokens would otherwise create hundreds of Foundry perception/vision sources.

## Preserved systems
- Anchor-free Board Edge deployment and Crown army imports.
- Assign Selected Units bulk player control.
- Combat resolution and Undo Last Combat.
- Turn tracker and player End Turn.
- Commander management and Command Points.
- Movement restrictions, terrain, routing, abilities, HP bars, team tactical Drawing visibility, battle reset/start positions, unit balance, and Crown integration.
- GitHub updater metadata.
