# Crown Overview Tools v0.5.11

## Assigned Characters / Movement
- Restores/emphasizes **My Characters / Move** as the primary player movement roster.
- The roster now uses the character's explicit assigned controller fields first (`controllerPlayerUserId` / `controllerPlayerName` included), with legacy token permission only as a fallback.
- Renames the generic movement button to **Move Selected Piece** so it is not confused with the assigned-character roster.

## Mustering / House Manpower
- Fixes a controller-field mismatch that could make **My Holdings show 3 provinces while mustering only counted 2**.
- Manpower now resolves the assigned character's controller using the same complete controller identity logic used elsewhere, including `controllerPlayerUserId` and `controllerPlayerName`.
- Player-controlled manpower is based on all non-sea provinces controlled by that player, matching **My Holdings**.
- NPC/legacy fallback prefers political allegiance when it exists, then falls back to the local House identity.

## Province House vs. Allegiance
- **Local/original House identity no longer changes when a province is conquered or diplomatically taken over.**
- Successful siege/diplomacy now changes:
  - controlling player,
  - sworn-to player,
  - political `allegiance` to the conquering player's House.
- The province's `house`, local ruler, culture, buildings, economy, and other local data remain with the original province House.
- The first transfer also records `originalHouseName` as a safeguard against future accidental renaming.
- **My Holdings** continues to be driven by controller ownership, so a sworn/conquered local House appears among the conquering player's holdings without being renamed.
- Holdings now visibly display both the **local House** and its **Allegiance**.

## Important migration note
- v0.5.11 prevents future takeovers from renaming local Houses. If an earlier v0.5.9/v0.5.10 takeover already overwrote a local House name, the module cannot infer the lost historical name automatically unless it exists elsewhere in that tile's data; restore that House once through Edit Tile Ownership / House Data.
