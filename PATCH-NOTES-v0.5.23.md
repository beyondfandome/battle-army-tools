# Battle Army Tools v0.5.23 — Turn countdown

- Adds a shared **10-minute turn timer** to the existing Battle Turn HUD.
- Starts a fresh countdown on turn creation and whenever the scene battle tracker changes round, side, active index, or phase.
- Timer state is stored on the scene, so players see the same remaining time and a client refresh does not reset it.
- GM-only **Pause / Resume** and **Reset 10:00** controls in the HUD.
- When time reaches zero, HUD shows **TIME EXPIRED**, without automatically advancing or changing battle state.
- Does not reset on unrelated scene updates, attacks, or token movement.
- Preserves v0.5.22 combat changes including Focus Fire targeting, Charge, Volley, Brace, Form Up, and unit statistics.
- Foundry world setting permits disabling the countdown independently of the Battle Turn HUD.

**Note:** The timer tracks `world.battleTurnState` written by the Battle Turn Tracker macro. If the macro does not change any turn-identity fields when advancing to an otherwise identical turn, the timer cannot detect that advance.
