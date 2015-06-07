//SimpleAI

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
    var p1 = scores['p1'][0];
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
        var p1 = scores['p1'][1];
        var saveMove = null;
        var moves = null;
        var areAnyNone = false;
        //ownedBy and occupied
        for(var i = 0; i < possibleMoves.length; i++){
            if(possibleMoves[i]['extra'] == 'move'){
                if(state.terrList[possibleMoves[i]['territory']].ownedBy == "none")
                    return possibleMoves[i];
                else if(state.terrList[possibleMoves[i]['territory']].ownedBy != turn && !state.terrList[possibleMoves[i]['territory']].occupied){
                    moves = possibleMoves[i];
                }
                else if(state.terrList[possibleMoves[i]['territory']].ownedBy == turn){
                    if(p1 - scores['p2'][1] < 0) saveMove = possibleMoves[i];
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
        var p1 = scores['p1'][2];
        var saveMove = null;
        var moves = null;
        //ownedBy and occupied
        for(var i = 0; i < possibleMoves.length; i++){
            if(possibleMoves[i]['extra'] == 'move'){
                if(state.terrList[possibleMoves[i]['territory']].occupied){
                    moves = possibleMoves[i];
                }
            }
            else {
                //do fastest path to get to player
                saveMove = possibleMoves[i];
            }
        }
        
        if(moves == null) moves = saveMove;
        return moves;
    }
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