precision mediump float;

uniform float u_time;
uniform float u_range;
uniform float u_timeout;
// uniform float u_threshold;
uniform float u_waves;

uniform sampler2D u_noise;
uniform sampler2D u_foreground;
uniform sampler2D u_background;

varying vec2 vTexCoord;

vec4 transition( vec2 pos, sampler2D bg, sampler2D fg, float timeout ) {

  vec4 color1 = texture2D( bg, pos );
  vec4 color2 = texture2D( fg, pos );
  vec4 noise = texture2D( u_noise, pos );

  float t = smoothstep(
    ( 1.0 - u_range  ) / ( ( u_time + timeout )),
    ( 1.0 + u_range  ) / ( ( u_time - timeout )),
    noise.r
  );

  vec4 res = mix( color1, color2, sin(u_time)  );
  return res;
}

void main () {
  vec2 pos = vTexCoord;
  pos.x += (cos(pos.x * u_waves ) / 30. ) * (sin( u_time ));
  pos.y += cos( pos.y * u_waves + u_time ) / ( 15.0 + u_waves + u_time );
  pos = fract(pos);
  vec4 col = transition( pos, u_foreground, u_background, u_timeout );
  gl_FragColor = vec4( col );
}
