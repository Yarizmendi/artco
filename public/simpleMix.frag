precision mediump float;

uniform float u_time;

uniform sampler2D u_tex;
uniform sampler2D u_bg;
uniform sampler2D u_fg;

uniform float u_mix;

varying vec2 vTexCoord;

vec4 ogColor;
vec4 newColor;
vec4 color;

void main () {
  vec2 pos = vTexCoord;

  newColor = texture2D( u_fg, pos );
  ogColor = texture2D( u_tex, pos );

  color = mix( ogColor, newColor, u_mix);
  gl_FragColor = vec4( color );
}