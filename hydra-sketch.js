await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-screen.js")
await loadScript("https://cdn.statically.io/gh/bogol243/hydra-utility/main/sobel.js");
await loadScript("//cdnjs.cloudflare.com/ajax/libs/ramda/0.29.1/ramda.min.js");
//await loadScript("https://cdn.statically.io/gh/bogol243/hydra-utility/main/drawing.js");

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

function scale_modulator(x_scale,y_scale,x_offset=0,y_offset=0)
{
  if(x_offset!=0)
  	x_offset = x_offset*800;
  if(y_offset!=0)
  	y_offset = y_offset*800;
  return (p)=> {return [(p[0]*x_scale)+x_offset,(p[1]*y_scale)+y_offset]};
}

function rythm_modulator()
{
  return (p)=>{return [p[0],p[1]<400? p[1]+mod_val:p[1]]}
}

f1 = scale_modulator(0.8,0.5,0.10,0.1);
f2 = rythm_modulator();
modulator = R.compose(f1,f2);

bpm = 120
s0.init(drawMountain(scale_modulator(0.8,0.5,0.10,0.1))); // init source with canvas

mr = () => {return Math.random()/10};

//ararat_mask = src(s0).modulateScrollY(osc([mr(),mr(),mr()]).scale(0.4).repeat(25),0.05);
ararat_mask = src(s0)
  .modulateScrollX(osc(()=>Math.random()),0.005)
  .modulateScrollY(noise([4,3].smooth(),0.5).thresh(0.2,0.1).pixelate(8,1).repeat(4),0.01);

upper_part=shape(4,1).scale(1,1,0.5,0.5,0);
lower_mask=shape(4,1).scale(1,1,0.73,0.5,1.02);


// white mountain with moving polygons
ararat = voronoi(12,0.9,0.4) // moving polygons
  			.thresh(0.2,0.9) // 
  			.add(solid(0.1,0.1,0.1)) // not too dark
  			.mask(ararat_mask); // shape moving polygons with the shape of mountain
			
ararat_colored = solid(0.1,0.8,0.8,1).mask(ararat); // add color
ararat_colored.out(o0);

src(o0).sobel().out(o1);
src(o0).add(src(o1)).out(o2);
upper = src(o2);

masking_gradient = gradient(0).g().scale(0.7,1,0.4).scrollY(0.02).scale(1.5);
moving_grid = shape(4,0.9).repeat(12,12).scale(1,1,0.7).invert().color(1,0,1).scrollY(1,-0.3)
  .modulateScale(gradient().g()).scale(0.3);

moving_grid.mask(masking_gradient).mask(lower_mask).add(upper).out(o3)

//masking_gradient.add(upper).out(o3);
render(o3);
