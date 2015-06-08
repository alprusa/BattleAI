m = 'move';
h = 'harvest';
s = 'switch';
var scriptMoves = [];
var ghostMoves = [];
var script = [

//Example script

//p1 - Exp
[1, m],
			//p2 - Exp
			[9, m],
//p1 - Exp
[2, m],
			//p2 - Exp
			[8, m],
//p1 - Exp
[4, m],
			//p2 - Exp
			[5, m],
//p1 - Exp
[5, m],
			//p2 - Econ
			[5, h],
//p1 - Exp
[8, m],
			//p2 - Econ
			[5, h],
//p1 - Exp
[6, m],

];

scriptToMoves(script);

function scriptToMoves(sc){
	for (var i = 0; i < (sc.length); i++){
		var move = {};
		move.territory = sc[i][0];
		move.extra = sc[i][1];
		scriptMoves.push(move);
		var moves = [];
		for (var j = 0; j < (sc.length-i)/2; j++){
			var moveTemp = {};
			moveTemp.territory = sc[i+(j*2)][0];
			moveTemp.extra = sc[i+(j*2)][1];
			moves.push(moveTemp);
		}
		ghostMoves.push(moves);
	}
}