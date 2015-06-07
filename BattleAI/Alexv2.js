var style = { font: '15px Arial', fill: '#CCCCCC', align: 'left', fontWeight: 'bold', stroke: '#2d2d2d', strokeThickness: '2' };
var unitCost = 35;
var maxUnits = 12;
var minTer = 10;

//max and min value a territory can have;
var mxTVl = 20;
var mnTVl = 5;
//what number of currency is needed to win with econ path
var winEcon = 500;
//what number of territory is needed to win with econ path
var winTerr = 9;
var visitTimeLimit = 12;









function gameState(list){

	this.moveApplied = {"territory":0, "extra":"harvest"};
	this.terrList = typeof list === 'undefined' ? [] : list;
	var index1 = Math.round(Math.random()*(this.terrList.length-1));
	do{
		var index2 = Math.round(Math.random()*(this.terrList.length-1));
	}while( index1 == index2);


	this.terrList[index1].ownedBy="p1";
	this.terrList[index2].ownedBy="p2";


	this.players = {'p1': new Player('p1',index1) ,'p2': new Player('p2',index2)};
	this.turn = 'p1';
	this.gameOver = false;
	this.winner = "none";
}


gameState.prototype.doBattle =function(){

	console.log("battle");
	list1 = [];
	list2 = [];

	for(var i = 0; i<this.players['p1'].units; ++i){
		list1.push(Math.floor(Math.random()*6))
	}

	for(var i = 0; i<this.players['p2'].units; ++i){
		list2.push(Math.floor(Math.random()*6))
	}


	list1.sort().reverse();
	list2.sort().reverse();


	var len = list1.length<list2.length ? list1.length :list2.length;

	for(var i = 0; i<len; i++){
		if(list1[i]<list2[i]){
			this.players['p1'].units--;
		}else if(list1[i]>list2[i]){
			this.players['p2'].units--;
		}else{
			this.players['p1'].units--;
			this.players['p2'].units--;
		}
	}

	if(this.players['p1'].units == 0 && this.players['p2'].units == 0){
		this.gameOver = true;
	}else if(this.players['p1'].units == 0){
		this.winner = "p2";
		this.gameOver = true;
		
	}else if(this.players['p2'].units == 0){
		this.winner = "p1";

		this.gameOver = true;
		
	}
}




gameState.prototype.setupPlayers = function(){
	this.players['p1'].addSprite();
	this.players['p2'].addSprite();
}


gameState.prototype.movePlayers = function(){
	var index1 = this.players['p1'].cT
	var index2 = this.players['p2'].cT
	this.players['p1'].x = this.terrList[index1].x;
	this.players['p1'].y = this.terrList[index1].y;

	this.players['p2'].x = this.terrList[index2].x;
	this.players['p2'].y = this.terrList[index2].y;

}


gameState.prototype.copy = function(){
	var temp = new gameState(this.terrList);


	temp.players = {'p1': this.players['p1'].copy() ,'p2': this.players['p2'].copy()};
	temp.terrList = this.terrList.slice();
	temp.turn = this.turn;



	temp.gameOver = this.gameOver;
	temp.winner = this.winner;

	return temp;
}
gameState.prototype.updateSprites = function(){
	this.players['p1'].sprite.x=this.players['p1'].x;
	this.players['p1'].sprite.y=this.players['p1'].y;
	this.players['p2'].sprite.x=this.players['p2'].x;
	this.players['p2'].sprite.y=this.players['p2'].y;
}







gameState.prototype.applyMove = function(move){

	var territory = move['territory'];
	var extra = move['extra'];
	var extraInfo = typeof extra !== 'undefined' ? extra : "move";


	var currPlayer = this.players[this.turn];

	if (extraInfo == "move"){
	
		if(this.terrList[territory].occupied){

			this.doBattle()


		}else{
			//sort between prev occupied vs prev unoccupied
			
			this.terrList[this.players[this.turn].cT].occupied = false;
			//if we dont own this territory
			if(this.terrList[territory].ownedBy != this.turn){
				//if it was visited by the enemy
				if(this.terrList[territory].ownedBy != 'none'){
					this.terrList[territory].ownedBy = 'none';


				//if it is neutral
				}else{
					this.terrList[territory].ownedBy = this.turn;
					
				}


			}


			this.players[this.turn].cT=territory;
			this.terrList[this.players[this.turn].cT].timeLimit = -1;
			this.terrList[territory].occupied = true;
		}

	}else{
		if(extraInfo == "recruit"){
			currPlayer.gainUnits();
			
		}else if(extraInfo == "harvest"){
			this.terrList[currPlayer.cT].applyVal(currPlayer);
			
		}else if(extraInfo == "switch"){
			this.terrList[currPlayer.cT].applyVal(currPlayer);
			
		}
	}
	for(var i = 0; i< this.terrList.length; i++){
		if(this.terrList[i].ownedBy != 'none'){
			if(this.players["p1"].cT!= i || this.players["p2"].ct!= i){
				this.timeLimit++;

			}
		}


	}
	this.turn = this.turn != 'p1' ? "p1" : "p2";

	this.movePlayers();
	

}






