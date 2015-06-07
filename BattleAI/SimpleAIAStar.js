//SimpleAI
//to implement a five steps ahead planner then create while loop that runs maybe 5 times then it shall check each move per loop

function economic(state){
    //get moves
    //check what current unit count is
        //check money amount if units are low
    //compare player score to ai and goal 500
    
    var possibleMoves = state.getMoves();
    var turn = state.turn;
    if(state.players[turn].units <= 1){
        if(state.players[turn].currency >= 35){
            for(var i = 0; i < possibleMoves.length; i++){
                if(possibleMoves[i]['extra'] == 'recruit')
                    return possibleMoves[i];
            }
        }
    }
    
    var scores = state.getScores();
    var maxTerRes = 0;
    var moves = null;
    for(var i = 0; i < possibleMoves.length; i++){
        if((possibleMoves[i]['extra'] == 'move' || possibleMoves[i]['extra'] == 'harvest') && maxTerRes < state.terrList[possibleMoves[i]['territory']].val){
            maxTerRes = state.terrList[possibleMoves[i]['territory']].val;
            moves = possibleMoves[i];
        }
    }
    return moves;
}

function expansional(state){
    //get moves
    //check what current unit count is
        //check money amount if units are low
    //compare player score to ai and goal 12
    var possibleMoves = state.getMoves();
    var turn = state.turn;
    if(state.players[turn].units <= 1){
        if(state.players[turn].currency >= 35){
            for(var i = 0; i < possibleMoves.length; i++){
                if(possibleMoves[i]['extra'] == 'recruit')
                    return possibleMoves[i];
            }
        }
        else{
            for(var i = 0; i < possibleMoves.length; i++){
                //test if area has no resources if not the move to get some
                if(possibleMoves[i]['extra'] == 'harvest')
                    return possibleMoves[i];
            }
        }
    }
    else{
        var scores = state.getScores();
        var p1 = scores[turn][1];
        var p2 = 'p2';
        if(turn == 'p2') p2 = 'p1';
        var saveMove = null;
        var moves = null;
        var areAnyNone = false;
        //ownedBy and occupied
        for(var i = 0; i < possibleMoves.length; i++){
            if(possibleMoves[i]['extra'] == 'move'){
                if(state.terrList[possibleMoves[i]['territory']].ownedBy == "none")
                    return possibleMoves[i];
                else if(state.terrList[possibleMoves[i]['territory']].ownedBy == p2 && state.terrList[possibleMoves[i]['territory']] != state.players[p2].cT){
                    moves = possibleMoves[i];
                }
                else if(state.terrList[possibleMoves[i]['territory']].ownedBy == turn){
                    if(scores[turn][0] - scores[p2][0] > 0) saveMove = possibleMoves[i];
                }
            }
            else if(possibleMoves[i]['extra'] == 'harvest'){
                saveMove = possibleMoves[i];
            }
        }
        
        if(moves == null) moves = saveMove;
        return moves;
    }
}

function aggressive(state){
    //get moves
    //check what current unit count is
        //check money amount if units are low
    //compare player score to ai and goal 0
    var possibleMoves = state.getMoves();
    var turn = state.turn;
    if(state.players[turn].units <= 1){
        if(state.players[turn].currency >= 35){
            for(var i = 0; i < possibleMoves.length; i++){
                if(possibleMoves[i]['extra'] == 'recruit')
                    return possibleMoves[i];
            }
        }
        else{
            for(var i = 0; i < possibleMoves.length; i++){
                //test if area has no resources if not the move to get some
                if(possibleMoves[i]['extra'] == 'harvest')
                    return possibleMoves[i];
            }
        }
    }
    else{
        console.log(state.terrList[possibleMoves[1]['territory']]);
        var scores = state.getScores();
        var p1 = scores[turn][2];
        var p2 = 'p2';
        if(turn == 'p2') p2 = 'p1';
        var saveMove = null;
        var moves = AStar(state.players[turn].cT, state.players[p2].cT, state.terrList);
        //ownedBy and occupied
        /*for(var i = 0; i < state.terrList.length; i++){
            //if(possibleMoves[i]['extra'] == 'move'){
                console.log(state.terrList[i]);
                if(state.terrList[i].occupied && state.terrList[i].ownedBy == p2){
                    AStar(state.players[turn].cT, state.players[p2].cT, state.terrList);
                    console.log("what?");
                    moves = possibleMoves[i];
                }
            //}
            //else {
                //do fastest path to get to player
           //     saveMove = possibleMoves[i];
           // }
        }
        
        if(moves == null) moves = saveMove;*/
        console.log(moves);
        return possibleMoves[moves[0]];
    }
}

