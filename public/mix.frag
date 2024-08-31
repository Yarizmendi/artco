precision mediump float;

uniform float u_time;

uniform sampler2D u_texture;
uniform sampler2D u_foreground;

varying vec2 vTexCoord;

vec4 ogColor;
vec4 newColor;
vec4 color;
float t;

void main () {
  vec2 pos = vTexCoord;

  newColor = texture2D( u_foreground, pos );
  ogColor = texture2D( u_texture, pos );
  t = sin( u_time );

  color = mix( ogColor, newColor, t);
  gl_FragColor = vec4( color );
}