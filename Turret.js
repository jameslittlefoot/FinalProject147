class turret{
	constructor(){
	}
	
	display(playerSprite){
		push()
		stroke(0, 0, 255);
		fill(0, 0, 255);
		ellipse(turPosX, turPosY, 30);
		pop();
	}
	
	move(){
			if ((keyIsDown(65) || keyIsDown(LEFT_ARROW)) && turPosX > 5) {
    			turPosX -= moveSpeed;
	  		}
  			if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && turPosX < width-5) {
    			turPosX += moveSpeed;
  			}
			if ((keyIsDown(87) || keyIsDown(UP_ARROW)) && turPosY > 470) {
    			turPosY -= moveSpeed;
  			}
  			if ((keyIsDown(83) || keyIsDown(DOWN_ARROW)) && turPosY < height-20) {
    			turPosY += moveSpeed;
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