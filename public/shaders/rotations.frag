precision mediump float;
#define PI 3.14159265359

uniform float u_time;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle));
}

void main() {
  vec2 pos = vTexCoord;
  // pos = rotate2d( sin( u_time / 10000.0) * PI ) * pos;
  vec4 color = texture2D( u_texture, pos );
  gl_FragColor = vec4( color );
}
