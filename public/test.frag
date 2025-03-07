

precision mediump float;

uniform float u_time;
uniform sampler2D u_texture;
uniform float u_waves;

uniform sampler2D u_noise;
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
        ( 1.0 - .25  ) / abs(sin(u_time*.5)),
        ( 1.0 + .25  ) / abs(sin(u_time*.5)),
        noise.r
    );

    if ( ogCol.r < .65 && ogCol.g < .65 && ogCol.b < .65 ) {;
        pos.x += sin( pos.x * u_waves + u_time ) / ( 30.0 - u_waves + u_time );
        pos.y += sin( pos.x * u_waves + u_time ) / ( 60.0 - u_waves + u_time );

        firstImage = texture2D( u_first_image, pos );
        secondImage = texture2D( u_second_image, pos );

        col = mix( firstImage, ogCol, t);
    } 
    else {
        pos.y += sin( pos.y * u_waves + u_time ) / ( 30.0 - u_waves + u_time );
        col = texture2D( u_texture, pos);
    }

    gl_FragColor = vec4( col ) ;
}