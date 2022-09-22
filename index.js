// console.log('Hello World!') Linked!


// Variables

// The "Start" button
const startButton = document.getElementById('start-game')
// The game board
const game = document.getElementById('canvas')
// Twisted Fate Sprites
const tf = new Image()
tf.src = "Twisted_Fate.png"
// Movement of objects
const movement = document.getElementById('movement')
// Game context is 2d
const ctx = game.getContext('2d')



// Functions

// When startButton is clicked, Start Game
function startGame() {
    startButton.remove()
    console.log('Game Started')
    
    function gameLoop() {
        ctx.clearRect(0, 0, game.width, game.height)

        player.render()
        player.movePlayer()
        monster.render()
    }

    // function that changes the player's direction
document.addEventListener('keydown', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection(e.key)
})

// function that stops the player direction
document.addEventListener('keyup', (e) => {
    // when a key is released, call the unsetDirection method
    player.unsetDirection(e.key)
})

// Sets the game width and height to be the same as canvas size.
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

// used to render the game every 60 ms
const gameInterval = setInterval(gameLoop, 60)

    // Create TF
const player = new TwistedFate(0, 0, 40, 40, true)
    // Create Monster
const monster = new Monster(100, 400, 'green', 60, 60, true)
    // Create Projectile
const projectile = new Projectile(player.x, player.y, 'darkgrey', 15, 15)
}

// Twisted Fate Class
class TwistedFate {
    constructor(x, y, width, height, alive) {
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height,
        this.alive = alive,
        // we need two additional properties in order to make our hero move around a little smoother.
        this.speed = 8,
        // because we're going to rework our movement handler, we need directions, set to be different values that we can update with a keypress
        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false
        },
        // we need two key based functions here that will change our hero's movement direction
        // this time, we'll only use WASD keys(purely for the sake of time)
        // setDirection will be tied to a keyDown event
        this.setDirection = function (key) {
            if (key.toLowerCase() == 'w') { this.direction.up = true }
            if (key.toLowerCase() == 'a') { this.direction.left = true }
            if (key.toLowerCase() == 's') { this.direction.down = true }
            if (key.toLowerCase() == 'd') { this.direction.right = true }
        },
        // unsetDirection will be tied to a keyUp event
        this.unsetDirection = function (key) {
            if (key.toLowerCase() == 'w') { this.direction.up = false }
            if (key.toLowerCase() == 'a') { this.direction.left = false }
            if (key.toLowerCase() == 's') { this.direction.down = false }
            if (key.toLowerCase() == 'd') { this.direction.right = false }
        },
        // we're also adding a movePlayer function that is tied to our directions
        this.movePlayer = function () {
            // movePlayer, sends our guy flying in whatever direction is true
            if (this.direction.up) {
                this.y -= this.speed
                // while we're tracking movement, let's stop our hero from exiting the top of the screen
                if (this.y <= 0) {
                    this.y = 0
                }
            }
            if (this.direction.left) {
                this.x -= this.speed
                // while we're tracking movement, let's stop our hero from exiting the top of the screen
                if (this.x <= 0) {
                    this.x = 0
                }
            }
            if (this.direction.down) {
                this.y += this.speed
                // for down, and right, we need the entire character for our detection of the wall, as well as the canvas width and height
                if (this.y + this.height >= game.height) {
                    this.y = game.height - this.height
                }
            }
            if (this.direction.right) {
                this.x += this.speed
                // while we're tracking movement, let's stop our hero from exiting the top of the screen
                // for down, and right, we need the entire character for our detection of the wall, as well as the canvas width and height
                if (this.x + this.width >= game.width) {
                    this.x = game.width - this.width
                }
            }
        },
        this.render = function () {
            ctx.drawImage(tf, this.x, this.y)
        }
    }
}

// Monster Class
class Monster {
    constructor(x, y, color, width, height, alive) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = alive,
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

class Projectile {
    constructor(x, y, color, width, height) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.speed = 15,
        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false
        },
        this.setDirection = function (key) {
            if (key.toLowerCase() == 'w') { this.direction.up = true }
            if (key.toLowerCase() == 'a') { this.direction.left = true }
            if (key.toLowerCase() == 's') { this.direction.down = true }
            if (key.toLowerCase() == 'd') { this.direction.right = true }
        },
        // we're also adding a movePlayer function that is tied to our directions
        this.moveProjectile = function () {
            // moveProjectile, sends our projectile flying in whatever direction is true
            if (this.direction.up) {
                this.y -= this.speed
                if (this.y <= 0) {
                    this.y = 0
                }
            }
            if (this.direction.left) {
                this.x -= this.speed
                if (this.x <= 0) {
                    this.x = 0
                }
            }
            if (this.direction.down) {
                this.y += this.speed
                // for down, and right, we need the entire character for our detection of the wall, as well as the canvas width and height
                if (this.y + this.height >= game.height) {
                    this.y = game.height - this.height
                }
            }
            if (this.direction.right) {
                this.x += this.speed
                // while we're tracking movement, let's stop our projectile from exiting the top of the screen
                // for down, and right, we need the entire character for our detection of the wall, as well as the canvas width and height
                if (this.x + this.width >= game.width) {
                    this.x = game.width - this.width
                }
            }
        },
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

// Start Button
startButton.addEventListener('click', startGame)
