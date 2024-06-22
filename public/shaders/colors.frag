precision mediump float;

// uniform float u_time;
// uniform sampler2D u_noise;
// uniform sampler2D u_foreground;
uniform sampler2D u_background;

varying vec2 vTexCoord;


void main() {
  vec2 pos = vTexCoord;

  // pos.x = pos.x + ( sin( pos.x * 25. ) / 100. ) * ( cos( u_time / 1000. ));
  // pos.y = pos.y + ( sin( pos.y * 10. ) / 100. ) * ( cos( u_time / 1000. ));

  vec4 color = texture2D( u_background, pos );
  // vec4 color2 = texture2D( u_foreground, pos );
  // vec4 noise = texture2D( u_noise, pos );

  // float t = smoothstep(
  //   ( 1.0 - 0.25  ) / ( u_time / 3000. ),
  //   ( 1.0 + 0.25  ) / ( u_time / 3000. ),
  //   noise.r
  // );

  // vec4 color =  mix( color1, color1, t );
  gl_FragColor = vec4( color );
}


