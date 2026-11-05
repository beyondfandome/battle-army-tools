# Battle Army Tools v0.5.14

## Turn timer
- Every active battle turn gets a synchronized 5:00 countdown.
- At 0:00, the active GM client automatically advances to the next entry in the configured turn order.
- The final turn of a round stops at Round Complete and waits for the GM to advance the round, preserving the existing round-reset workflow.
- GM tracker controls: Pause/Resume Timer and Reset 5:00.
- Players may still use End My Turn early; the next turn immediately receives a fresh 5:00.
- The timer is stored in scene battle-turn state, so reopening the tracker does not reset it.
- The Battle Turn HUD shows the live countdown for everyone.

## Assign Battle Units
- The GM can choose a Foundry player and assign by Selected Units, Team, Alliance, Commander, or Formation.
- Reassignment replaces previous player ownership instead of adding another controller.
- Commander-scope assignment synchronizes the Commander Actor ownership/metadata as well.
- Team/alliance/commander/formation identity, stats, and token position are otherwise preserved.

## Vision
- Player assignment and troop deployment no longer change troop-token sight.
- General tokens retain the existing General-only vision behavior.

## Updater metadata
- Repository URL, stable releases/latest/download/module.json manifest URL, and version-specific v0.5.14 release ZIP URL are preserved.
