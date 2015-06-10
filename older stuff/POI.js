var game = new Phaser.Game(800, 600, Phaser.AUTO, 'poi-example', { preload: preload, create: create, update:test });

function preload() {
    game.load.image('heal', 'Images/heal.png');
    game.load.image('create', 'Images/create.png');
    game.load.image('fortify', 'Images/fortify.png');
}
var t = 0;


function test(){
   // console.log('we are at frame number '+ t++);

    
}


function map(x,y,fill,sx,sy,thing){
	//x,y is the centerpoint, shape is list of points(?)
	
	// create a new bitmap data object
	var bmd = game.add.bitmapData(100*sx,100*sy);

	// draw to the canvas context like normal
	bmd.ctx.beginPath();
	bmd.ctx.rect(0,0,100*sx,100*sy);
	//bmd.ctx.strokeStyle = fill;
	//bmd.ctx.stroke();
	bmd.ctx.fillStyle = fill;
	bmd.ctx.fill();

	// use the bitmap data as the texture for the sprite
	this.territory = thing;
	this.sprite = game.add.sprite(x, y, bmd);



	this.sprite.inputEnabled = true;

    this.sprite.input.useHandCursor = true;

    this.sprite.events.onInputDown.add(terrFunc, this, thing);
}

//set at the two ends of the map
function healUnit(unit){
    unit.health = 1;
}

//set in the middle of the map
function createUnit(x,y){
    Unit u = new Unit();
    Units(x,y, "artillery", 1);
}

//set at a quarter of the map
function unitDefense(unit){
    unit.defend = true;
    unit.health += 0.25;
}

//units have x,y, type, unit, traits
function POI(x,y, type, unit){

	// use the bitmap data as the texture for the sprite
    var trait = "";
	this.type = type;
    switch(type){
        case "heal":
            trait = "heal";
            healUnit(unit);
            break;
        case "create":
            trait = "create"
            if(unit.general == true) createUnit(x,y);
            break;
        case "fortify":
        default:
            trait = "fortify";
            unitDefense(unit);
            break;
    }
	this.sprite = game.add.sprite(x, y, type);
    this.sprite.width = 50;
    this.sprite.height = 50;
}

function create(){
    var test1 = map(0,0,'#ff0000', 1,1,'USA1');
    var test2 = map(100,0,'#00ff00', 1,1,'USA2');
    var test3 = map(200,0,'#0000ff', 1,1,'USA3');
    var test4 = map(0,100,'#f0f0f0', 3,1,'USA4');
    
    var heal = POI(20,30,'heal', 0);
    var newUnits = POI(250,50,'create', 1);
    var fortify = POI(120,100,'fortify', 2);
}

