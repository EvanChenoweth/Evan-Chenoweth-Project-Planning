# Evan-Chenoweth-Project-Planning
<!-- replace this line with the name of the game? -->

<!-- add a screenshot of the deployed game labeled with the version it is while your in here  -->
<!-- also, an elevator pitch / description of the app -->

<!-- make it a header , h2 ? see link for markdown tips https://www.markdownguide.org/cheat-sheet/ ( i personally love separating sections with 'horizontal rule'-->
Game Project Planning
<!-- label as user stories  -->
As a player I can…
<!-- split user story list into mvp/V1, V2 and V3/ stretch goals ? -->
 - start the game
 - move my character
 - shoot linear projectiles
 - obtain 3 cards (red, blue, yellow)
 - kill enemy minions
 - kill enemy boss
 - use abilities (unlocked when each obtainable card is obtained)
 - Blue ability = temporary movement speed increase and damage projectile
 - Red ability = AoE damage projectile
 - Yellow ability = Stun target and damage projectile
 - Win the game by killing the boss (generated after obtaining the third card)
 - be killed by enemy boss
 - be killed by enemy minions
 - projectiles created by player will have hit detection for dealing damage to enemies
 - Minions will have hit detection onto player for dealing damage to player
 - Player will not be able to cause collision damage to enemies and therefore will not have hit detection onto enemies
 - Be able to lose the game if lose all 3 lives
 <!-- leave rhetorical questions out of User stories -->
 <!-- make this it's own section -->
 <!-- also, consider adding another attached section to this one where you discuss your implemented solutions to these problems and development process / story. closing with  potential next steps -->
 - Some anticipated problems:
 
 - how do I make the map scroll to the side (move the map around the character and have the map zoomed in as to give the illusion that the character is moving around the map?)
 - how do I create a more precise area for which my character to be able to move around so that he cannot walk through the areas of the map sprite intended to be walls (hit detection at any walls that return them to the location outside of that wall?
 <!-- header! -->
Technologies I will use:
<!--  be consistent, above you used an unordered list, do se here as well -->
HTML 5
CSS
<!-- JavaScript, the S is capitalized -->
Javascript
Canvas

<!-- make its own section next to the anticipated problems one, love seeing your thought process and you thinking through the issues here lets highlight that strength   -->
Current idea for creating projectiles:

Call a function to create an element that inherits its direction value from the player and that inherits its creation position from the players current position.

Current idea for making AI’s attack the player:

Have the enemies walk toward the players current position on every frame or at every time the setInterval is executed. The enemy classes (minions and boss) will have slightly higher movement speed values than the player to accommodate their inability to show skill expression and being overly predictable.

<!-- may be redundant with user stories, consider a refactor/ consolidation -->
Current rough ideas for game play-through:

Start the game, navigate the map and kill enemies until obtaining the blue card. Then navigate the map and kill some enemies before obtaining the red card. Lastly navigate the map and kill some enemies until finally finding the Yellow card, upon collecting the yellow card, initiate the boss battle and if the player manages to kill the boss at the end of that, trigger the game end and display the win screen.

If at any point the players health value (initially set to 3) drops to 1 (health - 1 per instance of hit detection from an enemy) the player loses, triggered game end and lose screen being displayed.
(I will need to explore the numbers of health and damage a bit depending on whether or not I can find a good way to use an interval timer to prevent the player from taking damage for a couple seconds after being hit by an enemy)


Some sprites and cool design concepts are going to be in my repo or on slack. I’m really excited to attempt this project although it does seem a little daunting. I feel like I have the tools necessary to complete it though, and it should put me well outside of my comfort zone and force me to learn through some obstacles.

<!-- make a header, // does not add comments in markdown  -->
// WIREFRAME (Content of the Canvas Area will change depending on player position)

![UntitledGameWireframe](https://user-images.githubusercontent.com/46133394/191044679-a54eefb2-9d27-4350-8f65-ae822a20d5eb.png)
<!-- consider more descriptive alt text so somebody who can't see the image might understand what's supposed to be there ( don't go too crazy ) -->
![Room 2](https://user-images.githubusercontent.com/46133394/191080810-7a445384-37ac-4569-ba1f-53999507711e.png)

![Room 3](https://user-images.githubusercontent.com/46133394/191080876-7b3228c6-7008-4220-adbd-a004fdff3d6e.png)

![Room 4](https://user-images.githubusercontent.com/46133394/191080888-a1dc335b-55e4-468d-81a1-214ff56a50b9.png)

<!-- it is ok as long as you give your friend / creator credit !  -->
And here is an image of the player sprite I want to use. The monster/minion sprite is still TBD. I also have a friend who said they will help me with creating some of the art and animations of characters if that's okay.

![TwistedFateSprite](https://user-images.githubusercontent.com/46133394/191017051-9c5db368-3ef0-48f4-afe8-5a95d275c669.png)
