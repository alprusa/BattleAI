function buildList(){
	var terrList = [];
    //0
    terrList.push(new Territory(100,20*2, [1,5] ));
    //1
    terrList.push(new Territory(10*3,50*2, [0,2,3,4] ));
    //2
    terrList.push(new Territory(50*3,50*2, [1,4] ));
    //3
    terrList.push(new Territory(10*3,80*2, [1] ));
    //4
    terrList.push(new Territory(50*3,80*2, [1,2,5] ));
    //5
    terrList.push(new Territory(90*3,100*2, [0,4,8,11,14] ));
    //6
    terrList.push(new Territory(130*3,50*2, [8,9] ));
    //7
    terrList.push(new Territory(160*3,50*2, [9] ));
    //8
    terrList.push(new Territory(130*3,90*2, [5,6,9] ));
    //9
    terrList.push(new Territory(160*3,90*2, [6,7,8,14] ));
    //10
    terrList.push(new Territory(60*3,150*2, [11,12] ));
    //11
    terrList.push(new Territory(100*3,150*2, [5,10,12] ));
    //12
    terrList.push(new Territory(80*3,200*2, [10,11,13] ));
    //13
    terrList.push(new Territory(80*3,250*2, [12] ));
    //14
    terrList.push(new Territory(200*3,250*2, [5,9] ));
	
	return terrList
}

