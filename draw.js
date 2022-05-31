const r = 20;

const positions = [
  //left col
  [0, 9*2.5*r],
  [0, 8*2.5*r],
  [0, 7*2.5*r],
  [0, 6*2.5*r],
  [0, 5*2.5*r],
  [0, 4*2.5*r],
  [0, 3*2.5*r],
  [0, 2*2.5*r],
  [0, 1*2.5*r],
  [0, 0],
  
  [1*2.5*r, 0],
  
  //right col
  [2*2.5*r, 0],
  [2*2.5*r, 1*2.5*r],
  [2*2.5*r, 2*2.5*r],
  [2*2.5*r, 3*2.5*r],
  [2*2.5*r, 4*2.5*r],
  [2*2.5*r, 5*2.5*r],
  [2*2.5*r, 6*2.5*r],
  [2*2.5*r, 7*2.5*r],
  [2*2.5*r, 8*2.5*r],
  [2*2.5*r, 9*2.5*r],
  
  [1*2.5*r, 9*2.5*r],
  
  //red 1
  [1*2.5*r, 8*2.5*r],
  //red 2
  [1*2.5*r, 7*2.5*r],
  
  //blue 1
  [1*2.5*r,  1*2.5*r],
  [1*2.5*r,  2*2.5*r]
  //blue 2
];


const margin_left = 240;
const margin_top = 100

function drawCircle(x, y, ctx, strokeColor = ""){
   		ctx.beginPath();
    	ctx.arc(x,y,r,0,2*Math.PI);
        ctx.lineWidth = 2;
        if (strokeColor != ""){
        ctx.strokeStyle = strokeColor;
        }
    	ctx.stroke();
}

function drawFilledCircle(x, y, ctx, color, r_percent = 1.0){
   		ctx.beginPath();
        ctx.lineWidth = 2;
    	ctx.arc(x,y,r*r_percent,0,2*Math.PI);
        ctx.fillStyle = color;
      	ctx.fill();
}


export function drawBoard(){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

    ctx.fillStyle = "#ebd234";
	ctx.fillRect(0, 0, c.width, c.height);
    
    
    drawFilledCircle(margin_left+positions[0][0],margin_top+positions[0][1], ctx, "#f2937c")
    drawFilledCircle(margin_left+positions[11][0],margin_top+positions[11][1], ctx, "#84a0f5")
    
    for(let i = 0; i < positions.length-4; i++){
     	drawCircle(margin_left+positions[i][0],margin_top+positions[i][1], ctx);    
    }
    
    drawFilledCircle(margin_left+positions[22][0],margin_top+positions[22][1], ctx, "#f2937c")
    drawFilledCircle(margin_left+positions[23][0],margin_top+positions[23][1], ctx, "#f2937c")
    
    drawFilledCircle(margin_left+positions[24][0],margin_top+positions[24][1], ctx, "#84a0f5")
    drawFilledCircle(margin_left+positions[25][0],margin_top+positions[25][1], ctx, "#84a0f5")
}


function drawPawn(x, y, ctx, color = "", text = ""){
    ctx.lineWidth = 2;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r-4,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.font = "25px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.fillText(text, x-8 ,y+8);
}


function drawPawns(game){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

    drawPawn(margin_left+positions[game.p1pawn1pos][0], margin_top+positions[game.p1pawn1pos][1], ctx, "#ed2213", "1");
    drawPawn(margin_left+positions[game.p1pawn2pos][0], margin_top+positions[game.p1pawn2pos][1], ctx, "#ed2213", "2");
    drawPawn(margin_left+positions[game.p2pawn1pos][0], margin_top+positions[game.p2pawn1pos][1], ctx, "#0933ed", "1");
    drawPawn(margin_left+positions[game.p2pawn2pos][0], margin_top+positions[game.p2pawn2pos][1], ctx, "#0933ed", "2");

}


