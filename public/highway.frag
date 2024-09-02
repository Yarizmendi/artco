precision mediump float;

uniform float u_time;
uniform float u_waves;
uniform float u_zoom;
uniform float u_scale_x;
uniform float u_scale_y;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

float time = u_waves + u_time;
vec4 color;

mat2 scale(vec2 _scale) {
  return mat2( _scale.x, 0.0, 0.0, _scale.y );
}

vec2 rollingWaves( vec2 pos ) {
  return scale( ( vec2 ( cos( time / u_zoom )))) * pos;
}

vec2 increasingWaves( vec2 pos ) {
  pos.y -= sin( pos.y * u_waves + time ) / ( u_waves + time );
  return pos;
}

void main () {
  vec2 pos = vTexCoord;

  color = texture2D( u_texture, pos );

  if ( color.b > .5 ) {
    pos = increasingWaves( pos );
    pos = rollingWaves( pos );
  } 

  color = texture2D( u_texture, pos );
  gl_FragColor = vec4( color );

}
