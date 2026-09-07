# Crown Overview Tools v0.5.16

## Allegiance transfer hardening
- A successful **Diplomatic Takeover** explicitly saves the conquering player House to both:
  - World Tile `allegiance`
  - House Data `allegiance`
- A successful **Siege / Storm** does the same.
- The local/original House name is preserved; conquest does **not** rename the local House.
- Siege now resolves the conquering House from the linked commander/player assignment using the same canonical House logic used by diplomacy.
- Army `allegiance` is preferred over a legacy army House/faction stamp when no linked commander is available.
- Both transfer paths now verify the saved allegiance after writing. A takeover will error instead of reporting success if World Tile and House Data do not actually contain the expected allegiance.
- Controller ownership continues to change with allegiance, so the province feeds into **My Holdings**.

All v0.5.15 manpower and character-menu fixes are retained.
