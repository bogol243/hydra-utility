// The original code was written by Thomas Jourdan (https://gitlab.com/metagrowing)
// He wrote independent sobel filters along x and y axis

setFunction({
  name: 'sobel',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor;
   // dFdx
  	outputColor  = -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb;
	outputColor += -2.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb;
	outputColor += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  1))/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -1))/resolution.xy).rgb;
	outputColor +=  2.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb;
    // dFdy
  outputColor  += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb;
	outputColor +=  0.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  1))/resolution.xy).rgb;
	outputColor += -2.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb;
	outputColor += 0.0 *      texture2D(tex0, (gl_FragCoord.xy)/resolution.xy).rgb;
	outputColor +=  2.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb;
	outputColor += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -1))/resolution.xy).rgb;
	outputColor +=  0.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb;
  return vec4(abs(outputColor), _c0.a); // also I've added abs over the outputColor to prevent derivative going negative
`})
