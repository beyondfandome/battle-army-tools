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
