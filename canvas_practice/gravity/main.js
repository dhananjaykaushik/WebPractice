var canvas = document.getElementById('myCanvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// var c -->  context

var c = canvas.getContext('2d');

// var maxRadius = 100;
var gravity = 1;
var friction = 0.9;
var ballColors = ["#E54661", "#FFA644", "#998A2F", "#2C594F", "#002D40", "#0497FF", "grey"];
var ballsCount = 100;



window.addEventListener('resize', function() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();

});

canvas.addEventListener('click', function() {

  init();

});




function Ball(x, y, dx, dy, radius, fillColor) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dy = dy;
  this.dx = dx;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius ,0, (Math.PI) * 2, true);
    c.fillStyle = fillColor;
    c.fill();
    c.strokeStyle = "white";
    c.stroke();
    c.closePath();
  };

  this.update = function() {
    if(this.y + this.radius + this.dy > canvas.height) {
      this.dy = -(this.dy * friction);
    } else {
      this.dy += gravity;
    }

    if((this.x + this.radius + this.dx > canvas.width) || this.x - this.radius < 0) {
      this.dx = -(this.dx * friction);
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };

}



//Implementation

var ball;
var ballsArray = [];
function init() {
  ballsArray = [];
  for(var i =0; i < ballsCount; ++i) {
    var radius = Math.floor(Math.random() * 50) + 10;
    var temp = Math.random() * canvas.width;
    var x = (temp > window.innerWidth - (2 *radius)) ? (temp - (3 * radius)) : temp + (radius);
    var ytemp = Math.random() * canvas.height;
    var y = (ytemp > canvas.height - (2 * radius)) ? (ytemp - (5 * radius)) : ytemp + (radius);
    var dx = (Math.random() - 0.5) * 2;
    var dy = Math.random() * 2 + 1;
    var fillColor = ballColors[Math.floor(Math.random() * ballColors.length)];
    ballsArray.push(new Ball(x, y, dx, dy, radius, fillColor));
  }


}

init();

(function animateCanvas() {

  requestAnimationFrame(animateCanvas);
  c.clearRect(0,0,window.innerWidth, window.innerHeight);

  for(var i = 0; i < ballsArray.length; ++i) {
    ballsArray[i].update();
  }


})();
