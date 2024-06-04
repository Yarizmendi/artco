precision mediump float;

uniform float u_time;
uniform float u_waves;
uniform float u_speed;
uniform float u_duration;
uniform sampler2D u_texture;
uniform float rand;

varying vec2 vTexCoord;

mat2 scale(vec2 _scale) {
  return mat2( _scale.x, 0.0, 0.0, _scale.y );
}

vec2 increasingWaves( vec2 pos ) {
  float numer = u_waves + ( u_time / 1000.0 );
  pos.y -= ( cos( pos.y * numer ) / ( 25.0 + numer ));
  pos.y += ( sin ( pos.y * numer ) / ( 35.0 + numer ));
  pos.x -= ( cos ( pos.y * numer ) / ( 25.0 + numer ));

  return pos;
}

vec2 rollingWaves( vec2 pos ) {
  return scale( abs( vec2 ( cos( u_time / u_duration )))) * pos;
}

void main () {
  vec2 pos = vTexCoord;

  pos *= vec2( 0.9 );
  pos = increasingWaves( pos );
 
  


  vec4 color = texture2D( u_texture, pos );
  gl_FragColor = vec4( color );

}
