var n = 0;
var c = 9;
var refresh = false;
var myAngle = 137.5;
var r1;
var diffColor = true;

function changePattern() {

  myAngle = random(137, 140);

}

function changeColor() {

  r1 = round(random(0, 5));

  diffColor = true;

  fill(190, 255, 100);

}

function colorSelector(a, r) {
  switch(r1) {
    case 0 : fill((a - r1) % 256, 255, 255);
    break;
    case 1 : fill((n) % 256, 255, 255);
    break;
    case 2 : fill(((a - r)) % 256, 255, 255);
    break;
    case 3 : fill(((a + r) * r1) % 256, 255, 255);
    break;
    case 4 : fill(((a * r) * r1) % 256, 255, 255);
    break;
    case 5 : fill(((n * r) * r1) % 256, 255, 255);
    break;
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);
  colorMode(HSB);
  background(0);
}


function draw() {
  fill(190, 255, 100);
  if(!refresh) {
    var a = n * myAngle;
    var r = c * sqrt(n);
    var x = r * cos(a) + width / 2;
    var y = r * sin(a) + height / 2;


    if(diffColor) {
      colorSelector(a, r);
    } else {
      fill(190, 255, 100);
    }


    noStroke();
    ellipse(x, y, 8, 8);

  } else {
    refresh = false;
    n = 0;
    c = 9;
  }


  ++n;
}

document.getElementById("patChange").addEventListener("click", function() {

  // CHANGE PATTERN

  clear();
  background(0, 255);

  changePattern();

  refresh = true;

});


document.getElementById("colChange").addEventListener("click", function() {

  // CHANGE COLOR SCHEME

  clear();
  background(0, 255);
  changeColor();
  refresh = true;

});
