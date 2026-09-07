# Crown Overview Tools v0.5.7

## Strategic transport rule
- Embarking an army requires that the army has spent **no movement yet that turn**.
- Its commander must also have spent **no movement yet that turn**.
- A successful embark immediately consumes the full movement allowance of both army and commander.
- Disembarking follows the same rule: the army and commander must have their full movement available, and landing consumes all of it.
- An army cannot embark and disembark in the same turn.
- Moving on land and then embarking in the same turn is no longer allowed.
- After disembarking, neither the army nor commander can continue moving until movement resets.
- Navy movement remains its own separate movement pool.

## Additional hardening
- Province transfers now attempt rollback if one of the paired World Tile / House Data writes fails.
- Siege checks House ownership as well as Foundry player-controller ownership.
- The My Turn navy dashboard now calculates transport use from the same live embarked-army helpers used by the actual embarkation rules, preventing stale display values.
