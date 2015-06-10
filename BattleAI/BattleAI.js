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
    this.totalScore = state.getScores();
}

function scoreDiff(state,who){
	var scores = state.getScores();
    var winTotal = 0;
	if(who == 'p1'){
        scores["p1"][0] - scores["p2"][0] > 0 ? winTotal+=1 : -1;
        scores["p1"][1] - scores["p2"][1] > 0 ? winTotal+=1 : -1;
        scores["p1"][2] - scores["p2"][2] > 0 ? winTotal+=1 : -1;
    }
	else{
        scores["p2"][0] - scores["p1"][0] > 0 ? winTotal+=1 : -1;
        scores["p2"][1] - scores["p1"][1] > 0 ? winTotal+=1 : -1;
        scores["p2"][2] - scores["p1"][2] > 0 ? winTotal+=1 : -1;
    }
    return winTotal;
}

function idvScoreDiff(scores, index){
    var score = 0;
    if(who == 'p1'){
        score = scores["p1"][index] - scores["p2"][index];
    }
    else{
        score = scores["p2"][index] - scores["p1"][index];
    }
    return score;
}

//Heuristic calls for each of the different state types
function UCTSelectChild(children, tempState, who, visits, parentVisits, desiredType){
    var scores = state.getScores;
    var score = 0;
    switch(desiredType){ 
        case "economic":
            score = idvScoreDiff(scores, 0);
            /*if(who == 'p1'){
                score = scores["p1"][index] - scores["p2"][index];
            }
            else{
                score = scores["p2"][index] - scores["p1"][index];
            }*/
            break;
        case "expansional":
            score = idvScoreDiff(scores, 1);
            break;
        case "aggressive":
            score = idvScoreDiff(scores, 2);
            break;
        default:
            return [children, scoreDiff(tempState, who) + Math.sqrt(2*Math.log(parentVisits)/visits)];
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

function whichMove(untriedMoves, sd, type, state){
    var moves = untriedMoves[0];
    console.log(untriedMoves);
    var i = 0;
    switch(type){
        case 'economic':
            var moveChanged = false;
            var resCount = 0;
            for(; i < untriedMoves.length; i++) {
                if((sd[2] < -2 && untriedMoves[i]['extra'] == 'recruit') || state.players[state.turn].units <= 1) {
                    //get more units when other player is capable of destroying you
                    moves = untriedMoves[i];
                    moveChanged = true;
                }
                else{
                    //harvest if no other issues are pressing make sure not to move if current resource is only slightly lower then other
                    var terr = untriedMoves[i]['territory'];
                    if(sd[1] < 0){ //12 max total on board 15 your min 1 (4)(10)
                        //make sure other player doesn't win against you expansionally
                        var score = state.getScores();
                        var otherP = 'p2';
                        if(state.turn == 'p2') otherP = 'p1';
                        var currencyP = state.players[state.turn].currency;
                        if(score[otherP][1] > 10 && state.terrList[terr].ownedBy != state.turn
                                && (500/(currencyP+(state.terrList[terr].val*2)) > 1 && untriedMoves[i]['extra'] == 'move'))
                                        return untriedMoves[i];
                    }
                    if((untriedMoves[i]['extra'] == 'harvest' || untriedMoves[i]['extra'] == 'move') && resCount < (state.terrList[terr].val*0.8)){
                        resCount = state.terrList[terr].val;
                        moves = untriedMoves[i];
                        moveChanged = true;
                    }
                }
            }
            //fall back move set index back to zero if that's what's being used
            if(moveChanged == false) i = 0;
            break;
        case 'expansional':
            var moveChanged = false;
            moves = expansional(state);
            //fall back move set index back to zero if that's what's being used
            if(moveChanged == false) i = 0;
            break;
        case 'aggressive':
        default:
            var moveChanged = false;
            moves = aggressive(state);
            //fall back move set index back to zero if that's what's being used
            if(moveChanged == false) i = 0;
            break;
    }
    return [moves, i];
}


function think(state, desiredType){
    var root = new Node(state, state, null);
        
    var startTime = new Date().getTime() / 1000;
    var endTime = startTime + THINK_DURATION;
    var currTime = 0.0;
      
    var tempScore = state.getScores;
    var iteration = 0;
    //AISearch = true;

    while(true){
        var tempState = state.copy();
        var node = root;

        //Select untried moves score difference
        var i = node.children.length;
        while(node.untriedMoves.length <= 0 && node.children.length > 0){ //node is fully expanded and non-terminal
            //var child = lambdaVisits(node.children);
            node.children = UCTSelectChild(node.children, tempState, node.children[0].parent.who, node.children[0].visits, node.children[0].parent.visits, desiredType);
            lambdaVisits(node.children);
            tempState.applyMove(node.moves[0]);
        }
        
        //Expand untried moves choice
        //console.log(node.untriedMoves[0]);
        if (node.untriedMoves.length > 0){ //if we can expand (i.e. state/node is non-terminal)
            var sd = scoreDiff(tempState,tempState.turn);
            var chosen = whichMove(tempState.getMoves(),sd,desiredType,tempState);
            tempState.applyMove(chosen[0]);
            var t = new Node(tempState,node,chosen[0]);
            node.children.push(t);
            node = t;
            /*if (chosen[1] > -1) {
                node.untriedMoves.splice(chosen[1], 1);
            }*/
        }
        
        //Rollout get moves - this can often be made orders of magnitude quicker using a state.GetRandomMove() function
        while (typeof node.totalScore !== 'undefined' && node.totalScore != null && node.totalScore.length > 0
                && (node.totalScore[0] < 100 || node.totalScore[1] < 12 || node.totalScore[2] > 0)){
            //hueristic here perhaps to be the choice function
            var sd = scoreDiff(tempState,tempState.turn);
            var chosen = whichMove(tempState.getMoves(),sd,desiredType,tempState);
            tempState.applyMove(chosen[0]);
        }
                
                
        //Backpropagate visits/score backpropagate from the expanded node and work back to the root node
        while (typeof node !== 'undefined' && node != null && typeof node.parent !== 'undefined' && node.parent != null){
            node.visits += 1;
            node.totalScore = tempState.getScores()[node.parent.who];
            node = node.parent;
        }
        
        //set score
        node.totalScore = tempScore;
        
        currTime = new Date().getTime() / 1000;
        iteration++;
        if (currTime > endTime || iteration >= 5){
            //root = node;
            
            console.log(node);
            break;
        }
    }
    //AISearch = false;
    
    //console.log(root);
    root.moves = lambdaVisits(root.children[0].moves);
    
    console.log("The moves chosen by " + desiredType + " ai: ");
    //console.log(root);
    //console.log(root.moves);
    
    return root.children[0].moves; //return the move that was most visited
}
