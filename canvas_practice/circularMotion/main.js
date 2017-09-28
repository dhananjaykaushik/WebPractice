var canvas = document.getElementById('myCanvas');



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// var c -->  context

var c = canvas.getContext('2d');

var particleColors = ["#C351FF", "#832CE8", "#723DFF", "#3C2CE8", "#2A40FF", "orangered", "gold", "navyblue", "#333"];
var particleCount = 1000;


var mouse = {
  x : canvas.width / 2,
  y : canvas.height / 2
};

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('click', function(e) {
  c.clearRect(0,0,window.innerWidth, window.innerHeight);
});

window.addEventListener('resize', function() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();

});


function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.05;
  this.distanceFromCentre = randomIntBetween(20,120);
  this.color = color;
  this.lastMouse = {
    x : x,
    y : y
  };


  this.update = function() {

    var lastPoint = {
      x : this.x,
      y : this.y
    };


    this.radians += this.velocity;

    // DRAG EFFECT

    this.lastMouse.x += ((mouse.x - this.lastMouse.x) * 0.08);
    this.lastMouse.y += ((mouse.y - this.lastMouse.y) * 0.08);


    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCentre;
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCentre;
    this.draw(lastPoint);
  };

  this.draw = function(lastPoint) {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x , lastPoint.y);
    c.lineTo(this.x , this.y);
    c.stroke();
    c.closePath();
  };


}

var particles = [];

function init() {

  particles = [];

  for(var i = 0; i < particleCount; ++i) {
    var radius = (Math.random() * 2) + 1;
    particles.push(new Particle(canvas.width/2, canvas.height/2, radius, particleColors[randomIntBetween(0, particleColors.length)]));
  }

}


init();

(function animateCanvas() {

  requestAnimationFrame(animateCanvas);
  c.fillStyle = "rgba(255,255,255,0.08)";
  c.fillRect(0,0,window.innerWidth, window.innerHeight);

  for(var i = 0; i < particleCount; ++i) {
    particles[i].update();
  }


})();
