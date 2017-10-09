var video;
var slider;
var cols = 60;
var rows = 30;
var boxes = [];

function setup() {

    noCanvas();
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(cols, rows);
    slider = createSlider(0, 255, 120);
    for(var j = 0; j < rows; ++j) {
        for(var i = 0; i < cols; ++i) {
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            document.getElementById("mirror").appendChild(checkbox);
            var space = document.createElement('span');
            space.innerHTML = "&nbsp;";
            document.getElementById("mirror").appendChild(space);
            boxes.push(checkbox);
        }

        var lineBreak = createSpan("<br />");
        lineBreak.parent("mirror");
    }
    
}

function draw() {

    video.loadPixels();
    for(var y = 0; y < video.height; ++y) {
        for(var x = 0; x < video.width; ++x) {

            var index = ((video.width - x + 1) + y * video.width) * 4;
            var r = video.pixels[index + 0];
            var g = video.pixels[index + 1];
            var b = video.pixels[index + 2];

            var bright = (r + g + b) / 3;
            var threshold = slider.value();
            var checkIndex = x + y * cols;
            
            if(bright > threshold) {
                boxes[checkIndex].checked = false;
            } else {
                boxes[checkIndex].checked = true;
            }

        }
    }


}