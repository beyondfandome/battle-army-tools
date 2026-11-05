# Battle Army Tools v0.5.24 — Automatic Turn Advance

- 10-minute shared turn timer now **automatically advances** the scene `world.battleTurnState` to the next participant when it reaches zero.
- Uses the Battle Turn Tracker macro's saved `order` and `sideIndex` / `currentIndex` (or `currentSide`) to determine who is next; wraps to the next round.
- New turn receives a fresh 10-minute countdown. GM pause/resume/reset buttons remain.
- Only the elected active GM writes turn changes; a guard prevents multiple advances on the same expired turn.
- Invalid/unavailable ordered tracker state produces a visible GM error and leaves the timer stopped instead of arbitrarily skipping a player.
- Does not invent a turn order, change commander stats, or modify battle combat formulas.

**In-Foundry verification required:** this module follows an external Battle Turn Tracker macro. Confirm its `world.battleTurnState.order` holds the intended *players or commanders*, not merely army teams, before relying on timed automatic advancement.
