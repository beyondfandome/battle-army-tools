# Battle Army Tools v0.3.7

## Commander Generals
- Commander tokens now automatically receive a `world.battleUnit` General stat block when spawned.
- General stats: 200 HP, 8 Attack, 4 Defence, Range 1, Movement 6, Manpower 250, Charge ability.
- Commander General units inherit the commander's team, alliance, formation, commander identity, and assigned player ownership metadata.
- Because commanders are now battle units, normal unit movement, combat, attack/defence editing, routing, and round-reset systems can operate on them.
