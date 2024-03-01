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

function drawMountain(){
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
  	
  	// decrease height by 2
  	pts = points.map((p)=>{return [p[0],p[1]==0?0:p[1]/1.5]});
  
	return drawPolygon(pts,"white");
}
