precision mediump float;
#define PI 3.14159265359

uniform float u_time;
uniform vec2 u_resolution;

vec4 topColor;
vec4 btmColor;
vec4 color;

uniform sampler2D u_industrial_ocean;
vec4 industrialOceanColor;

uniform sampler2D u_red_ocean;
vec4 redOceanColor;

uniform sampler2D u_polluted_ocean;
vec4 pollutedOceanColor;

uniform sampler2D u_things_unsaid;
uniform sampler2D u_your_ocean;
uniform sampler2D u_pools;

uniform float u_topTime;
uniform float u_btmTime;

varying vec2 vTexCoord;

float t;

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  st.y = 1.0 - st.y;

  float yPos = st.y;

  industrialOceanColor = texture2D( u_industrial_ocean, st );
  pollutedOceanColor = texture2D( u_polluted_ocean, st );
  redOceanColor = texture2D( u_red_ocean, st );

  if ( yPos < .47 ) {
    t = abs( cos( u_time / u_topTime ));
    color = mix( industrialOceanColor, pollutedOceanColor, t );
    color = mix( color, redOceanColor, t / 1.5 );
  } 

  if ( yPos > .47 ) {
    t = abs( sin( u_time / u_btmTime ));
    color = mix( industrialOceanColor, redOceanColor, t );
  }

  

  gl_FragColor = vec4( color );

}




