precision mediump float;

uniform float u_time;
uniform float u_waves;
uniform float u_zoom;
uniform float u_scale_x;
uniform float u_scale_y;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

vec4 color = texture2D( u_texture, pos );

void main () {
  vec2 pos = vTexCoord;

  if ( color.r > .3 ) {
    pos.y += cos( pos.y * (u_waves/2.) + u_time ) / ( 30.0 - (u_waves/2.) + u_time );
  } 


  color = texture2D( u_texture, pos );

  gl_FragColor = vec4( color );

}
