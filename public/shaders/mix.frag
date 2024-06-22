precision mediump float;
#define PI 3.14159265359

uniform vec2 u_resolution;
uniform sampler2D u_background;

void main() {

  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st = st.xy / 2.0;
  st.y = 1.0 - st.y;

  vec4 color = texture2D( u_background, st );


  gl_FragColor = vec4( color );

}


