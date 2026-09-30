# Battle Army Tools v0.5.2

## Tactical Drawing compatibility fix
- Fixed `DrawingDocument` validation errors on Foundry v13 when creating tactical arrows, lines, rectangles, circles, or text.
- Tactical drawings now resolve the active Foundry runtime's `ShapeData.TYPES` values instead of writing long-form shape names such as `polygon` directly.
- Includes safe v13-compatible fallbacks (`p`, `r`, `e`) if the runtime constants are unavailable.
- Team drawing visibility and GM-brokered player drawing creation remain unchanged.
