
function Block(y, l, hue) {
  this.l = l;
  this.x = random(this.l, width - this.l);
  this.y = y;
  this.xSpeed = random(m)*(blocks.length*.3+3);
  this.active = true;
  this.hue = hue;

  this.update = function(){
    if(this.active){
    if(this.x >= width - this.l || this.x - this.l <= 0){
    this.xSpeed = -this.xSpeed;
  }
  this.x += this.xSpeed; 
  }
  fill(this.hue, 100, 100);
    rect(this.x,this.y,this.l,this.l);
  }

  this.check = function(i){
    if((blocks.length == 1) || 
    (blocks[blocks.length - 2].x + l > this.x - this.l && blocks[blocks.length - 2].x - l < this.x + this.l)){
      this.active = false;
      blockHeight -= this.l*2;
      if(blocks.length > 1){
        var diff = map(abs(blocks[blocks.length - 2].x - this.x), 0, l*2, 0, 10);
        score += round(10-diff);
      }
	  hue += 20;
      blocks.push(new Block(blockHeight, l, hue));
    }else{
      noLoop();
    }
  }
}