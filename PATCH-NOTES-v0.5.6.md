# Crown Overview Tools v0.5.6

## My Turn dashboard — Navy support

The character dashboard now includes the character's linked navy alongside their linked army.

For each linked navy it shows:
- total ships
- current navy location
- navy movement used / maximum / remaining
- ship composition
- troop transport used / capacity
- number of embarked armies
- navy movement lock reason, when applicable

New dashboard actions:
- **Navy** — select/focus the linked fleet
- **Move Navy** — select the fleet and launch the existing World Path Move system
- **Embark Army** — select the linked army and launch the existing embarkation workflow
- **Disembark** — select the linked fleet and launch the existing disembarkation workflow

Character movement and navy movement remain separate pools. The dashboard does not duplicate movement or embarkation rules; it launches the module's existing authoritative systems.
