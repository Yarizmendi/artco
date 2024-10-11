precision mediump float;

uniform float u_time;
uniform sampler2D u_texture;
uniform float u_waves;

varying vec2 vTexCoord;

void main () {
  vec2 pos = vTexCoord;
  

  
  vec4 originalColor = texture2D( u_texture, pos);


  if ( originalColor.r > .4 ) {
    // originalColor.r -= threshold;
    // originalColor.g += threshold;
    // originalColor.r -= sin(threshold + u_time);
    pos.x += sin( pos.x * u_waves + u_time ) / ( 30.0 - u_waves + u_time );
    pos.y += cos( pos.x * u_waves + u_time ) / ( 30.0 - u_waves + u_time );
    pos = fract(pos);
  }


  vec4 modifiedColor = texture2D( u_texture, pos);

  // pos.xy = pos.xy * 1.0;

  // originalColor = texture2D( u_texture, pos );
  // modifiedColor = texture2D( u_texture, pos );

  vec4 colorMix = mix( originalColor, modifiedColor, .6 );
  

  gl_FragColor = vec4( colorMix ) ;
}