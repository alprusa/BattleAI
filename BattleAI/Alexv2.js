



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

	this.terrList = typeof list === 'undefined' ? [] : list;


	var index1 = Math.round(Math.random()*(this.terrList.length-1));
	do{
		var index2 = Math.round(Math.random()*(this.terrList.length-1));

	}while( index1 == index2);


	this.terrList[index1].ownedBy="p1";

	this.terrList[index2].ownedBy="p2";


	this.players = {'p1': new Player('p1',index1) ,'p2': new Player('p2',index2)}


	this.turn = 'p1';
}



gameState.prototype.copy = function(){
	var temp = new gameState();
	temp.players = $.extend({}, this.players);
	temp.terrList = this.terrList.slice();
	temp.turn = this.turn;
	return temp;
}




gameState.prototype.applyMove = function(move){

	var territory = move['territory'];

	var extra = move['extra'];

	//assume the move being applied is possible, as all preconditions are checked in checkMoves
	var extraInfo = typeof extra !== 'undefined' ? extra : "move";
	var currPlayer = this.players[this.turn];

	if (extraInfo == "move"){
		console.log("our move is" + move);
		if(this.terrList[territory].occupied){
			//do battle

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
		this.turn = this.turn != 'p1' ? "p2" : "p1";


		for(var i = 0; i< this.terrList.length; i++){
			if(this.terrList[i].ownedBy != 'none'){
				if(this.players["p1"].cT!= i || this.players["p2"].ct!= i){
					this.timeLimit++;

				}
			}


		}
	}
}





gameState.prototype.getMoves = function(){
	return this.players[this.turn].check_moves(this);
}

gameState.prototype.getScores= function(){
	var temp = {}


	for(var i = 0; i< 2; i++){
		temp[i].key = this.players[i].key

		var controlled;
		for(var j = 0; j< this.terrList.length; j++){
			if(this.terrList[j].ownedBy == this.players[i].key){
				controlled++
			}
		}
		temp[i].value = [ this.players[i].value.currency , controlled, this.players[i].value.units];
	}

	return temp;
}








function Player(name, beginTer){
	
	this.units = 3;
	this.currency = 15; //how much
	this.name = name; //player name
	this.cT = typeof beginTer === "undefined" ? 0: beginTer; //index in gameState's terr list
	this.sprite;
}

Player.prototype.addSprite = function(sprite){
	this.sprite = sprite;
}

Player.prototype.gainUnits = function(){
	this.units++;
	this.currency-=unitCost;
}




Player.prototype.check_moves = function(state){
	var moveList = [];

	if(this.currency>=unitCost){
		movelist.push({"territory":this.cT, "extra":"recruit"})
	}
	if(state.terrList[this.cT].ownedBy != this.name){
		movelist.push({"territory":this.cT, "extra":"switch"})
	}

	if(state.terrList[this.cT].val >0){
		movelist.push({"territory":this.cT, "extra":"harvest"})
	}


	for(var i = 0; i< state.terrList[this.cT].neighbors.list;i++){
		var where = state.terrList[this.cT].neighbors[i];
		moveList.push({"territory":where, "extra":"move"});

	}
	return movelist;
}











//owned by is who owns, it, none for no one
//value is how much currency one could get from choosing to collect resources
//occupied if someone is currently in this territoty
//neighbors is list of other Territories you can reach
function Territory(x,y, nl,val){
	this.sprite;
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



Territory.prototype.addSprite = function(sprite){
	this.sprite = sprite;
}

Territory.prototype.applyVal = function(player){
	player.currency+= this.val--;
}





