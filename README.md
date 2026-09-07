# Crown Overview Tools v0.5.20

## My Turn dashboard
- My Turn — Characters now shows each character's primary stats, secondary stats, and current tile directly in the roster.
- Linked armies now show composition breakdown and upkeep instead of only total strength.
- Added a Build / Upgrade button to the My Turn character roster.

## Construction timing / build feedback
- Building bonuses are treated as inactive until their construction completion round.
- Tier 1 buildings activate after 1 round, Tier 2 after 2 rounds, and Tier 3 after 3 rounds.
- Inactive/under-construction buildings no longer provide training capacity, manpower, ship capacity, drydock unlocks, fortification, settlement/DC, or development economy bonuses before completion.
- Player build menus now show builder Statecraft and lock options the character cannot build.
- Failed player build requests now notify the requesting player as well as the GM.

## Navy disembark cleanup
- Disembarking now more aggressively clears stale army/navy transport flags.
- Fleet cargo movement only carries armies still explicitly marked as embarked.
- This prevents disembarked armies and their commanders from being dragged when the navy moves later.

# Crown Overview Tools v0.5.19

## Army muster UI polish
- Summon Army now visually locks trained troop types when the House has 0 available training capacity for that troop type.
- Locked army troop inputs are disabled and greyed out, matching the Summon Navy ship-class lock behaviour.
- Mob remains available when manpower/command capacity allows, because it is the default troop type.

## Embark / disembark cleanup
- Disembarking an army now clears additional stale navy transport flags from the army and army commander.
- The carrying navy removes the disembarked army from all known cargo manifests.
- If the same character was acting as both fleet commander and disembarking army commander, the fleet is detached so it does not keep dragging that character after they land.

## Neutral takeover display
- When a generic Neutral/NPC province is taken over, the public owner label now displays the conquering House/allegiance instead of leaving the large tooltip heading as Neutral.
- The local/original House identity is still preserved for non-generic local Houses.

All v0.5.18 and earlier allegiance, holdings, manpower, navy, army, diplomacy, duel, siege, and character-menu fixes are retained.

# Crown Overview Tools v0.5.3

## v0.5.3 — Army embarkation and naval transport

- Adds player-facing `Embark Army` and `Disembark Army` actions.
- `Embark Army` works from an army token or the character commanding that army.
- Embark checks adjacent sea tiles for a navy/fleet controlled by the same player.
- Armies can only embark from land/port tiles onto a navy in an adjacent sea tile.
- Each ship can carry 100 troops. Fleet carrying capacity is total active ships × 100.
- If the army is too large for the available ships, the module warns the player; continuing embarks only the troops that fit and dismisses the surplus from the field, removing their upkeep.
- Embarked armies are stored as navy cargo and hidden on the map; move the navy token to transport them.
- The army commander character embarks with the army and is carried with the navy.
- `Disembark Army` can be run from the army, its commander character, or the carrying navy.
- Disembark shows adjacent land/port landing tiles from the navy's current sea tile.
- Embarking and disembarking lock the army/commander movement for the current turn.
- Non-GM embark/disembark requests route through the active GM client.
- Commander-in-Chief trait support is reserved for a later rule pass.

## v0.5.2 — Diplomacy defender targeting + Spread Selected

- Fixes Diplomatic Takeover incorrectly using random visiting character tokens as defenders.
- NPC/Neutral tiles now use explicit `NPC Defender Diplomacy` / `Ruler Diplomacy` unless an explicit ruling/defender character ID is set.
- Player-owned tiles only use defending character tokens controlled by that tile's owner.
- Blank diplomacy CSV cells no longer block fallback to another filled diplomacy field.
- Adds player-facing `Spread Selected` action to separate stacked Crown pieces.
- Non-GM spread requests route through the active GM client and only move pieces the requesting player controls.
- Spread Selected also syncs character/world-piece tile IDs when it spreads pieces inside a tile.

## v0.5.1 — Duel output-fix script alignment

Uses the corrected `Roll_Everything_Output_Fix.gs` file as the Duel reference.

- Duel formula now follows the corrected sheet exactly: d30 + Prowess + Martial/2 + Secondary Bonus + Armor Modifier + Weapon Advantage + Valyrian Steel Bonus.
- Favoured Weapon Bonus remains stored/exported on characters, but is not applied to Duel rolls unless re-added later as a separate rule.
- Keeps corrected d100 injury check: only the higher Final Combat combatant can inflict injury, and injury triggers when d100 is equal to or below Final Combat.
- Keeps armor injury protection: Light rerolls Amputation, Medium rerolls lethal/Amputation, Heavy rolls a second injury on lethal/Amputation and keeps the less severe result.
- Keeps v0.5.0 Duel button, GM whisper math, d36 hit location, and d10 severity.


## v0.5.0 — Crown Duel System

