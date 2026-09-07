# Crown Overview Tools v0.5.14

## UI load / cache fix
- Corrects the runtime `MODULE_VERSION`, which was still reporting v0.5.12 inside the v0.5.13 package.
- Loads the module from a new versioned script filename (`crown-overview-tools-v0.5.14.js`) so Foundry/browser caches cannot silently reuse the prior JavaScript.
- The Crown Overview panel header now visibly shows the runtime version (`v0.5.14`) so the loaded build can be verified immediately.

## Player character controls
The rendered Player Actions panel includes, in this order:
1. **Select My Assigned Actor**
2. **My Characters / Move**
3. **Move Selected Piece**

All v0.5.12/v0.5.13 holdings, manpower, House/allegiance, diplomacy, and assigned-character logic is retained.
