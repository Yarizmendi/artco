precision mediump float;

uniform sampler2D u_background;
varying vec2 vTexCoord;

void main() {
  vec2 st = vTexCoord;
  vec4 bg = texture2D( u_background, st );
  gl_FragColor = vec4( bg );
}




