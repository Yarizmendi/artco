precision highp float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  vTexCoord.y = 1. - vTexCoord.y;
  vec4 positionVec4 = vec4(aPosition, 1.);
  positionVec4.xy = positionVec4.xy * 2. - 1.;
  gl_Position = positionVec4;
}