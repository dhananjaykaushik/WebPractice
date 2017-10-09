var rotAngle = 0;
var slider;
var strw = 6;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    
    slider = createSlider(0, TWO_PI, PI / 8, 0.01);
}

function draw() {
    translate(width / 2, height);
    rotAngle = slider.value();
    background(51);
    var len = 200;
    stroke(random(100, 255), random(100, 255), random(100, 255));
    strokeWeight(2);
    branch(200);
}

function branch(len) {
    stroke(random(100, 255), random(100, 255), random(100, 255));
    line(0, 0, 0, -len);
    translate(0, -len);
    if(len > 8) {
        push();
        rotate(rotAngle);
        branch(len * 0.67);
        pop();
        push();
        rotate(-rotAngle);
        branch(len * 0.67);   
        pop();
    }

}