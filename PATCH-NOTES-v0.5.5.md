# Battle Army Tools v0.5.5

## Board-edge deployment
- **Deploy Units** now supports either the existing selected-token anchor or **Board Edge** deployment.
- Board Edge deployment requires no anchor token.
- Choose Top, Bottom, Left, or Right and a position along that edge from 0–100%.
- Formations are oriented along the chosen edge and grow inward onto the battlefield.
- The formation is shifted as a group when necessary to keep it inside the playable Scene instead of collapsing units onto one square.
- Crown army import exposes the same Anchor / Board Edge deployment choice.
- Existing anchor deployment remains available and unchanged by default.

## Assign selected units
- New GM action: **Assign Selected Units**.
- Select any number of deployed battle-unit tokens, choose a Foundry player, and assign all selected units to that player in one operation.
- Assignment updates both the battle-unit owner fields and Foundry token/synthetic-actor ownership used for actual player control.
- Team, alliance, formation, stats, and token positions are not changed. If a selected token is a General, its linked commander Actor ownership is synchronized too.
- Units can also be returned to **GM / Unassigned**.

## Preserved systems
- Combat resolution and Undo Last Combat.
- Turn tracker and player End Turn.
- Commander management and Command Points.
- Movement restrictions, terrain, routing, abilities, HP bars, team tactical Drawing visibility, Crown army import, battle reset/start positions, and unit balance.
- GitHub updater metadata.
