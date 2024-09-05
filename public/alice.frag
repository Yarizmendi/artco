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

mat2 scale(vec2 _scale) {
  return mat2( _scale.x, 0.0, 0.1, _scale.y );
}

vec2 rollingWaves( vec2 pos ) {
  return scale( abs( vec2 ( cos( u_time / u_zoom )))) * pos;
}

vec2 increasingWaves( vec2 pos ) {
  pos.y += cos( pos.y * u_waves + u_time ) / ( pos.x- u_waves - u_time );
  return pos;
}

void main () {
  vec2 pos = vTexCoord;
  pos.y *= ( .91 );

  color = texture2D( u_texture, pos );


  if ( color.r > .66 || color.b > .66 || color.g > .66) {
   pos.y += cos( pos.y * u_waves / 2.0 + time ) / ( u_waves/ 3.0  + time );
      pos = rollingWaves( pos );
  } 
  
  else {
    pos.x += cos( pos.x * u_waves + time ) / ( u_waves - time );

  }


  color = texture2D( u_texture, pos );

  gl_FragColor = vec4( color );

}
