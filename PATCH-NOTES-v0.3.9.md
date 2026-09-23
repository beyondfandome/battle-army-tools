# Battle Army Tools v0.3.9 — Consolidated 0.3.6–0.3.8

This release consolidates the v0.3.6, v0.3.7, and v0.3.8 battlefield workflow changes into one package.

## GM Turn Control
- GM Battle Turn Tracker includes **Next Turn** so the GM can manually advance to the next participant.
- Next Turn does not advance the round; the final turn still waits for the GM to use **Advance Round**.

## Commanders as Battlefield Units
- Spawned commanders automatically receive the **General** battle-unit stat block.
- General: Cavalry (Melee), 200 HP, Attack 8, Defence 4, Range 1, Movement 6, Manpower 250, Charge.
- Commanders retain their commander metadata while also participating as normal battle units.

## Commander Management
- Manage Commanders includes a delete option.
- Deleting a commander removes the commander Actor and its commander token(s), while leaving ordinary deployed army units intact.

This package also retains the earlier v0.3.5 player ownership/vision and Edit/Route Units changes.
