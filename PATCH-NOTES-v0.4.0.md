# Battle Army Tools v0.4.0

Consolidated scene-battle workflow update.

- Battle state tools are scene-scoped.
- Added movable/resizable two-column Battle Actions panel.
- Added Set Start Positions, Reset Positions, and full Reset Battle controls.
- Added Scene Unit Balance editor with HP/Attack/Defence/Range/Movement/Manpower overrides and optional live application to deployed units.
- Standard infantry/cavalry token manpower changed to 100; General combat unit manpower changed to 100. Exceptional beasts/structures retain special manpower values.
- Deployment is manpower-driven: requested soldiers are converted into full 100-man tokens plus a final partial-strength token.
- Units track currentManpower/maxManpower and synchronize manpower percentage with HP casualties.
- At 50% manpower or below, effective Attack and Defence are halved (rounded up); Movement and Range remain unchanged.
- Existing commander ownership, vision, General-unit behavior, delete management, GM Next Turn, and Edit/Route tools retained.
