# Crown Overview Tools v0.5.10

## Fixed: diplomatic takeover not appearing in House holdings
- Successful diplomatic takeovers now resolve the **attacking character’s assigned player/controller first**.
- The GM/requesting user is only used as a fallback when the character has no controller assignment.
- This fixes cases such as the Foresters where the province could receive the correct House name but the wrong player controller ID, preventing it from appearing in **My Holdings** and other controller-based House systems.
- Takeover history now records both the requester and the controller who actually received the province for easier auditing.
- Canonical House resolution now uses the resolved character controller, so House-name recovery from existing holdings follows the correct player.
