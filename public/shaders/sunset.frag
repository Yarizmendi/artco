precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;


uniform sampler2D u_background;
vec4 backgroundColor;

uniform sampler2D u_foreground;
vec4 foregroundColor;

// uniform float u_topTime;
// uniform float u_btmTime;

// float t;
vec4 color;

// vec4 nightColor = vec4(0.6, 0.6, 0.58, 1.0);

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  st.y = 1.0 - st.y;

  if ( st.y > .81 && st.x > .51 ) {
    st.x += ( cos( st.x * u_time ) / ( 25.0 + u_time ));
  }

  backgroundColor = texture2D( u_background, st );
  foregroundColor = texture2D( u_foreground, st );
  color = foregroundColor;
 

  if ( color.b > .55 && color.r < .70 ) {
    color = mix( color, backgroundColor, sin(u_time / 3. ));
  }

  gl_FragColor = vec4( color );

}




