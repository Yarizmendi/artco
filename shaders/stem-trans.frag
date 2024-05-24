precision mediump float;

uniform float u_time;
uniform sampler2D u_noise;
uniform sampler2D u_foreground;
uniform sampler2D u_background;
uniform float u_threshold;
uniform float u_range;
uniform float u_tyme;

varying vec2 vTexCoord;

mat2 scale(vec2 _scale) {
  return mat2( _scale.x, 0.0, 0.0, _scale.y );
}

vec2 increasingWaves( vec2 pos ) {
  float numer = 10.0 + ( u_time / 1000.0 );
  pos.y += ( sin( pos.y * numer ) / ( 25.0 + numer ));
  return pos;
}

vec2 rollingWaves( vec2 pos ) {
  return scale( abs( vec2 ( cos( u_time * .00005  )))) * pos;
}

vec4 transition( vec2 pos, sampler2D bg, sampler2D fg, float tyme ) {
  vec4 res;

  vec4 color1 = texture2D( bg, pos );
  vec4 color2 = texture2D( fg, pos );
  vec4 noise = texture2D( u_noise, fract(pos * 1.5 ));

  float t = smoothstep(
    ( u_threshold - u_range  ) / ( ( u_time - tyme ) / 2500.0 ),
    ( u_threshold + u_range  ) / ( ( u_time  - tyme ) / 2500.0 ),
    noise.r
  );

  res = mix( color1, color2, t  );


  return res;
}


void main () {
  vec2 pos = vTexCoord;

  pos.y = pos.y + (sin(pos.y * 50.)/100.) * (cos(u_time/1000.));
  pos.x = pos.x + (sin(pos.x * 50.)/100.) * (cos(u_time/1000.));

  pos = increasingWaves( pos );


  vec4 col;

  col = transition( pos, u_background, u_foreground, u_tyme );


  gl_FragColor = vec4( col );
 
}
