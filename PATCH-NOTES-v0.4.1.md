# Battle Army Tools v0.4.1

Consolidated v0.4.0 playtest fixes:
- Position reset teleports without consuming movement, resets explored fog/vision, then refreshes movement.
- Active commanders auto-spawn as General tokens in the scene bottom-left staging area; reactivating an absent commander spawns it.
- Commander General stats honor scene General balance overrides.
- Elephants, Mammoths, Dragons, Pallisades, and Walls deploy as individual 1-manpower pieces.
- Reset Selected Ammo is GM-only, including a function-level permission check.
- Edit/Route Units handles mixed selections safely, shows a type breakdown, and supports single-token renaming without changing unit type.
- Player Battle Actions is single-column; GM remains two-column.
- Command-token tracking/reset uses only active commanders through a shared active-commander filter.
