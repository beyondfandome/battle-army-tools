# Battle Army Tools v0.5.9

## Ownership reassignment fix

- **Assign Selected Units** now changes ownership on the unit's effective Actor instead of attempting to write ownership directly to the TokenDocument.
- For unlinked battle units, Foundry persists the change through the token's **synthetic Actor / ActorDelta** workflow.
- For linked General tokens, the same update changes the real **Commander Actor** ownership.
- Ownership is replaced as a complete object with Foundry v14's supported `_replace` operator, so the previous OWNER cannot survive a recursive merge.
- BAT verifies effective Actor ownership before it updates its own `ownerUserId` metadata or reports the unit as assigned.
- Failed assignments now report the affected token instead of incrementing the success count.
- Newly deployed unlinked units store initial ownership only in `delta.ownership`; obsolete Token-root and legacy `actorData.ownership` writes were removed.

All v0.5.8 functionality is otherwise retained.
