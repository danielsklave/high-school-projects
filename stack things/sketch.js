
var blocks = [];
var m = [1, -1];
var blockHeight;
var l = 30;
var score = 0;
var hue = 0;

function mousePressed() {
  blocks[blocks.length - 1].check();
}

function setup(){
	createCanvas(500,700);
	colorMode(HSB);
	rectMode(RADIUS);
  textSize(32);
  textAlign(LEFT, TOP);
  stroke(0);
  fill(hue, 100, 100);
  blockHeight = height - l;
  blocks.push(new Block(blockHeight, l, hue));
}

function draw(){
	background(0);
  push();
      if(blockHeight<height/4){
  translate(0, blocks.length*l*2-height/4*3);
  }
  	for (var i = blocks.length - 1; i >= 0; i--) {
      blocks[i].update();
    }
    pop();
    text("Score: "+score, 5, 5);
}