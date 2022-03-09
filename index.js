const canvas = document.querySelector('#canvas')
const canvasWidth = 1200
const context = canvas.getContext('2d')

//for start popup
const startbutton = document.querySelector('#start');
const popUp = document.querySelector('section.popUp');

const startAudio = document.querySelector('.gamePlay')
//startAudio.loop = true
startbutton.addEventListener('click', function(event){
    popUp.classList.add('hidden')
    // if(playerAlive === true){
    //     startAudio.play()
    // }
     animate()
 })

// popUp.addEventListener('click', function(){
//     popUp.classList.add('hidden')
// })



// startgame



const mariaImg = new Image()
mariaImg.src = ('./images/Girlrun.png')
const backgroundImg = new Image()
backgroundImg.src = ('./images/background3.jpg')
const coinImg = new Image()
coinImg.src = ('./images/—Pngtree—golden\ coin\ money\ gold_6424143.png')
const demon1Img = new Image()
demon1Img.src = ('./images/demon2.png')

let playerAlive = true //if this condition is false, animation stops
const gravity = 0.5

//created player here
//Audio.loop = true for the continue sound of in the game

class Player {
    constructor(x, y, image) {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 100,
        this.height = 150
        this.image = image
    }

    draw() {
        //context.fillRect(this.position.x, this.position.y, this.width, this.height)
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        const newPosition = this.position.x + this.velocity.x
        if(newPosition > 0 && newPosition < 2*canvasWidth/4 ) {
            this.position.x = newPosition
        }
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity} 
        else {
            this.velocity.y = 0
            // if (keys.right.pressed || keys.up.pressed ) {
            //     console.log(keys.up.pressed)
            //     background.move(-5)
            //     //obstacle.move(-5)
            // } else if (keys.left.pressed) {
            //     background.move(5)
            // }
            
        }
        if (keys.right.pressed || keys.up.pressed ) {
            background.move(-5)
            //obstacle.move(-5)
        } else if (keys.left.pressed) {
            background.move(5)
        }  
    }
}


const player = new Player(0, 0, mariaImg)


class Background {
    constructor(x, y, image) {
        this.position = {
            x: x,
            y: y
        }
        this.image = image
        this.width = 1200
        this.height = 553
    }
    
    draw() {
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        context.drawImage(this.image, this.position.x+this.width, this.position.y, this.width, this.height)
    }

    move(num) {
        background.position.x += num
        //background position x is always 0 or less
        if (background.position.x > 0) {
            background.position.x -= this.width
        } 
         if(background.position.x < -this.width) {
             background.position.x += this.width
         }
    }
}
const background = new Background(0, 0, backgroundImg);

class Coin {
    constructor(image) {
        this.position = {
            x: 1200,
            y: Math.random() * 420
        } 

        this.image = image
        this.width = 75
        this.height = 75
    }

    draw() {
        context.drawImage(this.image, this.position.x, this.position.y,this.width, this.height)    
    }

    move(){
        this.position.x -= 4 //to move coin in opposite direction
        
    }
}

let coins = [new Coin(coinImg)];

class Obstacle {
    constructor(image) {
        this.position = {
            x: 1200,
            y: Math.random() * 400
        } 

        this.image = image
        this.width = 75
        this.height = 75

    }

    draw() {
        //context.fillRect(this.position.x, this.position.y, this.width, this.height)
        context.drawImage(this.image, this.position.x, this.position.y,this.width, this.height) 
    }

    move(){
        this.position.x -= 4
    }

}

let obstacles = [new Obstacle(demon1Img)]

let score = 0
function drawScore() {
    context.font = "20px Arial";
    context.fillStyle = "#FFFFFF";
    context.fillText("Score: "+score, 8, 20);
}

function collideWithPlayer(a) {
    let aX = a.position.x
    let aY = a.position.y
    let playerX = player.position.x
    let playerY = player.position.y
    if (playerX + player.width >= aX && playerX <= aX + a.width && playerY + player.height >= aY && playerY <= aY + a.height) {
        return true
    } else {
        return false
    }
}

const coinAudio = document.querySelector('.coin')

function collisionWithCoin() {
    for (let x=0; x < coins.length; x++) {
        let coin = coins[x];
        if (collideWithPlayer(coin)) {
            score ++;
            coinAudio.play()
            coins.splice(x, 1);
            break;
        }
    }
    drawScore()      
}

const gameOverAudio = document.querySelector('.gameOver')
function gameOver() {
    context.font = "55px Arial";
    context.fillStyle = "#FFFFFF";
    context.fillText("Game Over ", 490, 250);
    gameOverAudio.play()
    //console.log(gameOverAudio)
}

function collisionWithObstacle() {
    for (let x=0; x < obstacles.length; x++) {
        let obstacle = obstacles[x];
        if (collideWithPlayer(obstacle)) {
            playerAlive = false
            gameOver()
            break;
        }
    }   
}



const keys = {
    left : {
        pressed: false
    },
    right : {
        pressed: false
    },
    up : {
        pressed: false
    }
}


function animate() {
       if(playerAlive === true)
        requestAnimationFrame(animate)
        context.clearRect(0, 0, canvas.width, canvas.height)
        background.draw()
        player.update()
        
        
        // for generating coins at random intervals
        for (let i = 0; i < coins.length; i++ ) {
            coins[i].draw()
            coins[i].move()
        }
        
        if (Math.random() > 0.98) {
            coins.push(new Coin(coinImg))
        }
        
        coins = coins.filter(item => (item.position.x > 0));  // Keep only those coins that are in frame
        
        for (let i = 0; i < obstacles.length; i++) {   // for generating obstacles at random intervals
            obstacles[i].draw()
            obstacles[i].move()
        }
        
        if (Math.random() > 0.995) {
            obstacles.push(new Obstacle(demon1Img))
        }
        obstacles = obstacles.filter(item => (item.position.x > 0)); //to remove obstacles those are out of frame
        
        collisionWithCoin()
        
        collisionWithObstacle()
    
}

//animate() //to draw everything on canvas
 
//for moving player and added eventlistener
function handelKeyDown(event){
    switch (event.key) {
        case'ArrowUp':
           if(player.velocity.y === 0)
           player.velocity.y -= 20
           background.draw()
           keys.up.pressed = true
           break

        case 'ArrowRight':
           if(player.velocity.x === 0)
            player.velocity.x +=  3
            keys.right.pressed = true
            break

        case 'ArrowLeft':
           if(player.velocity.x === 0)
           player.velocity.x -= 3
           keys.left.pressed = true
            break
    }
}

addEventListener('keydown', handelKeyDown)

function handelKeyUp(event) {
        switch (event.key) {
            case'ArrowUp':
              player.velocity.y = 0
              keys.up.pressed = false
              break
   
           case 'ArrowRight':
               player.velocity.x =  0
               keys.right.pressed = false
               break
   
           case 'ArrowLeft':
               player.velocity.x = 0
               keys.left.pressed = false
               break
       }   
}
addEventListener('keyup', handelKeyUp)




