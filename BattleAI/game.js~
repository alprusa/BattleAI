var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

var locations = [];
var sprites = [];
var textArr = [];
var originalstate;
var style = { font: "15px Arial", fill: "#CCCCCC", align: "left" };


function preload() {
    setupOurGame()
    game.stage.backgroundColor = '#2d2d2d';
    game.load.image('economic', '1.png');
    game.load.image('expansional', '2.png');
    game.load.image('aggressive', '3.png');
    game.load.image('circle', 'circle.png');
    game.load.image('player', 'player.png');

}

var button1;
var button2;
var button3;


function gameLoop(){








}

function create() {

    button1 = game.add.button(game.world.centerX - 310, 730, 'economic', actionOnClick1, this);
    button2 = game.add.button(game.world.centerX - 100, 730, 'expansional', actionOnClick2, this);
    button3 = game.add.button(game.world.centerX + 110, 730, 'aggressive', actionOnClick3, this);
    button1.onInputOver.add(over1, this);
    button1.onInputOut.add(out1, this);
    button2.onInputOver.add(over2, this);
    button2.onInputOut.add(out2, this);
    button3.onInputOver.add(over3, this);
    button3.onInputOut.add(out3, this);

   
    //draw lines
    for (var i = 0; i < originalstate.terrList.length; i++) {
        var tempterr = originalstate.terrList[i]
        for (var j = 0; j < tempterr.neighbors.length; j++) {
            var index = tempterr.neighbors[j];
            var otherterr = originalstate.terrList[index];
            var g = game.add.graphics(0, 0);
            g.lineStyle(5, 0xFFFFFF, 1);
            g.moveTo(tempterr.x+20, tempterr.y+20);
            g.lineTo(otherterr.x+20, otherterr.y+20);
            //g.mask = mask;
        }
    }
    drawTerrs();
    console.log(originalstate.players['p1'].cT);
    console.log(originalstate.players['p2'].cT);
    drawPlayers(); 

}

function drawTerrs(){
    //draw country circles
    for (var i = 0; i < originalstate.terrList.length; i++) {
        var tempterr = originalstate.terrList[i];
        var temp = game.add.sprite(tempterr.x, tempterr.y, 'circle');
	sprites.push(temp);
	var text = game.add.text(tempterr.x-20, tempterr.y+45, "Resources: "+ tempterr.val, style);
	textArr.push(text);
        originalstate.terrList[i].addSprite(null);
        //this.sprite.inputEnabled = true;
        //this.sprite.input.enableDrag();
        temp.width = 45;
        temp.height = 45;
        originalstate.terrList[i].addSprite(temp);
    }
}

function updateText(){
	for (item in textArr) item.destroy();
	textArr = [];
	for (var i = 0; i < originalstate.terrList.length; i++) {
		var tempterr = originalstate.terrList[i];
		// 0x66CCFF - blue | 0xFF6666 - red
		switch(tempterr.ownedBy) {
			case "p1": tempterr.tint(0x66CCFF); break;
			case "p2": tempterr.tint(0xFF6666); break;
			case "none": tempterr.tint(0xFFFFFF); break;
			default: break;
		var text = game.add.text(tempterr.x-20, tempterr.y+45, "Resources: "+ tempterr.val, style);
		textArr.push(text);
	}
}

function drawPlayers(){
    var index1 = originalstate.players['p1'].cT;

    var tempterr = originalstate.terrList[index1];
    var temp = game.add.sprite(tempterr.x, tempterr.y, 'player');
    originalstate.players['p1'].addSprite(null);
    //this.sprite.inputEnabled = true;
    //this.sprite.input.enableDrag();
    temp.width = 30;
    temp.height = 30;
    originalstate.players['p1'].addSprite(temp);


    var index2 = originalstate.players['p2'].cT;
    tempterr = originalstate.terrList[index2];
    var temp2 = game.add.sprite(tempterr.x, tempterr.y, 'player');
    originalstate.players['p2'].addSprite(null);
    //this.sprite.inputEnabled = true;
    //this.sprite.input.enableDrag();
    temp2.width = 100;
    temp2.height = 100;
    originalstate.players['p2'].addSprite(temp2);


    








}







function actionOnClick1 () {
    console.log("test");
}
function actionOnClick2 () {
    console.log("test2");
}
function actionOnClick3 () {
    console.log("test3");
}

function over1 () { button1.tint = 0x00FF00; }
function out1 () { button1.tint = 0xFFFFFF; }
function over2 () { button2.tint = 0x00FF00; }
function out2 () { button2.tint = 0xFFFFFF; }
function over3 () { button3.tint = 0x00FF00; }
function out3 () { button3.tint = 0xFFFFFF; }




function setupOurGame(){
    originalstate = new gameState(buildList());
    


}


            else if ((pointer.y > (currLocation.contains[i].y)) || i < 3) {
                if (pointer.x > (currLocation.contains[i].x+(spriteSize/2))) tempPos = i+1;
            }

        }
        currLocation.units++;
        currLocation.contains.splice(tempPos, 0, sprite);
    }
    
    // UPDATE UNIT POSITIONS
    for (i = 0; i < currLocation.units; i++) {
        currLocation.contains[i].x = currLocation.x - 40 + ((i%3)*40);
        currLocation.contains[i].y = currLocation.y - 40 + (Math.floor(i/3)*40);
    }
}

function render() {

}

