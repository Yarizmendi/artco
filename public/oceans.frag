precision mediump float;

uniform float u_time;
uniform float u_waves;
uniform float u_duration;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

float time;
vec4 color;

mat2 scale(vec2 _scale) {
  return mat2( _scale.x, 0.0, 0.0, _scale.y );
}

vec2 rollingWaves( vec2 pos ) {
  return scale( abs( vec2 ( cos( u_time / u_duration )))) * pos;
}

vec2 increasingWaves( vec2 pos ) {
  pos.y += cos( pos.y * u_waves + u_time ) / ( 15.0 + u_waves + u_time );
  return pos;
}

void main () {
  vec2 pos = vTexCoord;

  pos = increasingWaves( pos );
  pos = rollingWaves( pos );

  color = texture2D( u_texture, pos );
  gl_FragColor = vec4( color );

}
