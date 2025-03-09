precision highp float;

uniform float u_time;
uniform float u_tyme;
uniform float u_range;
uniform float u_threshold;

uniform bool u_basicX;
uniform bool u_basicY;

uniform bool u_advX;
uniform bool u_advY;

uniform sampler2D u_noise;
uniform sampler2D u_foreground;
uniform sampler2D u_background;

varying vec2 vTexCoord;

vec4 transition( vec2 pos, sampler2D bg, sampler2D fg, float tyme ) {
  vec4 res;

  vec4 color1 = texture2D( bg, pos );
  vec4 color2 = texture2D( fg, pos );
  vec4 noise = texture2D( u_noise, fract(pos * 1.5 ));

  float t = smoothstep(
    ( u_threshold - u_range  ) / ( ( u_time - tyme ) / 1300.0 ),
    ( u_threshold + u_range  ) / ( ( u_time  - tyme ) / 1300.0 ),
    noise.r
  );

  res = mix( color1, color2, t  );
  return res;
}

void main () {
  vec2 pos = vTexCoord;

  // if ( u_basicX == true ) {
      pos.x += sin( pos.x * u_time ) / ( 60.0 + u_time );
  // }

  // if ( u_basicY == true ) {
  //   pos.y = pos.y + (sin(pos.y * 25.) / 100. ) * (cos(u_time / 1000. ));
  // }

  // float numer = -10.0 + ( u_time / 1000.0 );

  // if ( u_advX == true ) {
  //   pos.x += ( sin( pos.x * numer ) / ( 22.0 + numer ));
  // }

  // if ( u_advY == true ) {
  //   pos.y += ( cos( pos.y * numer ) / ( 25.0 + numer ));
  // }

  // vec4 col = transition( pos, u_background, u_foreground, u_tyme );
  vec4 col = texture2D( u_background, pos );
  gl_FragColor = vec4( col );
 
}