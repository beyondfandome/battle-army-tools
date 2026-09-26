# Battle Army Tools v0.4.3

## Siege abilities and reaction cleanup
- Battering Ram — **Ramming Speed**: spend 1 Command Point once per round for +3 Movement that round.
- Catapult — **Incendiary Ammo**: spend 1 Command Point once per round to attack a non-fortification at full Attack instead of half Attack.
- Trebuchet — **Barrage**: spend 1 Command Point once per round to double Attack against Walls/Palisades.
- Catapult and Trebuchet attacks are always treated as ranged/projectile attacks and each has 5 ammo. Every attack consumes 1 ammo; special abilities do not consume extra ammo.
- Battering Ram remains melee and uses no ammo.
- Siege engines keep their existing defensive rule: Catapult/Trebuchet gain +3 Defence against ranged attacks.
- Individual-piece units (manpower 1) no longer receive half-strength Attack/Defence penalties from HP loss.
- Battle Reset restores Catapult/Trebuchet ammo to 5/5 and clears temporary siege/Form Up ability state.
- Hover status now reports siege ability readiness/usage and active Form Up state.
- Added **Use Selected Ability** for manually activated abilities such as Ramming Speed; player requests are validated and applied by the GM.
