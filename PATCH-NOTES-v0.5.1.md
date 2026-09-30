# Battle Army Tools v0.5.1

## Tactical Drawings Fix

- Added **Draw Tactical** to the Battle Actions panel for both players and GMs.
- Players can draw arrows, lines, rectangles, circles/ellipses, and text directly on the battlefield without needing Foundry Drawing creation permission. Player requests are brokered through the active GM.
- Players may draw for **Everyone** or for teams belonging to their active commanders. GMs may draw for Everyone, GM Only, or any team.
- Team drawing visibility is re-applied after Drawing creation/update, Foundry Drawing refresh/draw hooks, canvas pans, and commander changes.
- Hidden team drawings are made locally non-renderable and non-interactive for unauthorized players.
- The GM-only **Set Drawing Visibility** action remains available for retagging existing Foundry drawings.
- Untagged legacy Foundry drawings continue to behave as **Everyone** so existing map annotations are not unexpectedly hidden.
- GM always sees every tactical drawing.

All v0.5.0 combat, commander CP, General vision, ability, and Crown import features are retained.
