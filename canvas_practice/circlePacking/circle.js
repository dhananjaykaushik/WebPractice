//CIRCLE

function Circle(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = color(255, 255, 255);
    this.growing = true;
    
    this.show = function() {
        noFill();
        stroke(this.c);
        strokeWeight(3);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    };
    
    this.grow = function() {
        if(this.growing) {
            this.r += 0.1;
        }
    };
    
    this.edges = function() {
        return ( this.x + this.r > width || this.x - this.r < 0 || this.y + this.r > height || this.y - this.r < 0 );
    };
    
}