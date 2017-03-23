//封装格子数据
var cells=[
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
		  ]
//初始化分数
var score=0;
var fscore=0;
//获取id
function $(id){return document.getElementById(id)}
//初始化窗口
window.onload=function(){
	$("gameover").style.display="none";
	StarAction();
}
//初始化游戏
function StarAction(){
	score=0;
	fscore=0;
	$("gameover").style.display="none";
	for(var row=0;row<4;row++){
		for(var col=0;col<4;col++){
			cells[row][col]=0;
		}
	}
	RandomNum();
	RandomNum();
	UpdateView();
}
//在空位置随机产生2或4
function RandomNum(){
	if(full()){return}
	while(true){
		var row=parseInt(Math.random()*4);
		var col=parseInt(Math.random()*4);
		if(cells[row][col]==0){
			cells[row][col]=Math.random()<0.9?2:4;
			break;
		}
	}
}
//判空
function full(){
	for(var row=0;row<4;row++){
		for(var col=0;col<4;col++){
			if(cells[row][col]==0){return false}
		}
	}
	return true;
}
//更新视图
function UpdateView(){
	for(var row=0;row<4;row++){
		for(var col=0;col<4;col++){
			var cell=$("cell"+row+col);
			var n=cells[row][col];
			cell.innerHTML="";
			cell.className="cell";
			if(n>0){
				cell.className="cell num"+n;
				cell.innerHTML=n;
			}
		}
	}
	$("score").innerHTML=score;
	$("fscore").innerHTML=score;
}
//判断游戏是否结束
function GameOver(){
	if(!full()){return false}
	if(full()==true){
		if(CanMoveUp() || CanMoveDown() || CanMoveLeft() || CanMoveRight()){
			return false;
		}
		$("gameover").style.display="block";
	}
	return true;
}

/*上下左右移动
 *判断游戏是否结束
 *能否移动
 *进行合并
 */
/**************上移*****************************************/
function UpAction(){
	if(GameOver()){return}
	if(CanMoveUp()==false){return}
	for(var col=0;col<4;col++){MoveUp(col)}
	RandomNum();
	UpdateView();
}
//能否移动
function CanMoveUp(){
	for(var col=0;col<4;col++){
		for(var row=1;row<4;row++){
			if(cells[row][col]!=0 && cells[row-1][col]==0){return true}
			if(cells[row][col]!=0 && cells[row][col]==cells[row-1][col]){return true}
		}
	}
	return false;
}
//进行合并
function MoveUp(col){
	for(var row=0;row<4;){
		var current=cells[row][col];
		var nextRow=getRowIncol(row+1,col,1);
		if(nextRow==-1){return}
		var next=cells[nextRow][col];
		if(current==0){
			cells[row][col]=next;
			cells[nextRow][col]=0;
		}else if(current==next){
			cells[row][col]=current+next;
			cells[nextRow][col]=0;
			score+=cells[row][col];
			row++;
		}else{row++}
	}
}
//寻找下个非0数字位置的行下标,找不到就返回-1
function getRowIncol(row,col,step){
	while(true){
		if(row<0 || row>=4){return -1}
		if(cells[row][col]!=0){return row}
		row+=step;
	}
}
/******************下移**************************************/
function DownAction(){
	if(GameOver()){return}
	if(CanMoveDown()==false){return}
	for(var col=0;col<4;col++){MoveDown(col)}
	RandomNum();
	UpdateView();
}
//能否下移
function CanMoveDown(){
	for(var col=0;col<4;col++){
		for(var row=3;row>0;row--){
			if(cells[row-1][col]!=0 && cells[row][col]==0){return true}
			if(cells[row-1][col]!=0 && cells[row][col]==cells[row-1][col]){return true}
		}
	}
	return false;
}
//下移合并
function MoveDown(col){
	for(var row=3;row>=0;){
		var current=cells[row][col];
		var nextRow=getRowIncol(row-1,col,-1);
		if(nextRow==-1){return}
		var next=cells[nextRow][col];
		if(current==0){
			cells[row][col]=next;
			cells[nextRow][col]=0;
		}else if(current==next){
			cells[row][col]=current+next;
			cells[nextRow][col]=0;
			score+=cells[row][col];
			row--;
		}else{row--}
	}
}
/********************左移动*******************************/
function LeftAction(){
	if(GameOver()){return}
	if(CanMoveLeft()==false){return}
	for(var row=0;row<4;row++){MoveLeft(row)}
	RandomNum();
	UpdateView();
}
//判断能否左移
function CanMoveLeft(){
	for(var row=0;row<4;row++){
		for(var col=0;col<3;col++){
			if(cells[row][col+1]!=0 && cells[row][col]==0){return true}
			if(cells[row][col+1]!=0 &&cells[row][col]==cells[row][col+1]){return true}
		}
	}
	return false;
}
//左合并
function MoveLeft(row){
	for(var col=0;col<4;){
		var current=cells[row][col];
		var nextCol=getColInRow(row,col+1,1);
		if(nextCol==-1){return}
		var next=cells[row][nextCol];
		if(current==0){
			cells[row][col]=next;
			cells[row][nextCol]=0;
		}else if(current==next){
			cells[row][col]=next+current;
			cells[row][nextCol]=0;
			score+=cells[row][col];
			col++;
		}else{col++}
	}
}
//寻找下个非0数字位置的列下标,找不到就返回-1
function getColInRow(row,col,step){
	while(true){
		if(col<0 || col>=4){return -1}
		if(cells[row][col]!=0){return col}
		col+=step;
	}
}
/********************右移动*******************************/
function RightAction(){
	if(GameOver()){return}
	if(CanMoveRight()==false){return}
	for(var row=0;row<4;row++){MoveRight(row)}
	RandomNum();
	UpdateView();
}
//判断能否右合并
function CanMoveRight(){
	for(var row=0;row<4;row++){
		for(var col=3;col>0;col--){
			if(cells[row][col-1]!=0 && cells[row][col]==0){return true}
			if(cells[row][col-1]!=0 &&cells[row][col]==cells[row][col-1]){return true}
		}
	}
	return false;
}
//右合并
function MoveRight(row){
	for(var col=3;col>0;){
		var current=cells[row][col];
		var nextCol=getColInRow(row,col-1,-1);
		if(nextCol==-1){return}
		var next=cells[row][nextCol];
		if(current==0){
			cells[row][col]=next;
			cells[row][nextCol]=0;
		}else if(current==next){
			cells[row][col]=next+current;
			cells[row][nextCol]=0;
			score+=cells[row][col];
			col--;
		}else{col--}
	}
}
//键盘响应
document.onkeydown=function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if(e && e.keyCode==37){ 
                LeftAction();
              }
            if(e && e.keyCode==38){ 
                 UpAction();
               }            
             if(e && e.keyCode==39){ 
                 RightAction();
            }

            if(e && e.keyCode==40){ 
                 DownAction();
            }
        }
