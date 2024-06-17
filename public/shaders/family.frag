precision mediump float;
#define PI 3.14159265359

uniform float u_time;
uniform float u_range;
uniform float u_timeout;
uniform float u_threshold;

uniform sampler2D u_noise;
uniform sampler2D u_foreground;
uniform sampler2D u_background;

varying vec2 vTexCoord;

vec4 transition( vec2 pos, sampler2D bg, sampler2D fg, float timeout ) {

  vec4 color1 = texture2D( bg, pos );
  vec4 color2 = texture2D( fg, pos );
  vec4 noise = texture2D( u_noise, pos );

  float t = smoothstep(
    ( u_threshold - u_range  ) / ( ( u_time - timeout )  /  5000.0 ),
    ( u_threshold + u_range  ) / ( ( u_time - timeout )  / 5000.0 ),
    noise.r
  );

  vec4 res = mix( color1, color2, t  );
  return res;
}

mat2 scale(vec2 _scale) {
  return mat2( _scale.x, 0.0, 0.0, _scale.y );
}

void main () {
  vec2 pos = vTexCoord;

  pos.x += sin(pos.x * PI) / 5. * (cos( u_time / 3000. ));
  pos.y -= cos(pos.y * PI) / 15. * (sin( u_time / 1500. ));
  pos = fract(pos );
  vec4 col = transition( pos, u_background, u_foreground, u_timeout );

  gl_FragColor = vec4( col );
}
