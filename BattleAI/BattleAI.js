//AI as planner/disicion maker

//state

//applymove

//checkmove

//player info

//units

//territory

function node(self, state, parent=None, m=None){
    this.moves = m
    this.parent = parent;
    this.who = state.get_whos_turn();
    this.children = [];
    this.untried_moves = state.get_moves();
    this.visits = 0;
    this.scoreEconomic = 0.0;
    this.scoreTerritory = 1;
    this.scoreUnits = 3;
}

node.prototype.getAgentScores = function() {
    return [this.scoreEconomic, this.scoreTerritory, this.scoreUnits];
};

funcition scoreDiff(s,who){
	var scores = s.getScores;
    var winTotal = 0;
	if who == 'player'{
        who.scores[0] - ai.scores[0] > 0 ? winTotal+=1 : false;
        who.scores[1] - ai.scores[1] > 0 ? winTotal+=1 : false;
        who.scores[2] - ai.scores[2] > 0 ? winTotal+=1 : false;
    }
	else:{
        who.scores[0] - player.scores[0] > 0 ? winTotal+=1 : false;
        who.scores[1] - player.scores[1] > 0 ? winTotal+=1 : false;
        who.scores[2] - player.scores[2] > 0 ? winTotal+=1 : false;
    }
    return winTotal;
}


function think(state, func){
    var root = node(state);
    
    
    //Select untried moves score difference
		
	//Expand untried moves choice
	
	//Rollout get moves
			
	//Backpropagate visits/score
    
    //set score
    
    //call func
    
    return moves
}
