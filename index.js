// console.log('Hello World!') Linked!


// Variables

// The "Start" button
const startButton = document.getElementById('start-game')
// The game board
const game = document.getElementById('canvas')
// Twisted Fate Sprites
const tf = new Image()
tf.src = "Twisted_Fate.png"
// Game context is 2d
const ctx = game.getContext('2d')



// Functions

// When startButton is clicked, Start Game

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
    constructor(x, y, color, width, height, direction) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.speed = 20,
        this.direction = {
            up: (direction.up),
            down: (direction.down),
            left: (direction.left),
            right: (direction.right)
        },
        // we need two key based functions here that will change our hero's movement direction
        // this time, we'll only use WASD keys
        // setDirection will be tied to a keyDown event
        this.setDirection = function (key) {
            if (key.toLowerCase() == 'w') {
                this.direction.up = true
                this.direction.left = false
                this.direction.right = false
                this.direction.down = false
            } else if (key.toLowerCase() == 'a') { 
                this.direction.left = true
                this.direction.up = false
                this.direction.right = false
                this.direction.down = false
            } else if (key.toLowerCase() == 's') { 
                this.direction.down = true
                this.direction.up = false
                this.direction.right = false
                this.direction.left = false
            } else if (key.toLowerCase() == 'd') { 
                this.direction.right = true
                this.direction.up = false
                this.direction.left = false
                this.direction.down = false
            } 
        },
        this.moveProjectile = function () {
            if (this.direction.up) {
                this.y -= this.speed
            }
            if (this.direction.left) {
                this.x -= this.speed
            }
            if (this.direction.down) {
                this.y += this.speed
            }
            if (this.direction.right) {
                this.x += this.speed
            }
        },
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

function startGame() {
    startButton.remove()
    console.log('Game Started')
    
    let projectiles = []

    function gameLoop() {
        ctx.clearRect(0, 0, game.width, game.height)

        player.render()
        projectiles.forEach((projectile) => {
            projectile.moveProjectile()
            projectile.render()
        })
        player.movePlayer()
    }

    // function that 
    document.addEventListener('keydown', (event) => {
        if (event.key === 'j') {
        let xpos = player.x
        console.log(player.x)
        let ypos = player.y
        let direction = player.direction
        const projectile = new Projectile(xpos + 20, ypos + 15, 'darkgrey', 15, 15, direction)
        if ((direction.up) == false && (direction.right) == false && (direction.down) == false && (direction.left) == false) {
            Object.assign(projectile.direction.right = true)
        }
        projectiles.push(projectile)
        console.log(projectiles)
            // hit detection function
            function detectHit(thing) {
                if(projectile.x < thing.x + thing.width 
                    && projectile.x + projectile.width > thing.x
                    && projectile.y < thing.y + thing.height
                    && projectile.y + projectile.height > thing.y) {
                        console.log('Working')
                }
            }
        }
        function hitDetectLoop() {
            if (monster.alive) {
                monster.render()
                detectHit(monster)
            }
        }
        const hitInterval = setInterval(hitDetectLoop, 60)
    })

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
    const player = new TwistedFate(20, 20, 40, 40, true)
        // Create Monster
    const monster = new Monster(100, 400, 'green', 60, 60, true)
    
}


// Start Button
startButton.addEventListener('click', startGame)
