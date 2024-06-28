precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_background;

vec4 color;

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  st.y = 1.0 - st.y;

  color = texture2D( u_background, st );
  gl_FragColor = vec4( color );

}




