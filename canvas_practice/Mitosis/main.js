var cells = [];
var totalCells = 100;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    
    for(var i = 0; i < totalCells; ++i) {
        cells.push(new Cell());
    }
    
}
function draw() {
    background(10);
    for(var i = 0; i < cells.length; ++i) {
        cells[i].move();
        cells[i].show();
    }
}

function Cell(pos, r, c) {
    this.r = r || random(40, 100);
    this.pos = pos ? pos.copy() :  createVector(random(this.r, width - this.r), random(this.r, height - this.r));
    this.c = c || color(random(100, 255), 100, random(100, 255), 200);
    this.move = function() {
        var vel;
        if(this.pos.x + this.r >= width || this.pos.y + this.r >= height) {
            vel = p5.Vector.random2D().add(createVector(-1, -1));
        } else if((this.pos.x - this.r) <= 0 || (this.pos.y - this.r <= 0)) {
            vel = p5.Vector.random2D().add(createVector(1, 1));      
        } else {
            vel = p5.Vector.random2D();
        }
        
        
        this.pos.add(vel);
    };

    this.show = function() {
        fill(this.c);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    };
    
    this.clicked = function(x, y) {
        var d = dist(this.pos.x, this.pos.y, x, y);
        if(d < this.r) {
            return true;
        }
        return false;
    }
    
    this.mitosis = function() {
        this.pos.x += random(-this.r * 0.8, this.r * 0.8);
        var cell = new Cell(this.pos, this.r * 0.8, this.c);
        return cell;
    }

}

function mousePressed() {
    for(var i = cells.length - 1; i >= 0; --i) {
        if(cells[i].clicked(mouseX, mouseY)) {
            cells.push(cells[i].mitosis());
            cells.push(cells[i].mitosis());
            cells.splice(i, 1);
        }
    }
}

function mouseMoved() {
    for(var i = cells.length - 1; i >= 0; --i) {
        
        if(random(0, 1) > 0.01) {
            cells[i].pos.x -= 0.2; 
            cells[i].pos.y -= 0.2; 
        }
        
    }
}