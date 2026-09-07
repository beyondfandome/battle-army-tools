# Crown Overview Tools v0.5.20

## My Turn dashboard
- My Turn — Characters now shows each character's primary stats, secondary stats, and current tile directly in the roster.
- Linked armies now show composition breakdown and upkeep instead of only total strength.
- Added a Build / Upgrade button to the My Turn character roster.

## Construction timing / build feedback
- Building bonuses are treated as inactive until their construction completion round.
- Tier 1 buildings activate after 1 round, Tier 2 after 2 rounds, and Tier 3 after 3 rounds.
- Inactive/under-construction buildings no longer provide training capacity, manpower, ship capacity, drydock unlocks, fortification, settlement/DC, or development economy bonuses before completion.
- Player build menus now show builder Statecraft and lock options the character cannot build.
- Failed player build requests now notify the requesting player as well as the GM.

## Navy disembark cleanup
- Disembarking now more aggressively clears stale army/navy transport flags.
- Fleet cargo movement only carries armies still explicitly marked as embarked.
- This prevents disembarked armies and their commanders from being dragged when the navy moves later.
