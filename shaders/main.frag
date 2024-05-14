precision mediump float;

uniform float u_time;
uniform sampler2D u_noise;
uniform sampler2D u_foreground;
uniform sampler2D u_background;
uniform bool u_is_transition;
uniform vec2 u_resolution;

varying vec2 vTexCoord;

mat2 scale(vec2 _scale) {
  return mat2( _scale.x, 0.0, 0.0, _scale.y );
}

vec2 increasingWaves( vec2 pos ) {
  float numer = 50.0 + ( u_time / 1000.0 );
  pos.y += ( sin( pos.y * numer ) / ( 80.0 + numer ));
  return pos;
}

vec2 rollingWaves( vec2 pos ) {
  return scale( abs( vec2 ( cos( u_time * .00005  )))) * pos;
}

void main () {
  vec2 pos = vTexCoord;
  vec4 color;

  pos = increasingWaves( pos );
  color = texture2D( u_foreground, pos );

  if ( u_is_transition ) {
    vec4 bg = texture2D( u_background, pos );

    float noise = texture2D(
      u_noise,
      fract( vTexCoord / u_time )
    ).r;

    float t = smoothstep(
      0.0 - 0.5,
      0.0 + 0.5,
      noise
    );

    color = mix(color, bg, t );

  }

  gl_FragColor = vec4( color );

}
