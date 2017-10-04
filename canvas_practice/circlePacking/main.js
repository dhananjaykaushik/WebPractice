//MAIN

var circleCount = 1;
var circles = [];
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    background(0);
    var x = random(width);
    var y = random(height);
    circles.push(new Circle(x, y, 30));
    for(var i = 0; i < circles.length; ++i) {
        circles[i].show();
        if(circles[i].edges()) {
            circles[i].growing = false;
        }
        circles[i].grow();
    }
    
}