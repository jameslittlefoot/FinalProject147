const powerUpFillers = {
	heal: [1, 2, 3, 4, 5],
	projectileSpeed: [.25, .50, .75, 1],
	projectileSize: [.25, .50, .75, 1],
	maxBalloonHealthReduce: [1, 2],
	projectileDamage: [1, 2],
	increaseMoveSpeed:[2,3,4],
	lessEnemies: [.25, .50],
	increaseMaxHealth: [1,3]
}
let keys = ['heal','projectileSpeed',"projectileSize", "maxBalloonHealthReduce", "projectileDamage", "increaseMoveSpeed", "lessEnemies", "increaseMaxHealth"];

let keysBase = ['heal','projectileSpeed',"projectileSize", "maxBalloonHealthReduce", "projectileDamage", "increaseMoveSpeed", "lessEnemies", "increaseMaxHealth"];

let pChoices = ["Heal For ", 
	"Increase Projectile Speed By ", 
	"Increase Projectile Size by ", 
	"Reduce Big Balloon Health for 1 wave by ",
	"Increase Projectile Damage by ",
	"Increase Move Speed by ",
	"Lower the Amount of Enemies for round by ",
	"Increase your Max Health (does not heal) by "];

let pChoicesBase = ["Heal for ", 
	"Increase Projectile Speed By ", 
	"Increase Projectile Size by ", 
	"Reduce Big Balloon Health for 1 wave by ",
	"Increase Projectile Damage by ",
	"Increase Move Speed by ",
	"Lower the Amount of Enemies for round by ",
	"Increase your Max Health (does not heal) by  "];

let power1;
let power2;
let power3;
function getMouseVector(){
	let mouseXalt = mouseX - turPosX;
	let mouseYalt = mouseY - turPosY;
	let mouseDir = createVector(mouseXalt, mouseYalt);
	mouseDir.normalize();
	return mouseDir;
}
	
function drawReticle(){
	noFill();
	strokeWeight(1.5);
	stroke(0, 100, 125, 125);
	ellipse(mouseX, mouseY, 20);
	stroke(80, 160, 200, 125);
	line(mouseX-14, mouseY-14, mouseX+14, mouseY+14);
	line(mouseX+14, mouseY-14, mouseX-14, mouseY+14);
	stroke(80, 160, 200, 125);
	line(turPosX, turPosY, mouseX, mouseY);
}

function waveSurvived(){
	noLoop();
	maxHealthReduce = 0;
	waveReduce = 0;
	powerUpGenerator();
	if(waveNum % 2 == 0){
		textFont('Georgia');
		textAlign(CENTER);
		textSize(25);
		fill(0,255,0);
		text("Choose a power up from below",300,380);

		powerUp1.show();
		powerUp2.show();
		powerUp3.show();

		powerUp1.mousePressed(function() { doPowerUp(powerUp1.value(), 1);});
		powerUp2.mousePressed(function() { doPowerUp(powerUp2.value(), 2);});
		powerUp3.mousePressed(function() { doPowerUp(powerUp2.value(), 3);});
	}
	else{
		Survived.show();
		Survived.mousePressed(nextWave);
	}

    textFont('Georgia');
	textAlign(CENTER);
	textSize(50);
	fill(0,255,0);
	text("Wave " + waveNum +" Survived!",300,300)

    textFont('Helvetica');
	textSize(18);
	fill(235);
	let scoreString = "score: " + score;
	text(scoreString, 150, 340);

    textFont('Helvetica');
	textSize(18);
	fill(235);
	let killCount = "Balloons killed: " + balloonsKilledTotal;
	text(killCount, 350, 340);
}

function powerUpGenerator(){
	let p1 = getRandomInt(0, pChoices.length - 1);
	let key1 = keys[p1];
	let options1 = powerUpFillers[key1];
	let val1 = options1[getRandomInt(0, options1.length-1)]
	power1 = key1;
	powerUp1.html(pChoices[p1] + val1);
	powerUp1.value(val1);
	pChoices.splice(p1, 1);
	keys.splice(p1, 1);

	let p2 = getRandomInt(0, pChoices.length - 1);
	let key2 = keys[p2];
	let options2 = powerUpFillers[key2];
	let val2 = options2[getRandomInt(0, options2.length-1)]
	power2 = key2;
	powerUp2.html(pChoices[p2]+ val2);
	powerUp2.value(val2);
	pChoices.splice(p2, 1);
	keys.splice(p2, 1);

	let p3 = getRandomInt(0, pChoices.length - 1);
	let key3 = keys[p3];
	let options3 = powerUpFillers[key3];
	let val3 = options3[getRandomInt(0, options3.length-1)]
	power3 = key3;
	powerUp3.html(pChoices[p3]+ val3);
	powerUp3.value(val3);
	pChoices.splice(p3, 1);
	keys.splice(p3, 1);

	pChoices = pChoicesBase;
	keys = keysBase;
}

