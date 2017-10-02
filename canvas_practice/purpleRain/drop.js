function Drop() {
  this.x = random(width);
  this.y = random(-500, -50);
  this.z = random(0, 20);
  this.len = map(this.z, 0, 20, 10, 20);
  this.yspeed = map(this.z, 0, 20, 1, 20);

  this.fall = function() {
    this.y = this.y + this.yspeed;
    var grav = map(this.z, 0, 20, 0, 0.5);
    this.yspeed = this.yspeed + grav;

    if (this.y + this.len >= height) {
      var dx = this.x;
      var dy = height;

      // SPLASH EFFECT AT (dx,dy)

      fill(138, 43, 226);
      arc(dx, dy, 3, 3, 0, TWO_PI);
      arc(dx - (this.len/2), dy - this.len, 3, 3, 0, TWO_PI);
      arc(dx + (this.len/2), dy - this.len, 3, 3, 0, TWO_PI);
      arc(dx, dy - (this.len/2), 5, 5, 0, TWO_PI);


    }

    if (this.y > height) {
      this.y = random(-200, -100);
      this.yspeed = map(this.z, 0, 20, 4, 10);
    }
  }

  this.show = function() {
    var thick = map(this.z, 0, 20, 1, 3);
    strokeWeight(thick);
    stroke(138, 43, 226);
    line(this.x, this.y, this.x, this.y+this.len);
  }
}
