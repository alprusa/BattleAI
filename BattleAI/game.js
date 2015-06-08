var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: gameLoop});

var button1;
var button2;
var button3;
var count = 0;
var flip = true;
var textArr = []; //debug text
var textStats = []; //side text
var spritesArr = []; //debug sprites
var originalstate;
var style1 = { font: '11px Arial', fill: '#EEEEEE', align: 'center' };
var style2 = { font: '20px Arial', fill: '#CCCCCC', align: 'left', fontWeight: 'bold' };
var timer = 0;

var moveList = [];

function preload() {
    game.stage.backgroundColor = '#2d2d2d';
    game.load.image('economic', '1.png');
    game.load.image('expansional', '2.png');
    game.load.image('aggressive', '3.png');
    game.load.image('circle', 'circle.png');
    game.load.image('player', 'circle2.png');
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
            g.lineStyle(2, 0xAAAAAA, 1);
            g.moveTo(tempterr.x+20, tempterr.y+20);
            g.lineTo(otherterr.x+20, otherterr.y+20);
        }
    }
	
	//draw mask
    for (var i = 0; i < originalstate.terrList.length; i++) {
        var tempterr = originalstate.terrList[i]
		var g = game.add.graphics(0, 0);
		g.beginFill(0x2d2d2d, 1);
		g.drawCircle(tempterr.x+25, tempterr.y+25, 58);
		var temp = game.add.sprite(tempterr.x-5, tempterr.y-5, 'player');
		temp.width = 60;
		temp.height = 60;
		temp.tint = 0x66CCFF;
		temp.alpha = 0.6;
		temp.visible = false;
		spritesArr.push(temp);
    }
	
	var text = game.add.text(25, 610, "Player 1", style2);
	var text2 = game.add.text(1000, 610, "Player 2", style2);

    createTerrs();
    originalstate.setupPlayers();
    updateText();
}




var t = true;

function gameLoop(){
    if (originalstate.gameOver == true && t){
        alert("the winner is " + originalstate.winner);
        t = false;
    }
    
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
        //var temp = game.add.sprite(tempterr.x, tempterr.y, 'circle');
		//var text = game.add.text(tempterr.x-20, tempterr.y+45, "Resources: "+ tempterr.val, style);
		//textArr.push(text);
        originalstate.terrList[i].addSprite(null);
        //this.sprite.inputEnabled = true;
        //this.sprite.input.enableDrag();
        //temp.width = 45;
        //temp.height = 45;
        //originalstate.terrList[i].addSprite(temp);
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
    //console.log("result of think is " + think(originalstate, type));
    //console.log("first move of think for " +type+" is " + think(originalstate, type));
    
    //var move = simpleAI(originalstate, type);
	var move = scriptMoves[count];
	count++;
	flip ? flip = false : flip = true;
    console.log(move);
    originalstate.applyMove(move);
    
    //var tempState = originalstate.copy();
    //moveList = [];
    //moveList.push(move);
    
    //for(var i = 0; i < 4;i++){
        //moveList.push(simpleAI(tempState,type));
        //tempState.applyMove(moveList[i]);
    //}
    //originalstate.applyMove(  think(originalstate, type)[0] );
    updateText();

    originalstate.updateSprites();
}







function updateText(){
	//for (var i = 0; i < textArr.length; i++) textArr[i].destroy();
	for (var i = 0; i < textStats.length; i++) textStats[i].destroy();
	//textArr = [];
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





var testing = false;





function actionOnClick1 () {
    console.log("pressed economic");
    if(! originalstate.gameOver){
        if(testing){
            doGeneric();
        }else{
            doSomething('economic');
        }
    }
	debugOut();
	var movesTemp = getMoveSet("Economic");
	debug(movesTemp);
}



function actionOnClick2() {
    if(! originalstate.gameOver){
        if(testing){
            doGeneric();
        }else{
            doSomething('expansional');
        }
    }
	debugOut();
	var movesTemp = getMoveSet("Expansional");
	debug(movesTemp);
}


function actionOnClick3() {
    if(! originalstate.gameOver){
        if(testing){
            doGeneric();
        }else{
            doSomething('aggressive');
        }
    }
	debugOut();
	var movesTemp = getMoveSet("Aggressive");
	debug(movesTemp);
}


function getText(t) {
	if (t == "harvest") return "Harvest";
	if (t == "move") return "Expand";
	if (t == "switch") return "Capture";
	else return "  Move";
}

function debug(movesTemp) {
	for(var u = 0; u < spritesArr.length; u++){
		flip ? spritesArr[u].tint=0x66CCFF : spritesArr[u].tint=0xFF6666;
	}
	var prev;
	var offset = 12;
	for (i = 0; i < movesTemp.length && i < 4; i++) {
		if (movesTemp[i]["territory"] == originalstate.players["p2"].cT) {
			text = game.add.text(spritesArr[movesTemp[i]["territory"]].x+25, spritesArr[movesTemp[i]["territory"]].y+10, i+1, style2);
			text2 = game.add.text(spritesArr[movesTemp[i]["territory"]].x+10, spritesArr[movesTemp[i]["territory"]].y+29, "BATTLE", style1);
			textArr.push(text);
			textArr.push(text2);
			break;
		} else if (movesTemp[i]["territory"] == prev) {
			var temp = textArr.pop();
			temp.destroy();
			text = game.add.text(spritesArr[movesTemp[i]["territory"]].x+25+offset, spritesArr[movesTemp[i]["territory"]].y+10, ","+(i+1), style2);
			text2 = game.add.text(spritesArr[movesTemp[i]["territory"]].x+11, spritesArr[movesTemp[i]["territory"]].y+30, "Harvest", style1);
			textArr.push(text);
			textArr.push(text2);
			offset += 17;
		} else {
			spritesArr[movesTemp[i]["territory"]].visible = true;
			text = game.add.text(spritesArr[movesTemp[i]["territory"]].x+25, spritesArr[movesTemp[i]["territory"]].y+10, i+1, style2);
			text2 = game.add.text(spritesArr[movesTemp[i]["territory"]].x+11, spritesArr[movesTemp[i]["territory"]].y+30, getText(movesTemp[i]["extra"]), style1);
			textArr.push(text);
			textArr.push(text2);
			offset = 12;
		}
		prev = movesTemp[i]["territory"];
	}
}
function debugOut() {
	for (i = 0; i < spritesArr.length; i++) {
		spritesArr[i].visible = false;
	}
	for (i = 0; i < textArr.length; i++) textArr[i].destroy();
}

function getMoveSet (q) {
	return ghostMoves[count];
}

function over1 () {
	var movesTemp = getMoveSet("Economic");
	button1.tint = 0x00FF00;
	debug(movesTemp);
}
function out1 () {
	button1.tint = 0xFFFFFF;
	debugOut();
}
function over2 () {
	var movesTemp = getMoveSet("Expansional");
	button2.tint = 0x00FF00;
	debug(movesTemp);
}
function out2 () {
	button2.tint = 0xFFFFFF;
	debugOut();
}
function over3 () {
	var movesTemp = getMoveSet("Aggresive");
	button3.tint = 0x00FF00;
	debug(movesTemp);
}
function out3 () {
	button3.tint = 0xFFFFFF;
	debugOut();
}







function choice(list){
    var rand = Math.floor(Math.random()*list.length);
    return list[rand];
}
      
