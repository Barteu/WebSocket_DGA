const r = 20;

var positions = [
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
  [1*2.5*r,  2*2.5*r],
  //blue 2
];


const margin_left = 240;
const margin_top = 50

function drawCircle(x, y, ctx, strokeColor = ""){
   		ctx.beginPath();
    	ctx.arc(x,y,r,0,2*Math.PI);
        ctx.lineWidth = 2;
        if (strokeColor != ""){
        ctx.strokeStyle = strokeColor;
        }
    	ctx.stroke();
}

function drawFilledCircle(x, y, ctx, color){
   		ctx.beginPath();
    	ctx.arc(x,y,r,0,2*Math.PI);
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



