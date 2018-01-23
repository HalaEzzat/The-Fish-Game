var width="990px";
var height="550px";
//player original position
var curX;
var curY;
//player updated position
var newX;
var newY;
//monsters updated positons
var mon1_curX,mon1_curY;
var mon2_curX,mon2_curY;
var mon3_curX,mon3_curY;
//array of monsters for different levels
var monster=["img/fish.gif","img/fish2flipped.gif","img/wheal.gif"];
var monster2=["img/shark.gif","img/shark2.gif"];
//array of food 
var food=["img/smallFishLeft.gif","img/horse.gif"];
var food2=["img/horseRight.gif","img/small fish.gif"];
//food updated positions
var f1_curX,f1_curY;
var f2_curX,f2_curY;
var f3_curX,f3_curY;
//variables to hold the monesters img tags
var mon1,mon2,mon3;
//variables to hold the food tags
var f1,f2,f3;
//variable to hold the player tag
var img;
//variable to hold the score of the player
var score=0;
//variable to hold the setInterval object that contributes in moving the objects
var game;
//flag to indicate if player lost the game 
var GameOver=false;
//variable to hold the table tag that displayes the score part on screen
var table=document.getElementById("tbl");
//variable to hold the audio tag that plays the bg music
var music=document.getElementById("music");
//variable that hold the container tag that displays the game
var tag=document.getElementById("container");
//variable to count levels
var level=0;

//function from an online website that returns the x and y of any element
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}
 
//function from an online website that returns the offset left and top of any element
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}


function start()
{
	tag.style["background-image"]="url(\"img/9b.jpg\")";
	level=0;
	score=0;
	GameOver=false;
	//player tag
	tag.innerHTML="<img id='player' src='img/fish3.gif' width='70' height='70'>";
	//===========================================
    img=document.getElementById("player");
	curX=getOffset(img).left-60;
	curY=getOffset(img).top-50;
	newX=curX;
	newY=curY;
	//=============================================
	
	//monsters tags
	tag.innerHTML+="<img id='monster1'  >";
	tag.innerHTML+="<img id='monster2'  >";
	tag.innerHTML+="<img id='monster3'  >";
	//===========================================
	
	//food tags
	tag.innerHTML+="<img id='food1'  >";
	tag.innerHTML+="<img id='food2'  >";
	tag.innerHTML+="<img id='food3'  >";
	//==========================================
	
	
	//monster1
	mon1=document.getElementById("monster1");
	mon1_curX=getOffset(mon1).left;
	mon1_curY=getOffset(mon1).top;
	mon1.src=monster[0];
	mon1.width="70";
	mon1.height="70";
	//============================================
	
	
	
	//monster3
	mon3=document.getElementById("monster3");
	mon3.style["position"]="relative";
	mon3.style['left']=650;
	mon3.style['top']=curY+100;
	mon3_curX=650;
	mon3_curY=curY+100;
	mon3.src=monster2[1];
	mon3.width="100";
	mon3.height="100";
	//============================================
	
	//food1
	f1=document.getElementById("food1");
	f1.style["position"]="relative";
	f1.style['left']=600;
	f1.style['top']=curY+150;
	f1_curX=600;
	f1_curY=curY+150;
	f1.src=food[0];
	f1.width="100";
	f1.height="100";
	//=============================================
	
	
	
	//food2
	f2=document.getElementById("food2");
	f2.style["position"]="relative";
	f2.style['left']=curX;
	f2.style['top']=curY+200;
	f2_curX=curX;
	f2_curY=curY+200;
	f2.src=food2[1];
	f2.width="100";
	f2.height="100";
	//=============================================
	
	//food3
	f3=document.getElementById("food3");
	f3.style["position"]="relative";
	f3.style['left']=curX;
	f3.style['top']=curY+290;
	f3_curX=curX;
	f3_curY=curY+290;
	f3.src=food2[1];
	f3.width="100";
	f3.height="100";
	//==============================================
	
	//monster2
	mon2=document.getElementById("monster2");
	mon2.style["position"]="relative";
	mon2.style['left']=650;
	mon2.style['top']=curY+400;
	mon2_curX=650;
	mon2_curY=curY+400;
	mon2.src=monster2[0];
	mon2.width="100";
	mon2.height="100";
	//============================================
	
	//listen to key presses
	document.addEventListener("keydown",keyPress);
	music.src="BGmusic/music.mp3";
	music.play();
	
	//start the game
	init();
}
function endGame(){
		clearInterval(game);
		tag.innerHTML="<img src='img/GameOver.gif'>";
		table.innerHTML+="<tr><td>to restart press r</td></tr>";
		table.innerHTML+="<tr><td>for instructions press i</td></tr>";
		GameOver=true;
		music.src="BGmusic/gameOver.mp3";
		music.play();	
}

