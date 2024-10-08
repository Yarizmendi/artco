precision mediump float;

uniform float u_time;
uniform float u_waves;
uniform float u_zoom;
uniform float u_scale_x;
uniform float u_scale_y;
uniform sampler2D u_texture;

varying vec2 vTexCoord;

float time;
vec4 color;

mat2 scale(vec2 _scale) {
  return mat2( _scale.x, 0.0, 0.1, _scale.y );
}

vec2 rollingWaves( vec2 pos ) {
  return scale( abs( vec2 ( cos( u_time / u_zoom )))) * pos;
}

vec2 increasingWaves( vec2 pos ) {
  pos.y += cos( pos.y * (u_waves/2.) + u_time ) / ( 30.0 - (u_waves/2.) + u_time );
  return pos;
}

vec4 afterColor;

void main () {
  vec2 pos = vTexCoord;
  pos *= vec2( .9, .9 );

  color = texture2D( u_texture, pos );


  if ( (color.b > .33) && (pos.x > .5 || pos.x < .8 )) {
    // pos.y += cos( pos.y * u_waves + u_time ) / (u_waves + u_time );
    pos.x += sin( pos.x * u_waves * u_time ) / ( 30.0 - u_waves + u_time );
    pos.y += cos( pos.y * u_waves * u_time ) / (u_waves + u_time );
 
  } 
  else {
    // pos.x += sin( pos.x * u_waves + u_time ) / ( 30.0 - u_waves + u_time );
        pos.y += cos( pos.y * u_waves + u_time ) / (u_waves + u_time );
        //    pos = rollingWaves( pos );
  }

  pos = fract(pos);
  color = texture2D( u_texture, pos );
  afterColor = texture2D( u_texture, pos );

  color = mix( color, afterColor, .8);

  gl_FragColor = vec4( color );

}
