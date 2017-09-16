var canvas = document.getElementById('myCanvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// var c -->  context

var c = canvas.getContext('2d');

var x = 200;
var dx = 4;
var maxRadius = 100;
// var circleColors = ["#E54661", "#FFA644", "#998A2F", "#2C594F", "#002D40", "#0497FF", "#03B6D5", "#0FECD1", "#03D580", "#03F74F"];
var circleColors = ["#E54661", "#FFA644", "#998A2F", "#2C594F", "#002D40", "#0497FF", "grey"];
var circlesCount = 700;


var mouse = {
  x : undefined,
  y : undefined
};

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.x;
  mouse.y = e.y;

});

window.addEventListener('resize', function() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();

});




function Circle(x, y, dx, dy, radius, fillColor) {
  this.x = x;
  this.dx = dx;
  this.y = y;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius ,0, (Math.PI) * 2, true);
    c.fillStyle = fillColor;
    c.fill();
  };

  this.update = function() {
    if(this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.dx = -(this.dx);
    }
    if(this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.dy = -(this.dy);
    }
    this.x += this.dx;
    this.y += this.dy;

    if((mouse.x - this.x < 50) && (mouse.x - this.x > -50) && (mouse.y - this.y < 50) && (mouse.y - this.y > -50)) {

      if(this.radius < maxRadius) {
        this.radius += 2;
      }

    } else if(this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };

}

var allCircles = [];



function init() {

  allCircles = [];

  for(var i = 0; i < circlesCount; ++i) {
    var radius = Math.floor(Math.random() * 13) + 2;
    var x = Math.random() * (window.innerWidth - radius * 2) + radius;
    var y = Math.random() * (window.innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 3;
    var dy = (Math.random() - 0.5) * 3;
    var fillColor = circleColors[Math.floor(Math.random() * circleColors.length)];
    allCircles.push(new Circle(x, y, dx, dy, radius, fillColor));

  }

}

init();

(function animateCanvas() {

  requestAnimationFrame(animateCanvas);
  c.clearRect(0,0,window.innerWidth, window.innerHeight);

  for(var i = 0; i < allCircles.length; ++i) {

    allCircles[i].update();

  }

})();
