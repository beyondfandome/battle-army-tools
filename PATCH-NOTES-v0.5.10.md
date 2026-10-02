# Battle Army Tools v0.5.10

## Deployment ownership verification

- **Deploy Units** now uses the same effective Actor / synthetic Actor ownership workflow as **Assign Selected Units** after token creation.
- Every deployed formation is forced to `actorLink: false`, preventing battle units from accidentally sharing ownership through a linked base Actor.
- Every deployment receives an explicit ActorDelta ownership map, including **GM / Unassigned**, so base unit Actor permissions cannot leak into newly deployed formations.
- After bulk token creation, BAT verifies and reapplies exclusive ownership on each effective synthetic Actor before reporting success.
- Deployment now reports an error with affected token names if ownership verification fails instead of claiming a clean deployment.
- Player ownership remains exclusive: the assigned player is OWNER; other players are not owners.

All v0.5.9 functionality is otherwise retained.
