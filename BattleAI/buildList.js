function buildList(){
	var terrList = [];
    //0
    terrList.push(new Territory(20,20, [1,5] ));
    //1
    terrList.push(new Territory(10,50, [0,2,3,4] ));
    //2
    terrList.push(new Territory(50,50, [1,4] ));
    //3
    terrList.push(new Territory(10,80, [2] ));
    //4
    terrList.push(new Territory(50,80, [1,2,5] ));
    //5
    terrList.push(new Territory(90,100, [0,4,8,11,14] ));
    //6
    terrList.push(new Territory(130,50, [8,9] ));
    //7
    terrList.push(new Territory(160,50, [9] ));
    //8
    terrList.push(new Territory(130,90, [5,6,9] ));
    //9
    terrList.push(new Territory(160,90, [6,7,8,14] ));
    //10
    terrList.push(new Territory(60,150, [11,12] ));
    //11
    terrList.push(new Territory(100,150, [5,10,12] ));
    //12
    terrList.push(new Territory(80,200, [10,11,13] ));
    //13
    terrList.push(new Territory(80,250, [12] ));
    //14
    terrList.push(new Territory(200,250, [5,9] ));
	
	return terrList
}