function drawDice(ctx, result, diceX, diceY){
    
    switch (result){
        case 0:
            ctx.font = "80px Comic Sans MS";
            ctx.fillStyle = "black";
            ctx.fillText("?", diceX+35, diceY+75);
            break;
        case 1:
            drawFilledCircle(diceX+50, diceY+50, ctx, "black", 0.65);
            break;
        case 2:
            drawFilledCircle(diceX+50, diceY+30, ctx, "black", 0.65);
            drawFilledCircle(diceX+50, diceY+70, ctx, "black", 0.65);
            break;
        case 3:
            drawFilledCircle(diceX+50, diceY+20, ctx, "black", 0.65);
            drawFilledCircle(diceX+50, diceY+50, ctx, "black", 0.65);
            drawFilledCircle(diceX+50, diceY+80, ctx, "black", 0.65);
            break;
        case 4:
            drawFilledCircle(diceX+25, diceY+25, ctx, "black", 0.65);
            drawFilledCircle(diceX+25, diceY+75, ctx, "black", 0.65);
            drawFilledCircle(diceX+75, diceY+25, ctx, "black", 0.65);
            drawFilledCircle(diceX+75, diceY+75, ctx, "black", 0.65);
            break; 
        case 5:     
            drawFilledCircle(diceX+25, diceY+25, ctx, "black", 0.65);
            drawFilledCircle(diceX+25, diceY+75, ctx, "black", 0.65);
            drawFilledCircle(diceX+75, diceY+25, ctx, "black", 0.65);
            drawFilledCircle(diceX+75, diceY+75, ctx, "black", 0.65);
            drawFilledCircle(diceX+50, diceY+50, ctx, "black", 0.65);
            break; 
        case 6:
            drawFilledCircle(diceX+25, diceY+20, ctx, "black", 0.65);
            drawFilledCircle(diceX+25, diceY+80, ctx, "black", 0.65);
            drawFilledCircle(diceX+75, diceY+20, ctx, "black", 0.65);
            drawFilledCircle(diceX+75, diceY+80, ctx, "black", 0.65);
            drawFilledCircle(diceX+25, diceY+50, ctx, "black", 0.65);
            drawFilledCircle(diceX+75, diceY+50, ctx, "black", 0.65);
            break; 
    }

  
}

function drawDices(playerNumber, diceResult = 0, enemyDiceResult = 0){


    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
 
    const dice1x = margin_left+positions[3][0]-170;
    const dice1y = margin_top+positions[3][1];


    ctx.fillStyle = "#f2937c";
    ctx.fillRect(dice1x, dice1y , 100, 100);
    ctx.rect(dice1x ,dice1y, 100, 100);
    ctx.strokeStyle = "black";
    ctx.stroke();

    const dice2x = margin_left+positions[12][0]+70;
    const dice2y = margin_top+positions[12][1];

    ctx.fillStyle = "#84a0f5";
    ctx.fillRect(dice2x, dice2y , 100, 100);
    ctx.rect(dice2x ,dice2y, 100, 100);

    ctx.strokeStyle = "black";
    ctx.stroke();


    if (playerNumber==1){
        const p1dice = diceResult;
        const p2dice = enemyDiceResult;
        drawDice(ctx, p1dice , dice1x, dice1y);
        drawDice(ctx, p2dice , dice2x, dice2y);
    }
    else if (playerNumber==2){
        const p1dice = enemyDiceResult;
        const p2dice = diceResult;
        drawDice(ctx, p1dice , dice1x, dice1y);
        drawDice(ctx, p2dice , dice2x, dice2y);
    }
    else{
        drawDice(ctx, 0 , dice1x, dice1y);
        drawDice(ctx, 0 , dice2x, dice2y);
    }
 




}

function drawHeader(playerNumber, isMyTurn){
    var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
    
    
    ctx.font = "25px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.fillText("My color:", 10 ,30);


    if (playerNumber == 1){
        ctx.fillStyle = "#ed2213";
        ctx.fillText("RED", 120 ,30);
    }
    else { //if (playerNumber == 2)
        ctx.fillStyle = "#0933ed";
        ctx.fillText("BLUE", 130, 30);
    }

    ctx.font = "25px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.fillText("Current turn:", 250 ,30);
    
    if ((playerNumber == 1 && isMyTurn)||(playerNumber==2 && !isMyTurn)){
        ctx.fillStyle = "#ed2213";
        ctx.fillText("RED", 410 ,30);
    }
    else {
        ctx.fillStyle = "#0933ed";
        ctx.fillText("BLUE", 410, 30);
    }

}


function drawWaitForJoin(){
    var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
    
    ctx.font = "25px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.fillText("Waiting for opponent...", 10 ,30);
}

export function drawAll(game){

    drawBoard();
    drawPawns(game);
    drawDices(game.playerNumber, game.diceResult, game.enemyDiceResult);
    if(game.gameID > -1){//TODO
        drawHeader(game.playerNumber, game.isMyTurn);
    }else{
        drawWaitForJoin();
    }
}

export function drawWinner(winner){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    ctx.font = "50px Comic Sans MS";


    if(winner==1){
        ctx.fillStyle = "#ed2213";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = "white";
        ctx.fillText("RED player won", 100 ,300);
    }else{
        ctx.fillStyle = "#0933ed";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = "white";
        ctx.fillText("BLUE player won", 100 ,300);
    }
}
