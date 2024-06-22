precision mediump float;
#define PI 3.14159265359

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_background;

varying vec2 vTexCoord;

void main() {
  // vec2 pos = vTexCoord;
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st = st.xy / 2.0;
  st.y = 1.0 - st.y;

  vec4 color;

  if ( st.y < 0.52 ) {
    vec4 colorB = vec4(0.03, 0.02, 0.18, 1.0);
    color = colorB;
  }

  if ( st.y > 0.55 ) {
    st.y += ( cos( st.y * u_time ) / ( 20.0 + u_time ));
    color = texture2D( u_background, st );
  } 

  gl_FragColor = vec4( color );

}


