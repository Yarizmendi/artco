precision mediump float;

uniform float u_time;

uniform sampler2D u_background;
uniform sampler2D u_foreground;

varying vec2 vTexCoord;

vec4 ogColor;
vec4 newColor;
vec4 color;
float t;

void main () {
  vec2 pos = vTexCoord;

  newColor = texture2D( u_foreground, pos );
  ogColor = texture2D( u_background, pos );
  
  t = abs(sin( u_time / 1000. ));

  color = mix( ogColor, newColor, t);
  gl_FragColor = vec4( color );
}