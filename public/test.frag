

precision highp float;

uniform float u_time;
uniform float u_waves;

uniform float u_range;
uniform float u_duration;
uniform float u_threshold;

uniform sampler2D u_noise;
uniform sampler2D u_texture;

uniform sampler2D u_first_image;
uniform sampler2D u_second_image;

varying vec2 vTexCoord;

void main () {
    vec4 col;
    vec2 pos = vTexCoord;

    vec4 ogCol = texture2D( u_texture, pos);
    vec4 noise = texture2D( u_noise, pos );

    vec4 firstImage;
    vec4 secondImage;

    float t = smoothstep(
        ( u_threshold - u_range ) / abs(sin( u_time*u_duration )),
        ( u_threshold + u_range ) / abs(sin( u_time*u_duration )),
        noise.r
    );

    if ( ogCol.r > .35 && ogCol.g > .35 && ogCol.b > .35 ) {
        pos.x += sin( pos.x * u_waves + u_time ) / ( 60.0 - u_waves + u_time );
        pos.y += sin( pos.x * u_waves + u_time ) / ( 60.0 - u_waves + u_time );

        firstImage = texture2D( u_first_image, pos );
        secondImage = texture2D( u_second_image, pos );
        col = mix( firstImage, secondImage, t);
    } 
    else {
      
            // pos.y += sin( pos.y * u_waves + u_time ) / ( 30.0 - u_waves + u_time );
            // pos.x += sin( pos.x * u_waves + u_time ) / ( 30.0 - u_waves + u_time );
        
        col = texture2D( u_texture, pos);
    }

    gl_FragColor = vec4( col ) ;
}