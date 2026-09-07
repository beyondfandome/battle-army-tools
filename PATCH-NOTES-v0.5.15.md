# Crown Overview Tools v0.5.15

## Mustering / realm fix
- When a non-GM player musters with a character they control, **that player's exact My Holdings collection is now authoritative** for the manpower pool.
- GM/server-side muster processing still uses the character's explicit assigned controller.
- If player/controller metadata is unavailable, political **Allegiance** is used as the realm fallback; original House names are not overwritten.
- Added **Contributing Provinces** to the muster dialog so every province being counted is visible by name.
- Each non-sea contributing holding supplies 1,000 base manpower plus its own Mustering building bonus.

## Existing behavior retained
- Original local House identity remains unchanged after conquest.
- Allegiance/controller changes determine political holdings.
- My Characters / Move and Select My Assigned Actor remain present.
