//AI as planner/desicion maker

//state

//applymove

//checkmove

//player info

//units

//territory
var THINK_DURATION = 1;
//fixed conversion from python to javascript for extra parameters, ie switched parent = None
//to proper syntax
function node(self, state, parent, m){
    this.moves = m = typeof m !== 'undefined' ? m : null;
    this.parent = parent = typeof parent !== 'undefined' ? parent: null;;
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
	else{
        scores["who"][0] - scores["p1"][0] > 0 ? winTotal+=1 : -1;
        scores["who"][1] - scores["p1"][1] > 0 ? winTotal+=1 : -1;
        scores["who"][2] - scores["p1"][2] > 0 ? winTotal+=1 : -1;
    }
    return winTotal;
}

function idvScoreDiff(scores, index){
    var score = 0;
    if(who == 'p1'){
        score = scores["who"][index] - scores["p2"][index];
    }
    else{
        score = scores["who"][index] - scores["p1"][index];
    }
    return score;
}

//Heuristic calls for each of the different state types
function UCTSelectChild(children, tempState, who, visits, parentVisits, desiredType){
    var scores = state.getScores;
    var score = 0;
    switch(desiredType){ 
        case "economic":
            idvScoreDiff(scores, 0);
            break;
        case "expantional":
            idvScoreDiff(scores, 1);
            break;
        case "aggressive":
            idvScoreDiff(scores, 2);
            break;
        default:
            return [children, scoreDiff(tempState,who) + Math.sqrt(2*Math.log(parentVisits)/visits)][-1];
            break;
    }
    
    return [children, score + Math.sqrt(2*Math.log(parentVisits)/visits)][-1];
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

function think(state, desiredType){
    var root = node(state);
        
    var startTime = new Date().getTime() / 1000;
    var endTime = startTime + THINK_DURATION;
    var currTime = 0.0;
      
    var tempScore = state.getScores;

    while(true){
        var tempState = state.copy;
        var node = root;
        
        //Select untried moves score difference
        while(node.untried_moves == null && node.children != null){ //node is fully expanded and non-terminal
            node = UCTSelectChild(node.children, tempState, c.parent.who, c.visits, c.parent.visits, desiredType);
            node.sort();
            tempState.applyMove(node.moves);
        }
        
        //Expand untried moves choice
        if (node.untried_moves != null){ //if we can expand (i.e. state/node is non-terminal)
            var m = choice(node.untried_moves);
            tempState.applyMove(m);
            var t = Node(tempState,node,m);
            node.children.append(t);
            node = t;
        }
        
        //Rollout get moves - this can often be made orders of magnitude quicker using a state.GetRandomMove() function
        while (tempState.get_moves() != null){
            //hueristic here perhaps to be the choice function
            tempState.applyMove(choice(tempState.get_moves()));
        }
                
        //Backpropagate visits/score backpropagate from the expanded node and work back to the root node
        while (node != None && node.parent != null){
            node.visits += 1;
            node.totalScore = tempState.get_score()[node.parent.who];
            node = node.parent;
        }
        
        //set score
        node.totalScore = tempScore;
        
        currTime = new Date().getTime() / 1000;
        if (currTime > endTime){
            break;
        }
    }
   
    var moves = lambdaVisits(root.children, c.visits).moves;
    
    console.log("The moves chosen by " + desiredType + " ai: " + moves);
    
    return moves.sort(); //return the move that was most visited
}
