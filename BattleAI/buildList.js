function buildList(){
	var terrList = [];
    //0
    terrList.push(new Territory(45*6,10*3, [1,5] ));
    //1
    terrList.push(new Territory(10*6,50*3, [0,2,3,4] ));
    //2
    terrList.push(new Territory(45*6,50*3, [1,4] ));
    //3
    terrList.push(new Territory(10*6,105*3, [1] ));
    //4
    terrList.push(new Territory(50*6,90*3, [1,2,5] ));
    //5
    terrList.push(new Territory(90*6,75*3, [0,4,8,11,14] ));
    //6
    terrList.push(new Territory(125*6,25*3, [8,9] ));
    //7
    terrList.push(new Territory(160*6,45*3, [9] ));
    //8
    terrList.push(new Territory(120*6,70*3, [5,6,9] ));
    //9
    terrList.push(new Territory(160*6,90*3, [6,7,8,14] ));
    //10
    terrList.push(new Territory(60*6,130*3, [11,12] ));
    //11
    terrList.push(new Territory(90*6,120*3, [5,10,12] ));
    //12
    terrList.push(new Territory(80*6,170*3, [10,11,13] ));
    //13
    terrList.push(new Territory(80*6,210*3, [12] ));
    //14
    terrList.push(new Territory(150*6,130*3, [5,9] ));
	
	return terrList
}

