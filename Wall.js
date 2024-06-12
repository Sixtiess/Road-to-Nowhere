class Wall {
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  display(){
    fill(0)
    rect(this.x,this.y,this.w,this.h)
  }

  setVelocity(x, y) {
    this.x += x;
    this.y += y;
  }
}






// update(wallArray) {
//   let nextX = this.x + this.speed * cos(this.angle);
//   let nextY = this.y + this.speed * sin(this.angle);
//   let hasCollided = false

//   for(let i = 0; i<wallArray.length && !hasCollided; i++){
//     if(nextX-18 < wallArray[i].x + wallArray[i].w && nextX+18 > wallArray[i].x && nextY-18 < wallArray[i].y + wallArray[i].h && nextY+18 > wallArray[i].y){
//     hasCollided = true
//     } 
//   }
//   if(!hasCollided){
//      this.x = nextX;//horizontal component
//   this.y = nextY;//vertical component

//   this.speed -= this.speed * 0.015;//friction
//   }

//   this.detectKey()
// }