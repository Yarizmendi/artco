precision mediump float;

uniform float u_time;
uniform float u_waves;
uniform float u_zoom;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

float time;
vec4 color;

mat2 scale(vec2 _scale) {
  return mat2( _scale.x, 0.0, 0.0, _scale.y );
}

vec2 rollingWaves( vec2 pos ) {
  return scale( abs( vec2 ( cos( u_time / u_zoom )))) * pos;
}

vec2 increasingWaves( vec2 pos ) {
  float numer = 25.0 + ( u_time / 1000.0 );
  pos.y += ( sin( pos.y * numer ) / ( 30.0 + numer ));
  return pos;
}

void main () {
  vec2 pos = vTexCoord;

  pos *= vec2( 0.9 );
  pos = increasingWaves( pos );

  color = texture2D( u_texture, pos );
  gl_FragColor = vec4( color );

}
