var symbolSize = 26;
var streams = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  var x = 0;
  var y = 0;
  for(var i = 0; i <= (width / symbolSize); ++i) {
    var stream = new Stream(x, y);
    stream.generateSymbols();
    streams.push(stream);
    x += symbolSize;
  }


  textSize(symbolSize);

}

function makeItRain() {
  requestAnimationFrame(makeItRain);
  background(0);
  for(i = 0; i < streams.length; ++i) {
    streams[i].render();
  }
}

function Symbol(x, y, speed) {
  this.x = x;
  this.y = y;
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
    for(var i = 0; i < this.totalSymbols; ++i) {
      symbol = new Symbol(x, y, this.streamSpeed);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
    }
  };

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      fill(0,255,70);
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
