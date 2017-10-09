var video;
var vscale = 14;

function setup() {

    createCanvas(640, 480);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(width / vscale, height / vscale);

}

function draw() {

    background(51);
    video.loadPixels();
    loadPixels();
    translate(vscale/2, vscale / 2);
    for(var y = 0; y < video.height; ++y) {
        for(var x = 0; x < video.width; ++x) {
            var index = ((video.width - x + 1) + y * video.width) * 4;
            var r = video.pixels[index + 0];
            var g = video.pixels[index + 1];
            var b = video.pixels[index + 2];

            var bright = (r + g + b) / 3;
            var w = map(bright, 0, 255, 0, vscale);

            noStroke();
            fill(255);
            rectMode(CENTER);
            rect(x * vscale, y * vscale, w, w);
        }
    }


}