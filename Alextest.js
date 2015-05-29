var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:test });

function preload() {

}
var t = 0;


function test(){
    console.log('we are at frame number '+ t++);
    
    
}


function POI(x,y,fill,sx,sy,thing){
	//x,y is the centerpoint, shape is list of points(?)
	
	// create a new bitmap data object
	var bmd = game.add.bitmapData(100*sx,100*sy);

	// draw to the canvas context like normal
	bmd.ctx.beginPath();
	bmd.ctx.rect(0,0,100*sx,100*sy);
	bmd.ctx.fillStyle = fill;
	bmd.ctx.fill();

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
