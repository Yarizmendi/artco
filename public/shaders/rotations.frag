precision mediump float;
#define PI 3.14159265359

uniform float u_time;
varying vec2 vTexCoord;

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
              sin(_angle),cos(_angle));
}

void main() {
  vec2 pos = vTexCoord;
  vec4 color = rotate2d( abs( vec2 ( cos( u_time / 60000.0 )))) * pos;
  gl_FragColor = vec4( color );
}