function keyPress(e)
{
		var img=document.getElementById("player");
		var keycode = (e.keyCode ? e.keyCode : e.which);
		
		switch(keycode)
		{
			case 40://down arrow
			if(GameOver==false)
			{
				if(newY>450){newY=curY;}else{newY+=10;}
				img.style["transform-origin"]="50% 50%";
				img.style["animation"]="rotateRight";
				img.style["position"]="relative";
				img.style["top"]=newY;
			}
			break;
			case 38://up arrow
			if(GameOver==false)
			{
				if(newY<=curY){newY=curY;}else{newY-=10;}
				img.style["transform-origin"]="50% 50%";
				img.style["animation"]="rotateRight";
				img.style["position"]="relative";
				img.style["top"]=newY;
			}
			
			break;
			case 39://right arrow
			if(GameOver==false)
			{
				if(newX>890){newX=curX;}else{newX+=10;}
				img.style["transform-origin"]="50% 50%";
				img.style["animation"]="rotateRight";
				img.style["position"]="relative";
				img.style["left"]=newX;
				img.src="img/fish3.gif";
			}
			
			break;
			case 37://left arrow
			if(GameOver==false)
			{
				if(newX<=curX){newX=curX;}else{newX-=10;}
				img.style["transform-origin"]="50% 50%";
				img.style["animation"]="rotateRight";
				img.style["position"]="relative";
				img.style["left"]=newX;
				img.src="img/fesh3left.gif";
			}
			
			break;
			case 69://press e to eat
			if(GameOver==false)
			{
				//---------------------------------------check collision detection between player and food while pressing 'e' ------------------
				if(level==0||level==1||level==2)
				{
					if(getPosition(img).x < getPosition(f1).x + 100 && getPosition(img).x + 70 > getPosition(f1).x && getPosition(img).y <  getPosition(f1).y +100 && 70 + getPosition(img).y >  getPosition(f1).y)
					{
						f1_curX=curX-300;
						score++;
					}
					else if(getPosition(img).x < getPosition(f2).x + 100 && getPosition(img).x + 70 > getPosition(f2).x && getPosition(img).y <  getPosition(f2).y +100 && 70 + getPosition(img).y >  getPosition(f2).y)
					{
						f2_curX=400;
						score++;
					}
					else if(getPosition(img).x < getPosition(f3).x + 100 && getPosition(img).x + 70 > getPosition(f3).x && getPosition(img).y <  getPosition(f3).y +100 && 70 + getPosition(img).y >  getPosition(f3).y)
					{
						f3_curX=300;
						score++;
					}
				}
				 if(level==1 || level==2)
				{
					
					if(getPosition(img).x<getPosition(mon1).x+70 && getPosition(img).x + 70 > getPosition(mon1).x && getPosition(img).y <  getPosition(mon1).y +70 &&70+getPosition(img).y >  getPosition(mon1).y)
					{
						mon1_curX=curX;
						score++;
					}
				
				}
				 if(level==2)
				{
					
					if(getPosition(img).x < getPosition(mon2).x + 100 && getPosition(img).x + 70 > getPosition(mon2).x && getPosition(img).y <  getPosition(mon2).y +100 && 70 + getPosition(img).y >  getPosition(mon2).y)
					{
						mon2_curX=curX;
						score++;
					}
					else if(getPosition(img).x<getPosition(mon3).x+100 && getPosition(img).x + 70 > getPosition(mon3).x && getPosition(img).y <  getPosition(mon3).y +100 &&70+getPosition(img).y >  getPosition(mon3).y)
					{
						mon3_curX=curX;
						score++;
					}	
				}
			}
			
			break;
			case 82:// press r to restart
            if(GameOver==true){
				start();
				
			}
			 
			break;
			case 73:// press i for instructions
			if(GameOver==false){
				GameOver=true;
				clearInterval(game);
				music.pause();
			}
			instruct();
			 
			break;
		}
		if(GameOver==false)
		{
			//----------------------------check the collision detection between player and monsters at each level---------------------------------------
			if(level==0)
			{
				if(getPosition(img).x<getPosition(mon1).x+70 && getPosition(img).x + 70 > getPosition(mon1).x && getPosition(img).y <  getPosition(mon1).y +70 &&70+getPosition(img).y >  getPosition(mon1).y)
				{
					endGame();
				}
				else if(getPosition(img).x < getPosition(mon2).x + 100 && getPosition(img).x + 70 > getPosition(mon2).x && getPosition(img).y <  getPosition(mon2).y +100 && 70 + getPosition(img).y >  getPosition(mon2).y)
				{
					endGame();
				}
				else if(getPosition(img).x<getPosition(mon3).x+100 && getPosition(img).x + 70 > getPosition(mon3).x && getPosition(img).y <  getPosition(mon3).y +100 &&70+getPosition(img).y >  getPosition(mon3).y)
				{
					endGame();
				}
			} 
			if(level==1)
			{
				if(getPosition(img).x < getPosition(mon2).x + 100 && getPosition(img).x + 70 > getPosition(mon2).x && getPosition(img).y <  getPosition(mon2).y +100 && 70 + getPosition(img).y >  getPosition(mon2).y)
				{
					endGame();
				}
				else if(getPosition(img).x<getPosition(mon3).x+100 && getPosition(img).x + 70 > getPosition(mon3).x && getPosition(img).y <  getPosition(mon3).y +100 &&70+getPosition(img).y >  getPosition(mon3).y)
				{
					endGame();
				}
			}
		}
}

