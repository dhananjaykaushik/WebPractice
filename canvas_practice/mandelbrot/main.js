var minx = -3;
var miny = -3;
var minSlider;
var maxSlider;

function setup() {


    var fc = color(100,100,100);

    createCanvas(window.innerWidth, window.innerHeight);
    pixelDensity(1);

    var maxIterations = 100; 
    loadPixels();
    for(var i = 0; i < width; ++i) {
        for(var j = 0; j < height; ++j) {

            var a = map(i, 0, width, minx, -minx);
            var b = map(j, 0, height, miny, -miny);
            var ca = a;
            var cb = b;

            var count = 0;
            var z = 0;
            while(count < maxIterations) {

                var realPart = (a * a) - (b * b);
                var imgPart = 2 * a * b; 

                a = realPart + ca;
                b = imgPart + cb;

                if(abs(realPart + imgPart) > 20) {
                    break;
                }

                ++count;

            }

            var bright = map(count, 0, maxIterations, 0, 2);
            bright = map(sqrt(bright), 0, 1, 0, 250);
            if(count == maxIterations) {
                bright = 0;
            }

            var pix = (i + j * width) * 4;
            pixels[pix + 0] = bright;
            pixels[pix + 1] = fc;
            pixels[pix + 2] = bright;
            pixels[pix + 3] = 255;
        }
    }

    updatePixels();
    
    
}

function draw() {

    
}