- Uses the uploaded v0.4.9 naval construction/capacity version as the base.
- Fixes the internal script version constant to `0.5.0`.
- Adds a player-facing/GMsupported `Duel` action to the Crown Overview panel.
- Duel workflow: select exactly two character tokens, click `Duel`, choose weapon, armor, Valyrian steel, and any secondary bonus, then roll.
- Non-GM duel requests route through the active GM client so hidden character stats are resolved GM-side.
- Combat formula follows the supplied Google Apps Script: d30 + Prowess + Martial/2 + Secondary Bonus + Armor Modifier + Weapon Advantage + Valyrian Steel Bonus.
- The module also adds the character Favoured Weapon Bonus when the selected weapon matches the character's preferred weapon category.
- Weapon advantage is +5 using the supplied matrix: Sword beats Axe/Mace; Axe beats Mace/Polearm; Mace beats Polearm/Spear; Polearm beats Spear/Sword; Spear beats Sword/Axe; Bow has no melee advantage.
- Valyrian Steel gives +5 when only one combatant has it and negates the opponent's normal weapon advantage.
- Injury logic follows the supplied Apps Script: only the higher Final Combat combatant can inflict injury; injury occurs when that side's d100 is equal to or below their Final Combat.
- Injury rolls use d36 location and d10 severity.
- Armor injury protection follows the sheet: Light rerolls Amputation once; Medium rerolls lethal/Amputation once; Heavy rolls a second injury on lethal/Amputation and keeps the less severe result.
- Public chat shows the duel winner, margin, injury check, and injury result.
- GM whispered chat shows the full combat math and armor reroll details.
- Injuries are reported but not automatically applied to wounds/status yet; GM should edit character state after reviewing the result.

# Crown Overview Tools v0.4.9

## v0.4.9 — Naval construction tiers

- Naval quantity remains House-wide: 10 ships per province, increased proportionally by Mustering buildings.
- Ship quality is now unlocked by the highest Drydock-line building anywhere in the House holdings.
- No Drydock-line building: no ship classes can be newly fielded.
- Level 1 Shipwright unlocks Fishing / Conscripted Vessels and Longships.
- Level 2 Sail Makers additionally unlocks Galleys and War Galleys.
- Level 3 Dry Dock additionally unlocks Greatships and Dromonds.
- The Summon Navy dialog displays the House's naval-infrastructure tier and visibly locks unavailable vessel classes.
- GM-side navy request validation independently checks ship-class access, preventing UI/socket bypasses.
- GM fleet editing also checks Drydock ship-class access when a linked commander can be resolved.
- Drydock buildings no longer generate abstract `Ships` economy income; their purpose is ship-quality access.
- Command remains 1 ship = 100 Mob-equivalent.

Scene-gated strategic overview tools for the Crown of Ashes Foundry world map.

## v0.4.6

Hotfix and systems polish for navies, sieges, strategic action locks, upkeep, and the campaign clock.

### Navies / fleets

- Adds stricter Summon Navy rules.
- A navy can only be summoned from an active Port tile.
- The Summon Navy dialog now shows the linked sea tiles available from that port.
- The player/GM chooses the starting sea tile when launching the navy.
- The fleet launches immediately into that sea tile.
- The linked character is moved/embarked into the same sea tile.
- The character and the new fleet are locked for the turn after launching.
- Fleet movement remains sea/port based.
- Fleets can still carry their linked character when moving.

### Armies / navies dismissal

- Players can now dismiss their own army or navy.
- Non-GM dismissals route through the active GM client by socket.
- Dismissed forces are removed from the map and stop future upkeep.
- GM can still dismiss any selected army/navy.

### Siege / Storm

- Player siege attempts now route through the active GM client.
- This fixes player permission errors when a successful siege needs to update a tile drawing.
- Siege still commits the army for the turn.
- Siege casualties still reduce the army strength.
- Player-held tiles with a defending army still produce a pitched-battle GM alert instead of a quick siege roll.
- NPC/neutral or undefended player tiles still use settlement + fortification DC only.
- No garrisons are required.

### Upkeep and economy

- Active armies and navies now charge upkeep when economy is collected.
- Round Clock advance collects economy and applies military upkeep once for the new round.
- Manual Collect Economy using All or Player scope also applies upkeep.
- Selected-tile-only collection does not charge global upkeep.
- Upkeep is deducted from the owner player's controlled tile stockpile.
- If no controlled stockpile is found, the upkeep is listed as unpaid in the economy chat card.

### Round clock / ledger tools

- Round Clock now has Advance Round + Economy.
- Round Clock now has Go Back One Round.
- Round Clock now has Collect Current Round.
- Round Clock now has Reset Economy Ledger.
- Reset Clock no longer silently clears the economy ledger; use Reset Economy Ledger when testing or correcting.

### Tile ownership / culture / religion

- Culture and Religion remain editable through Edit Tile Ownership / House Data.
- Culture and Religion remain exported/imported through Tile Ownership CSV.
- The merged tile ownership editor is the main GM workflow for ownership, ruler, culture, religion, sworn-to, marriage protection, and NPC diplomacy.

## Install

Upload the matching zip to the GitHub release for this tag and update Foundry from the manifest.

- Tag: `v0.4.6`
- Asset: `crown-overview-tools-v0.4.6.zip`


## v0.4.8 Naval Capacity
- Each land province contributes 10 ships of House-wide naval fielding capacity.
- Mustering Hall adds +5 ship capacity, Mustering Grounds +10, and Levee En Masse +15, matching the army manpower scaling at 1 ship per 100 manpower bonus.
- Active fleets consume House naval capacity, so the limit is shared across all characters of the House.
- Navy command uses Martial at the existing 250-men-per-Martial command rate, with 1 ship counting as 100 Mob-equivalent. Thus Martial 4 can command 10 ships, Martial 8 can command 20, etc.
- The Summon Navy dialog shows House capacity, already-fielded ships, and commander capacity, and the GM re-validates the cap when a launch request arrives.