function createFishes()
{
	//---------------display the score part------------
	if(GameOver==false){
		var str="your score: "+score;
			table.innerHTML="<tr><td>"+str+"</td></tr>";
			table.innerHTML+="<tr><td>your level: "+level+"</td></tr>";
	}
	
	//=================================================
	//---------------move monester 1------------------
    
	if(mon1_curX>=800){
		var rand=Math.floor(Math.random() * 3) + 0 ;
		mon1.src=monster[rand];
		mon1_curX=curX;
	}else{
		mon1_curX+=10;
	}
	mon1.style["position"]="relative";
	mon1.style["left"]=mon1_curX;
	
	//=================================================
	//---------------move monester 2------------------
	if(mon2_curX<=curX){
		var rand=Math.floor(Math.random() * 2) + 0 ;
		mon2.src=monster2[rand];
		mon2_curX=650;
	}else{
		mon2_curX-=10;
	}
	mon2.style["position"]="relative";
	mon2.style["left"]=mon2_curX;
	//====================================================
	//---------------move monester 3------------------
	if(mon3_curY>=400||mon3_curX<=curX){
		var rand=Math.floor(Math.random() * 2) + 0 ;
		mon3.src=monster2[rand];
		mon3_curX=650
	}else{
		mon3_curX-=10
	}
	mon3.style["position"]="relative";
	mon3.style["left"]=mon3_curX;
	//====================================================
	//---------------move food 1------------------
    if(f1_curX<=(curX-200)){
		var rand=Math.floor(Math.random() * 2) + 0 ;
		f1.src=food[rand];
		f1_curX=500;
	}else{
		f1_curX-=10;
	}
	f1.style["position"]="relative";
	f1.style["left"]=f1_curX;
	//==================================================
    //---------------move food 2------------------
	if(f2_curX>=400){
		var rand=Math.floor(Math.random() * 2) + 0 ;
		f2.src=food2[rand];
		f2_curX=curX-400;
	}else{
		f2_curX+=10;
	}
	f2.style["position"]="relative";
	f2.style["left"]=f2_curX;
	//=================================================
	//---------------move food 3------------------
	if(f3_curX>=300){
		var rand=Math.floor(Math.random() * 2) + 0 ;
		f3.src=food2[rand];
		rand=Math.floor(Math.random() * 400) + curY ;
		f3_curX=curX-500;
		
	}else{
		f3_curX+=10;
	}
	f3.style["position"]="relative";
	f3.style["left"]=f3_curX;
	//==================================================
	//---------------control levels------------------
	//if player scored 20 points set his/her level to 1
	if(score==20){
		level=1;
	}
	//if player scored 40 points set his/her level to 2
	if(score==40){
		level=2;
	}
	//if player scored 100 points and he/she is in level 2 ,he/she pass the game
	if(level==2&&score==100){
		table.innerHTML+="<tr><td>wohoo! you did it!!</td></tr>";
		tag.innerHTML="<button class=\"button1\" onclick=\"start()\">Start game</button> ";
		tag.innerHTML+=" <button  onclick=\"instruct()\">instructions</button>";
		GameOver=true;
		music.src="BGmusic/tadtada.mp3";
		music.play();
		clearInterval(game);
	}
	//if the game bg music ended replay it,if game is still going on
	if(GameOver==false&&music.paused==true){
		music.play();
	}
	
}

