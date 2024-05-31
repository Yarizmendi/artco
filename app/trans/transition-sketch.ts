
export function transitionSketch ( p5, parentRef ) {

  let Shader: any
  let textures = {}
  let texturesArr: any[]
  let timer: number
  let canvas
  let timeHeader
  let changeEvery = 1
  let idx = 0
  let noiseTexture

  let [ width, height ] = [
    p5.windowWidth / 1.75,
    p5.windowHeight / 1.25
  ]

  p5.preload = ( parentRef ) => {
    p5.loadFont('fonts/cabalFont.ttf')
    Shader = p5.loadShader( 'shaders/standard.vert', 'shaders/transitions.frag' )

    textures = {


      "yellow_act": p5.loadImage("images/stem/yellow_actuality.png"),
      "yellow_org": p5.loadImage("images/stem/yellow_org_collab.jpg"),
  
      "ballerina": p5.loadImage("images/stem/ballerina.png"),
      "reclamation": p5.loadImage("images/stem/Reclamation.png"),
  
      "yellow_stem": p5.loadImage("images/stem/yellow_org_stem.jpg"),
      "orange_acts": p5.loadImage("images/stem/orange_actuality.png"),
  
      "yellow_red": p5.loadImage("images/stem/yellow_red_stem.jpg"),
      "blue_red_stem": p5.loadImage("images/stem/blue_red_stem.jpg"),
  
      "sunset_circles_stem": p5.loadImage("images/stem/sunset_circles_stem.jpg"),
      "pareto": p5.loadImage("images/stem/in-search-of-pareto.png"),
  
      "patents_stem": p5.loadImage("images/stem/patents_stem.jpg"),
      "person_stem": p5.loadImage("images/stem/person_stem.jpg"),
  
      "pink_glimpses": p5.loadImage("images/stem/pink_glimpses.png"),
      "predicting": p5.loadImage("images/stem/predicting-the-present.png"),
  
      "quantum_ballerina": p5.loadImage("images/stem/quantum_ballerina.png"),
      "quantum_computer": p5.loadImage("images/stem/quantum-computer.png"),
  
      "recon_form": p5.loadImage("images/stem/reconfiguring-formality.jpg"),
      "resistance": p5.loadImage("images/stem/resistance.png"),
  
      "abstract-toon": p5.loadImage("images/stem/abstract_toon_stem.jpg"),
      "sid": p5.loadImage("images/stem/sid.jpg"),
  
      "thoughts": p5.loadImage("images/stem/thoughts_wb.png"),
      "perlinNoise": p5.loadImage('images/noise/perlin.png'),

    }

  }

  p5.setup = ( parentRef ) => {
    canvas = p5.createCanvas( width, height, p5.WEBGL ).parent( parentRef )
    texturesArr = Object.values( textures )
    noiseTexture = texturesArr.pop()
  }

  p5.draw = ( parentRef ) => {

    timer = p5.round( p5.millis() / 1000  )

    Shader.setUniform( "u_time", p5.millis() )
    Shader.setUniform( "u_range", 0.25 )
    Shader.setUniform( "u_threshold", 1.0 )
    Shader.setUniform( "u_noise", noiseTexture )

    // Shader.setUniform( "u_background",  texturesArr[ idx ] )

    // changeEvery = timer
    if ( timer - changeEvery == 0 ) {
      Shader.setUniform( "u_timeout", changeEvery * 1000.5 )
      Shader.setUniform( "u_background",  texturesArr[ idx ] )
      Shader.setUniform( "u_foreground", texturesArr[ idx + 1 ] )
      changeEvery += 7
      idx += 1
    }

    p5.shader( Shader )
    p5.rect( 0, 0, 0 )

  }

  p5.windowResized = function ( parentRef )  {
    p5.resizeCanvas( 
      p5.windowWidth / 1.75, 
      p5.windowHeight / 1.25
    )
  }


}
