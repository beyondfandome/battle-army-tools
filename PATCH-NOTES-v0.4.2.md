# Battle Army Tools v0.4.2

## Player reactions
- Form Up is now a reaction for Light Infantry and Heavy Infantry on the first attack against that unit during the current turn.
- The owning player is prompted to spend 1 command point; if accepted, Form Up grants +1 Defence through the end of that turn.
- Form Up can only be offered once per unit per turn and does not stack.
- Failed morale now prompts the owning player (or GM when no active player owner is available) to spend 1 command point to prevent routing.
- Reaction decisions are sent to the active GM for authoritative command-point spending and battle-state updates.

## Siege engines
- Added Battering Ram: HP 200, Attack 10, Defence 5, Range 1, Movement 3, Manpower 1.
- Added Catapult: HP 50, Attack 8, Defence 2, Range 14, Movement 0, Manpower 1.
- Added Trebuchet: HP 50, Attack 12, Defence 2, Range 14, Movement 0, Manpower 1.
- All three are individual-piece deployments.
- Battering Rams can attack only Walls and Palisades and use full Attack against them.
- Catapults and Trebuchets use full Attack against Walls/Palisades and half Attack (rounded up) against regular units.
- Catapults and Trebuchets gain +3 Defence against ranged/projectile attacks but remain Defence 2 in melee.
- Added all three siege engines to Scene Unit Balance.
