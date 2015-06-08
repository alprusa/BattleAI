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
        if(state.terrList[state.players[turn].cT].ownedBy != turn){
                return {"territory":state.players[turn].cT , "extra": "switch"};
        }
        
        for(var i = 0; i < possibleMoves.length; i++){
            if(possibleMoves[i]['extra'] == 'move' && !state.terrList[possibleMoves[i]['territory']].occupied){
                if( state.terrList[possibleMoves[i]['territory']].ownedBy == 'none'){
                    return possibleMoves[i];
                }
            }
        }
        
        
        for(var i = 0; i < possibleMoves.length; i++){
            if(possibleMoves[i]['extra'] == 'move' && !state.terrList[possibleMoves[i]['territory']].occupied){
                if( state.terrList[possibleMoves[i]['territory']].ownedBy == p2){
                    return possibleMoves[i];
                }
               

            }
        }
        
        
        var noneList = [];
        
        var otherList = [];
        
        var len1 = 10000000000000;
        var len2 = 10000000000000;
        for( var i = 0; i< state.terrList.length; i++){
            if(state.terrList[i].ownedBy == p2 && pathFinder(state.players[turn].cT,i,state).length< len1){
                otherList = pathFinder(state.players[turn].cT,i,state);
                len1 = otherList.length;
            }else if(state.terrList[i].ownedBy == "none" && pathFinder(state.players[turn].cT,i,state).length< len2){
                noneList = pathFinder(state.players[turn].cT,i,state);
                len2 = noneList.length;
            }   
        }
        if(noneList.length!= 0 && otherList.length !=0){
            if(noneList.length<=otherList.length){
                return {"territory":noneList[noneList.length-1][0] , "extra": "move"};
            }else{
                return {"territory":otherList[otherList.length-1][0], "extra": "move"};
            }
      
        }else{
            return{"territory":state.players[turn].cT , "extra": "harvest"};
            
        }
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
        return choice(possibleMoves);
    }
    else{
        
        var scores = state.getScores();
        var p1 = scores[turn][2];
        var p2 = 'p2';
        if(turn == 'p2') p2 = 'p1';
        var saveMove = null;
        var movesIndex = pathFinder(state.players[turn].cT, state.players[p2].cT, state);
        
        //ownedBy and occupied
        for(var i = 0; i < possibleMoves.length; i++){
            if(possibleMoves[i]['extra'] == 'move'){
                if(possibleMoves[i]['territory'] == movesIndex[movesIndex.length-1][0]){
                    return possibleMoves[i];
                }
            }
            else if(possibleMoves[i]['extra'] == 'harvest'){
                //do fastest path to get to player
                saveMove = possibleMoves[i];
            }
        }
        return saveMove;
    }
}

function pathFinder(src, dst, state){
    var dist = {};
    var prev = {};
    var detailPoints = {};
    var queue = [];
    //var visitedNodes = [];
    var node =[];
    var distanP = [state.terrList[dst].x, state.terrList[dst].y];
    var srcP = [state.terrList[src].x, state.terrList[src].y];
    
    detailPoints[src] = srcP;
    detailPoints[dst] = distanP;
    dist[src] = 0;
    prev[src] = 'undefined';
    queue.push([dist[src], src]);
    //visitedNodes.push(state.terrList[src]);

    while (queue.length > 0){
        node = queue.pop();
        var currNode = [state.terrList[node[1]].x,state.terrList[node[1]].y];
    
        if (node[1] === dst){
            break;
        }

        neighbors = state.terrList[node[1]].neighbors;
        for(var i = 0; i < neighbors.length; i++){
            var nextNode = neighbors[i];
            var nodePos = detailPoints[node[1]];
            var nodeX = nodePos[0], nodeY = nodePos[1];
            var nextX1 = state.terrList[nextNode].x, nextY1 = state.terrList[nextNode].y;
            var nextPos = [Math.max(nextX1,nodeX), Math.max(nextY1,nodeY)];
            detailPoints[nextNode] = nextPos;
            tentative = dist[node[1]] + eucDist(currNode, detailPoints[nextNode]);
            if (!dist[nextNode] || tentative < dist[nextNode]){
                //visitedNodes.push(nextNode);
                dist[nextNode] = tentative;
                prev[nextNode] = node[1];
                queue.push([tentative + eucDist(detailPoints[nextNode], distanP), nextNode]);
            }
        }
    }
    
    if (node[1] == dst){
        var path = [];
        detailPoints[src] = srcP;
        detailPoints[dst] = distanP;
        while (node[1] != src){
            var prevNode = prev[node[1]];
            if (typeof prevNode !== 'undefined')
                path.push([node[1], prevNode]);
            node[1] = prevNode;
        }
        return path;
    }
    else
        return [];
}

function eucDist(pointA, pointB){
    var x1 = pointA[0], y1 = pointA[1];
    var x2 = pointB[0], y2 = pointB[1];
    var valToSqrt = Math.pow((x2-x1),2)+Math.pow((y2-y1),2);
    return Math.round(Math.sqrt(valToSqrt));
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