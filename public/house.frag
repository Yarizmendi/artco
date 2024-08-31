precision mediump float;

uniform float u_time;

uniform sampler2D u_background;
vec4 backgroundColor;

uniform sampler2D u_foreground;
vec4 foregroundColor;

varying vec2 vTexCoord;

vec4 color;

void main() {
  vec2 st = vTexCoord;

  if ( st.y > .81 && st.x > .51 ) {
    st.x += ( cos( st.x * u_time ) / ( 25.0 + u_time ));
    st.x = fract(st.x);
  }

  backgroundColor = texture2D( u_background, st );
  foregroundColor = texture2D( u_foreground, st );
  color = foregroundColor;
 

  if ( color.b > .55 && color.r < .70 ) {
    color = mix( color, backgroundColor, sin(u_time / 3. ));
  }

  gl_FragColor = vec4( color );

}




