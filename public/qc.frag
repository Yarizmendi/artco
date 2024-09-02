precision mediump float;

uniform float u_time;
uniform float u_waves;
uniform float u_zoom;
uniform float u_scale_x;
uniform float u_scale_y;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

float time = u_time + 20.0;
vec4 color;

void main () {
  vec2 pos = vTexCoord;
  pos.y *= ( .99);

  color = texture2D( u_texture, pos );

  if ( color.r < .33 ) {
   pos.y += cos( pos.y * u_waves + time ) / ( u_waves - time );
  } 
  
  else {
    pos.x += cos( pos.y * u_waves + time ) / ( u_waves - time );
  }


  color = texture2D( u_texture, pos );

  gl_FragColor = vec4( color );

}
