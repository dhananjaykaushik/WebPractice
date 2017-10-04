//MAIN

var img;
var circles = [];
var whitePixels;
var ctx;

function preload() {
    img = loadImage("./test.png");
}

function setup() {
    
    createCanvas(220, 220);
    
    whitePixels = [];
    img.loadPixels();
    
    
    for(var x = img.height / 4; x < img.height; x++) {
        for(var y = 0; y < img.width * 4; y+=4) {
            var pix = img.get(x, y);
            var c = color(pix);
            var b = brightness(c);
            
            if(b > 1) {
                whitePixels.push(createVector(x, y));
            }
            
        }
    }

}

function draw() {
    
    background(0);
    var cou = 0;
    var attempts = 0;
    
    while(cou < 3) {
        var c = createCircle();
        if(c) {
            circles.push(c);
            ++cou;
        }
        ++attempts;
        if(attempts > 1000) {
            noLoop();
            console.log("DONE");
            break;
        }
    }
    
    
    for(var i = 0; i < circles.length; ++i) {
        if(circles[i].growing) {
            if(circles[i].edges()) {
                circles[i].growing = false;
            } else {
                for(var j = 0; j < circles.length; ++j) {
                    
                    if(i != j) {
                        var d = dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
                    
                        if(d - 5 < (circles[i].r + circles[j].r)) {
                            circles[i].growing = false;
                            break;
                        }
                    }
                    
                }
                
            }
        }
        
        circles[i].show();
        circles[i].grow();
    }
    
}

function createCircle() {
    
    var spot = random(whitePixels);
    var x = spot ? spot.x : random(width);
    var y = spot ? spot.y : random(height);
    var valid = true;
    
    for(var i = 0; i < circles.length; ++i) {
        var d = dist(x, y, circles[i].x, circles[i].y);
        
        if(d < circles[i].r + 2) {
            valid = false;
            break;
        }
        
    }
    
    if(valid) {
        return new Circle(x, y, 0.1);
    }
    return null;
    
    
}