# Battle Army Tools

Foundry VTT battle-management tools for the Crown of Ashes campaign.

## v0.5.13

Fixes Commander turn tracking for multi-command battles. Commander mode now gives each commander an individual turn while grouping the suggested order by Team, and the Battle Turn HUD displays both the active Team and Commander.

### Install / update

Repository: `https://github.com/beyondfandome/battle-army-tools`

Manifest: `https://raw.githubusercontent.com/beyondfandome/battle-army-tools/main/module.json`

Release tag: `v0.5.13`

Release asset: `battle-army-tools-v0.5.13.zip`

See `PATCH-NOTES-v0.5.13.md` for the full change list.

## v0.5.12

Rewrites troop assignment around per-player BAT Controller Actors so deployment and reassignment use Foundry's normal linked-Actor ownership path instead of synthetic ActorDelta permission overrides. The v0.5.6 large-battle sight optimization has been removed; normal player-unit sight behavior is restored.

### Install / update

Repository: `https://github.com/beyondfandome/battle-army-tools`

Manifest: `https://raw.githubusercontent.com/beyondfandome/battle-army-tools/main/module.json`

Release tag: `v0.5.12`

Release asset: `battle-army-tools-v0.5.12.zip`

See `PATCH-NOTES-v0.5.12.md` for the full change list.

## v0.5.6

Adds an optional large-battle vision optimization, enabled by default: ordinary battle formations keep normal player control but no longer act as individual Foundry vision sources. General/commander tokens remain vision sources at range 8. This substantially reduces perception work on very large battlefields while preserving the existing battle systems.

### Install / update

Repository: `https://github.com/beyondfandome/battle-army-tools`

Manifest: `https://raw.githubusercontent.com/beyondfandome/battle-army-tools/main/module.json`

Release tag: `v0.5.6`

Release asset: `battle-army-tools-v0.5.6.zip`

See `PATCH-NOTES-v0.5.6.md` for the full change list.

## v0.5.5

Adds anchor-free board-edge deployment (including Crown army imports) and a GM **Assign Selected Units** action for bulk player control assignment. Existing anchor deployment remains the default.

### Install / update

Repository: `https://github.com/beyondfandome/battle-army-tools`

Manifest: `https://raw.githubusercontent.com/beyondfandome/battle-army-tools/main/module.json`

Release tag: `v0.5.5`

Release asset: `battle-army-tools-v0.5.5.zip`

See `PATCH-NOTES-v0.5.5.md` for the full change list.

## v0.5.0

This release adds contextual combat options, commander Command Point editing and routed-General lockout, General vision range 8, Horse Archer Hit & Run, Elephant/Mammoth Trample, Dragon Incinerate, and team-specific tactical Drawing visibility.

### Install / update

Repository: `https://github.com/beyondfandome/battle-army-tools`

Manifest: `https://raw.githubusercontent.com/beyondfandome/battle-army-tools/main/module.json`

Release tag: `v0.5.0`

Release asset: `battle-army-tools-v0.5.0.zip`

See `PATCH-NOTES-v0.5.0.md` for the full change list.
