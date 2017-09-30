document.getElementById("gameOverBtn").addEventListener("click", function() {
  location.reload();
});

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

var partHeight = 20;
var partWidth = 20;

var fruitHeight = 25;
var fruitWidth = 25;


// SPEED OF SNAKE
var speed = 5;

var index = 0;

var dir = "right";

var finishGame = false;

var score = 1;

// COORDINATES OF FRUIT


var fx = randomIntBetween(partWidth, canvas.width - partWidth);
var fy = randomIntBetween(partHeight, canvas.height - partHeight);
var lfx;
var lfy;
var lfa = 1;


window.addEventListener("keyup", function(e) {

  switch(e.keyCode) {
    // LEFT ARROW
    case 37 :

    if(dir === "right") {
      // DO NOTHING
    } else {
      dir = "left";
    }

    break;

    // UP ARROW
    case 38 :

    if(dir === "down") {
      // DO NOTHING
    } else {
      dir = "up";
    }

    break;

    // RIGHT ARROW
    case 39 :

    if(dir === "left") {
      // DO NOTHING
    } else {
      dir = "right";
    }

    break;

    // DOWN ARROW
    case 40 :

    if(dir === "up") {
      // DO NOTHING
    } else {
      dir = "down";
    }

    break;

  }

});

function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



function PartSnake(x, y, color) {

  this.x = x;
  this.y = y;
  this.prevX;
  this.prevY;
  this.arrIndex = index;
  ++index;
  this.color = color;

  this.draw = function() {
    ctx.fillStyle = this.color;
    if(this.arrIndex != 0) {
      ctx.fillRect(this.x, this.y,partWidth,partHeight);
    } else {
      switch(dir) {
        case "left" :
        ctx.fillRect(this.x - 7, this.y,partWidth + 7,partHeight);
        break;
        case "right" :
        ctx.fillRect(this.x, this.y,partWidth + 7,partHeight);
        break;
        case "up" :
        ctx.fillRect(this.x, this.y - 7,partWidth,partHeight + 7);
        break;
        case "down" :
        ctx.fillRect(this.x, this.y,partWidth,partHeight + 7);
        break;
      }

    }
  };

  this.update = function() {
    if(this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
      // GAME OVER CONDITION ( SNAKE OUT OF SCREEN )
      gameOver();

    } else {
      this.prevX = this.x;
      this.prevY = this.y;
      if(this.arrIndex != 0) {
        if(this.arrIndex > 8) {
          checkForSM(snake[this.arrIndex - 1].prevX, snake[this.arrIndex - 1].prevY);
        }
        this.x = snake[this.arrIndex - 1].prevX;
        this.y = snake[this.arrIndex - 1].prevY;
      } else {
        switch(dir) {
          case "left" :
          this.x -= speed;
          this.y = this.y;
          break;
          case "right" :
          this.x += speed;
          this.y = this.y;
          break;
          case "up" :
          this.x = this.x;
          this.y -= speed;
          break;
          case "down" :
          this.x = this.x;
          this.y += speed;
        }
      }
      this.draw();
    }
  }

}


var snake = [];


function init() {
  // INITIALIZING FACE PART OF SNAKE
  snake = [];
  var faceSnake = new PartSnake(canvas.width/2, canvas.height/2, "blue");
  faceSnake.prevX = faceSnake.x;
  faceSnake.prevy = faceSnake.y;
  snake.push(faceSnake);
  faceSnake.update();
  addSnakeLength();
  addSnakeLength();
}

function fruitReborn() {
  lfx = fx;
  lfy = fy;
  fx = randomIntBetween(fruitWidth, canvas.width - fruitWidth);
  fy = randomIntBetween(fruitHeight, canvas.height - fruitHeight);
}

function collisionDetection() {
  if((fx < (snake[0].x + partWidth)) && (fx + fruitWidth > snake[0].x) && (fy < (snake[0].y + partHeight)) && (fy + fruitHeight > snake[0].y)) {
    return true;
  }
  return false;
}


function fruitGenerator() {
  ctx.fillStyle = "red";
  ctx.fillRect(fx, fy,fruitWidth,fruitHeight);
}

function addSnakeLength() {
  snake.push(new PartSnake(snake[snake.length - 1].x, snake[snake.length - 1].y, "white"));
  snake.push(new PartSnake(snake[snake.length - 1].x, snake[snake.length - 1].y, "white"));
  snake.push(new PartSnake(snake[snake.length - 1].x, snake[snake.length - 1].y, "white"));
  snake.push(new PartSnake(snake[snake.length - 1].x, snake[snake.length - 1].y, "white"));
}

function gameOver() {
  document.getElementById("gameOverMenu").style.display = "flex";
  finishGame = true;
}
function updateScore() {
  document.getElementById("score").innerHTML = "SCORE : " + score;
}

init();

var gg;
function lastFruitFadeAway() {
  gg = setInterval(function () {
    if(lfa > 0) {
      lfa -= 0.05;
    }
  }, 200);
  ctx.fillStyle = "rgba(255,0,0,"+lfa+")";
  ctx.fillRect(lfx, lfy,fruitWidth,fruitHeight);

}
function checkForSM(fx, fy) {
  if((fx < (snake[0].x + partWidth)) && (fx + partWidth > snake[0].x) && (fy < (snake[0].y + partHeight)) && (fy + partHeight > snake[0].y)) {
    finishGame = true;
    return true;
  }

}

(function animateCanvas() {

  if(!finishGame) {
    if(collisionDetection()) {
      clearInterval(gg);
      lfa = 1;
      ++score;
      fruitReborn();
      addSnakeLength();
      updateScore();
      if(score % 10 == 0) {
        speed += 2;
      }
    }
    requestAnimationFrame(animateCanvas);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    checkForSM();

    for(i = 0; i < snake.length; ++i) {

      snake[i].update();

    }
    if(lfa > 0) {
      lastFruitFadeAway();
    }
    fruitGenerator();
  } else {
    gameOver();
  }


})();
