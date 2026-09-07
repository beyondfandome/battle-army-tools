# Crown Overview Tools v0.5.9

## Fixed: House manpower / mustering
- Player-controlled land holdings are now the authoritative source for House manpower, matching **My Holdings**.
- A character assigned to a player now receives manpower from every land province assigned to that same player, even if one province still has a stale/mismatched House text label.
- Three ordinary owned provinces therefore provide **3,000 maximum manpower** before Mustering building bonuses.
- Owner-name fallback is retained for legacy tiles that do not yet have a user ID.
- NPC/legacy characters with no player controller still fall back to House-name matching.

## Fixed: Diplomatic takeover House assignment
- Successful diplomacy now resolves the conquering House from the character first and, if necessary, from the player's existing holdings.
- A successful takeover can no longer silently use the player's username as the House merely because the character House field was blank.
- Both World Tile and House Data ownership/controller fields continue to be updated together so the conquered province immediately participates in Holdings, manpower, building, economy, and visibility systems.
- If no House can be determined at all, the takeover now stops with a useful error instead of writing incorrect ownership data.
