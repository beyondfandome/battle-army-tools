# Battle Army Tools v0.5.13

## Commander turn tracker fix

- Fixed the Battle Turn HUD reporting **No commanders found for current side** while tracking by Commander.
- Commander matching now understands all tracker modes: Team, Alliance, Commander, and Formation.
- **Commander** tracking is now presented as **Commander (grouped by Team)**. Each commander still receives an individual turn, while the automatically suggested turn order groups commanders under their battlefield Team.
- The compact Battle Turn HUD shows both **Team** and **Commander** during commander turns.
- The full GM tracker labels commander entries as `Team — Commander` while keeping the commander name as the authoritative turn key.
- Existing commander turn orders are repaired against the active commanders on the scene: valid custom ordering is preserved, stale/team-only entries are removed, and missing active commanders are appended.
- **End My Turn**, movement enforcement, combat enforcement, and command-token reset now agree on the active commander.
- Team tracking still works as before and shows all active commanders belonging to the active team.

## Preserved systems

- v0.5.12 controller-Actor ownership/deployment and reassignment.
- Normal player-unit sight behavior; the removed v0.5.6 vision optimization remains absent.
- Board-edge deployment, commander creation/management, combat, routing, terrain, tactical Drawings, HP bars, abilities, and undo.