function init()
{
	//call function createfishes every 100 millisecond to move objects 
	game=setInterval(createFishes,100);
}

function instruct(){
	//---------display the instruction part----------
	tag.style["background-image"]="url(\"img/bg.jpg\")";
	tag.innerHTML="<center><p><h1>The Fish Game: </h1></p></center><p>&nbsp;&nbsp;your score and your level appears on the box on the left<br>&nbsp;&nbsp;you gain points by eating fishs but be carful of the fishs you can't eat at each level because they can eat you</p><p>&nbsp;The game consists of 3 levels:</p><p>&nbsp;LEVEL 0:</br>&nbsp;&nbsp; you can eat these fishs :<img src='img/smallFishLeft.gif' width='50' height='50' /> And <img src='img/horse.gif' width='50' height='50' /></p>";
	tag.innerHTML+="<p>&nbsp;LEVEL 1:</br>&nbsp;if you eat 20 fishes of level 0 your level will increase to 1 enabling you to eat these fishs too:<img src='img/fish.gif' width='50' height='50' />And<img src='img/fish2flipped.gif' width='50' height='50' />And<img src='img/wheal.gif' width='50' height='50' /></p>";
	tag.innerHTML+="<p>&nbsp;LEVEL 2:</br>&nbsp;if you eat 20 more fishes of level 1 or 0 or both your level will increase to 2 enabling you to eat these fishs too:<img src='img/shark.gif' width='50' height='50' />And<img src='img/shark2.gif' width='50' height='50' /></p>";
	tag.innerHTML+="<p>&nbsp;&nbsp;you win when you achieve score of 100 points";
	tag.innerHTML+="<p>&nbsp;&nbsp;you can move using the arrow keys and eat by pressing on 'e' while standing by or on the fish</p>";
	tag.innerHTML+="<p>&nbsp;&nbsp;you can order the instructions page any time by pressing 'i' but it will end your game if you're playing<button  class='btn2' onclick=\"start()\">Start game</button></p>";
}