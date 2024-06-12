class Car {
  constructor(x, y, k1, k2, k3, k4) {
    this.x = x;
    this.y = y;
    this.vel = 0;
    this.xchange = 0;
    this.ychange = 0;
    this.spd = 0.5;
    this.turnvel = 0;
    this.a = -PI / 2;
    this.k1 = k1;
    this.k2 = k2;
    this.k3 = k3;
    this.k4 = k4;
    this.distance = 0;
    this.maxHealth = 100;
    this.health = this.maxHealth;


    this.hitpoint1x = 0;
    this.hitpoint1y = 0;
    this.hitpoint2x = 0;
    this.hitpoint2y = 0;

  }

  run() {
    if(player1.isDriving && this.health > 0){
      this.move();
    } else {
      this.xchange *= 0.6;
      this.ychange *= 0.6;
      player1.setVelocity(-this.xchange, -this.ychange);
      this.vel = 0;
      this.turnvel = 0;
    }

    if((this.distance > 120 && this.distance < 150) || (this.distance > 1300 && this.distance < 1330)){-
      textFont(grechen)
      textSize(30)
      fill(130, 27, 7)
      text('ENTERING INFECTED ZONE',width/2-200,height/2-100)
      textFont(julee)
      textSize(20)
    } else if((this.distance > 1000 && this.distance < 1030) || (this.distance > 2400 && this.distance < 2430)){
        textFont(grechen)
        textSize(30)
        fill(4, 89, 29)
        text('EXITING INFECTED ZONE',width/2-200,height/2-100)
        textFont(julee)
        textSize(20)
      }
    
    this.draw();

    if(this.health <= 0){
      this.health = 0;
      player1.isDriving = false;
    }

    for (let i = 0; i < roadPieces.length; i++) {
      roadPieces[i].setVelocity(-this.xchange, -this.ychange)
    }

    for(let i = 0; i < groundItems.length; i++){
      groundItems[i].setVelocity(-this.xchange, -this.ychange)
    }

    for(let i = 0; i < wallArray.length; i++){
      wallArray[i].setVelocity(-this.xchange, -this.ychange)
    }

    for(let i = 0; i < buildingWallArray.length; i++){
      buildingWallArray[i].setVelocity(-this.xchange, -this.ychange)
    }

    if(b1isSpawned){
      building1.setVelocity(-this.xchange, -this.ychange)
    }

    if(b2isSpawned){
      building2.setVelocity(-this.xchange, -this.ychange)
    }
    
    if(f1isSpawned){
      fence1.setVelocity(-this.xchange, -this.ychange)
      fence2.setVelocity(-this.xchange, -this.ychange)
      fence3.setVelocity(-this.xchange, -this.ychange)
      fence4.setVelocity(-this.xchange, -this.ychange)
      fence5.setVelocity(-this.xchange, -this.ychange)
    }

    if(f2isSpawned){
      fence6.setVelocity(-this.xchange, -this.ychange)
      fence7.setVelocity(-this.xchange, -this.ychange)
      fence8.setVelocity(-this.xchange, -this.ychange)
      fence9.setVelocity(-this.xchange, -this.ychange)
      fence10.setVelocity(-this.xchange, -this.ychange)
    }

    if(f3isSpawned){
      fence11.setVelocity(-this.xchange, -this.ychange)
      fence12.setVelocity(-this.xchange, -this.ychange)
      fence13.setVelocity(-this.xchange, -this.ychange)
      fence14.setVelocity(-this.xchange, -this.ychange)
      fence15.setVelocity(-this.xchange, -this.ychange)
    }

    this.hitpoint1x = this.x + sin(this.a) + cos(this.a) * 30;
    this.hitpoint1y = this.y + cos(this.a) + sin(this.a) * 30;

    this.hitpoint2x = this.x + sin(this.a) + cos(this.a) * -30;
    this.hitpoint2y = this.y + cos(this.a) + sin(this.a) * -30;

    // fill('red')
    // ellipse(this.hitpoint1x, this.hitpoint1y, 30, 30);
    // ellipse(this.hitpoint2x, this.hitpoint2y, 30, 30);
  }

  move() {
    if (keyIsDown(this.k1)) {
      this.vel += this.spd;
    }

    if (keyIsDown(this.k3)) {
      this.vel -= this.spd;
    }

    if (keyIsDown(this.k2)) {
      this.turnvel -= 0.0003 * this.vel;

      
    }

    if (keyIsDown(this.k4)) {
      this.turnvel += 0.0003 * this.vel;

      
    }

    this.turnvel *= 0.9;
    this.a += this.turnvel;


    let nextX = this.vel * cos(this.a);
    let nextY = this.vel * sin(this.a);
    let hasCollided = false;

      for(let i = 0; i<wallArray.length /*&& !hasCollided*/; i++){

        if(nextX-25+width/2 < wallArray[i].x + wallArray[i].w && nextX+25+width/2 > wallArray[i].x && nextY-50+height/2 < wallArray[i].y + wallArray[i].h && nextY+50+height/2 > wallArray[i].y){
          hasCollided = true
          this.vel = 0;
        } 
      }

      for(let i = 0; i<buildingWallArray.length /*&& !hasCollided*/; i++){

        if(nextX-25+width/2 < buildingWallArray[i].x + buildingWallArray[i].w && nextX+25+width/2 > buildingWallArray[i].x && nextY-50+height/2 < buildingWallArray[i].y + buildingWallArray[i].h && nextY+50+height/2 > buildingWallArray[i].y){
          hasCollided = true
          this.vel = 0;
        } 
      }
    
      if(!hasCollided){
        this.xchange = nextX;//horizontal component
        this.ychange = nextY;//vertical component
      } else {
        this.xchange = 0;
        this.ychange = 0;
      }


    this.vel *= 0.95;


    // this.xchange = this.vel * cos(this.a);
    // this.ychange = this.vel * sin(this.a);

    this.distance -= this.ychange / 50;

    

   

    // this.x += this.vel * cos(this.a);
    // this.y += this.vel * sin(this.a);


    // text(this.vel,400,400);
    // text(this.xchange,400,600);
    // text(this.ychange,400,700);
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.a + PI / 2);
    image(blackCar, -25, -50, 50, 100);
    pop();

    //console.log(this.turnvel)

    if(abs(myCar.turnvel) > 0.02){
    carTrails.push(new carTrail(this.x + sin(this.a) * -15 + cos(this.a) * -30, this.y + cos(this.a) * 15 + sin(this.a) * -30, this.a));
    carTrails.push(new carTrail(this.x + sin(this.a) * 15 + cos(this.a) * -30, this.y + cos(this.a) * -15 + sin(this.a) * -30, this.a));
    }

    
    
  }
}

class carTrail {
  constructor(x, y, a) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.life = 100;
  }

  run() {
    this.move();
    
    this.draw();
    
    

    this.life -= 1;

    if(this.life == 0){
      carTrails.splice(carTrails.indexOf(this),1);
    }
  }

  move() {
    this.x -= myCar.xchange;
    this.y -= myCar.ychange;
  }

  draw() {
    push();
    translate(this.x,this.y);
    rotate(this.a);
    fill(50,50,50,this.life*2);
    noStroke();
    rect(-7,-5,14,10);
    pop();
  }
}