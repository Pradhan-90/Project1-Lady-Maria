const canvas = document.querySelector('#canvas')
const canvasWidth = 1200
const context = canvas.getContext('2d')
const mariaImg = new Image()
mariaImg.src = ('./images/Girlrun.png')
const backgroundImg = new Image()
backgroundImg.src = ('./images/background3.jpg')
const coinImg = new Image()
coinImg.src = ('./images/—Pngtree—golden\ coin\ money\ gold_6424143.png')
const demon1Img = new Image()
demon1Img.src = ('./images/demon2.png')
const demon2Img = new Image()
demon2Img.src = './images/2demon1.png'


//canvas.width = innerWidth 
// canvas.height = innerHeight

const gravity = 0.5

//created player here

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
        if(newPosition > 0 && newPosition < 2*canvasWidth/3 ) {
            this.position.x = newPosition
        }
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity} 
        else {
            this.velocity.y = 0
            if (keys.right.pressed) {
                background.move(-5)
                //obstacle.move(-5)
            } else if (keys.left.pressed) {
                background.move(5)
            }
            
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
        this.width = 200
        this.height = 200

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
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Score: "+score, 8, 20);
}

function collisionDetection() {
    for (let x=0; x < coins.length; x++) {
        let coin = coins[x];
        let coin_x = coin.position.x
        let coin_y = coin.position.y
        let player_x = player.position.x
        let player_y = player.position.y
        if (player_x + player.width >= coin_x && player_x <= coin_x + coin.width && player_y + player.height >= coin_y && player_y <= coin_y + coin.height){
            score ++;
            coins.splice(x, 1);
            break;
        }
    }



    // coins.forEach((coin) => {
    //     let coin_x = coin.position.x
    //     let coin_y = coin.position.y
    //     let player_x = player.position.x
    //     let player_y = player.position.y
    //     if (player_x + player.width >= coin_x && player_x <= coin_x + coin.width && player_y + player.height >= coin_y && player_y <= coin_y + coin.height){
    //         score ++
    //     }
    //   });
    drawScore()      
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

let count = 0

function animate() {
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
    // Keep only those coins that are in frame
    coins = coins.filter(item => (item.position.x > 0));
    //coin.move()
     // for generating obstacles at random intervals
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].draw()
        obstacles[i].move()
    }
    
    if (Math.random() > 0.99) {
      obstacles.push(new Obstacle(demon1Img))
    }
    obstacles = obstacles.filter(item => (item.position.x > 0));

    collisionDetection()
    
}

animate()

addEventListener('keydown', function (event) {
    console.log(event.key)
    switch (event.key) {
        case'ArrowUp':
           if(player.velocity.y === 0)
           player.velocity.y -= 20
           background.draw()

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
})

addEventListener('keyup', function (event) {
     switch (event.key) {
         case'ArrowUp':
           player.velocity.y = 0
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
})



