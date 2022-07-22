class boundaryline{	
	display(){
		push();
        strokeWeight(6);
        line(0, 450, 600, 450);   
		pop();
	}

    crossedLine(){
        for (var i = 0; i < targetBalloons.length; i++){
			var collideOrNot = collideLineCircle(0, 450, 600, 450, targetBalloons[i].myX(), targetBalloons[i].myY(), targetBalloons[i].myR())
			if (collideOrNot){
				targetBalloons.splice(i,1);
				balloonsPassedThisWave++;
				health--;
				print(health);   
			}
		}
		return false;
    }
		
}