function setup() {

   createCanvas(window.innerWidth, window.innerHeight);
   angleMode(DEGREES);

}


function draw() {

   translate(width / 2, height / 2);
   rotate(-90);

   background(0);

   var hrs = hour();
   var mns = minute();
   var scs = second();

   strokeWeight(8);
   stroke(255, 100, 150);
   noFill();

   var endS = map(scs, 0, 60, 0, 360);
   arc(0, 0, 300, 300, 0, endS);

   push();
   rotate(endS);
   stroke(255, 100, 150);
   line(0, 0, 100, 0);
   pop();

   stroke(150, 255, 100);

   var endM = map(mns, 0, 60, 0, 360);
   arc(0, 0, 275, 275, 0, endM);

   push();
   rotate(endM);
   stroke(150, 255, 100);
   line(0, 0, 100, 0);
   pop();

   stroke(150, 100, 255);

   var endH = map(hrs % 12, 0, 12, 0, 360);
   arc(0, 0, 250, 250, 0, endH);
   push();
   rotate(endH);
   stroke(150, 100, 255);
   line(0, 0, 100, 0);
   pop();

   stroke(255);
   strokeWeight(12);
   point(0, 0);

   push();
   rotate(90);
   fill(150, 250, 250);
   noStroke();
   textSize(30);
   text(hrs + " : " + mns + " : " + scs, -55, 250);
   pop();
}
