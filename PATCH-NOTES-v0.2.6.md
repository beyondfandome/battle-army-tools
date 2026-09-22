# Battle Army Tools v0.2.6

- Fixed the one-attack-per-turn guard. A unit with `hasAttacked` set can no longer start another normal attack.
- The guard runs before GM resolution and before a player sends the attack to the GM, preventing repeat-click/socket attacks.
- `Reset Selected Move` is now `Reset Selected Turn` and clears both movement and `hasAttacked`, making the reset control match the unit turn state.
- Existing routed-unit behavior remains unchanged.
