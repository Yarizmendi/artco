precision mediump float;

#define PI 3.14159265359

uniform float u_time;
uniform float u_waves_cnt;
uniform vec2 u_resolution;
uniform float u_transit_opacity;
uniform sampler2D u_noise_tex;
uniform sampler2D u_foreground;
uniform sampler2D u_tree_tex;
varying vec2 vTexCoord;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

mat2 scale(vec2 _scale) {
  return mat2( _scale.x, 0.0, 0.0, _scale.y );
}

vec2 increasingWaves( vec2 pos ) {
  float numer = 25.0 + ( u_time / 1000.0 );
  pos.y += ( sin( pos.y * numer ) / ( 30.0 + numer ));
  return pos;
}

vec2 rollingWaves( vec2 pos ) {
  return scale( abs( vec2 ( cos( u_time / 60000.0 )))) * pos;
}

void main () {
  vec2 pos = vTexCoord;
  vec4 color;

    pos = increasingWaves( pos );

    if ( u_time / 1000.0 < 60.0 ) {
      pos = rollingWaves( pos );
    }

  color = texture2D( u_foreground, pos );


  // if ( u_time / 1000.0 > 60.0 ) {
  //   vec4 colour2 = texture2D( u_tree_tex, pos );
 

  //   vec4 noise = texture2D( u_noise_tex, fract(pos * 1.5 ));

  //   float t = smoothstep(
  //     ( 1.0 - 0.2  ) / ( ( u_time ) / 2500.0 ),
  //     ( 1.0 + 0.2  ) / ( ( u_time ) / 2500.0 ),
  //     noise.r
  //   );
 
  //   color = mix(color, colour2, t );

  // }

  gl_FragColor = vec4( color );

}
