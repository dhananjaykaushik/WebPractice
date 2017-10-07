var min1 = -2;
var max1 = 0.1;

var yOff = min1;
var flag = true;



function setup() {
    
    createCanvas(window.innerWidth, window.innerHeight);
    
}

function draw() {
    
    background(51);
    translate(width/2, height/2);
    rotate(PI / 2);
    
    stroke(255);
    fill(255);
    if(random(0,1) < 0.2) {
        fill(random(150, 255), random(150, 255) , random(200, 255));
    }
    strokeWeight(1);
    
    var dAngle = PI / 100;
    var dx = 0.028;
    
    beginShape();
    var xOffset = 0;
    
    for(var i = -PI/2; i <= PI/2; i+=dAngle) {
        
        var n = noise(xOffset, yOff);
        
        var r = sin(2 * i) * map(n, 0, 1, 300, 500);
        
        var x = r * cos(i);
        var y = sin(yOff) * r * sin(i);
        
        xOffset += dx;
        
        vertex(x, y);
        
        
        
    }
    
    for(var i = PI/2; i <= (3*PI)/2; i+=dAngle) {
        
        var n = noise(xOffset, yOff);
        var r = sin(2 * i) * map(n, 0, 1, 300, 500);
        
        var x = r * cos(i);
        var y = sin(yOff) * r * sin(i);
        
        xOffset -= dx;
        
        vertex(x, y);
        
        
        
    }
    
    endShape();
    
    
    if(flag) {
        yOff += 0.1;
        if(yOff >= max1) {
            flag = false;
        }
    } else {
        yOff -= 0.1;
        if(yOff <= (min1)) {
            flag = true;
        }
    }
    
    
}