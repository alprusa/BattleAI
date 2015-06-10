var game = new Phaser.Game(800, 600, Phaser.AUTO, 'units-example', { preload: preload, create: create, update:test });

function preload() {
    game.load.image('calvary', 'Images/calvary.png');
    game.load.image('infantry', 'Images/infantry.png');
    game.load.image('artillery', 'Images/artillery.png');
}
var t = 0;


function test(){
   // console.log('we are at frame number '+ t++);

    
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

//units have x,y, type, disadv, advantage, currentTerritory, prevTerritory,
function Units(x,y, type, territory){

	// use the bitmap data as the texture for the sprite
    var adv = "";
    var disadv = "";
	this.type = type;
    switch(type){
        case "infantry":
            adv = "calvary";
            disadv = "artillery";
            break;
        case "calvary":
            adv = "artillery";
            disadv = "infantry";
            break;
        case "artillery":
        default:
            adv = "infantry";
            disadv = "calvary";
            break;
    }
	this.sprite = game.add.sprite(x, y, type);
    this.sprite.inputEnabled = true;
    this.sprite.inputEndableDrag();
    this.sprite.width = 50;
    this.sprite.height = 50;
}

function terrFunc(string){
	console.log(string);


}


function create(){
    var test1 = POI(0,0,'#ff0000', 1,1,'USA1');
    var test2 = POI(100,0,'#00ff00', 1,1,'USA2');
    var test3 = POI(200,0,'#0000ff', 1,1,'USA3');
    var test4 = POI(0,100,'#f0f0f0', 3,1,'USA4');
    
    var artillery = Units(0,50,'artillery', 0);
    var calvary = Units(0,150,'calvary', 1);
    var infantry = Units(0,250,'infantry', 2);

}
