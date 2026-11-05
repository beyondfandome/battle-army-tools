# Battle Army Tools v0.5.25 — Battle Actions panel regression fix

- The 10-minute timer enlarged the Turn HUD, which could overlap the fixed-position Battle Actions controls. The Battle Actions panel now positions itself dynamically above the HUD and scrolls on shorter windows.
- Clock updates no longer rebuild HUD buttons once per second, which could interrupt clicks on Pause/Resume/Reset.
- Preserves v0.5.24 automatic timer handoff to the next tracked participant.
- Preserves v0.5.22 combat balance and Focus Fire rules.
- No changes to battle unit statistics or combat resolution.

Note: This resolves the identified layout regression. Further Foundry testing is required; if Resolve Combat itself still throws an error, inspect the browser console for its exact message.
