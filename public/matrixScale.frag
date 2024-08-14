precision mediump float;

uniform float u_time;
uniform float u_waves;
uniform float u_zoom;
uniform float u_scale_x;
uniform float u_scale_y;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

float time;
vec4 color;

mat2 scale(vec2 _scale) {
  return mat2( _scale.x, u_scale_x, _scale.y, u_scale_y );
}

vec2 rollingWaves( vec2 pos ) {
  return scale(( vec2 (( u_time / (u_time + u_zoom ))))) * pos;
}

vec2 increasingWaves( vec2 pos ) {
  pos.y += cos( pos.y * u_waves ) / ( u_waves * u_time );
  return pos;
}

void main () {
  vec2 pos = vTexCoord;

  pos = increasingWaves( pos );
  pos = rollingWaves( pos );
  pos = fract(pos);

  color = texture2D( u_texture, pos );
  gl_FragColor = vec4( color );

}
