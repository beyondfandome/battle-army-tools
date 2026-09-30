# Battle Army Tools v0.5.0

## Combat resolver
- Combat options are now contextual: only abilities that are currently legal for the selected attacker/defender matchup are shown.
- The resolver summary shows effective Attack, Defence, manpower, range, command status, ammo, and terrain.
- Routed Generals disable their commander's CP spending while preserving remaining CP.

## New combat abilities
- **Hit & Run — Horse Archer:** spend 1 CP when attacking to unlock post-attack movement using only remaining Movement; once per turn.
- **Trample — Elephants/Mammoth:** spend 1 CP when attacking to unlock post-attack movement using remaining Movement; the unit cannot be flanked for the rest of the current turn/round; once per turn. Occupied destination squares remain illegal.
- **Incinerate — Dragon:** spend 1 CP to reduce an eligible troop formation or War Beast to 0 HP/manpower and Route it immediately; once per turn. Generals, Walls, Palisades/Pallisades are exempt and receive a normal Dragon attack instead.

## Commanders
- Create Commander now supports editable Max CP and Current CP.
- Manage Commanders now supports editing Max CP and Current CP; Current is clamped to Max.
- Round advancement restores Current CP to each active commander's Max CP.
- General tokens always have vision enabled at range 8; existing General tokens are corrected when Battle Army Tools refreshes.

## Tactical drawings
- Added **Team Drawings** to the GM Battle Actions panel.
- Selected Drawings can be visible to Everyone, GM Only, or Red/Blue/Green/Yellow/Orange/Purple/Black/White/Neutral teams.
- GM always sees all drawings. Players see Everyone plus drawings assigned to teams of their active owned commanders.
- Drawing visibility does not remove the Drawing document, so terrain-zone mechanics continue to read terrain drawings.

## Cleanup
- Normalized Battle Unit / Commander flag access through the module's shared constants.
- Palisade and legacy Pallisade spellings are both recognized as fortifications.
- Removed unrelated Crown Overview Tools files that had accidentally been bundled inside the Battle Army Tools ZIP.
