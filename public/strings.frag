precision mediump float;

uniform float u_time;
uniform float u_waves;
uniform float u_zoom;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

vec4 color;

mat2 scale(vec2 _scale) {
  return mat2( _scale.x, 0.0, 0.1, _scale.y );
}

vec2 rollingWaves( vec2 pos ) {
  return scale( abs( vec2 ( cos( u_time / u_zoom )))) * pos;
}

vec2 increasingWaves( vec2 pos ) {
  pos.y += cos( pos.y * (u_waves/2.) + u_time ) / ( 30.0 - (u_waves/2.) + u_time );
  return pos;
}

float time = u_time; 
vec3 yellow = vec3(1.0, 0.0, 1.0);
 

void main () {

  vec2 pos = vTexCoord;
  pos *= ( 0.99 );

  color = texture2D( u_texture, pos );

  if ( color.r > .33 && color.b > .33 ) {
    pos = rollingWaves( pos );
    pos.x += cos( pos.x * u_waves + time ) / ( u_waves + time );
  }

  else {
    pos.y += cos( pos.x * u_waves + time ) / ( u_waves + time );
  }

  color = texture2D( u_texture, pos );
  gl_FragColor = vec4( color );

}
