var unitCost = 20;
var maxUnits = 35;

var minTer = 10;

//max and min value a territory can have;
var mxTVl = 20;
var mnTVl = 5;
//what number of currency is needed to win with econ path
var winEcon = 500;
//what number of territory is needed to win with econ path
var winTerr = 7












function gameState(){
	this.terrList = [];
	this.players = {'p1': new Player('p1') ,'p2': new Player('p2')}
	this.turn = 'p1';
}




gameState.prototype.applyMove = function(territory,extra){
	//assume the move being applied is possible, as all preconditions are checked in checkMoves
	var extraInfo = typeof extra !== 'undefined' ? extra : "move";
	var currPlayer = this.players[this.turn];

	if (extraInfo == "move"){
		if(this.terrList[territory].occupied){
			//do battle
		}else{
			this.terrList[this.players[this.turn].cT].occupied = false;
			this.players[this.turn].cT=territory;
			this.terrList[territory].occupied = true;
		}

	}else if(extraInfo == "recruit"){
		currPlayer.gainUnits();
		
	}else if(extraInfo == "harvest"){
		this.terrList[currPlayer.cT].applyval(currPlayer);
		
	}


	this.turn = this.turn != 'p1' ? "p1" : "p2";
}





gameState.prototype.checkMove = function(){

	push( (territory,extra) )
	
}









//will manage checking moves and store player's individual data, shouldn't modify anything.
function Player(name){
	this.units = 3;
	this.currency = 15; //how much
	this.name = name; //player name
	this.cT = 0; //index in gameState's terr list
}

Player.prototype.gainUnits = function(){
	this.units++;
	this.currency-=unitCost;

}


Player.prototype.check_moves = function(){
	if(this.currency<)



	return 
}













//owned by is who owns, it, none for no one
//value is how much currency one could get from choosing to collect resources
//occupied if someone is currently in this territoty
//neighbors is list of other Territories you can reach
function Territory(val,nl){
	this.val = val;
	this.ownedBy = 'none';                                     
	this.occupied = false;
	this.neighbors = nl;
}

Territory.prototype.applyVal = function(player){
	player.currency+= this.val--;


}





