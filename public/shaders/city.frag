precision mediump float;

uniform float u_time;

vec4 color;

uniform sampler2D u_industrial_ocean;
vec4 industrialOceanColor;

uniform sampler2D u_red_ocean;
vec4 redOceanColor;

uniform sampler2D u_polluted_ocean;
vec4 pollutedOceanColor;

uniform float u_topTime;
uniform float u_btmTime;

uniform float u_waves;

varying vec2 vTexCoord;

float t;

vec4 nightColor = vec4(0.11, 0.14, 0.31, 1.0);

void main() {
  vec2 st = vTexCoord;

  st *= ( 0.92 );
  if ( st.y > .46 ) {
    st.y += cos( st.y * u_waves + u_time ) / ( 15.0 + u_waves + u_time );
  } 
  else {
    st.x += ( cos( st.x * u_time ) / ( 8.0 + u_time ));
  }

  industrialOceanColor = texture2D( u_industrial_ocean, st );
  pollutedOceanColor = texture2D( u_polluted_ocean, st );
  redOceanColor = texture2D( u_red_ocean, st );

  if ( st.y < .47 ) {
    t = abs( cos( u_time / u_topTime ));
    color = industrialOceanColor;
    
    if ( color.r > 0.33 ) {
      color = mix( pollutedOceanColor, nightColor, t );
    }

  } 

  else {
    t = abs( sin( u_time / u_btmTime ));
    color = mix( industrialOceanColor, redOceanColor, t);
  }




  gl_FragColor = vec4( color );

}




