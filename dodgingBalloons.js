class dodgingBalloon{
	constructor(){
		this.x = getRandomInt(50,550);
        this.startX = this.x;
        this.direction = false;
		this.y = 0;
		if(waveNum < 6){
			this.xSpd = 1;
		}
		else if(waveNum <= 10 && waveNum >= 6){
			this.xSpd = getRandomInt(1,2);
		}
		else{
			this.xSpd = getRandomInt(1,3);
		}
        this.ySpd = 2;
		this.r = 8*balloonSizeMultiplier;
		this.health = 1;
	}
	
	display(){
		push();
		noStroke();
		fill(0, 0, 255);
		ellipse(this.x, this.y, this.r);
		pop();
	}
	
	update(){
        if(this.x - this.startX == 25){
            this.direction = true;
        }
        if(this.x - this.startX == -25){
            this.direction = false;
        }
        if(this.direction == false){
            this.x += this.xSpd;
        }
        if(this.direction == true){
            this.x -= this.xSpd;
        }

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
