
"use client"
import { useState, useRef, useEffect } from "react"


function sketch ( p5, parentRef ) {

  let Shader: any
  let textures = {}
  let texturesArr: any[]
  let timer: number

  let timeHeader

  let changeEvery = 6
  let idx = 0
  let noiseTexture

  let [ width, height ] = [
    p5.windowWidth / 1.15,
    p5.windowHeight / 1.25
  ]

  p5.preload = ( parentRef ) => {
    p5.loadFont('fonts/cabalFont.ttf')
    Shader = p5.loadShader( 'shaders/standard.vert', 'shaders/transitions.frag' )

    textures = {
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

    texturesArr = Object.values( textures )
    noiseTexture = texturesArr.pop()

  }

  p5.setup = ( parentRef ) => {
    p5.createCanvas( width, height, p5.WEBGL ).parent( parentRef )
    timeHeader = p5.createP("")
  }

  p5.draw = ( parentRef ) => {

    timer = p5.round( p5.millis() / 1000 )
    timeHeader.html(`${ timer } seconds`)

    Shader.setUniform( "u_time", p5.millis() )
    Shader.setUniform( "u_range", 0.0 )
    Shader.setUniform( "u_threshold", 1.0 )

    Shader.setUniform( "u_time", p5.millis() )
    Shader.setUniform( "u_noise", noiseTexture )
    Shader.setUniform( "u_background",  texturesArr[ idx ] )
    Shader.setUniform( "u_foreground", texturesArr[ idx + 1 ] ) 

    if ( timer > changeEvery ) {
      changeEvery = changeEvery + 6
      if ( idx < texturesArr.length-1) idx++
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


export default function TransitionSketch() {
  let mp5 = null
  const parentRef = useRef()
  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { setIsMounted( true ) }, [])

  async function initSketch() {
    const p5 = ( await import( "p5" )).default
    return new p5( sketch, parentRef.current )
  }

  useEffect(() => {
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = initSketch()
    else mp5.remove()
  }, [ isMounted ] )

  useEffect(() => {}, [ sketch ])

  return ( 
    <div className="border-4 border-black min-w-[300px] max-w-[1200px]" ref={ parentRef } /> 
  )
}
