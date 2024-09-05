precision mediump float;

uniform float u_time;
uniform float u_pan;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

vec4 color;

void main () {
  vec2 pos = vTexCoord;

  color = texture2D( u_texture, pos);

  if ( color.g > .66 ) {

    if ( pos.x < .33 ) {
      pos.x += u_pan + u_time / 50.;
        pos.x = fract( pos.x );
    }
    else {
     pos.x -= u_pan + u_time / 50.;
       pos.x = fract( pos.x);
    }
  pos.y += cos( pos.y * 20. + u_time ) / ( 15.0 + 20. + u_time );
  } 
  // else {
  //   pos.y += sin( pos.y * u_time ) / ( u_time );
  // }


  color = texture2D( u_texture, pos);
  gl_FragColor = vec4( color );
}