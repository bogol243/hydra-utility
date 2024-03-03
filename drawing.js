function drawPolygon(points,fillStyle)
{
  canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 800;
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
	ctx.fillStyle=fillStyle;
    ctx.beginPath();
    points.forEach((point)=>{
    	ctx.lineTo(point[0],point[1]);
    });
    
    ctx.fill();
  }
  return {src:canvas};
}

// point -- array of 2 numbers
// point_modulator -- function point -> point  
function drawMountain(point_modulator=null){
    points = [
      [0, 400], //left
      [50, 310],
      [100, 150], // mid-low
      [110, 160],[150, 290],
      [220, 320], //saddle point
      [300, 270], [450,100],
      [480, 0], // mid-hight
      [550, 30], [600, 100], [720, 200],
      [800, 400]]; //right
  	
  	// modulate
    if(point_modulator!=null)
  		points = points.map(point_modulator);
  
	return drawPolygon(points,"white");
}

function scale_modulator(x_scale,y_scale)
{
  return (p)=> {return [p[0]*x_scale,p[1]*y_scale]};
}
