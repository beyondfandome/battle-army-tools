# Crown Overview Tools v0.5.5

## Province conquest / allegiance
- Added one centralized province-transfer data path used by conquest systems.
- Successful Diplomacy assigns both World Tile and House Data to the conquering House.
- Successful Siege now does the same instead of only changing the controlling Foundry user.
- Local ruler data is preserved unless the GM changes it separately.
- Siege victory chat now names the conquering House.

## My Turn character dashboard
- Renamed/upgraded the character movement dialog to **My Turn — Characters**.
- Shows character House and current province.
- Shows movement used, maximum, and remaining.
- Shows linked army current/max strength.
- Shows whether Diplomacy has already been used this turn.
- Shows whether the linked army has already used Siege this turn.
- Adds direct buttons for Select, Move, Diplomacy, Army, and Siege.
- Existing movement, Diplomacy, and Siege functions remain authoritative; dashboard buttons only select the correct token and launch those systems.

## House Data / mustering safety
- Mustering remains House Data based: 1,000 base manpower per land province plus Mustering building bonuses.
- Training capacity continues to come from House Data military buildings.
- Manpower reservations are now transactional: if a province write fails mid-reservation, already-applied province writes are rolled back where possible.
- Manpower recovery remains 5% of province maximum each round, capped at maximum.

## GM audit tool
- Added **Audit Province / House Data** under GM Tile Ownership.
- Checks land provinces for House/World Tile allegiance mismatches.
- Checks controller mismatches and missing controller IDs.
- Flags Player-owned provinces without controllers.
- Flags invalid controller user IDs.
- Flags raw manpower outside calculated bounds.
- Flags stale cached manpower maximums.

## Version
- Module version bumped to 0.5.5.
- GitHub download URL is intentionally still v0.5.3 until a matching release is published.
