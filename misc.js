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
	Survived.show();
    Survived.position(250, 380);
	Survived.size(100,30);
	Survived.style('background-color', '#202020');
	Survived.style('color', '#FFFFFF');
	Survived.mousePressed(nextWave);

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

function getRandomInt(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextWave(){
	Survived.hide();
    waveNum++;
	bulletsFired = [];
	targetBalloons = [];
	targetTimer = 0;
    balloonsKilledThisWave = 0;
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
    balloonsKilledThisWave = 0;
	balloonSpawnMultiplier = 2;
	balloonSizeMultiplier = 2;
	score = 0;
	
	loop();
}