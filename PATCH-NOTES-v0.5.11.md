# Battle Army Tools v0.5.11

## Deployment ownership fix

- Unlinked battle formations now persist exclusive player ownership directly on the Token ActorDelta, then rebuild the synthetic Actor before verification.
- Ownership changes force a harmless TokenDocument refresh so connected player clients immediately receive control instead of requiring a token move or browser refresh on affected Foundry v14 builds.
- Verification now checks both the effective Actor permission and actual Token OWNER permission.
- Deployment performs the same persisted ownership workflow immediately after token creation instead of trusting only the inline creation payload.
- An explicitly selected **Player Owner** in Deploy Units now takes precedence; if no player is chosen, a selected commander's owner is inherited. This prevents commander selection from silently discarding a manual player assignment.
- Linked General tokens continue to use their real Commander Actor ownership.

All v0.5.10 functionality is otherwise retained.
