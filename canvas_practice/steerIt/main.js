var font;


function preload() {
    
    font = loadFont("Zantroke.otf");
    
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    textFont(font);
    background(0);
    
    var points = font.textToPoints("DHANANJAY", width /80, height / 1.5, 200);
    
    for(var i = 0; i < points.length; ++i) {
        var pt = points[i];
        stroke(255);
        strokeWeight(8);
        point(pt.x, pt.y);
    }
    
}

function draw() {}