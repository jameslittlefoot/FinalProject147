let bulletsFired = [];
let targetBalloons = [];
let	mainTurret;
let turPosX = 300;
let turPosY = 500;
let targetTimer = 0;
let balloonSpawnMultiplier = 1;
let balloonSizeMultiplier = 2;
let score = 0;
let Retry;
let Survived;
let powerUp1;
let powerUp2;
let powerUp3;

let balloonsMax = 5;
let balloonsSpawned = 0;
let balloonsKilledThisWave = 0;
let balloonsPassedThisWave = 0;
let balloonsKilledTotal = 0;
let highScore = 0;
let waveNum = 1;
let playerSprite;
let health = 2;
let maxHealth = 2;
//Buffable Variables;
let bulletSpeed = 8;
let bulletSize = 5;
let bulletDamage = 1;
let maxHealthReduce = 0;
let moveSpeed = 4;
let waveReduce = 0;

function setup() {
	createCanvas(600, 600);
	angleMode(DEGREES);
	mainTurret = new turret(300,300);
    bLine = new boundaryline();
	Retry = createButton('retry');
	Retry.hide();

    Survived = createButton('Continue');
	Survived.show();
    Survived.position(250, 380);
	Survived.size(100,30);
	Survived.style('background-color', '#202020');
	Survived.style('color', '#FFFFFF');
	Survived.hide();

	powerUp1 = createButton('powerUp1');
	powerUp1.position(200, 410);
	powerUp1.style('background-color', '#202020');
	powerUp1.style('color', '#FFFFFF');
	powerUp1.hide();

	powerUp2 = createButton('powerUp2');
	powerUp2.position(200, 440);
	powerUp2.style('background-color', '#202020');
	powerUp2.style('color', '#FFFFFF');
	powerUp2.hide();

	powerUp3 = createButton('powerUp3');
	powerUp3.position(200, 470);
	powerUp3.style('background-color', '#202020');
	powerUp3.style('color', '#FFFFFF');
	powerUp3.hide();

	if (!Cookies.get('highscore')){
		Cookies.set('highscore', '0');
	}
	highScore = Cookies.get('highscore');
	playerSprite = loadImage('/playerSprite.png');
	playerSprite.resize(30, 30);
}


function mousePressed(){
	let mouseVector = getMouseVector();
	oneBullet = new bullet(mouseVector.x, mouseVector.y);
	bulletsFired.push(oneBullet);
}

function draw() {

	background(20);

	fill(255, 0, 0, 255);
	stroke(255, 0, 0);
	rect(10, 550 , 30, 10);
	rect(20, 540 , 10, 30);

	fill(255, 165, 0, 255);
	stroke(0, 0, 0);
	rect(135, 540 , 10, 30);
	rect(145, 540 , 10, 30);
	rect(155, 540 , 10, 30);


	drawReticle();

	//----------------------------------------BALLOONS-SPAWN--------------------------------------
	targetTimer += 1;
	let spawnInterval = int(100 / balloonSpawnMultiplier);
	//print(spawnInterval)
    if(balloonsSpawned < balloonsMax-(balloonsMax*waveReduce)){
		let rand = getRandomInt(1,10);
		let rand2 = getRandomInt(1, 4);
        if (targetTimer % spawnInterval == 0){
			let newBalloon = new balloon();
			let newBigBalloon = new bigBalloon();
			let newDodgingBalloon = new dodgingBalloon();
			if(waveNum > 2 && waveNum < 4 && rand >= 8){
				targetBalloons.push(newBigBalloon);
			}
			else if(waveNum >= 4 && waveNum < 10 && rand >= 6){
				if(rand2 >= 2){
					targetBalloons.push(newBigBalloon);
				}
				else{
					targetBalloons.push(newDodgingBalloon);
				}
			}
			else if(waveNum > 10 && rand >= 5){
				if(rand2 >= 3){
					targetBalloons.push(newBigBalloon);
				}
				else{
					targetBalloons.push(newDodgingBalloon);
				}
			}
			else{
				targetBalloons.push(newBalloon);
			}
            balloonsSpawned++;
            score += 5;
        }
    }
	
	//----------------------------------------------BULLETS----------------------------------------
	for (var i = 0; i < bulletsFired.length; i++){
		bulletsFired[i].display();
		bulletsFired[i].update();
		if (bulletsFired[i].outOfBounds()){
      		bulletsFired.splice(i,1);
    	}
		else if (bulletsFired[i].hitScan()){
      		bulletsFired.splice(i,1);
    	}
	}
	
	
	//-------------------------------------------EVIL-BALLOONS----------------------------------------
	for (var i = 0; i < targetBalloons.length; i++){
		targetBalloons[i].display();
		targetBalloons[i].update();
		if (targetBalloons[i].outOfBounds()){
      		targetBalloons.splice(i,1);
    	}
	}
	
	balloonSpawnMultiplier += 0.001;
	if (balloonSizeMultiplier < 5){
		balloonSizeMultiplier += 0.001;
	}
    //------------------------Draw Boundary Line---------------------------------
    bLine.display();
    if(bLine.crossedLine()){
		print(health);
    }
	if(health <=0){
		gameOver();
	}
	//------------------------Wave Survived--------------------------------------
    if(balloonsKilledThisWave + balloonsPassedThisWave == balloonsMax-(balloonsMax*waveReduce)){
      waveSurvived();  
    }

	//------------------------------------------Turret---------------------------------------a
	mainTurret.display(playerSprite);
	mainTurret.move();

	//------------------------------------------TUTORIAL------------------------------------------------
	noStroke();
	if (targetTimer < 300 && waveNum < 2){
		textAlign(LEFT);
		textFont('Helvetica');
		textSize(14);
		fill(235);
		text("arrow keys or wasd: move", 35, 235);
		text("mouse: aim", 35, 250);
		text("left click: fire", 35, 265);
	}


	//----------------------------HUD Display---------------------------
	if (targetTimer < 200 && waveReduce != 0){
		textAlign(LEFT);
		textFont('Georgia');
		textSize(30);
		fill(235);
		text("Fewer Enemies this wave!", 200,300);
	}

	if (targetTimer < 200 && maxHealthReduce != 0){
		textAlign(LEFT);
		textFont('Georgia');
		textSize(30);
		fill(235);
		text("Big Balloons have less health this wave!", 200,300);
	}
		textAlign(LEFT);
		textFont('Helvetica');
		textSize(14);
		fill(235);
		text("Damage: " + bulletDamage, 175,560);

		textAlign(LEFT);
		textFont('Helvetica');
		textSize(14);
		fill(235);
		text("Health: " + health, 50,560);

		textAlign(LEFT);
		textFont('Helvetica');
		textSize(14);
		fill(235);
		text("Move Speed: " + moveSpeed, 300,560);

		textAlign(LEFT);
		textFont('Helvetica');
		textSize(14);
		fill(235);
		text("Bullet Speed: " + bulletSpeed, 475,560);
}



	
























