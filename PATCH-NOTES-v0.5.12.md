# Crown Overview Tools v0.5.12

## Mustering / Holdings identity fix
- Explicit `controllerPlayerUserId/controllerPlayerName` now takes priority over legacy token/actor owner fields when determining which player realm a character belongs to.
- Army manpower now derives directly from that player’s **My Holdings** result, filtered to non-sea provinces. There is no longer a separate ownership algorithm for mustering.
- The muster dialog shows the resolved **Realm Controller** and labels the counted total as **land provinces** for easier diagnosis.
- Pending army/navy muster ownership now uses the same resolved character controller, avoiding stale original-token owner data.

## Political ownership model retained
- A province keeps its original/local House name after conquest.
- Diplomacy and siege change political allegiance/controller to the conquering player House.
- My Holdings remains controller-driven, so sworn/conquered Houses contribute to the conquering realm without being renamed.
