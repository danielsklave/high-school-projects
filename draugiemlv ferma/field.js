
function Tile(x, y, l) {
  this.x = x;
  this.y = y;
  this.l = l;
  this.speedUp = "";
  this.growth = 0;
  this.maxGrowth;
  this.value = 0;
  this.state = "locked";
  this.crop = "none";

  this.show = function(){
  	noFill();
	stroke(25, 60, 20);// border color
	strokeWeight(4);
	rect(this.x,this.y,this.l,this.l);
	if(this.state == "planted" || this.state == "done"){
		var m = map(this.growth, 0, this.maxGrowth, 25, 110);
  		fill(m, 69, 59); // crop color
  		rect(this.x,this.y,this.l,this.l);
  		fill(255);
  		text(Math.floor(this.growth/this.maxGrowth*100)+"%",
  		 this.x+5, this.y+5);
  		push();
  		textAlign(CENTER, CENTER);
		text(this.crop, this.x+l/2, this.y+l/2);
		pop();
  	}
  	if(this.state == "locked"){
  		fill(0,0,60);
  		rect(this.x,this.y,this.l,this.l);
  		if(nextToUnlocked(this.x/l, this.y/l)){
  			fill(0,0,100);
  			text(landPrice+"$", this.x+5, this.y+5);
  		}
  	}
  	if(this.speedUp.length > 0){
  		push();
		fill(0,0,100);
  		textAlign(RIGHT, BASELINE);
  		text(this.speedUp, this.x+l-5, this.y+l-5);
  		pop();
  	}
  };

  this.update = function(){
  	if(this.state == "planted"){
  		this.growth+= 1+this.speedUp.length*.10;
  	}
  	if(this.growth >= this.maxGrowth){
  		this.state = "done";
  	}
  };

  this.clicked = function(){
  	if(selectedItem == fertelizer && this.state != "locked" &&
  		money-selectedItem.price >= 0 && this.state != "done" &&
      this.speedUp.length <= 7){
  		this.speedUp += "*";
  		money -= selectedItem.price;
  	}
	if(this.state == "empty" &&  selectedItem != null && 
		money-selectedItem.price >= 0 && selectedItem != fertelizer){
		this.state = "planted";
		this.crop = selectedItem.name;
		money -= selectedItem.price;
		this.maxGrowth = selectedItem.growthTime;
		this.value = selectedItem.value;
	}
	if(this.state == "locked" && money-landPrice >= 0 && 
		nextToUnlocked(this.x/l, this.y/l)){
		money -= landPrice;
		landPrice = Math.ceil(landPrice*1.5/10)*10;
		this.state = "empty";
	}
	if(this.state == "done"){
		this.state = "empty";
		this.crop = "none";
		money += this.value;
		this.growth = 0;
	}
  };

  function nextToUnlocked(x, y){
	return  (x+1<cols && field[x+1][y].state != "locked") ||
			(x-1>0 	  && field[x-1][y].state != "locked") ||
			(y+1<rows && field[x][y+1].state != "locked") ||
			(y-1>0    && field[x][y-1].state != "locked");
  }
}