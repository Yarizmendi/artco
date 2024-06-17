
import { fam, noiseTextures } from "app/(api)/images"

export function familySketch ( p5: any, parentRef: any ) {

  let Shader: any
  let texturesArr: any[]
  let timer: number
  let changeEvery = 15
  let idx = 0
  let noiseTex: any

  let [ width, height ] = [ p5.windowWidth / 2, p5.windowHeight / 1.2 ]

  p5.preload = () => {
    p5.loadFont('fonts/cabalFont.ttf')
    Shader = p5.loadShader( 'shaders/standard.vert', 'shaders/family.frag' )
    texturesArr = fam.map( img => p5.loadImage(`images/${ img.path }`))
    noiseTex = p5.loadImage(`images/${ noiseTextures[0].path }`)
  }

  p5.setup = () => {
    p5.pixelDensity( 1 )
    p5.createCanvas( width, height, p5.WEBGL ).parent( parentRef )
  }

  p5.draw = () => {
    timer = p5.round( p5.millis() / 1000 )

    Shader.setUniform( "u_range", 0.2 )
    Shader.setUniform( "u_threshold", 1.0 )
    Shader.setUniform( "u_noise", noiseTex )
    Shader.setUniform( "u_time", p5.millis() )


    if ( timer < changeEvery ) {
      Shader.setUniform( "u_foreground", texturesArr[ idx + 1 ]) 
      Shader.setUniform( "u_background",  texturesArr[ idx ])
    }
    else if ( texturesArr.length-2 > idx ) {
      changeEvery += 15
      idx+=1
      Shader.setUniform( "u_timeout", p5.millis() )
    } 
    
    p5.shader( Shader )
    p5.rect( 0, 0, 0 )

  }

  p5.windowResized = function()  {
    p5.resizeCanvas( 
      p5.windowWidth / 2, 
      p5.windowHeight / 1.2
    )
  }

}
