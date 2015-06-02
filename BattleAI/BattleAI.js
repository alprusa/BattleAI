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
    this.who = state.get_whos_turn;
    this.children = new Object();
    this.untried_moves = state.get_moves;
    this.visits = 0;
    this.scoreEconomic = 0.0;
    this.scoreTerritory = 1;
    this.scoreUnits = 3;
    this.totalScore = [];
}

node.prototype.getAgentScores = function() {
    return [this.scoreEconomic, this.scoreTerritory, this.scoreUnits];
};

funcition scoreDiff(s,who){
	var scores = s.getScores;
    var winTotal = 0;
	if who == 'player'{
        scores["who"][0] - scores["ai"][0] > 0 ? winTotal+=1 : -1;
        scores["who"][1] - scores["ai"][1] > 0 ? winTotal+=1 : -1;
        scores["who"][2] - scores["ai"][2] > 0 ? winTotal+=1 : -1;
    }
	else:{
        scores["who"][0] - scores["player"][0] > 0 ? winTotal+=1 : -1;
        scores["who"][1] - scores["player"][1] > 0 ? winTotal+=1 : -1;
        scores["who"][2] - scores["player"][2] > 0 ? winTotal+=1 : -1;
    }
    return winTotal;
}

function lambda(children, tempState, who, visits, parentVisits){
    return [children, scoreDiff(tempState,who) + Math.sqrt(2*Math.log(parentVisits)/visits)][-1];
}

function lambdaVisits(children, visits){
    return (children, visits)[-1];
}

function think(state, func){
    var root = node(state);
    
    
    //Select untried moves score difference
		
	//Expand untried moves choice
	
	//Rollout get moves
			
	//Backpropagate visits/score
    
    //set score
    
    //call func
    
  var iterations = 0;
  
  var tempScore = state.getScores;

  while(true){
	iterations += 1;
	var tempState = state;
	var node = root;
    
	//Selecttypeof array[index] !== 'undefined' && array[index] !== null
	while(node.untried_moves == null && node.children != null){
		node = lambda(node.children, tempState, c.parent.who, c.visits, c.parent.visits);
        node.sort();
		tempState.applyMove(node.moves);
    }
    
	//Expand
	if (node.untried_moves != null){
		var m = choice(node.untried_moves);
		tempState.applyMove(m);
		var t = Node(tempState,node,m);
		node.children.append(t);
		node = t;
    }
	
	//Rollout
	while (tempState.get_moves() != null){
        //hueristic here perhaps to be the choice function
		tempState.applyMove(choice(tempState.get_moves()));
    }
			
	//Backpropagate
	while (node != None and node.parent != null){
		node.visits += 1;
		node.totalScore = tempState.get_score()[node.parent.who];
		node = node.parent;
    }
		
	node.totalScore = tempScore;
  }
  
    var moves = lambdaVisits(root.children, c.visits).moves;
    return moves.sort();
}
