var font;
var vehicles = [];

function preload() {
    
    font = loadFont("Zantroke.otf");
    
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    textFont(font);
    background(0);
    
    var points = font.textToPoints("HELLO", width / 5, height / 1.5, 200);
    
    for(var i = 0; i < points.length; ++i) {
        var pt = points[i];
        vehicles.push(new Vehicle(pt.x, pt.y));
        
    }
    
}

function draw() {
    
    background(0);
    
    for(var i = 0; i < vehicles.length; ++i) {
        
        var v = vehicles[i];
        
        v.behaviors();
        v.update();
        v.show();
        
        
    }
    
    
}