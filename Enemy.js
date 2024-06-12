class Zombie{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.spd = 2;
    this.health = 10;
    this.a = 0;
    this.hitCooldown = 10;
    this.hitTimer = 0;
  }

  run(){
    this.move();
    this.checkIfHit();
    this.draw();
    
    
    
  }

  move(){
    this.a = atan2(player1.y-this.y,player1.x-this.x);
    this.x += this.spd * cos(this.a);
    this.y += this.spd * sin(this.a);

    this.x -= myCar.xchange;
    this.y -= myCar.ychange;
  }

  draw(){
    push();
    translate(this.x,this.y);
    rotate(this.a-PI/2);
    image(zombie,-15,-15,30,30);
    pop();
  }

  die(){
    deadZombies.push(new DeadZombie(this.x,this.y,this.a-PI/2));
    enemies.splice(enemies.indexOf(this),1);
  }

  checkIfHit(){
    if(this.hitTimer >= this.hitCooldown){
      if(dist(this.x,this.y,player1.x,player1.y) < 10 && player1.isDriving == false){
        player1.health -= 1;
        this.hitTimer = 0;
      }
      if(dist(this.x,this.y,myCar.x,myCar.y) < 40){
        myCar.health -= 1;
        this.hitTimer = 0;
      }
    }
    this.hitTimer++;

    if(myCar.vel > 1 && dist(this.x,this.y,myCar.hitpoint1x,myCar.hitpoint1y) < 30){

      this.die();
      player1.money++;
      myCar.health -= 1;
    } else if(myCar.vel < -1 && dist(this.x,this.y,myCar.hitpoint2x,myCar.hitpoint2y) < 30){
      this.die();
      player1.money++;
      myCar.health -= 1;
    }
  }
  
}

function zombieSpawner(){
  
  if(myCar.distance > 150 && myCar.distance < 1000){
    if(frameCount % 60 == 0){
      for(let i = 0; i < 1; i++){
        enemies.push(new Zombie(random(0,width),random(-height,0)));
      }
    }
  } else if(myCar.distance > 1300 && myCar.distance < 2400){
      if(frameCount % 60 == 0){
        for(let i = 0; i < 1; i++){
          enemies.push(new Zombie(random(0,width),random(-height,0)));
        }
      }
    } else {
      for(let i = 0; i < enemies.length; i++){
        enemies[i].die();
      }
    }
}

class DeadZombie{
  constructor(x,y,a){
    this.x = x;
    this.y = y;
    this.a = a;
    this.lifetime = 100;
  }

  run(){
    if(this.lifetime == 0){
      deadZombies.splice(deadZombies.indexOf(this),1);
    }
    
    this.move();
    this.draw();

    this.lifetime--;
  }

  move(){
    this.x -= myCar.xchange;
    this.y -= myCar.ychange;
  }

  draw(){
    push();
    translate(this.x,this.y);
    rotate(this.a);
    image(deadZombie,-15,-30,30,60);
    pop();
  }
}