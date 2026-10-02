# Battle Army Tools v0.5.8

## Foundry v14 ownership validation fix
- Fixed the red `SchemaField#_updateDiff ownership` validation error triggered by **Assign Selected Units** in v0.5.7.
- Foundry v14 validates synthetic ActorDelta ownership maps before nested `-=` deletion entries are applied; the previous cleanup method therefore produced an invalid `null` permission value.
- Reassignment now clears every previous player controller by setting that user's permission to Foundry's valid **NONE** level, then assigns the selected player **OWNER**.
- The same safe exclusive-control update is used for battle-unit tokens, synthetic ActorDelta ownership, legacy actorData ownership when present, and linked Commander Actors.
- **GM / Unassigned** sets all prior player controllers to NONE.
- This changes effective control only; team, alliance, formation, stats, position, movement state, and vision policy remain unchanged.

## Preserved systems
- Large-battle vision optimization (Generals/commanders only by default).
- Anchor-free Board Edge deployment and Crown army imports.
- Assign Selected Units bulk player control.
- Combat resolution and Undo Last Combat.
- Turn tracker and player End Turn.
- Commander management and Command Points.
- Movement restrictions, terrain, routing, abilities, HP bars, tactical Drawing visibility, battle reset/start positions, unit balance, and Crown integration.
- GitHub updater metadata.
