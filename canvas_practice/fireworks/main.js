var fireworks = [];
var gravity;



function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  stroke(255);
  strokeWeight(4);
  background(0);
  gravity = createVector(0, 0.2);


}

function draw() {
  background(0, 25);

  if(random(1) < 0.1) {
    fireworks.push(new Firework());
  }


  for(var i = fireworks.length - 1; i >= 0; --i) {
    if(fireworks[i].done()) {

      fireworks.splice(i, 1);
    }
    fireworks[i].update();
    fireworks[i].show();
  }

}

function Particle(x, y, spread, dx) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.r = random(0, 255);
  this.g = random(0, 255);
  this.b = random(0, 255);
  this.spread = spread;
  this.lifespan = 160;

  this.done = function() {
    if(this.lifespan < 0) {
      return true;
    }
    return false;
  }


  if(!this.spread) {
    this.vel = createVector(0, random(-17, -9));
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2, 25));
  }
  this.pos = createVector(this.x, this.y);

  this.acc = createVector(0, 0);

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    if(!spread) {
      this.pos.x += dx;
    }
    if(this.spread) {
      this.vel.mult(0.85);
      this.lifespan -=4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.show = function() {
    if(this.spread) {
      strokeWeight(4);
      stroke(this.r, this.g, this.b, this.lifespan);
    } else {
      strokeWeight(7);
      stroke(this.r, this.g, this.b, this.lifespan);
    }

    point(this.pos.x, this.pos.y);
  }

}

function Firework() {
  var dx = random(-5, 5);
  this.firework = new Particle(random(width), height, false, dx);
  this.toExplode = false;
  this.particles = [];

  this.done = function() {
    if(this.toExplode && this.particles.length === 0) {
      return true;
    }
    return false;
  }

  this.explode = function() {
    for(var i = 0; i < 50; ++i) {
      var p = new Particle(this.firework.pos.x, this.firework.pos.y, true);
      this.particles.push(p);
    }
  }

  this.update = function() {
    if(!this.toExplode) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if(this.firework.vel.y >= 0) {
        this.toExplode = true;
        this.explode();
      }

    }

    for(var i = this.particles.length - 1; i >= 0; --i) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if(this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }

  }


  this.show = function() {

    if(!this.toExplode) {
      this.firework.show();
    }

    for(var i = 0; i < this.particles.length; ++i) {
      this.particles[i].show();
    }



  }
}
