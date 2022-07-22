class bigBalloon{
	constructor(){
		this.x = int(random(width));
		this.y = 0;
		this.xSpd = 0;
		this.ySpd = balloonSpawnMultiplier;
		this.r = 25*balloonSizeMultiplier;
        if(waveNum < 5){
			this.health = 3-maxHealthReduce;
		}
		else if(waveNum < 12 && waveNum > 5){
			this.health = getRandomInt(3,4)-maxHealthReduce;
		}
		else{
			this.health = getRandomInt(3,6)-maxHealthReduce;
		}
	}
	
	display(){
		push();
		noStroke();
		fill(0, 255, 0);
		rect(this.x, this.y, this.r);
		pop();
	}
	
	update(){
		this.y += this.ySpd;	
	}
	
	outOfBounds(){
		return(this.x > width+10 || this.x < -10 || this.y > height+10 || this.y < -10);
	}
	myX(){
		return this.x;
	}
	
	myY(){
		return this.y;
	}
	
	myR(){
		return this.r;
	}
	
		
}
