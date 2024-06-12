let roadPieces = [];
let groundItems = [];
let carTrails = [];
let enemies = [];
let wallArray = [];
let buildingWallArray = [];
let deadZombies = [];
let buildings = [];

let buildingGUI = false;
let b1isSpawned = false;
let b2isSpawned = false;
let f1isSpawned = false;
let f2isSpawned = false;
let f3isSpawned = false;

let gameOver = false;

let clickCooldown = false;

function preload(){
  blackCar = loadImage("assets/car/blackCar.png");
  playerVert = loadImage("assets/player/playerVert.png");
  playerHoriz = loadImage("assets/player/playerHoriz.png");
  zombie = loadImage("assets/zombie/zombieDetailed.png");
  deadZombie = loadImage("assets/zombie/deadZombie.png");
  bush1 = loadImage("assets/scenery/bush1.png");
  rock1 = loadImage("assets/scenery/rock1.png");
  rock2 = loadImage("assets/scenery/rock2.png");
  rock3 = loadImage("assets/scenery/rock3.png");
  gasStation1 = loadImage("assets/structures/gasStation1.png");
  gasStation2 = loadImage("assets/structures/gasStation2.png");
  fence2img = loadImage("assets/structures/fence1.png");
  fence1img = loadImage("assets/structures/fence2.png");
  julee = loadFont("assets/fonts/Julee-Regular.ttf");
  grechen = loadFont("assets/fonts/GrechenFuemen-Regular.ttf");

  //sadPast = loadSound('assets/sounds/sadPast.mp3');
  //Sad Past - Silent Partner
  //Music used under Fair Use
}

function setup() {
  setupCanvas()
  //sadPast.play()
  player1 = new Player(width/2 - 50,height/2,2.5,87,65,83,68,69);

  myCar = new Car(width/2,height/2,87,65,83,68);

  roadPieces.push(new RoadPiece(350,0,450,0,450,1000,350,1000));

  // groundItems.push(new GroundItem(random(0,width),random(-height,0),50,50))
  // groundItems.push(new GroundItem(random(0,width),random(-height,0),50,50))
  // groundItems.push(new GroundItem(random(0,width),random(-height,0),50,50))
  // groundItems.push(new GroundItem(random(0,width),random(-height,0),50,50))
  // groundItems.push(new GroundItem(random(0,width),random(-height,0),50,50))

  textFont(julee)
  spawnGroundItem(random(0,width),random(-height,0));
  spawnGroundItem(random(0,width),random(-height,100));
  spawnGroundItem(random(0,width),random(-height,200));
  spawnGroundItem(random(0,width),random(-height,300));
  
}


function setupCanvas(){
  cnv = createCanvas(800, 1000);
  background(200);
  cnv.position(windowWidth/2 - width/2,windowHeight/2 - height/2);
}


function draw() {
  background(200)
    //console.log(wallArray.length,groundItems.length);

  // for(let i = 0; i < wallArray.length; i++){
  //   wallArray[i].display();
  // }

  // for(let i = 0; i < buildingWallArray.length; i++){
  //   buildingWallArray[i].display();
  // }
  
  if(gameOver){
    textSize(50);
    textAlign(CENTER);
    text('Game Over',width/2,height/2);
    textAlign(LEFT);
  } else if(buildingGUI){

    


    textAlign(CENTER);
    
    fill('black');
    rect(50,height/2,50,50,10);
    rect(200,height/2,200,100,10);
    rect(500,height/2,200,100,10);
    
    text('10 Money',300,height/2-25);
    text('100 Money',600,height/2-25);
    
    fill('white');
    text('Repair',300,height/2+60);
    textSize(20)
    text('Increase Max Health',600,height/2+60);

    textAlign(LEFT)

    
    
      if(hitRect(50,height/2,50,50) && !clickCooldown){
        buildingGUI = false;
        clickCooldown = true;
        
      } else if(hitRect(200,height/2,200,100) && !clickCooldown){
        if(player1.money >= 10 && myCar.health < myCar.maxHealth){
          player1.money -= 10
          myCar.health += 20;
        }
        player1.money = constrain(player1.money,0,10000000000000000);
        myCar.health = constrain(myCar.health,0,myCar.maxHealth);
        clickCooldown = true;
        
      } else if(hitRect(500,height/2,200,100) && !clickCooldown){
      if(player1.money >= 100){
        player1.money -= 100
        myCar.maxHealth += 100;
      }
      player1.money = constrain(player1.money,0,10000000000000000);
      myCar.health = constrain(myCar.health,0,myCar.maxHealth);
      clickCooldown = true;
    }
    
      if(!mouseIsPressed){
        clickCooldown = false;
      }
    
  } else {
    createRoadPieces();



    for(let i = 0; i < roadPieces.length; i++){
      roadPieces[i].show();
    }

    for(let i = 0; i < carTrails.length; i++){
      carTrails[i].run();
    }

    for(let i = 0; i < deadZombies.length; i++){
      deadZombies[i].run();
    }

    for(let i = 0; i < enemies.length; i++){
      enemies[i].run();
    }

    // for(let i = 0; i < wallArray.length; i++){
    //   wallArray[i].display();
    // }

    // randItemSpawn();
    groundItemsOffScreen();

    //dspawnBuilding()

    if(b1isSpawned){
      building1.show()
    }

    if(b2isSpawned){
      building2.show()
    }

    if(f1isSpawned){
      fence1.show()
      fence2.show()
      fence3.show()
      fence4.show()
      fence5.show()
    }

    if(f2isSpawned){
      fence6.show()
      fence7.show()
      fence8.show()
      fence9.show()
      fence10.show()
    }

    if(f3isSpawned){
      fence11.show()
      fence12.show()
      fence13.show()
      fence14.show()
      fence15.show()
    }

    player1.run();
    myCar.run();


    
    
    zombieSpawner();

    
  }

  noStroke();
  fill('black');
  rect(585,35,210,70);
  if(myCar.health > 0){
    fill('green');
    rect(590,40,200 * ((myCar.health/myCar.maxHealth)),60);
    textSize(20)
    fill(0)
    text('Health: '+myCar.health+'/'+myCar.maxHealth,625,125);
  }

  fill(0);
  noStroke();
  textSize(50);
  text('Meters: ' + round(myCar.distance), 20, 100);
  text('Money: ' + player1.money, 20, 150);
}



function hitRect(x,y,w,h){
  if(inRect(x,y,w,h) && mouseIsPressed){
    return true;
  } else {
    return false;
  }
}

function inRect(x,y,w,h){
  if(mouseX>x && mouseX<x+w && mouseY>y && mouseY<y+h){
    return true;
  } else {
    return false;
  }
}