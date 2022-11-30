const PLAYERBOX = document.getElementById("snakePos");
const SNAKECONTEXT = PLAYERBOX.getContext("2d");
const WIDTH = PLAYERBOX.getAttribute("width");
const HEIGHT = PLAYERBOX.getAttribute("height");
const SCOREBOARD = document.getElementById("scoreBoard");

class Fruit {
  constructor() {
    this.x = randomTwenties();
    this.y = randomTwenties();
  }
  draw(context) {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, 20, 20);
  }
}

class inputHandler {
  constructor() {
    document.addEventListener("keydown", (event) => {
      this.direction = event.keyCode;
    });
  }
}

class Player {
  constructor() {
    this.length = 0;
    this.x = WIDTH / 2;
    this.y = HEIGHT / 2;
    this.total = 0;
    this.tail = [];
  }
  draw(context) {
    context.fillStyle = "blue";
    for(let i = 0; i < this.tail.length; i++) {
      context.fillRect(this.tail[i].x, this.tail[i].y, 20, 20);
    }
    context.fillStyle = "purple";
    context.fillRect(this.x, this.y, 20, 20)
  }
  update(input) {
    for(let i = 0; i < this.tail.length - 1; i++) {
      if(this.tail[i].x === this.x && 
        this.tail[i].y === this.y) {
        location.reload();
      }
    }

    for(let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i+1];
    }

    this.tail[this.total-1] = {
      x: this.x,
      y: this.y
    }

    switch (input) {
      case 39:
        this.x += 20;
        break;
      case 40:
        this.y += 20;
        break;
      case 38:
        this.y -= 20;
        break;
      case 37:
        this.x -= 20;
        break;
      default:
        this.x += 20;
        break;
    }
  }
  eat(xCord, yCord) {
    if(this.x === xCord && 
      this.y === yCord) {
      this.total++;
      return true;
    }
    return false;
  }
}

let snake = new Player();
let input = new inputHandler();
let fruit = new Fruit();

function randomTwenties() {
  let num = Math.floor((Math.random() * WIDTH / 20) * 20);
  if(num % 20 !== 0) {
    return randomTwenties();
  }
  for(let i = 0; i < snake.tail.length - 1; i++) {
    if(num === snake.x && 
      num === snake.y) {
      return randomTwenties();
    }
  }
  return num;
}

let lastTime = 0;

setInterval(() => gameLoop(lastTime + 500), 250);
function gameLoop() {
  SNAKECONTEXT.clearRect(0,0, WIDTH, HEIGHT);
  snake.update(input.direction);
  fruit.draw(SNAKECONTEXT);
  snake.draw(SNAKECONTEXT);
  SCOREBOARD.innerHTML = "Score:    " + snake.total;
  if(snake.eat(fruit.x, fruit.y) ) {
    fruit = new Fruit();
  }
  if (snake.x > WIDTH || snake.x < 0) {
    location.reload();
  }
  if(snake.y > HEIGHT || snake.y < 0) {
    location.reload();
  }
}