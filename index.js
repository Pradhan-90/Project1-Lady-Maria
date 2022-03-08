const canvas = document.querySelector('#canvas')
const canvasWidth = 1200
const context = canvas.getContext('2d')
const mariaImg = new Image()
mariaImg.src = ('./images/Girlrun.png')
const backgroundImg = new Image()
backgroundImg.src = ('./images/backgroundImg1.jpg')
let gamespeed = 2

//canvas.width = innerWidth 
// canvas.height = innerHeight

const gravity = 0.5

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30,
        this.height = 30
    }

    draw() {
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
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
                background.move(5)
            } else if (keys.left.pressed) {
                background.move(-5)
            }
            
        }

    }
}


const player = new Player()

let scrolloffset = 0

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

// function handleBackground () {
//     // if(background.x1 <= -background.width){

//     //     background.x2 = background.width
//     // } else {
//     //     background.x1 -= gamespeed
//     // }
//     context.draw(backgroundImg, background.x1, background.y, background.width, background.height)
// }

  

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
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    background.draw()
    player.update()
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



