var drops = [];
var numberOfDrops = 300;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (var i = 0; i < numberOfDrops; i++) {
    drops[i] = new Drop();
  }
}

function draw() {
  background(230, 230, 250);
  for (var i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].show();
  }
}
