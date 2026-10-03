# Battle Army Tools v0.5.12

## Ownership controller rewrite

- Replaced troop ownership through per-token ActorDelta overrides with one lightweight linked **BAT Controller Actor** per Foundry player (plus an unassigned controller).
- Deploying units now links each troop token directly to the selected player's controller Actor.
- **Assign Selected Units** now re-links selected troop tokens to the destination player's controller Actor. The previous player's controller is no longer attached to those tokens, so previous control is removed structurally rather than by merging/deleting ActorDelta ownership keys.
- General/commander tokens remain linked to their real Commander Actor and continue to use exclusive Actor ownership.
- Deployment and reassignment verify Foundry's resolved Token ownership level before reporting success.
- BAT owner metadata is written only after reassignment succeeds.
- Explicit Player Owner selection during deployment still takes precedence over commander inheritance.

## Vision rollback

- Removed the v0.5.6 **Optimize Battle Vision** setting and its automatic sight-policy enforcement.
- Restored the pre-v0.5.6 behavior: player-assigned formations receive normal token sight; General/commander vision remains enabled at range 8.
- BAT no longer contains the optional commanders-only vision optimization.

All other v0.5.11 battle systems are retained.
