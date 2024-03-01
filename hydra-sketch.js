await loadScript("https://cdn.statically.io/gl/metagrowing/extra-shaders-for-hydra/main/lib/lib-screen.js")
await loadScript("https://cdn.statically.io/gh/bogol243/hydra-utility/main/sobel.js");
await loadScript("https://cdn.statically.io/gh/bogol243/hydra-utility/main/drawing.js");


s0.init(drawMountain()); // init source with canvas
ararat_mask = src(s0); // white static mask shape

// white mountain with moving polygons
ararat = voronoi(8,0.5,0) // moving polygons
  			.thresh(0.2,0.9) // 
  			.add(solid(0.1,0.1,0.1)) // not too dark
  			.mask(ararat_mask); // shape moving polygons with the shape of mountain
			
ararat_colored = solid(0.1,0.8,0.8,1).mask(ararat); // add color
ararat_colored.out(o0);

src(o0).sobel().out(o1);
src(o1).dilate().thresh(0.07,0.01).out(o2)

src(o0).add(src(o2)).out(o3);

render(o3);