function doPowerUp(powerUpValue, powerChoice){
	if(powerChoice == 1){
		buff(power1, powerUpValue);
	}
	else if(powerChoice == 2){
		buff(power2, powerUpValue);
	}
	else if(powerChoice == 3){
		buff(power3, powerUpValue);
	}
	nextWave();
}
function buff(key, powerUpValue){
	if(key == "heal"){
		health += powerUpValue;
		if(health >= maxHealth){
			health = maxHealth;
		}
	}
	else if(key == "projectileSpeed"){
		bulletSpeed += bulletSpeed * powerUpValue;
		if(bulletSpeed >= 20){
			bulletSpeed = 20;
		}
	}
	else if(key == "projectileSize"){
		bulletSize += bulletSize*powerUpValue;
	}
	else if(key == "maxBalloonHealthReduce"){
		maxBalloonHealthReduce = powerUpValue;
	}
	else if(key == "projectileDamage"){
		bulletDamage += powerUpValue;
		if(bulletDamage >= 3){
			bulletDamage = 3;
		}
	}
	else if(key == "increaseMoveSpeed"){
		moveSpeed += powerUpValue;
		if(moveSpeed >= 15){
			moveSpeed = 15;
		}	
	}
	else if(key == "lessEnemies"){
		waveReduce = powerUpValue;
		
	}
	else if(key == "increaseMaxHealth"){
		maxHealth += powerUpValue;
		if(maxHealth >= 10){
			maxHealth = 10;
		}
	}
}

function getRandomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextWave(){
	Survived.hide();
	powerUp1.hide();
	powerUp2.hide();
	powerUp3.hide();
    waveNum++;
	bulletsFired = [];
	targetBalloons = [];
	targetTimer = 0;
    balloonsKilledThisWave = 0;
	balloonsPassedThisWave = 0;
	balloonSpawnMultiplier = 1;
	balloonSizeMultiplier = 2;
    balloonsSpawned = 0;
    if(waveNum < 5){
        balloonsMax += getRandomInt(2,5);
    }
    else if(waveNum < 10 && waveNum > 5){
        balloonsMax += getRandomInt(5,10);
    }
    else{
        balloonsMax += getRandomInt(8,15);
    }
	loop();
}

function gameOver(){
	push()
	
	print("DED");
	noStroke();
	fill(20)
	rect(0,200,600,200)
	
	textFont('Georgia');
	textAlign(CENTER);
	textSize(50);
	fill(170,20,20);
	text("GAME OVER",300,300)
		
	textFont('Helvetica');
	textSize(18);
	fill(235);
	let scoreString = "score: " + score;
	text(scoreString, 300, 340);
	
	if (score > highScore) {
		highScore = score;
		Cookies.remove('highscore');
		Cookies.set('highscore', highScore);
	}
	
	let highScoreString = "highscore: " + highScore;
	text(highScoreString, 300, 360);
	
	Retry.show();
	Retry.position(250, 380);
	Retry.size(100,30);
	Retry.style('background-color', '#202020');
	Retry.style('color', '#FFFFFF');
	Retry.mousePressed(reset);
	
	pop();
	noLoop();
	
}

function reset(){
	Retry.hide();
	bulletsFired = [];
	targetBalloons = [];
	turPosX = 300;
	turPosY = 500;
	targetTimer = 0;
    balloonsMax = 5;
    balloonsSpawned = 0;
	waveNum = 1;
    balloonsKilledThisWave = 0;
	balloonsPassedThisWave = 0;
	balloonSpawnMultiplier = 2;
	balloonSizeMultiplier = 2;
	bulletSpeed = 8;
	bulletSize = 5;
	bulletDamage = 1;
	moveSpeed = 4;
	maxHealthReduce = 0;
	waveReduce = 0;
	score = 0;
	health = 2;
	
	loop();
}