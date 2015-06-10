
function simpleMCT(state){


	//currently programmed for economic
	var moveList = state.getMoves();

	//shows score
	var dict = {}



	//build 
	for( var moves in moveList){
		dict[moves]=0;
	}




	for( var move in moveList){
		var tempState = state.copy();
		var moves = moveList[move];

		var who = state.turn;
		
		console.log(moves);
		tempState.applyMove(moves);
		

		/*
		for(var i = 0; i<10;i++){
			var tempState2 = tempState.copy();
			//go down 5 game states
			for(var i = 0; i<5;i++){
				tempState2.applyMove(choice(tempState2.getMoves()));
			}
			dict[moves] = (tempState2.getScores[who] + dict[moves])/2
		}
		*/
		
	}

	
	var move = moveList[0];
	var score = -1;
	for(var value in dict){
		//this will give us our score
		console.log(dict[value]);
		if(dict[value]>score){
			move = value
			score = dict[value]
		}
		


	}
	console.log(move);
	console.log(score);






}