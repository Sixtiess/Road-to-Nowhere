class Player{
  constructor(x,y,spd,k1,k2,k3,k4,k5){
    this.x = x;
    this.y = y;
    this.spd = spd;
    this.k1 = k1;
    this.k2 = k2;
    this.k3 = k3;
    this.k4 = k4;
    this.k5 = k5;
    this.isDriving = false;
    this.horizontal = true;
    this.canInteract = true;
    this.health = 10;
    this.money = 0;
  }

  run(){
    if(!this.isDriving){
      this.move();
      this.checkIfHit();
      this.draw();
    }
    this.interact()
  }

  move(){
    if(keyIsDown(this.k1)){
      this.y -= this.spd;
      this.horizontal = true;
    }
    if(keyIsDown(this.k2)){
      this.x -= this.spd;
      this.horizontal = false;
    }
    if(keyIsDown(this.k3)){
      this.y += this.spd;
      this.horizontal = true;
    }
    if(keyIsDown(this.k4)){
      this.x += this.spd;
      this.horizontal = false;
    }
  }

  draw(){
    
    if(this.horizontal == true){
      image(playerHoriz,this.x-15,this.y-15,30,30);
    }
    if(this.horizontal == false){
      image(playerVert,this.x-15,this.y-15,30,30);
    }

    fill(0);
    strokeWeight(2);
    noStroke();
    rect(this.x-52,this.y-52,104,14);
    fill('green');
    rect(this.x-50,this.y-50,this.health*10,10);
    

    
  }

  interact(){
    // console.log(dist(this.x,this.y,building1.x,building1.y) , this.canInteract , this.isDriving)
    if(dist(this.x,this.y,width/2,height/2) < 80 && this.canInteract && !this.isDriving && myCar.health > 0){
      textSize(20);
      fill(0)
      textAlign(CENTER)
      text('Press E to get in',width/2,350)
      textAlign(LEFT)
    } else if(b1isSpawned){
      
      //console.log(dist(this.x,this.y,building1.x,building1.y) , this.canInteract , this.isDriving)
      
      if(dist(this.x,this.y,building1.x,building1.y) < 300 && this.canInteract && !this.isDriving){
        textSize(20);
        fill(0)
        textAlign(CENTER)
        text('Press E to enter shop',width/2,350)
        textAlign(LEFT)

        for(let i = 0; i<enemies.length; i++){
          enemies[i].die();
        }
      }
    } 
    if(b2isSpawned){

      //console.log(dist(this.x,this.y,building1.x,building1.y) , this.canInteract , this.isDriving)

      if(dist(this.x,this.y,building2.x,building2.y) < 300 && this.canInteract && !this.isDriving){
        textSize(20);
        fill(0);
        textAlign(CENTER)
        text('Press E to enter shop',width/2,350)
        textAlign(LEFT)
        
        for(let i = 0; i<enemies.length; i++){
          enemies[i].die();
        }
      }
    } 
    
    if(dist(this.x,this.y,width/2,height/2) < 80 && keyIsDown(this.k5) && this.canInteract && myCar.health > 0){

      if(this.isDriving){
        this.isDriving = false;
        this.x = width/2 - 50;
        this.y = height/2;
      } else if (!this.isDriving) {
        this.isDriving = true;
        this.x = width/2;
        this.y = height/2;
      }
      
      this.canInteract = false;
    }

  if(b1isSpawned){
    if(dist(this.x,this.y,building1.x,building1.y) < 300 && keyIsDown(this.k5) && this.canInteract){
      
      buildingGUI = true;

      this.canInteract = false;

      
    }
  }

    if(b2isSpawned){
      if(dist(this.x,this.y,building2.x,building2.y) < 300 && keyIsDown(this.k5) && this.canInteract){

        buildingGUI = true;

        this.canInteract = false;


      }
    }

    if(this.canInteract == false && !keyIsDown(this.k5)){
      this.canInteract = true;
    }

    
  }

  checkIfHit(){
    if(this.health <= 0){
      gameOver = true;
    }
  }


  setVelocity(x,y){
    this.x += x;
    this.y += y;
    
  }


  
}