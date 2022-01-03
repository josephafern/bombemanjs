Background

I will be recreating the classic Nintendo game Bomberman. The 2D game will consist of one player, whose movement and actions are key-responsive, vs an AI where the objective is to drop bombs that explode after a delay and eliminate your opponent by catching them in one of your explosions. The AI will use the player’s current location and location of all currently dropped bombs to decide where to move and when to drop a bomb. When a player is in range of a bomb explosion when the bomb detonates (after a setTimeout), then that player is eliminated and the game is over. I will also attempt to implement a timer that will end the game as a draw if no player eliminated the other within the time allotted. 

I plan on utilizing Canvas to render images to the screen and DOM manipulation to handle the gameplay. I will likely need a GameView to render and display players and the setting images the canvas. I will also need to setTimeouts for bomb explosions as well as setIntervals for movement that respond to specific keys on the keyboard. The menu screen and settings functionality will likely be click-responsive. Time permitting, I will also create an original remix of the Bomberman theme song to loop in the background (which may perhaps require Web Audio API?) as well as create a power-up that increases the range of bomb explosions. 

Functionality & MVP

The project includes:
	
	-Players that move NSEW at the touch of a key
	-Clickable Enter and Start buttons
	-Players that drop bombs with the spacebar
	-Bombs that explode after a three minute time delay
	-Bombs that eliminate players in the vicinity of an explosion
	-Ending of game upon elimination of one player or exhausting of allotted time
	-Blocks that are impassible
	-Blocks that are destroyable and passible

The project also includes:
	
	-Background music
	-Time-randomized, bomb-enhancing power-ups
	-AI Computer Player
	-Game instructions

Technologies

The technologies I currently plan on utilizing include but aren’t limited to Canvas and Vanilla DOM. If I can implement a music loop without the use of Web Audio API, I will do so.

Production Timeline

	Friday / Weekend
	
		-Create a Player, Bomb, Block, Game, GameView Class
		-Create functional menu and instructions screen
		-Implement Player movement on Board / Canvas
	
	Monday

		-Implement Collision detection for Players / Bombs
		-Implement timer and game execution

	Tuesday
	
		-Implement AI Computer Player class and methods
		-Implement Power Up class and methods

	Wednesday

		-Add music and mute button to project
		-Clean up and refactor 

General Wireframe

		See file 'wireframe.pdf'
