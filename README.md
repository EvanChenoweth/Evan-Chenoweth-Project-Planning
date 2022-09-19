# Evan-Chenoweth-Project-Planning

Game Project Planning

As a player I can…
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
 - Some anticipated problems:
 - how do I make the map scroll to the side (move the map around the character and have the map zoomed in as to give the illusion that the character is moving around the map?)
 - how do I create a more precise area for which my character to be able to move around so that he cannot walk through the areas of the map sprite intended to be walls (hit detection at any walls that return them to the location outside of that wall?
Technologies I will use:

HTML 5
CSS
Javascript
Canvas


Current idea for creating projectiles:

Call a function to create an element that inherits its direction value from the player and that inherits its creation position from the players current position.

Current idea for making AI’s attack the player:

Have the enemies walk toward the players current position on every frame or at every time the setInterval is executed. The enemy classes (minions and boss) will have slightly higher movement speed values than the player to accommodate their inability to show skill expression and being overly predictable.

Current rough ideas for game play-through:

Start the game, navigate the map and kill enemies until obtaining the blue card. Then navigate the map and kill some enemies before obtaining the red card. Lastly navigate the map and kill some enemies until finally finding the Yellow card, upon collecting the yellow card, initiate the boss battle and if the player manages to kill the boss at the end of that, trigger the game end and display the win screen.

If at any point the players health value (initially set to 3) drops to 1 (health - 1 per instance of hit detection from an enemy) the player loses, triggered game end and lose screen being displayed.
(I will need to explore the numbers of health and damage a bit depending on whether or not I can find a good way to use an interval timer to prevent the player from taking damage for a couple seconds after being hit by an enemy)


Some sprites and cool design concepts are going to be in my repo or on slack. I’m really excited to attempt this project although it does seem a little daunting. I feel like I have the tools necessary to complete it though, and it should put me well outside of my comfort zone and force me to learn through some obstacles.

// WIREFRAME (Content of the Canvas Area will change depending on player position)

![UntitledGameWireframe](https://user-images.githubusercontent.com/46133394/191044679-a54eefb2-9d27-4350-8f65-ae822a20d5eb.png)

And here is an image of the player sprite I want to use. The monster/minion sprite is still TBD. I also have a friend who said they will help me with creating some of the art and animations of characters if that's okay.

![TwistedFateSprite](https://user-images.githubusercontent.com/46133394/191017051-9c5db368-3ef0-48f4-afe8-5a95d275c669.png)
