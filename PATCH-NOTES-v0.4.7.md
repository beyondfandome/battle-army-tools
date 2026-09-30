# Battle Army Tools v0.4.7

- Added a GM-only **Pause / Resume Movement Restrictions** control to Battle Actions. Paused movement is free repositioning and does not consume or reset previously spent movement.
- Hardened **Advance Round** so the GM authoritatively begins the next round, resets per-round movement/attack state and active commander Command Points, preserves heavy-siege reload timing, saves tracker state, refreshes the tracker, and announces the new round in chat.
- Enforced **vision on General tokens** during commander spawning and battle-tool refresh, including existing General/commander tokens.
- No siege Actor auto-creation changes are included in this release.
