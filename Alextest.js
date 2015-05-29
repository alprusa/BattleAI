var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:test });

function preload() {
    game.load.image('infantry', 'assets/pics/lance-overdose-loader_eye.png');
}
var t = 0;


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


function Infantry(x,y,territory){
    this.sprite =  game.add.sprite(x, y, 'infantry');
    this.sprite.width = 25;
    this.sprite.height = 50;
    
    
    this.me = 'infantry';
    this.adv = 'cavalry';
    this.dis = 'artilery';




    this.currentTerritory = territory;
}


function POI(x,y,fill,sx,sy,thing){
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
	this.territory = thing;
	this.sprite = game.add.sprite(x, y, bmd);



	this.sprite.inputEnabled = true;

    this.sprite.input.useHandCursor = true;

    this.sprite.events.onInputDown.add(terrFunc, this, thing);
}

function terrFunc(string){
	console.log(string);


}


function create(){
    var test1 = POI(0,0,'#ff0000', 1,1,'USA1');
    var test2 = POI(100,0,'#00ff00', 1,1,'USA2');
    var test3 = POI(200,0,'#0000ff', 1,1,'USA3');
    var test4 = POI(0,100,'#f0f0f0', 3,1,'USA4');
    
    var test5 =  Infantry(30,30);
    
    
    

}
