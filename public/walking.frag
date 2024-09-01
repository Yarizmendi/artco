precision mediump float;

uniform float u_time;
uniform float u_pan;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

vec4 color;

mat2 scale(vec2 _scale) {
  return mat2( _scale.x, 0.0, 0.1, _scale.y );
}

vec2 rollingWaves( vec2 pos ) {
  return scale( abs( vec2 ( cos( u_time )))) * pos;
}


void main () {
  vec2 pos = vTexCoord;

  color = texture2D( u_texture, pos);

  pos.x += (u_pan * u_time);
  pos = fract(pos);
  
  if ( color.g < .5 ) {
    pos = rollingWaves( pos );
  }

  color = texture2D( u_texture, pos);
  gl_FragColor = vec4( color );
}