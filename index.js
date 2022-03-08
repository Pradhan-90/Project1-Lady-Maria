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
    constructor(x, y, image) {
        this.position = {
            x: 500,
            y: 420
        } 

        this.image = image
        this.width = 75
        this.height = 75
    }

    draw() {
        context.drawImage(this.image, this.position.x, this.position.y,this.width, this.height)    
    }

    move(){
        this.position. x += 4
    }
}
const coin = new Coin(0, 0, coinImg);

class Obstacle {
    constructor(image) {
        this.position = {
            x: 1200,
            y: 200
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
        this.position. x -= 4
    }
     
}

const obstacles = [new Obstacle(demon1Img)]





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
    count++
    console.log(count)
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    background.draw()
    player.update()
    coin.draw()
    //coin.move()
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].draw()
        obstacles[i].move()
    }
    
    if (Math.random() > 0.99) {
      obstacles.push(new Obstacle(demon1Img))
    }
    
    
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



