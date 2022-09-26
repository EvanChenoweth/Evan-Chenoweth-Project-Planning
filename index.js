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
// text box
const textBox = document.getElementById('textbox')
// bottom container
const bottomContainer = document.getElementById('bottom-container')



// Functions

// When startButton is clicked, Start Game

// Twisted Fate Class
class TwistedFate {
    constructor(x, y, width, height, alive) {
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height,
        this.health = 30,
        this.alive = alive,
        this.speed = 10,
        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false
        },
        // we need two key based functions here that will change our hero's movement direction
        // this time, we'll only use WASD keys
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
    constructor(x, y, color, width, height, alive, direction) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.health = 8
        this.alive = alive,
        this.speed = 6,
        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false
        },
        this.moveMonster = function () {
            // moveMonster, sends our monsters flying in whatever direction is true
            if (this.direction.up) {
                this.y -= this.speed
                // while we're tracking movement, let's stop our monster from exiting the top of the screen
                if (this.y <= 0) {
                    this.y = 0
                }
            }
            if (this.direction.left) {
                this.x -= this.speed
                // while we're tracking movement, let's stop our monster from exiting the top of the screen
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
    playAgainBtn.remove()
    textBox.innerText = 'You Must Kill All GREEN Monsters Before Killing The RED Monster!'
    console.log('Game Started')
    
    let projectiles = []

    function gameLoop() {
        ctx.clearRect(0, 0, game.width, game.height)

        if (player.alive == true) {
            player.render()
        } else {
            stopGameLoop()
        }

        if (monster.alive) {
            monster.render()
        }

        if (monsterRandom.alive) {
            monsterRandom.render()
            monster.health = 8,
            monster.alive = true;
            monsterRandom.moveMonster()
        }

        // if first random monster has been defeated, render monsterRandom#1 and #2
        if (monsterRandom.alive == false && monsterRandom1.alive == true) {
            monsterRandom1.render()
            monster.health = 8,
            monster.alive = true;
            monsterRandom1.moveMonster()
        }

        if (monsterRandom.alive == false && monsterRandom2.alive == true) {
            monsterRandom2.render()
            monster.health = 8,
            monster.alive = true;
            monsterRandom2.moveMonster()
        }

        if (monsterRandom1.alive == false && monsterRandom2.alive == false && monsterRandom3.alive == true) {
            monsterRandom3.render()
            monster.health = 8,
            monster.alive = true;
            monsterRandom3.moveMonster()
        }

        if (monsterRandom1.alive == false && monsterRandom2.alive == false && monsterRandom4.alive == true) {
            monsterRandom4.render()
            monster.health = 8,
            monster.alive = true;
            monsterRandom4.moveMonster()
        }

        if (monsterRandom1.alive == false && monsterRandom2.alive == false && monsterRandom5.alive == true) {
            monsterRandom5.render()
            monster.health = 8,
            monster.alive = true;
            monsterRandom5.moveMonster()
        }

        if (monster.alive == false) {
            ctx.clearRect(0, 0, game.width, game.height)
            stopGameLoop()
        }

        projectiles.forEach((projectile) => {
            projectile.moveProjectile()
            projectile.render()
        })

        player.movePlayer()
        monsterDirection()
        monsterDirectionRandom()
        monsterDirectionRandom1()
        monsterDirectionRandom2()
        monsterDirectionRandom3()
        monsterDirectionRandom4()
        monsterDirectionRandom5()
        monster.moveMonster()
    }

    // function that assigns projectile location and direction and handles hit detection
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
        if ((direction.left) == true && (direction.right) == true) {
            Object.assign(projectile.direction.left = false)
        }
        projectiles.push(projectile)
        console.log(projectiles)
            // hit detection function
            function detectHit(thing) {
                if(projectile.x < thing.x + thing.width 
                    && projectile.x + projectile.width > thing.x
                    && projectile.y < thing.y + thing.height
                    && projectile.y + projectile.height > thing.y) {
                        thing.health --
                }
            }
            function hitDetectLoop() {
                if (monster.alive) {
                    detectHit(monster)
                    if (monster.health <= 0) {
                        monster.alive = false
                    }
                }
                if (monsterRandom.alive) {
                    detectHit(monsterRandom)
                    console.log(monsterRandom.health)
                    if (monsterRandom.health <= 0) {
                        monsterRandom.alive = false
                    }
                }
                if (monsterRandom1.alive) {
                    detectHit(monsterRandom1)
                    console.log(monsterRandom1.health)
                    if (monsterRandom1.health <= 0) {
                        monsterRandom1.alive = false
                    }
                }
                if (monsterRandom2.alive) {
                    detectHit(monsterRandom2)
                    console.log(monsterRandom2.health)
                    if (monsterRandom2.health <= 0) {
                        monsterRandom2.alive = false
                    }
                }
                if (monsterRandom3.alive) {
                    detectHit(monsterRandom3)
                    console.log(monsterRandom3.health)
                    if (monsterRandom3.health <= 0) {
                        monsterRandom3.alive = false
                    }4
                }
                if (monsterRandom4.alive) {
                    detectHit(monsterRandom4)
                    console.log(monsterRandom4.health)
                    if (monsterRandom4.health <= 0) {
                        monsterRandom4.alive = false
                    }
                }
                if (monsterRandom5.alive) {
                    detectHit(monsterRandom5)
                    console.log(monsterRandom5.health)
                    if (monsterRandom5.health <= 0) {
                        monsterRandom5.alive = false
                    }
                }
            }
            const hitInterval = setInterval(hitDetectLoop, 60)
        }
    })

    function detectPlayerHit(thing) {
        if(monster.x < thing.x + thing.width 
            && monster.x + monster.width > thing.x
            && monster.y < thing.y + thing.height
            && monster.y + monster.height > thing.y) {
                thing.health --
                textBox.innerText = 'Oww that hurts! Health: ' + player.health + '/30'
        }
    }
    function detectPlayerHit1(thing) {
        if(monsterRandom.x < thing.x + thing.width 
            && monsterRandom.x + monsterRandom.width > thing.x
            && monsterRandom.y < thing.y + thing.height
            && monsterRandom.y + monsterRandom.height > thing.y) {
                thing.health --
                textBox.innerText = 'Oww that hurts! Health: ' + player.health + '/30'
        }
    }
    function detectPlayerHit2(thing) {
        if(monsterRandom1.x < thing.x + thing.width 
            && monsterRandom1.x + monsterRandom1.width > thing.x
            && monsterRandom1.y < thing.y + thing.height
            && monsterRandom1.y + monsterRandom1.height > thing.y) {
                thing.health --
                textBox.innerText = 'Oww that hurts! Health: ' + player.health + '/30'
        }
    }
    function detectPlayerHit3(thing) {
        if(monsterRandom2.x < thing.x + thing.width 
            && monsterRandom2.x + monsterRandom2.width > thing.x
            && monsterRandom2.y < thing.y + thing.height
            && monsterRandom2.y + monsterRandom2.height > thing.y) {
                thing.health --
                textBox.innerText = 'Oww that hurts! Health: ' + player.health + '/30'
        }
    }
    function detectPlayerHit4(thing) {
        if(monsterRandom3.x < thing.x + thing.width 
            && monsterRandom3.x + monsterRandom3.width > thing.x
            && monsterRandom3.y < thing.y + thing.height
            && monsterRandom3.y + monsterRandom3.height > thing.y) {
                thing.health --
                textBox.innerText = 'Oww that hurts! Health: ' + player.health + '/30'
        }
    }
    function detectPlayerHit5(thing) {
        if(monsterRandom4.x < thing.x + thing.width 
            && monsterRandom4.x + monsterRandom4.width > thing.x
            && monsterRandom4.y < thing.y + thing.height
            && monsterRandom4.y + monsterRandom4.height > thing.y) {
                thing.health --
                textBox.innerText = 'Oww that hurts! Health: ' + player.health + '/30'
        }
    }
    function detectPlayerHit6(thing) {
        if(monsterRandom5.x < thing.x + thing.width 
            && monsterRandom5.x + monsterRandom5.width > thing.x
            && monsterRandom5.y < thing.y + thing.height
            && monsterRandom5.y + monsterRandom5.height > thing.y) {
                thing.health --
                textBox.innerText = 'Oww that hurts! Health: ' + player.health + '/30'
        }
    }
    function playerHitDetectLoop() {
        if (player.alive) {
            detectPlayerHit(player)
            if (monsterRandom.alive == true) {
                detectPlayerHit1(player)
            }
            if (monsterRandom.alive == false && monsterRandom1.alive == true) {
                detectPlayerHit2(player)
            }
            if (monsterRandom.alive == false && monsterRandom2.alive == true) {
                detectPlayerHit3(player)
            }
            if (monsterRandom1.alive == false && monsterRandom2.alive == false && monsterRandom3.alive == true) {
                detectPlayerHit4(player)
            }
            if (monsterRandom1.alive == false && monsterRandom2.alive == false && monsterRandom4.alive == true) {
            detectPlayerHit5(player)
            }
            if (monsterRandom1.alive == false && monsterRandom2.alive == false && monsterRandom5.alive == true) {
            detectPlayerHit6(player)
            }
            if (player.health <= 0) {
                player.alive = false
            }
        }
    }
    const playerHitInterval = setInterval(playerHitDetectLoop, 60)


    // at the time of making all of this i decided that I actually don't know what a for loop is :)
    // definitely on the to-do list.
    const monsterDirection = function () {
        if (monster.x < player.x) {
            monster.direction.right = true
            monster.direction.left = false
        }
        if (monster.x > player.x) {
            monster.direction.left = true
            monster.direction.right = false
        }
        if (monster.y < player.y) {
            monster.direction.down = true
            monster.direction.up = false
        }
        if (monster.y > player.y) {
            monster.direction.up = true
            monster.direction.down = false
        }
    }

    const monsterDirectionRandom = function () {
        if (monsterRandom.x < player.x) {
            monsterRandom.direction.right = true
            monsterRandom.direction.left = false
        }
        if (monsterRandom.x > player.x) {
            monsterRandom.direction.left = true
            monsterRandom.direction.right = false
        }
        if (monsterRandom.y < player.y) {
            monsterRandom.direction.down = true
            monsterRandom.direction.up = false
        }
        if (monsterRandom.y > player.y) {
            monsterRandom.direction.up = true
            monsterRandom.direction.down = false
    }
}

    const monsterDirectionRandom1 = function () {
        if (monsterRandom1.x < player.x) {
            monsterRandom1.direction.right = true
            monsterRandom1.direction.left = false
        }
        if (monsterRandom1.x > player.x) {
            monsterRandom1.direction.left = true
            monsterRandom1.direction.right = false
        }
        if (monsterRandom1.y < player.y) {
            monsterRandom1.direction.down = true
            monsterRandom1.direction.up = false
        }
        if (monsterRandom1.y > player.y) {
            monsterRandom1.direction.up = true
            monsterRandom1.direction.down = false
    }
}

    const monsterDirectionRandom2 = function () {
        if (monsterRandom2.x < player.x) {
            monsterRandom2.direction.right = true
            monsterRandom2.direction.left = false
        }
        if (monsterRandom2.x > player.x) {
            monsterRandom2.direction.left = true
            monsterRandom2.direction.right = false
        }
        if (monsterRandom2.y < player.y) {
            monsterRandom2.direction.down = true
            monsterRandom2.direction.up = false
        }
        if (monsterRandom2.y > player.y) {
            monsterRandom2.direction.up = true
            monsterRandom2.direction.down = false
        }
    }

    const monsterDirectionRandom3 = function () {
        if (monsterRandom3.x < player.x) {
            monsterRandom3.direction.right = true
            monsterRandom3.direction.left = false
        }
        if (monsterRandom3.x > player.x) {
            monsterRandom3.direction.left = true
            monsterRandom3.direction.right = false
        }
        if (monsterRandom3.y < player.y) {
            monsterRandom3.direction.down = true
            monsterRandom3.direction.up = false
        }
        if (monsterRandom3.y > player.y) {
            monsterRandom3.direction.up = true
            monsterRandom3.direction.down = false
        }
    }

    const monsterDirectionRandom4 = function () {
        if (monsterRandom4.x < player.x) {
            monsterRandom4.direction.right = true
            monsterRandom4.direction.left = false
        }
        if (monsterRandom4.x > player.x) {
            monsterRandom4.direction.left = true
            monsterRandom4.direction.right = false
        }
        if (monsterRandom4.y < player.y) {
            monsterRandom4.direction.down = true
            monsterRandom4.direction.up = false
        }
        if (monsterRandom4.y > player.y) {
            monsterRandom4.direction.up = true
            monsterRandom4.direction.down = false
        }
    }

    const monsterDirectionRandom5 = function () {
        if (monsterRandom5.x < player.x) {
            monsterRandom5.direction.right = true
            monsterRandom5.direction.left = false
        }
        if (monsterRandom5.x > player.x) {
            monsterRandom5.direction.left = true
            monsterRandom5.direction.right = false
        }
        if (monsterRandom5.y < player.y) {
            monsterRandom5.direction.down = true
            monsterRandom5.direction.up = false
        }
        if (monsterRandom5.y > player.y) {
            monsterRandom5.direction.up = true
            monsterRandom5.direction.down = false
        }
    }

    const randomPlaceMonster = (max) => {
        // we can use math random and canvas dimensions for this
        return Math.floor(Math.random() * max)
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
    const player = new TwistedFate(20, 20, 40, 40, true)
        // Create Monster
    const monster = new Monster(100, 400, 'red', 60, 60, true)
    
    const monsterRandom = new Monster(randomPlaceMonster(game.width), randomPlaceMonster(game.height), 'green', 60, 60, true)
    const monsterRandom1 = new Monster(randomPlaceMonster(game.width), randomPlaceMonster(game.height), 'green', 60, 60, true)
    const monsterRandom2 = new Monster(randomPlaceMonster(game.width), randomPlaceMonster(game.height), 'green', 60, 60, true)
    const monsterRandom3 = new Monster(randomPlaceMonster(game.width), randomPlaceMonster(game.height), 'green', 60, 60, true)
    const monsterRandom4 = new Monster(randomPlaceMonster(game.width), randomPlaceMonster(game.height), 'green', 60, 60, true)
    const monsterRandom5 = new Monster(randomPlaceMonster(game.width), randomPlaceMonster(game.height), 'green', 60, 60, true)

    const stopGameLoop = () => {
        bottomContainer.appendChild(playAgainBtn)
            // Append Play Again Button
        ctx.clearRect(0, 0, game.width, game.height)
        if (player.alive == true) {
            textBox.innerText = " Congratulations! You Won!!! "
            ctx.clearRect(0, 0, game.width, game.height)
        } else {
            textBox.innerText = " Try Harder Next Time. You lost. "
            ctx.clearRect(0, 0, game.width, game.height)
        }
        clearInterval(gameInterval)
    }

}


// Start Button
startButton.addEventListener('click', startGame)
// Play Again button
const playAgainBtn = document.createElement('button')
playAgainBtn.setAttribute('id', 'start-game')
playAgainBtn.innerText = 'Play Again?'
playAgainBtn.addEventListener('click', startGame)
