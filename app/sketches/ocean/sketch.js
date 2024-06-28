
import { colorsSketch as allImages } from "../../api/images"

export default function sketch( p5, parentRef ) {

  let Shader 
  let textures
  let seconds

  let [ canvasParent ] = []
  let [ timer, timerParent ] = []
  let [ topSliderParent, topTimeSlider, topTimeSliderValue ] = []
  let [ btmSliderParent, btmTimeSlider, btmTimeSliderValue ] = []

  p5.preload = () => {
    p5.loadFont("/fonts/cabalFont.ttf")
    Shader = p5.loadShader("/shaders/standard.vert", "/shaders/colors.frag")
    textures = allImages.map( tex => p5.loadImage(`/images/${ tex.path }`))
  }

  p5.setup = () => {
    p5.pixelDensity(1)
    canvasParent = document.getElementById("canvasParent")
    p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )

    topSliderParent = document.getElementById("topSliderParent")
    topTimeSliderValue = p5.createP("").parent( "topSliderParent")
    topTimeSlider = p5.createSlider( 0, 60, 10, 1 ).parent( topSliderParent )
    topTimeSlider.size( 100 )

    btmSliderParent = document.getElementById("btmSliderParent")
    btmTimeSliderValue = p5.createP("").parent("btmSliderParent" )
    btmTimeSlider = p5.createSlider( 0, 60, 15, 1 ).parent( btmSliderParent )
    btmTimeSlider.size( 100 )

    timerParent = document.getElementById("timerParent")
    timer = p5.createP("").parent( timerParent )

  }

  p5.draw = () => {
    seconds = p5.millis() / 1000
    timer.html(`${ p5.round( seconds ) } seconds`)
    topTimeSliderValue.html(`${ topTimeSlider.value() }`)
    btmTimeSliderValue.html(`${ btmTimeSlider.value() }`)
    
    Shader.setUniform( "u_time", seconds )
    Shader.setUniform( "u_topTime", topTimeSlider.value() )
    Shader.setUniform( "u_btmTime", btmTimeSlider.value() )

    Shader.setUniform( "u_industrial_ocean", textures[ 0 ] )
    Shader.setUniform( "u_red_ocean", textures[ 1 ])
    Shader.setUniform("u_polluted_ocean", textures[ 2 ])


    Shader.setUniform( "u_resolution", [ canvasParent.offsetWidth, canvasParent.offsetHeight ])

    p5.shader( Shader )
    p5.rect( 0 )

  }

  p5.windowResized = () => {
    p5.resizeCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight )
  }

}