// Initiating global variables

var canvas = document.getElementById("mycanvas");

var ctx = canvas.getContext("2d");

var score = 0;

var heroImg = document.getElementById("hero");
var enemyImg = document.getElementById("enemy");

// Enemies and heroes

var enemies = undefined;
var totalEnemies = undefined;
var hero = undefined;


// Some functions

function getRandomInt(min, max) {
//The maximum is exclusive and the minimum is inclusive

	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; 

}


function getNewEnemyPosition() {
	var enemyLoc = {};
	enemyLoc.x = getRandomInt(0, 10) * size;
	enemyLoc.y = getRandomInt(1, 4) * size;
	return enemyLoc;
}

function getNewHeroPosition() {
	var heroLoc = {};
	heroLoc.x = getRandomInt(0, 10) * size;
	heroLoc.y = 4 * size;
	return heroLoc;
}

function collisionDetection() {

	var x = hero.x;
	var y = hero.y;

	for(i = 0; i < totalEnemies; ++i) {

		var b = {};
		b.x = enemies[i].x;
		b.y = enemies[i].y;

  		if(x == b.x && y == b.y) {
  			return true;
  		}

	}

}

function gameSuccess() {

	if(hero.y == 0) {
		return true;
	}

}

function colorSchema() {


	// hero
	ctx.beginPath();
	ctx.rect(0, canvas.height - size, canvas.width, size);

	ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
	ctx.fill();

	// enemy
	ctx.beginPath();
	ctx.rect(0, (size), canvas.width, (size * 3));

	ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
	ctx.fill();

	// success line

	ctx.beginPath();
	ctx.rect(0, 0, canvas.width, size);

	ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
	ctx.fill();

}


// Setting canvas size

canvas.width = 640;
canvas.height = 320;

var size = 64;


// Setting up players

var Actor = function(x, y) {

	this.x = x;
	this.y = y;
	this.typeActor = "hero";

}

Actor.prototype.draw = function() {

	if(this.typeActor === "hero") {
		// Hero is of blue color
		// ctx.fillStyle = "rgba(0,0,255,0.7)";
		ctx.drawImage(heroImg, this.x, this.y);

	} else {
		// Enemy is of red color
		// ctx.fillStyle = "rgba(255,0,0,0.7)";
		ctx.drawImage(enemyImg, this.x, this.y, size, size);
	}

	// ctx.fillRect(this.x, this.y, size, size);

	


}


var Enemy = function(x, y) {

	Actor.call(this, x, y);
	this.typeActor = "enemy";

}

Enemy.prototype = Object.create(Actor.prototype);
Enemy.prototype.constructor = Enemy;


// Enemy position update function

Enemy.prototype.update = function() {
	
	if(this.x + size >= canvas.width) {
		// Enemy at end of line
		this.x = -size;
		var enemyLoc = getNewEnemyPosition();
		this.x = -size;
		this.y = enemyLoc.y;
	} else {
		this.x += size;
	}
}

// Grid creator function

function createGrid() {

	var w = canvas.width;
	var h = canvas.height;

	for(var i = 0; i < w; i += size) {

		for(var j = 0; j < h; j += size) {
			ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
			ctx.strokeRect(i, j, size, size);

		}

	}

}


function init() {

	totalEnemies = 10;
	enemies = [];
	hero = {};

	for(i = 0; i < totalEnemies; ++i) {
		var enemyLoc = getNewEnemyPosition();
		enemies.push(new Enemy(enemyLoc.x, enemyLoc.y));
	}
	
	var heroLoc = getNewHeroPosition();
	hero = new Actor(heroLoc.x, heroLoc.y);

}

init();


setInterval(function() {

	// Checking game end condition

	if(gameSuccess()) {

		// GAME COMPLETED
		// Incrementing score and restarting

		score++;
		ctx.clearRect(0,0,canvas.width, canvas.height);
		init();



	} else if(collisionDetection()) {

		// GAME RESTART

		ctx.clearRect(0,0,canvas.width, canvas.height);
		init();

	} else {


		ctx.clearRect(0,0,canvas.width, canvas.height);
	
		// Creating grid
		createGrid();

		// Drawing enemies
		for(i = 0; i < totalEnemies; ++i) {
			enemies[i].draw();
			enemies[i].update();
		}

		hero.draw();


		colorSchema();


	}

	document.getElementById("score").innerHTML = "SCORE : " + score;


}, 150);


// Adding event listeners to move hero

window.addEventListener('keypress', function (e) {
    if(e.keyCode == 119) {
    	// UP
    	var y = (hero.y - size) < 0 ? hero.y : (hero.y - size); 
    	
    	hero.y = y;


    } else if(e.keyCode == 97) {
    	// LEFT
    	
    	var x = (hero.x - size) < 0 ? hero.x : (hero.x - size); 
    	
    	hero.x = x;


    } else if(e.keyCode == 115) {
    	// DOWN
    	
    	var y = (hero.y + size) >= canvas.height ? hero.y : (hero.y + size); 
    	
    	hero.y = y;


    } else if(e.keyCode == 100) {
    	// RIGHT
    
    	var x = (hero.x + size) >= canvas.width ? hero.x : (hero.x + size); 
    	
    	hero.x = x;

    }



}, false);


