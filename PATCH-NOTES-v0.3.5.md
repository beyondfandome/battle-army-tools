# Battle Army Tools v0.3.5

- Fixed deployed unit player ownership for modern Foundry synthetic/unlinked token actors.
- Commander-owned deployments now write ownership to the token and ActorDelta while leaving the shared unit template Actor untouched.
- Player-owned deployed units have token sight enabled automatically.
- Reassigning a commander now reapplies unit ownership and sight to existing battlefield units.
- Added GM **Edit / Route Units** action. Select one or more battle units to edit Attack and Defence in bulk and optionally route them immediately.
- Manual routing uses the existing Routed Pool behavior when a Routed Pool anchor exists.
