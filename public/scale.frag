precision mediump float;

uniform float u_time;
varying vec2 vTexCoord;
uniform sampler2D u_texture;
uniform float u_zoom_in;
uniform float u_waves;

vec4 color;
vec4 ogColor;
vec4 altColor;

mat2 scale(vec2 _scale) {
  return mat2( _scale.x, 0.0, 0.0, _scale.y );
}

void main () {
  vec2 pos = vTexCoord;
  pos = scale( abs( vec2 ( cos( u_time / u_zoom_in )))) * pos;
  color = texture2D( u_texture, pos );
  gl_FragColor = vec4( color );
}