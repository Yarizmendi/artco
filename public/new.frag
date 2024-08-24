precision mediump float;

uniform float u_time;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

vec4 color;

void main () {
  vec2 pos = vTexCoord;
  color = texture2D(u_texture, pos);
  gl_FragColor = vec4( color );
}