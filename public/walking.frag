precision mediump float;

uniform float u_time;
uniform float u_pan;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

vec4 color;

void main () {
  vec2 pos = vTexCoord;

  color = texture2D( u_texture, pos);

  if ( color.g < .2 ) {
    pos += ( cos( pos.y * u_time /15. ));
    pos.x += u_pan + u_time / 15.;
  } else {
    pos.x += u_pan - u_time / 15.;
    pos *= ( cos( pos.y * u_time * 5. ));
  }
    pos = fract(pos);

  color = texture2D( u_texture, pos);
  gl_FragColor = vec4( color );
}