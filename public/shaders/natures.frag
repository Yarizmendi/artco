precision mediump float;
#define PI 3.14159265359

uniform float u_transit_opacity;
uniform sampler2D u_background;
uniform sampler2D u_foreground;
uniform sampler2D u_noise_texture;

varying vec2 vTexCoord;

void main () {
  vec2 pos = vTexCoord;
  vec4 color = texture2D( u_background, pos );
  gl_FragColor = vec4( color );
}