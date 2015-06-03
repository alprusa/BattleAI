//AI as planner/desicion maker

//state

//applymove

//checkmove

//player info

//units

//territory
var THINK_DURATION = 1;

function node(self, state, parent=None, m=None){
    this.moves = m
    this.parent = parent;
    this.who = state.turn;
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

function scoreDiff(state,who){
	var scores = state.getScores;
    var winTotal = 0;
	if(who == 'p1'){
        scores["who"][0] - scores["p2"][0] > 0 ? winTotal+=1 : -1;
        scores["who"][1] - scores["p2"][1] > 0 ? winTotal+=1 : -1;
        scores["who"][2] - scores["p2"][2] > 0 ? winTotal+=1 : -1;
    }
	else:{
        scores["who"][0] - scores["p1"][0] > 0 ? winTotal+=1 : -1;
        scores["who"][1] - scores["p1"][1] > 0 ? winTotal+=1 : -1;
        scores["who"][2] - scores["p1"][2] > 0 ? winTotal+=1 : -1;
    }
    return winTotal;
}

function lambda(children, tempState, who, visits, parentVisits){
    return [children, scoreDiff(tempState,who) + Math.sqrt(2*Math.log(parentVisits)/visits)][-1];
}

function lambdaVisits(children, visits){
    return [children, visits][-1];
}

function choice(untried_moves){
    var rand = Math.random();
    rand *= untried_moves.length;
    rand = Math.floor(rand);
    return rand;
}

function think(state){
    var root = node(state);
        
    var startTime = new Date().getTime() / 1000;
    var endTime = startTime + THINK_DURATION;
    var currTime = 0.0;
      
    var tempScore = state.getScores;

    while(true){
        var tempState = state.copy;
        var node = root;
        
        //Select untried moves score difference
        while(node.untried_moves == null && node.children != null){
            node = lambda(node.children, tempState, c.parent.who, c.visits, c.parent.visits);
            node.sort();
            tempState.applyMove(node.moves);
        }
        
        //Expand untried moves choice
        if (node.untried_moves != null){
            var m = choice(node.untried_moves);
            tempState.applyMove(m);
            var t = Node(tempState,node,m);
            node.children.append(t);
            node = t;
        }
        
        //Rollout get moves
        while (tempState.get_moves() != null){
            //hueristic here perhaps to be the choice function
            tempState.applyMove(choice(tempState.get_moves()));
        }
                
        //Backpropagate visits/score
        while (node != None and node.parent != null){
            node.visits += 1;
            node.totalScore = tempState.get_score()[node.parent.who];
            node = node.parent;
        }
        
        //set score
        node.totalScore = tempScore;
        
        currTime = new Date().getTime() / 1000;
        if currTime > endTime{
            break;
        }
    }
   
    var moves = lambdaVisits(root.children, c.visits).moves;
    return moves.sort();
}
