# Battle Army Tools v0.5.15

## Battle vision

- Every BAT battle unit now has Foundry token sight enabled.
- Ordinary troops preserve their Actor/prototype sight distance; BAT only guarantees that sight is enabled.
- General/commander tokens retain the established vision range of 8.
- Every unit whose BAT type is `Siege Engine` has sight range synchronized to its BAT `range` stat.
  - Battering Ram: 1 by default
  - Ballista: 10 by default
  - Catapult: 18 by default
  - Trebuchet: 24 by default
- Existing battlefield units are normalized when the battle canvas loads, so the change applies without requiring redeployment.
- Changing a Siege Engine's Range in Scene Unit Balance also updates its sight range.
- Deployment and player reassignment both reapply the correct vision policy.

## Retained from v0.5.14

- Five-minute synchronized turn timer with automatic advance at 0:00.
- GM Pause/Resume and Reset 5:00 controls.
- Player assignment by Selected Units, Team, Alliance, Commander, or Formation with exclusive ownership replacement.
- v0.5.13 multi-commander team tracking and prior combat/deployment behavior.