gameState.prototype.getMoves = function(){
	return this.players[this.turn].check_moves(this);
}

gameState.prototype.getScores= function(){
	var temp = {"p1":[],"p2":[]};


	for(var i = 0; i< 2; i++){
		var key;
        if(i==0){
            key = "p1";
        }else{
            key = "p2";
        }
		

		var controlled;
		for(var j = 0; j< this.terrList.length; j++){
			if(this.terrList[j].ownedBy == key){
				controlled++;
			}
		}
		temp[key] = [ this.players[key].currency , controlled, this.players[key].units];
	}

	return temp;
}










function Player(name, beginTer){
	
	this.units = 3;
	this.currency = 15; //how much
	this.name = name; //player name
	this.cT = typeof beginTer === "undefined" ? 0: beginTer; //index in gameState's terr list
	this.sprite;
	this.x = 0;
	this.y = 0;
}


Player.prototype.copy = function(){
	var temp = new Player(this.name, this.cT);
	temp.units = this.units;
	temp.currency = this.currency;
	return temp;

}

Player.prototype.addSprite = function(){

	var x = originalstate.terrList[this.cT].sprite.x;
	var y = originalstate.terrList[this.cT].sprite.y;
	this.x=x;
	this.y=y;
	this.sprite = game.add.sprite(x, y, 'player');
    this.sprite.width = 100;
    this.sprite.height = 100;
}

Player.prototype.gainUnits = function(){
	this.units++;
	this.currency-=unitCost;
}


Player.prototype.check_moves = function(state){
	var movelist = [];

	if(this.currency>=unitCost){
		movelist.push({"territory":this.cT, "extra":"recruit"})
	}
	if(state.terrList[this.cT].ownedBy != this.name){
		movelist.push({"territory":this.cT, "extra":"switch"})
	}

	if(state.terrList[this.cT].val >0){
		movelist.push({"territory":this.cT, "extra":"harvest"})
	}

	for(var i = 0; i< state.terrList[this.cT].neighbors.length;i++){
		var where = state.terrList[this.cT].neighbors[i];
		movelist.push({"territory":where, "extra":"move"});

	}
	return movelist;
}











//owned by is who owns, it, none for no one
//value is how much currency one could get from choosing to collect resources
//occupied if someone is currently in this territoty
//neighbors is list of other Territories you can reach
function Territory(x,y, nl,val){
	this.sprite;
	this.textOb;
	//shouldnt be undefined, but whatever
	this.x = typeof x === "undefined" ? 0: x; 
	this.y = typeof y === "undefined" ? 0: y; 

	if(typeof val === "undefined"){
		var rand = Math.random()
		if (rand < 0.2) rand = (Math.random()*5)+15;
		else rand = (Math.random()*10)+5;
		rand = Math.round(rand);
		this.val = rand;
	}else{
		this.val = val;
	}
	this.ownedBy = 'none';
	this.occupied = false;
	this.neighbors = nl;     
}



Territory.prototype.addSprite = function(){
	//this.sprite = sprite;
    this.sprite = game.add.sprite(this.x, this.y, 'circle');
	this.textOb = game.add.text(this.x-20, this.y+45, "Resources: "+ this.val, style);    
    this.sprite.width = 45;
    this.sprite.height = 45;



}


Territory.prototype.updateText = function(){
	this.textOb.text = "Resources: "+ this.val;
}

Territory.prototype.applyVal = function(player){
	player.currency+= this.val--;
	this.updateText();
}