function AStar(src, dst, graph){
    var forwardDist = new Array();
    var backwardDist = new Array();
    var forwardPrev = new Array();
    var backwardPrev = new Array();
    var detailPoints = new Array();
    var visitedNodes = []
    var queue = [];
    
    detailPoints[0] = [graph[src].x,graph[src].y];
    detailPoints[graph.length] = [graph[dst].x,graph[dst].y];
    visitedNodes.push(graph[0]);
    forwardDist[0] = 0;
    backwardDist[graph.length] = 0;
    forwardPrev[0] = 'undefined';
    backwardPrev[graph.length] = 'undefined';
    var tentative = 0;
    var nextDist = 0;
    queue.push([forwardDist[0], 0, src]);
    queue.push([backwardDist[graph.length], graph.length, dst]);

    while (queue){
        var queueVals = queue.pop();
        var currGoal = queueVals[2];
        var node = queueVals[1];
        var _ = queueVals[0];
        
        console.log(_, node, currGoal);
        if (currGoal == graph.length && backwardPrev.indexOf(node) > -1)
            break;
        if (currGoal == 0 && forwardPrev.indexOf(node) > -1)
            break;

        neighbors = graph[node];
        for (var nextNode = 1; nextNode < graph.length-1; nextNode++){
            var nodePos = detailPoints[node];
            var nodeX = nodePos[0];
            var nodeY = nodePos[1];
            //var nextX1 = graph[nextNode].x, nextX2 = graph[nextNode+1].x, nextY1 = graph[nextNode].y, nextY2 = graph[nextNode+1].y;
            //var nextPos = [Math.min(nextX2-1,Math.max(nextX1,nodeX)), Math.min(nextY2-1,Math.max(nextY1,nodeY))];
            var nextX1 = graph[nextNode].x, nextY1 = graph[nextNode].y;
            var nextPos = [nextX1, nextY1];
            
            detailPoints[nextNode] = nextPos;
            
            if (currGoal == graph.length)
                tentative = forwardDist[node] + eucDist(detailPoints[node], detailPoints[nextNode]);
            else
                tentative = backwardDist[node] + eucDist(detailPoints[node], detailPoints[nextNode]);
            if (currGoal == graph.length){
                if (!(forwardDist.indexOf(nextNode) > -1) || tentative < forwardDist[nextNode]){
                    visitedNodes.push(nextNode);
                    forwardDist[nextNode] = tentative;
                    forwardPrev[nextNode] = node;
                    queue.push(tentative + eucDist(detailPoints[nextNode], dst), nextNode, graph.length);
                }
            }
            else{
                if (!(backwardDist.indexOf(nextNode) > -1) || tentative < backwardDist[nextNode]){
                    visitedNodes.push(nextNode);
                    backwardDist[nextNode] = tentative;
                    backwardPrev[nextNode] = node;
                    queue.push(tentative + eucDist(detailPoints[nextNode], src), nextNode, 0);
                }
            }
        }
        console.log(backwardPrev.indexOf(node), forwardPrev);
        if (backwardPrev.indexOf(node) > -1 && forwardPrev.indexOf(node) > -1){
            var path = [];
            detailPoints[0] = src;
            detailPoints[graph.length] = dst;
            console.log(detailPoints);
            
            nodeCopy = node;
            while (node != null){
                prevNode = forwardPrev[node];
                if (typeof prevNode !== 'undefined')
                    path.append((detailPoints[node], detailPoints[prevNode]));
                node = prevNode;
            }
            while (nodeCopy){
                prevNode = backwardPrev[nodeCopy];
                if (typeof prevNode !== 'undefined')
                    path.append((detailPoints[nodeCopy], detailPoints[prevNode]));
                nodeCopy = prevNode;
            }
            return path;
        }
        else
            return [];
    }
}

function eucDist(pointA, pointB){
    var x1 = pointA[0], y1 = pointA[1];
    var x2 = pointB[0], y2 = pointB[1];
    return Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
}

function simpleAI(state, type){
    var move = [];
    switch(type){
        case 'economic':
            move = economic(state);
            break;
        case 'expansional':
            move = expansional(state);
            break;
        case 'aggressive':
        default:
            move = aggressive(state);
            break;
    }
    return move;
}