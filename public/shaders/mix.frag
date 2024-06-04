precision mediump float;

uniform float u_time;
uniform sampler2D u_noise;
uniform sampler2D u_foreground;
uniform sampler2D u_background;

varying vec2 vTexCoord;

void main() {
  vec2 pos = vTexCoord;

  vec4 color1 = texture2D( u_background, pos );
  vec4 color2 = texture2D( u_foreground, pos );
  vec4 noise = texture2D( u_noise, fract(pos * 2. ));

  vec4 color =  mix( color1, color2, .5 );
  gl_FragColor = vec4( color );
}
