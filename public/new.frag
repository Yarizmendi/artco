precision mediump float;

uniform float u_time;
uniform float u_waves;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

float time;
vec4 color;

void main () {
  vec2 pos = vTexCoord;

  pos.y *= .99;

  
  // pos.y += cos( pos.y * u_waves + u_time + 50. ) / ( u_waves - u_time );
  // pos.y += (cos(pos.y * u_waves ) / 30. ) * (sin( u_time ));
  // pos = fract(pos);

  color = texture2D( u_texture, pos);
  gl_FragColor = vec4( color );

}
