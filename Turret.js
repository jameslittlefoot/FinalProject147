class turret{
	constructor(){
	}
	
	display(){
		push()
		stroke(0, 0, 255);
		fill(0, 0, 255);
		ellipse(turPosX, turPosY, 30);
		pop();
	}
	
	move(){
			if ((keyIsDown(65) || keyIsDown(LEFT_ARROW)) && turPosX > 5) {
    			turPosX -= 5;
	  		}
  			if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && turPosX < width-5) {
    			turPosX += 5;
  			}
		}
	
	hitScan(){
		for (var i = 0; i < targetBalloons.length; i++){
			var collideOrNot = collideCircleCircle(turPosX, turPosY, 30, targetBalloons[i].myX(), targetBalloons[i].myY(), targetBalloons[i].myR())
			if (collideOrNot){
				return true;
			}
		}
		return false;
	}
}