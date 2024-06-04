import BlendSketch from "./BlendSketch"

function sketch( p5, ref ) {

  let Shader: any
  let texture: any


  let [ width, height ] = [
      p5.windowWidth / 1.15,
      p5.windowHeight / 1.25
  ]

  p5.preload = () => {
      Shader = p5.loadShader( 'shaders/standard.vert', 'shaders/oceans.frag' )
      texture = p5.loadImage("images/nature/oceans/red_ocean.png")
  }

  p5.setup = () => {
      p5.createCanvas( width, height, p5.WEBGL ).parent( ref )
  }

  p5.draw = () => {
      Shader.setUniform( "u_time", p5.millis() )
      Shader.setUniform( "u_waves", 10.0 )
      Shader.setUniform( "u_speed", 1000.0 )
      Shader.setUniform( "u_duration", 60000.0 )
      Shader.setUniform( "u_texture", texture)

      p5.shader( Shader )
      p5.rect( 0, 0, 0 )

  }

  



}

export default function Blends() {
  return (
    <div>
      <BlendSketch />
    </div>
  )
}