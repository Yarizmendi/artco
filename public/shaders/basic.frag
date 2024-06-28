precision mediump float;

// uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_background;
// uniform sampler2D u_noise;

// vec4 color;

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  st.y = 1.0 - st.y;

  vec4 bg = texture2D( u_background, st );
  // vec4 noise = texture2D( u_noise, st );

  // float t = smoothstep(
  //   ( 1.0 - 0.25  ) / ( ( u_time ) ),
  //   ( 1.0 + 0.25  ) / ( ( u_time ) ),
  //   noise.r
  // );


  // color = mix( bg, bg, t );
  gl_FragColor = vec4( bg );

}




