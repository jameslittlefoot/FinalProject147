let bulletsFired = [];
let targetBalloons = [];
let	mainTurrent;
let turPosX = 300;
let turPosY = 500;
let targetTimer = 0;
let balloonSpawnMultiplier = 1;
let balloonSizeMultiplier = 2;
let score = 0;
let Retry;
let Survived;
let balloonsMax = 5;
let balloonsSpawned = 0;
let balloonsKilledThisWave = 0;
let balloonsKilledTotal = 0;
let highScore = 0;
let waveNum = 1;


function setup() {
	createCanvas(600, 600);
	angleMode(DEGREES);
	mainTurrent = new turret(300,300);
    bLine = new boundaryline();
	Retry = createButton('retry');
    Survived = createButton('Continue')
	Survived.hide();
	
	if (!Cookies.get('highscore')){
		Cookies.set('highscore', '0');
	}
	highScore = Cookies.get('highscore');
}


function mousePressed(){
	let mouseVector = getMouseVector();
	oneBullet = new bullet(mouseVector.x, mouseVector.y);
	bulletsFired.push(oneBullet);
}

function draw() {
	background(20);
	
	drawReticle();

	//----------------------------------------BALLOONS-SPAWN--------------------------------------
	targetTimer += 1;
	let spawnInterval = int(100 / balloonSpawnMultiplier);
	//print(spawnInterval)
    if(balloonsSpawned < balloonsMax){
        if (targetTimer % spawnInterval == 0){
            let newBalloon = new balloon();
            targetBalloons.push(newBalloon);
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
            balloonsKilledThisWave++;
            balloonsKilledTotal++;
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
        gameOver();
    }
	//------------------------Wave Survived--------------------------------------
    if(balloonsKilledThisWave == balloonsMax){
      waveSurvived();  
    }

	//------------------------------------------Turret---------------------------------------a
	mainTurrent.display();
	mainTurrent.move();

	//------------------------------------------TUTORIAL------------------------------------------------
	noStroke();
	if (targetTimer < 500 && waveNum < 2){
		textAlign(LEFT);
		textFont('Helvetica');
		textSize(14);
		fill(235);
		text("arrow keys or wasd: move", 35, 35);
		text("mouse: aim", 35, 50);
		text("left click: fire", 35, 65);
	}
}



	
























