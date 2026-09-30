# Battle Army Tools v0.5.3

## Undo Last Combat
- Adds a GM-only **Undo Last Combat** button to Battle Actions.
- Before each validated combat resolution, Battle Army Tools stores one scene-specific safety snapshot.
- Undo restores battle-unit flags for all deployed units, including HP/manpower, routed state, movement/attack state, ammo/reload state, temporary ability-use flags, and battle logs.
- Restores pre-combat token positions, including units teleported to the Routed Pool.
- Restores all commander battle flags, including Command Points spent during the combat.
- Restores routed skull visuals and normal combat token visuals.
- Undo is one-level and consumed after use.
- Reset Battle clears any stale combat-undo snapshot.

Also retains the v0.5.2 Foundry Drawing schema compatibility fix.
