var game = new Phaser.Game(800, 600, Phaser.AUTO, 'alex-test', { preload: preload, create: create, update:test });

function preload() {
    game.load.image('infantry', 'assets/pics/lance-overdose-loader_eye.png');
}
var t = 0;
var territoryList = []


function test(){
   // console.log('we are at frame number '+ t++);
    
    
}

function compare(item1,item2){
	//checks for advantage or disatvantage , will return who is winner
	if(item1.me == item2.me){
		return 'both';
	}
	if(item1.adv == item2.dis){
		return 'left';
	}else{
		return 'right'
	}
}


function Player(){
	this.inantryL = [];
	this.cavalryL = [];
	this.artileryL = [];
}





Player.prototype.checkMoves = function(){
    
}










function Infantry(x,y,territory){
    this.sprite =  game.add.sprite(x, y, 'infantry');
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag();
    this.sprite.width = 25;
    this.sprite.height = 50;
    
    
    this.me = 'infantry';
    this.adv = 'cavalry';
    this.dis = 'artilery';


    //stores index of territory it currently occupies
    this.dragging = false;
    this.prevTerritory = null;
    this.currentTerritory = territory;
}







function Territory(x,y,fill,sx,sy,thing){
	//x,y is the centerpoint, shape is list of points(?)
	
	// create a new bitmap data object
	var bmd = game.add.bitmapData(100*sx,100*sy);
	// draw to the canvas context like normal
	bmd.ctx.beginPath();
	bmd.ctx.rect(0,0,100*sx,100*sy);
	bmd.ctx.strokeStyle = fill;
	bmd.ctx.stroke();
	//bmd.ctx.fillStyle = fill;
	//bmd.ctx.fill();

	// use the bitmap data as the texture for the sprite
	this.terName = thing;
	this.neighbors = []

	this.sprite = game.add.sprite(x, y, bmd);
	this.sprite.inputEnabled = true;
    this.sprite.input.useHandCursor = true;
    this.sprite.events.onInputDown.add(terrFunc, this);
}

Territory.prototype


Territory.prototype.addNeighbor = function(neighbor){
	this.neighbors.push(neighbor);
}
function terrFunc(string){
	console.log(string);


}


function create(){
    var test1 = new Territory(0,0,'#ff0000', 1,1,'USA1');
    var test2 = new Territory(100,0,'#00ff00', 1,1,'USA2');
    var test3 = new Territory(200,0,'#0000ff', 1,1,'USA3');
    var test4 = new Territory(0,100,'#f0f0f0', 3,1,'USA4');

    territoryList.push(test1);
    territoryList.push(test2);
    territoryList.push(test3);
    territoryList.push(test4);





    
    var test5 =  new Infantry(30,30, test1.terName);
   
}
