# Battle Army Tools v0.5.4

## Team Drawing visibility fix
- Fixes team tactical drawings remaining visible to other teams on Foundry v13.
- Foundry v13 may render a Drawing's actual geometry as a separate `PrimaryGraphics` object in the Primary Canvas Group.
- Team visibility now hides/shows the Drawing placeable plus its shape, text, frame, controls, and control icon on each client.
- Adds generic `drawObject` / `refreshObject` enforcement alongside Drawing-specific hooks.
- Adds delayed re-enforcement after Foundry redraws canvas objects.
- GM still sees all drawings; players see Everyone plus their own active commander's team drawings.

Retains v0.5.3 Undo Last Combat and the v0.5.2 Drawing schema compatibility fix.
