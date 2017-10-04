//MAIN


var circles = [];
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    background(0);
    var cou = 0;
    
    while(cou < 1) {
        var c = createCircle();
        if(c) {
            circles.push(c);
            ++cou;
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
                    
                        if(d - 2 < (circles[i].r + circles[j].r)) {
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
    var x = random(width);
    var y = random(height);
    var valid = true;
    
    for(var i = 0; i < circles.length; ++i) {
        var d = dist(x, y, circles[i].x, circles[i].y);
        
        if(d < circles[i].r) {
            valid = false;
            break;
        }
        
    }
    
    if(valid) {
        return new Circle(x, y, 1);
    }
    return null;
    
    
}