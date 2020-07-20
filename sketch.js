/* Corall - Alessandro Valentino 2017
   
*/

var objects = [];

var center;
var pal;
var back;
var t = 0;
var scl = 0.01;
var sprite;
var pg;
var ran;
var index;

function preload(){
img = loadImage("palette2.png");

}

function setup() {
 createCanvas(600, 600);
  
 img.loadPixels();
 
      index = int(img.height * 0.5) * img.width * 4;
      back = color(img.pixels[index], img.pixels[index + 1], img.pixels[index + 2]);
  
  
  background(back)

  objects.push( new Part(width/2, height/2, 15, [255, 255, 255]) );
  objects[0].fixed = true;
  objects[0].lock = true;
  center = new p5.Vector(width/2, height/2);
  img.loadPixels();
}

function draw() {
   background(back)

    for (var i = 0; i < objects.length; i++){
      var ob = objects[i];

        ob.update();

        for (var j = 0; j < objects.length; j++){
          var ob2 = objects[j];
          if (ob2 != ob){
            ob.touch(ob2);
          }
          
        }

      ob.show();

    }

    if (objects.length < 450 && (random(0,1) < 0.8)){
      var theta = random(0, 1) * 2 * PI;
      
    
      index = int(random(0, img.height * 0.5)) * img.width * 4;
        
      objects.push( new Part(width/2 + width/2 * cos(theta), height/2 + height/2 * sin(theta), random(4, 10), [img.pixels[index], img.pixels[index + 1], img.pixels[index + 2]]));
    }

    t+= 0.08;
    }
  


function mousePressed(){
  background(back)
  
  objects = [];
  
  objects.push( new Part(width/2, height/2, 15, [255, 255, 255]) );
  objects[0].fixed = true;
  objects[0].lock = true;
  center = new p5.Vector(width/2, height/2);
  
}


//Define the Part class

function Part (x, y, rad, col){
  var pos;
  var vel;
  var r;
  var fixed;
  var offset;
  var life;
  var lock;
  var color = [];
  var alpha;

  this.pos = new p5.Vector(x, y);
  this.vel = new p5.Vector(random(-1, 1), random(-1, 1));

  this.fixed = false;
  this.offset = random(0, 1);
  this.life = 200;
  this.lock = false;
  this.color = col;
  this.r = rad;
  this.update = function(){
    
    if (!this.fixed){
    this.vel.x += (center.x - this.pos.x) * 0.0001;
    this.vel.y += (center.y - this.pos.y) * 0.0001;
    this.pos.add(this.vel);
      this.pos.x += random(-0.5, 0.5);
      this.pos.y += random(-0.5, 0.5);
  }
  else {
    if(!this.lock){
   this.life -= 0.5;
 }
  }
}

  this.touch = function(other){
    if (other != null){
      if (!this.fixed){
    var dst = (this.pos.x - other.pos.x) * (this.pos.x - other.pos.x) +(this.pos.y - other.pos.y) * (this.pos.y - other.pos.y);
        dst = sqrt(dst);
    if (dst <= this.r + other.r + 2){
    if (other.fixed){
      var dir = new p5.Vector(this.pos.x - other.pos.x, this.pos.y - other.pos.y);
      dir.normalize();
      this.pos.x = other.pos.x + dir.x * (this.r + other.r);
      this.pos.y = other.pos.y + dir.y * (this.r + other.r);
      
      this.fixed = true;
      
    }

}
}
}
}
  
  this.show = function(){
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    
    if (this.fixed){
      
   fill(this.color[0], this.color[1], this.color[2], 100 + 255 * abs(cos((800/this.r * t * 0.001 ) * 2 * PI)));
     
 
  }
  else{
    fill(this.color[0], this.color[1], this.color[2], 30);
    
  }
    
   
    
   ellipse(0, 0, this.r * 2, this.r * 2);
    
    pop();
  }
}
