
export function transitionSketch ( p5, parentRef ) {
  let Shader: any
  let textures = {}
  let texturesArr: any[]

  p5.preload = () => {
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

  p5.setup = () => {
    p5.createCanvas( p5.windowWidth, p5.windowHeight, p5.WEBGL )
    p5.shader( Shader )
    Shader.setUniform( "u_range", 0.25 )
    Shader.setUniform( "u_threshold", 1.0 )
    Shader.setUniform( "u_timeout", 3000.0 )
  }

  p5.draw = () => {
    texturesArr = Object.values( textures )
    Shader.setUniform( "u_noise", texturesArr.pop() )
    Shader.setUniform( "u_time", p5.millis() )
    Shader.setUniform( "u_background", texturesArr[ 0 ] )
    Shader.setUniform( "u_foreground", texturesArr[ 1 ] )
    p5.rect( 0, 0, 0 )
  }

}
