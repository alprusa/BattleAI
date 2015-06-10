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

function Node(state, parent, m){
    this.moves = typeof m !== null ? m : null;
    this.parent = typeof parent !== null ? parent: null;
    this.who = state.turn;
    this.children = [];
    this.untriedMoves = state.getMoves();
    this.visits = 0;
    this.totalScore = [];
}

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
            //score = idvScoreDiff(scores, 0);
            index = 0
            if(who == 'p1'){
                score = scores["who"][index] - scores["p2"][index];
            }
            else{
                score = scores["who"][index] - scores["p1"][index];
            }
            break;
        case "expansional":
            score = idvScoreDiff(scores, 1);
            break;
        case "aggressive":
            score = idvScoreDiff(scores, 2);
            break;
        default:
            return [children, scoreDiff(tempStatewho) + Math.sqrt(2*Math.log(parentVisits)/visits)];
            break;
    }
    
    return [children, score + Math.sqrt(2*Math.log(parentVisits)/visits)].sort(function(score){return score;});
}

function lambdaVisits(children){
    var sorted = [];
    for(var key in children) {
        
        sorted[sorted.length] = key.value;
    }
    sorted.sort();
    
    return sorted;
}


function think(state, desiredType){
    var root = new Node(state, null, null);
        
    var startTime = new Date().getTime() / 1000;
    var endTime = startTime + THINK_DURATION;
    var currTime = 0.0;
      
    var tempScore = state.getScores;
    var j = 0;

    while(true){
        var tempState = state.copy();
        var node = root;
        console.log(node);
        //Select untried moves score difference
        var i = node.children.length;
        console.log(i);
        console.log(node.untriedMoves);
        while(typeof node.untriedMoves === 'undefined' && node.children.length > 0){ //node is fully expanded and non-terminal
            var sortedKeys = Object.keys(node.children).sort();
            var c = node.children[sortedKeys[i]];
            console.log(node.children);
            node = UCTSelectChild(node.children, tempState, c.parent.who, c.visits, c.parent.visits, desiredType);
            node.sort();
            tempState.applyMove(node.moves[0]);
            i--;
            node.children.length--;
            console.log("children length " + node.children.length);
        }
        
        //Expand untried moves choice
        console.log(node.untriedMoves);
        if (typeof node.untriedMoves !== 'undefined'){ //if we can expand (i.e. state/node is non-terminal)
            console.log(node.untriedMoves);
            var m = choice(node.untriedMoves);
            tempState.applyMove(m);
            var t = new Node(tempState,node,m);
            node.children.push(t);
            node = t;
            node.untriedMoves = tempState.getMoves();
        }
        
        //Rollout get moves - this can often be made orders of magnitude quicker using a state.GetRandomMove() function
        while (typeof node.totalScore[0] !== 'undefined' && node.totalScore[0] < 500 && node.totalScore[1] < 12 && node.totalScore[2] > 0){
            //hueristic here perhaps to be the choice function
            console.log(node.totalScore);
            tempState.applyMove(choice(tempState.getMoves()));
            tempState.getMoves().length--;
        }
                
                
        //Backpropagate visits/score backpropagate from the expanded node and work back to the root node
        while (typeof node !== 'undefined' && node != null && typeof node.parent !== 'undefined' && node.parent != null){
            node.visits += 1;
            console.log(node.parent.who);
            node.totalScore = tempState.getScores()[node.parent.who];
            node = node.parent;
            console.log("parent " + parent);
        }
        
        //set score
        node.totalScore = tempScore;
        
        currTime = new Date().getTime() / 1000;
        if (currTime > endTime){
            root = node;
            break;
        }
    }
   console.log(root.children);
   console.log(root.children.visits);
    var moves = lambdaVisits(root.children);
    
    console.log("The moves chosen by " + desiredType + " ai: " + moves);
    console.log(moves);
    
    return moves.sort()[0]; //return the move that was most visited
}
