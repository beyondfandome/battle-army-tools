# Battle Army Tools v0.5.7

## Exclusive player reassignment fix
- Fixed **Assign Selected Units** so reassigning a battle unit removes its previous player ownership instead of merging another Owner entry into the token.
- The fix clears stale ownership from both the TokenDocument and the synthetic ActorDelta used by unlinked battle-unit tokens.
- **GM / Unassigned** now removes player ownership entirely instead of leaving previous controllers attached.
- Selected General tokens also replace ownership on their linked Commander Actor rather than accumulating controllers.
- Creating/updating commanders and Crown-imported commanders now use the same exclusive-ownership behavior.
- Team, alliance, formation, stats, position, movement state, and battle vision policy are unchanged by reassignment.

## Preserved systems
- Large-battle vision optimization (Generals/commanders only by default).
- Anchor-free Board Edge deployment and Crown army imports.
- Combat resolution and Undo Last Combat.
- Turn tracker and player End Turn.
- Commander management and Command Points.
- Movement restrictions, terrain, routing, abilities, HP bars, tactical Drawing visibility, battle reset/start positions, unit balance, and Crown integration.
- GitHub updater metadata.
