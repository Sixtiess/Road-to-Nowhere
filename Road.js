class RoadPiece {
  constructor(x1, y1, x2, y2, x3, y3, x4, y4) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.x4 = x4;
    this.y4 = y4;
    this.velocity = createVector(0, 0);
  }

  show() {
    stroke(80);
    //strokeWeight(2);
    fill(80);
    quad(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4);
  }

  setVelocity(x, y) {
    this.velocity.x = x;
    this.velocity.y = y;
    this.x1 += this.velocity.x;
    this.y1 += this.velocity.y;
    this.x2 += this.velocity.x;
    this.y2 += this.velocity.y;
    this.x3 += this.velocity.x;
    this.y3 += this.velocity.y;
    this.x4 += this.velocity.x;
    this.y4 += this.velocity.y;
  }
}

function createRoadPieces() {
  let savedPoint1 = createVector(roadPieces[roadPieces.length - 1].x1, roadPieces[roadPieces.length - 1].y1);
  let savedPoint2 = createVector(roadPieces[roadPieces.length - 1].x2, roadPieces[roadPieces.length - 1].y2);

  let roadRand = random(-400, 400);

  if (savedPoint1.y >= 0) {
    roadPieces.push(new RoadPiece(savedPoint1.x + roadRand, -height, savedPoint2.x + roadRand, -height, savedPoint2.x, savedPoint2.y, savedPoint1.x, savedPoint1.y));

    if (myCar.distance > 1200 && !b1isSpawned) {
      building1 = new Building(savedPoint1.x + 200, savedPoint1.y - 200, 200, 200, gasStation1);
      buildingWallArray.push(new Wall(savedPoint1.x + 200, savedPoint1.y - 200, 200, 200));
      b1isSpawned = true;
    }

    if (myCar.distance > 2500 && !b2isSpawned) {
      building2 = new Building(savedPoint1.x + 200, savedPoint1.y - 400, 400, 300, gasStation2);
      buildingWallArray.push(new Wall(savedPoint1.x + 200, savedPoint1.y - 400, 400, 300));
      
      b2isSpawned = true;
    }

    if (myCar.distance > 1000 && !f1isSpawned) {
      fence1 = new Building(savedPoint1.x - 360, savedPoint1.y-200, 800, 100, fence1img);
      fence2 = new Building(savedPoint1.x - 1150, savedPoint1.y-200, 800, 100, fence2img);
      fence3 = new Building(savedPoint1.x - 1940, savedPoint1.y-200, 800, 100, fence2img);
      fence4 = new Building(savedPoint1.x + 430, savedPoint1.y-200, 800, 100, fence2img);
      fence5 = new Building(savedPoint1.x + 1220, savedPoint1.y-200, 800, 100, fence2img);
      buildingWallArray.push(new Wall(savedPoint1.x - 1950, savedPoint1.y - 110, 1900, 10));
      buildingWallArray.push(new Wall(savedPoint1.x + 135, savedPoint1.y - 110, 1900, 10));
      f1isSpawned = true;
    }

    if (myCar.distance > 1300 && !f2isSpawned) {
      fence6 = new Building(savedPoint1.x - 360, savedPoint1.y-200, 800, 100, fence1img);
      fence7 = new Building(savedPoint1.x - 1150, savedPoint1.y-200, 800, 100, fence2img);
      fence8 = new Building(savedPoint1.x - 1940, savedPoint1.y-200, 800, 100, fence2img);
      fence9 = new Building(savedPoint1.x + 430, savedPoint1.y-200, 800, 100, fence2img);
      fence10 = new Building(savedPoint1.x + 1220, savedPoint1.y-200, 800, 100, fence2img);
      buildingWallArray.push(new Wall(savedPoint1.x - 1950, savedPoint1.y -110, 1900, 10));
      buildingWallArray.push(new Wall(savedPoint1.x + 135, savedPoint1.y -110, 1900, 10));
      f2isSpawned = true;
    }

    if (myCar.distance > 2400 && !f3isSpawned) {
      fence11 = new Building(savedPoint1.x - 360, savedPoint1.y-200, 800, 100, fence1img);
      fence12 = new Building(savedPoint1.x - 1150, savedPoint1.y-200, 800, 100, fence2img);
      fence13 = new Building(savedPoint1.x - 1940, savedPoint1.y-200, 800, 100, fence2img);
      fence14 = new Building(savedPoint1.x + 430, savedPoint1.y-200, 800, 100, fence2img);
      fence15 = new Building(savedPoint1.x + 1220, savedPoint1.y-200, 800, 100, fence2img);
      buildingWallArray.push(new Wall(savedPoint1.x - 1950, savedPoint1.y -110, 1900, 10));
      buildingWallArray.push(new Wall(savedPoint1.x + 135, savedPoint1.y -110, 1900, 10));
      f3isSpawned = true;
    }
  }

}