class balloon{
	constructor(){
		this.x = int(random(width));
		this.y = 0;
		this.xSpd = 0;
		if(waveNum < 5){
			this.ySpd = balloonSpawnMultiplier;
		}
		else if(waveNum < 10 && waveNum > 5){
			this.ySpd = getRandomInt(0,1)+balloonSpawnMultiplier;
		}
		else{
			this.ySpd = getRandomInt(0,2)+balloonSpawnMultiplier;
		}
		this.r = 12*balloonSizeMultiplier;
		this.health = 1;
	}
	
	display(){
		push();
		noStroke();
		fill(255, 0, 0);
		ellipse(this.x, this.y, this.r);
		pop();
	}
	
	update(){
		this.x += this.xSpd;
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
