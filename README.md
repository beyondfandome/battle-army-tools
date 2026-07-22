# Battle Army Tools v0.2.2

Army-scale battle helpers for Foundry VTT.

## Included in v0.2.2

- Left-docked hover tooltip by default
  - HP/status, attack, defence, range, movement, ammo, command, formation, terrain bonuses
- Turn HUD
  - round
  - current side/team/alliance from the battle turn tracker scene flag
  - commander command tokens for the current side
- Battle Action Panel
  - Resolve Combat
  - Reset Selected Move
  - Reset Selected Ammo
  - Reset Side Command, GM only
- Player combat requests
  - players select their attacker and target a defender
  - the player chooses combat options
  - the active GM client applies the result through the module socket
- Combat resolver
  - attack vs defence d10 pools
  - terrain modifiers
  - Charge / Volley / Form Up / Brace
  - ammo spending
  - flanking / engagement pressure
  - morale checks
  - optional GM rally prompt on failed morale
  - routed-pool teleport when a unit routes
  - friendly fire for ranged/projectile attacks into melee
- Movement watcher
  - cumulative movement tracking
  - terrain movement costs
  - routed-unit movement blocking
  - occupied-square blocking
  - routed-pool teleport bypass
- Custom HP bars

## Player combat workflow

1. Player selects one attacking battle unit.
2. Player targets one defending battle unit.
3. Player clicks `Resolve Combat` in the Battle Actions panel.
4. Player chooses Charge / Volley / Form Up / Brace options if available.
5. The active GM client applies the combat result and posts it to chat.

The GM should be logged into the same scene while players test combat.

## Routed Pool

Place a token named exactly `Routed Pool`, or change the token name in module settings. Routed units are teleported to empty slots beside that token.

## Install / update

Use this manifest URL in Foundry:

https://raw.githubusercontent.com/beyondfandome/battle-army-tools/main/module.json

For GitHub release assets, upload this ZIP as:

battle-army-tools-v0.2.2.zip


## v0.2.2 hotfix

- Player combat requests now prefer an active GM/Assistant GM viewing the same scene.
- The player notification names the GM who received the request.
- GM-side warnings are clearer when a request reaches a GM who is not on the battle scene.


## v0.2.2 Hotfix

- Adds `socket: true` to the manifest so player combat requests can be received by the active GM client.
- Keeps the v0.2.1 active-GM same-scene routing behaviour.
