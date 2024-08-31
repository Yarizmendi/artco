precision mediump float;

uniform float u_time;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

float time;
vec4 color;

void main () {
  vec2 pos = vTexCoord;
  pos.y *= .99;
  color = texture2D( u_texture, pos);
  gl_FragColor = vec4( color );

}
