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

  st *= ( 0.9 );

  if ( st.y < .47 ) {
    st.x += ( sin( st.x * u_time ) / ( 8.0 + u_time )); 
    color = texture2D( u_industrial_ocean, st );
    
    if ( color.r > 0.33 ) {
      st.y += ( cos( st.y * u_time ) / ( 8.0 + u_time )); 
      t = abs( sin( u_time / u_topTime ));
      pollutedOceanColor = texture2D( u_polluted_ocean, st );
      color = mix( pollutedOceanColor, nightColor, t );
    } 

  }

  else {
    st.y += cos( st.y * u_waves + u_time ) / ( 15.0 + u_waves + u_time );
    color = texture2D( u_industrial_ocean, st );
    redOceanColor = texture2D( u_red_ocean, st );
    t = abs( sin( u_time / u_btmTime ));
    color = mix( color, redOceanColor, t);
  }


  gl_FragColor = vec4( color );

}




