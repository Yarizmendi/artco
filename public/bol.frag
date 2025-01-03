precision mediump float;

uniform float u_time;
uniform float u_red;
uniform float u_green;
uniform float u_blue;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

float time;
vec4 color;

vec4 nightColor = vec4(0.11, 0.14, 0.31, 1.0);

mat2 scale(vec2 _scale) {
  return mat2( _scale.x, 0.0, 0.1, _scale.y );
}

void main () {
  vec2 pos = vTexCoord;

  color = texture2D( u_texture, pos );
  float pct = abs(sin(u_time/10.));

  if ( color.r > u_red  ) {
    vec4 colorA = vec4(0.204,0.985,0.166, 1.0);
    vec4 colorB = vec4(0.980,0.048,0.029, 1.0);
   color = mix(colorB, colorA, pct);
  } 

  if ( color.g > u_green  ) {
    vec4 colorA = vec4(0.204,0.985,0.166, 1.0);
    vec4 colorB = vec4(0.980,0.048,0.029, 1.0);
    color = mix(colorB, colorA, pct);
  } 

  if ( color.b > u_blue  ) {
    vec4 colorA = vec4(0.204,0.985,0.166, 1.0);
    vec4 colorB = vec4(0.980,0.048,0.029, 1.0);
    color = mix(color, nightColor, pct);
  } 

  gl_FragColor = vec4( color );

}