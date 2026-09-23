# Battle Army Tools v0.3.1

- Adds GM **Create Commander** workflow using the existing `Commander_Template` Actor.
- Assigns each commander to a Foundry player and gives that player OWNER permission on the commander Actor.
- Active commanders can be spawned from the selected deployment anchor.
- Deploy / Assign Units now inherits player ownership automatically from the selected commander.
- Commander/player ownership IDs are stored on deployed battle units and used by End My Turn validation.
- Adds **Manage Commanders** with per-battle Active/Inactive toggles.
- Adds **End Battle: All Inactive** without deleting commander/player assignments.
- Reassigning a commander updates the ownership metadata of that commander’s existing battlefield units.
