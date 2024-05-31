precision mediump float;

uniform float u_time;
uniform float u_waves;
uniform float u_speed;
uniform float u_duration;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

mat2 scale(vec2 _scale) {
  return mat2( _scale.x, 0.0, 0.0, _scale.y );
}

vec2 increasingWaves( vec2 pos ) {
  float numer = u_waves + ( u_time / u_speed );
  pos.y += ( sin( pos.y * numer ) / ( u_waves + 5.0 + numer ));
  return pos;
}

vec2 rollingWaves( vec2 pos ) {
  return scale( abs( vec2 ( cos( u_time / u_duration )))) * pos;
}

void main () {
  vec2 pos = vTexCoord;

  pos = increasingWaves( pos );

  if ( u_time < u_duration ) {
    pos = rollingWaves( pos );
  }

  vec4 color = texture2D( u_texture, pos );
  gl_FragColor = vec4( color );

}
