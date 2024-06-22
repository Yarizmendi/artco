precision mediump float;
#define PI 3.14159265359

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_background;
uniform sampler2D u_foreground;

varying vec2 vTexCoord;

vec4 color;
vec4 colorB;

void main() {

  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st = st.xy / 2.0;
  st.y = 1.0 - st.y;

  st *= vec2(0.9);

  if ( st.y > 0.45 ) {
    st.x = st.x + (cos(st.y * 10. ) / 20. ) * (sin(u_time / 3.5 ));
    st.y -= ( cos( st.y * u_time ) / ( 45.0 + u_time ));
  } 

  // if ( st.y < 0.45 ) {
  //   st.x += ( sin( st.x * u_time ) / ( 5.0 + u_time * 2. ));
  //   st.y -= ( cos( st.y * u_time ) / ( 20.0 + u_time * 2. ));
  // }

  color = texture2D( u_background, st );
  colorB = texture2D( u_foreground, st );

  if ( st.y > 0.47 ) {
    color = mix(color, colorB, abs( sin( u_time / 20. )));
  }


  if ( st.y < 0.48 ) {
    color = mix(color, colorB, abs( cos( u_time / 20. )));
  }

  gl_FragColor = vec4( color );

}


