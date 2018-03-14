// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
const NUM_BALLS = 10;
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
ctx.fillStyle = "rgba(0,0,0,0.15)";
ctx.fillRect(0, 0, width, height);
const BUFFER = 10;
// function to generate random number



function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Ball(x, y, vx, vy, color, r){
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.color = color;
  this.r = r;
}

Ball.prototype.move = function(){
  if(this.x + this.vx < 0 || this.x + this.vx > width)
    this.vx = -this.vx;
  if(this.y + this.vy < 0 || this.y + this.vy > height)
    this.vy = -this.vy;
  this.x += this.vx;
  this.y += this.vy;
}

Ball.prototype.testCollision = function(num){
  // console.log(num);
  for(let i = 0; i < num; i++){
    if (i === num) continue;
    cur = balls[i];
    var dx = Math.abs(this.x - cur.x);
    var dy = Math.abs(this.y - cur.y);
    var dis = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
    if(dis <= cur.r + this.r){
      
      var vx1 = this.vx;
      var vx2 = cur.vx;
      var vy1 = this.vy;
      var vy2 = cur.vy;

      this.vx = (vx1 * (this.mass - cur.mass) + 2 * cur.mass * vx2) / (this.mass + cur.mass);
      cur.vx = (vx2 * (cur.mass - this.mass) + 2 * this.mass * vx1) / (this.mass + cur.mass);
      this.vy = (vy1 * (this.mass - cur.mass) + 2 * cur.mass * vy2) / (this.mass + cur.mass);
      cur.vy = (vy2 * (cur.mass - this.mass) + 2 * this.mass * vy1) / (this.mass + cur.mass);
      // cur.invertv();
      // this.invertv();

      this.x += BUFFER;
      this.y += BUFFER;

    }   
  }
}

Ball.prototype.invertv = function(){
    this.vx = -this.vx;
    this.vy = -this.vy;  
}

Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.r, 0, 2* Math.PI);
  ctx.fill();
  this.mass = Math.pow(this.r, 2);
}

balls = []
for(let i = 0; i < NUM_BALLS; i++){
  var ball = new Ball(
  random(0,width),random(0, height), random(-10, 10), random(-10, 10), 
  "rgb(" + random(0,255) + "," + random(0,255) + "," + random(0,255) + ")" , random(10,25) );
  balls[i] = ball;
} 

function 

function loop(){
  ctx.fillStyle = "rgba(0,0,0,0.25";
  ctx.fillRect(0,0,width,height);
  for(let i = 0; i < NUM_BALLS; i++){
    balls[i].draw();
    balls[i].move();
    balls[i].testCollision(i);
  }
  requestAnimationFrame(loop);
}

loop();




