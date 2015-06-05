var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: gameLoop});

var button1;
var button2;
var button3;
var textArr = [];
var originalstate;
var style = { font: '15px Arial', fill: '#CCCCCC', align: 'left', fontWeight: 'bold', stroke: '#2d2d2d', strokeThickness: '2' };
var timer = 0;



function preload() {
    game.stage.backgroundColor = '#2d2d2d';
    game.load.image('economic', '1.png');
    game.load.image('expansional', '2.png');
    game.load.image('aggressive', '3.png');
    game.load.image('circle', 'circle.png');
    game.load.image('player', 'player.png');
    setupOurGame()
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
        }
    }
    createTerrs();
    originalstate.setupPlayers();
    updateText();
}






function gameLoop(){
    if (timer%30 == 0 && originalstate.gameOver){
        console.log("the winner is " + originalstate.winner);

    }
    timer++;
}



function setupOurGame(){
    originalstate = new gameState(buildList());
}


function createTerrs(){
    //draw country circles
    for (var i = 0; i < originalstate.terrList.length; i++) {
        originalstate.terrList[i].addSprite();
    }
}
function createPlayers(){
    originalstate.setupPlayers();
}







function doGeneric(){
    originalstate.applyMove(choice(originalstate.getMoves()));
    updateText()  
}

function doSomething(type){
    originalstate.applyMove(  think(originalstate, type) );
}







function updateText(){
	for (item in textArr) item.destroy();
	textArr = [];



    console.log("here in updateText");
	for (var i = 0; i < originalstate.terrList.length; i++) {
		var tempterr = originalstate.terrList[i];
		// 0x66CCFF - blue | 0xFF6666 - red
        console.log("here in updateText2");
		switch(tempterr.ownedBy) {
			case "p1": originalstate.terrList[i].sprite.tint = 0x66CCFF;  break;
			case "p2": originalstate.terrList[i].sprite.tint = 0xFF6666; break;
			case "none": originalstate.terrList[i].sprite.tint = 0xFFFFFF; break;
			default: break;
		}
		
	}
}

















function actionOnClick1 () {
    if(! originalstate.gameOver){
        doGeneric();
        //doSomething('economic');
    }
}
function actionOnClick2 () {
    if(! originalstate.gameOver){
        doGeneric();
        //doSomething('expansional');
    }
}
function actionOnClick3 () {
    if(! originalstate.gameOver){
        doGeneric();
        //doSomething('aggressive');
    }
}
function over1 () { button1.tint = 0x00FF00; }
function out1 () { button1.tint = 0xFFFFFF; }
function over2 () { button2.tint = 0x00FF00; }
function out2 () { button2.tint = 0xFFFFFF; }
function over3 () { button3.tint = 0x00FF00; }
function out3 () { button3.tint = 0xFFFFFF; }







function choice(list){
    var rand = Math.floor(Math.random()*list.length);
    return list[rand];
}
      
