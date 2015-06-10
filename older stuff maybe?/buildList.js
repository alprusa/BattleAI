function buildList(){
	var terrList = [];
    //0
    terrList.push(new Territory(45*5,10*3, [1,5] ));
    //1
    terrList.push(new Territory(10*5,50*3, [0,2,3,4] ));
    //2
    terrList.push(new Territory(50*5,50*3, [1,4] ));
    //3
    terrList.push(new Territory(10*5,80*3, [1] ));
    //4
    terrList.push(new Territory(50*5,80*3, [1,2,5] ));
    //5
    terrList.push(new Territory(90*5,100*3, [0,4,8,11,14] ));
    //6
    terrList.push(new Territory(130*5,50*3, [8,9] ));
    //7
    terrList.push(new Territory(160*5,50*3, [9] ));
    //8
    terrList.push(new Territory(130*5,90*3, [5,6,9] ));
    //9
    terrList.push(new Territory(160*5,90*3, [6,7,8,14] ));
    //10
    terrList.push(new Territory(60*5,130*3, [11,12] ));
    //11
    terrList.push(new Territory(90*5,120*3, [5,10,12] ));
    //12
    terrList.push(new Territory(80*5,170*3, [10,11,13] ));
    //13
    terrList.push(new Territory(80*5,210*3, [12] ));
    //14
    terrList.push(new Territory(150*5,130*3, [5,9] ));
	
	return terrList
}

