# Battle Army Tools v0.2.7

- Added a player-only **End My Turn** button to the Battle Actions panel.
- Players can only end the currently active turn when they own at least one battle unit belonging to that active Team / Alliance / Commander / Formation.
- End Turn is sent to the active GM client, which safely updates the scene turn state.
- Ending a turn advances to the next entry in the existing battle turn order.
- The final player turn does **not** automatically start a new round. The tracker enters **Waiting for GM to advance the round** state instead.
- GMs do not get an End My Turn button; their job remains advancing the round as a whole with the round-clock control.
- Turn endings are posted to chat for an audit trail.
- Retains the v0.2.6 one-attack-per-turn enforcement.
