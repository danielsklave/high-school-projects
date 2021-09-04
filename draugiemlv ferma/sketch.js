
var field;
var cols=5;
var rows=5;
var l = 120;
var money = 10;
var landPrice = 20;
var selectedItem;

var items = [{
	name:"Potato",   price:5,    value:8,    growthTime:500
}, {
	name:"Tomato",   price:15,   value:25,   growthTime:750
}, {
	name:"Onion",    price:50,   value:80,   growthTime:1000
}, {
	name:"Eggplant", price:150,  value:250,  growthTime:1500
}, {
	name:"Pumpkin",  price:1000, value:1250, growthTime:2500
}];

var fertelizer = {
	name: "Fertelizer",
	price: 500,
};

function mousePressed(){
	var x = mouseX;
	var y = mouseY;
	var totalLengthX = l*cols;
	var totalLengthY = l*rows;
	if(x<totalLengthX && y<totalLengthY){
		var tileX = Math.floor(x/l);
		var tileY = Math.floor(y/l);
		field[tileX][tileY].clicked();
	}
}

function setup(){
	colorMode(HSB, 360, 100, 100);
	createCanvas(900,650);
	textAlign(LEFT, TOP);
	for(var i = 0;i<items.length;i++){
	createBtn(items[i], 200+i*30);
	}
	var button = createButton(fertelizer.name+" - "+fertelizer.price+"$");
    button.position(700, 450);
    button.mousePressed(function(){
		selectedItem = fertelizer;
    });
	field = createGround(cols, rows);
	field[Math.floor(cols/2)][Math.floor(rows/2)].state = "empty";
}

function draw(){
	background(25, 60, 60);// background color
	for(var i = 0;i<cols;i++){
		for(var j = 0;j<rows;j++){
			field[i][j].show();
			field[i][j].update();
		}
	}
	fill(255);// text color
	textSize(36);
	text("Money: "+money+"$", 675, 40);
	textSize(20);
	if(selectedItem != null){
		text("Item: "+selectedItem.name, 675, 90);
		text("Price: "+selectedItem.price+"$", 675, 110);
		if(selectedItem == fertelizer){
			text("Description: Increases\n growth speed by 10%", 675, 130);
		}else{
			text("Value: "+selectedItem.value+"$", 675, 130);
			text("Growth time: "+(selectedItem.growthTime/500)+"/5", 675, 150);
		}
	}
}

/*----------------------------------------------*/

function createGround(width, height){
    var result = [];
    for (var i = 0 ; i < width; i++) {
        result[i] = [];
        for (var j = 0; j < height; j++) {
            result[i][j] = new Tile(i*l,j*l,l);
        }
    }
    return result;
	}

function createBtn(item, y){
	var button = createButton(item.name+" - "+item.price+"$");
    button.position(700, y);
    button.mousePressed(function(){
		selectedItem = item;
    });
}