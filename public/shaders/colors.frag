precision mediump float;
#define PI 3.14159265359

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_background;
uniform sampler2D u_foreground;

varying vec2 vTexCoord;

vec4 topColor;
vec4 btmColor;
vec4 color;

uniform float u_topTime;
uniform float u_btmTime;
float t;

vec4 sunsetColors;

void main() {

  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.y = 1.0 - st.y;

  topColor = texture2D( u_background, st );
  btmColor = texture2D( u_foreground, st );

  if ( st.y < .47 ) {
    if ( topColor.r >=  0.60 ) {
      topColor = vec4(0.03, 0.13, 0.37, 1.0);
    }
 
     t = abs( sin( u_time / 10. ));
  } 

  // if ( st.y > .47 ) {
    // t = abs( sin( u_time / 5. ));
    // t = .25;
  // }

  color = mix( topColor, btmColor, t );
  gl_FragColor = vec4( color );

}


