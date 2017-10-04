var symbolSize = 26;
var streams = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  var x = 0;
  for(var i = 0; i <= (width / symbolSize); ++i) {
    var stream = new Stream(x, round(random(-width, 0)));
    stream.generateSymbols();
    streams.push(stream);
    x += symbolSize;
  }


  textSize(symbolSize);

}

function makeItRain() {
  requestAnimationFrame(makeItRain);
  background(0, 150);
  for(i = 0; i < streams.length; ++i) {
    streams[i].render();
  }
}

function Symbol(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.first = first;
  this.speed = speed;
  this.value;
  this.switchSymbolInterval = round(random(5, 20));

  this.rainDown = function() {
    if(this.y >= height) {
      this.y = -symbolSize;
    } else {
        this.y += this.speed;
    }

  }

  this.setToRandomSymbol = function() {

    if(frameCount % this.switchSymbolInterval == 0) {
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96))
      );
    }


  }

}


function Stream(x, y) {
  this.x = x;
  this.y = y;
  this.symbols = [];
  this.totalSymbols = round(random(5, 25));
  this.streamSpeed = round(random(5, 20));
  this.generateSymbols = function() {
    var y = this.y;
    var x = this.x;
    var first = round(random(0, 1)) == 1;
    for(var i = 0; i < this.totalSymbols; ++i) {
      symbol = new Symbol(x, y, this.streamSpeed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
    }
  };

  this.render = function() {

    this.symbols.forEach(function(symbol) {
      if(symbol.first) {
        fill(180,255,180);
      } else {
        fill(0,255,70);
      }

      text(symbol.value, symbol.x, symbol.y);
      symbol.rainDown();
      symbol.setToRandomSymbol();
    });
  };
}

document.getElementById("mir").addEventListener("click", function() {
  document.getElementById("mir").style.display = "none";
  makeItRain();
});
