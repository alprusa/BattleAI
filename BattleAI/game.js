var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: gameLoop});

var button1;
var button2;
var button3;
var textArr = [];
var textStats = [];
var originalstate;
var style = { font: '15px Arial', fill: '#CCCCCC', align: 'left', fontWeight: 'bold', stroke: '#2d2d2d', strokeThickness: '2' };
var style2 = { font: '20px Arial', fill: '#CCCCCC', align: 'left', fontWeight: 'bold' };
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

	var text = game.add.text(25, 610, "Player 1", style2);
	var text2 = game.add.text(1000, 610, "Player 2", style2);

    createTerrs();
    originalstate.setupPlayers();
    updateText();
}






function gameLoop(){
    if (timer%30 == 0 && originalstate.gameOver == true){
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


function drawTerrs(){
    //draw country circles
    for (var i = 0; i < originalstate.terrList.length; i++) {
        var tempterr = originalstate.terrList[i];
        var temp = game.add.sprite(tempterr.x, tempterr.y, 'circle');
	var text = game.add.text(tempterr.x-20, tempterr.y+45, "Resources: "+ tempterr.val, style);
	textArr.push(text);
        originalstate.terrList[i].addSprite(null);
        //this.sprite.inputEnabled = true;
        //this.sprite.input.enableDrag();
        temp.width = 45;
        temp.height = 45;
        originalstate.terrList[i].addSprite(temp);
    }
	sideText();
}

function sideText(){
	for (var i = 0; i < 4; i++) {
		var text;
		if (i == 0) text = game.add.text(45, 650, "Units: "+ originalstate.players['p1'].units, style2);
		else if (i == 1) text = game.add.text(45, 690, "Currency: "+ originalstate.players['p1'].currency, style2);
		else if (i == 2) text = game.add.text(1020, 650, "Units: "+ originalstate.players['p2'].units, style2);
		else if (i == 3) text = game.add.text(1020, 690, "Currency: "+ originalstate.players['p2'].currency, style2);
		textStats.push(text);
	}
}



function doGeneric(){
    originalstate.applyMove(choice(originalstate.getMoves()));
    updateText()  
    originalstate.updateSprites();
}



function doSomething(type){
    console.log("result of think is " + think(originalstate, type));
    console.log("first move of think for " +type+" is " + think(originalstate, type));
    //originalstate.applyMove(  think(originalstate, type)[0] );
    updateText()

    originalstate.updateSprites();
}







function updateText(){
	for (var i = 0; i < textArr.length; i++) textArr[i].destroy();
	for (var i = 0; i < textStats.length; i++) textStats[i].destroy();
	textArr = [];
	textStats = [];
	sideText();




	for (var i = 0; i < originalstate.terrList.length; i++) {
		var tempterr = originalstate.terrList[i];
		// 0x66CCFF - blue | 0xFF6666 - red

		switch(tempterr.ownedBy) {
			case "p1": originalstate.terrList[i].sprite.tint = 0x66CCFF;  break;
			case "p2": originalstate.terrList[i].sprite.tint = 0xFF6666; break;
			case "none": originalstate.terrList[i].sprite.tint = 0xFFFFFF; break;
			default: break;
		}
		
	}
}







var testing = true;









function actionOnClick1 () {
    console.log("pressed economic");
    if(! originalstate.gameOver){
        if(testing){
            doGeneric();
        }else{
            doSomething('economic');
        }
    }
}



function actionOnClick2() {
    if(! originalstate.gameOver){
        if(testing){
            doGeneric();
        }else{
            doSomething('expansional');
        }
    }
}


function actionOnClick3() {
    if(! originalstate.gameOver){
        if(testing){
            doGeneric();
        }else{
            doSomething('aggressive');
        }
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
      
