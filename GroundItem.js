class GroundItem {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rand = floor(random(0, 4));
    
  }


  show() {
    if(this.rand == 0){
      image(bush1, this.x, this.y, this.w, this.h);
    } else if (this.rand == 1) {
      image(rock1, this.x, this.y, this.w, this.h);
    } else if (this.rand == 2) {
      image(rock2, this.x, this.y, this.w, this.h);
    } else if (this.rand == 3) {
      image(rock3, this.x, this.y, this.w, this.h);
    }
    
  }

  setVelocity(x, y) {
    this.x += x;
    this.y += y;
  }

}

class Building{
  constructor(x,y,w,h,img){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
  }

  show(){
    image(this.img,this.x,this.y,this.w,this.h);
  }

  setVelocity(x, y) {
    this.x += x;
    this.y += y;
  }
}

function spawnGroundItem(x,y) {
  groundItems.push(new GroundItem(x,y,50,50));
  wallArray.push(new Wall(x+4, y+4, 42, 42));
}


function groundItemsOffScreen() {
  for (let i = 0; i < groundItems.length; i++) {
    if (groundItems[i].y > height*2 || groundItems[i].x < -width - 50 || groundItems[i].x > width*2+50) {
      groundItems.splice(i, 1);
      wallArray.splice(i,1);
     spawnGroundItem(random(0, width), random(-height, 0));
    } else {
      groundItems[i].show()
    }
  }
}


// function spawnBuilding(){
//   if(myCar.distance >= 1000 && buildings.length == 0){
//     buildings.push(new Building(roadPieces[roadPieces.length-1].x,roadPieces[roadPieces.length-1].y,100,100,gasStation1));
//   } 
// }



// function randItemSpawn(){
//   let itemSpawnDistance = myCar.distance + random(0,100);
//   if(round(myCar.distance % 50) == 5){
//     spawnGroundItem(random(0,width),random(-height,0));
//   }
// }