
"use client"
import { useState, useRef, useEffect } from "react"
import p5Types from "p5"

const sketch = ( p5, parentRef ) => {

  let cnv
  let font

  let Shader
  let textures = {}
  let texturesArr = []


  p5.preload = () => {
    font = p5.loadFont('fonts/cabalFont.ttf')
    Shader = p5.loadShader( 'shaders/standard.vert', 'shaders/stem-trans.frag' )
    textures = {
      "yellow_act": p5.loadImage("images/stem/yellow_actuality.png"),
      "yellow_org": p5.loadImage("images/stem/yellow_org_collab.jpg"),
  
      "ballerina": p5.loadImage("images/stem/ballerina.png"),
      "reclamation": p5.loadImage("images/stem/Reclamation.png"),
  
      "yellow_stem": p5.loadImage("images/stem/yellow_org_stem.jpg"),
      "orange_acts": p5.loadImage("images/stem/orange_actuality.png"),
  
      "yellow_red": p5.loadImage("images/stem/yellow_red_stem.jpg"),
      "blue_red_stem": p5.loadImage("images/stem/blue_red_stem.jpg"),

      "perlinNoise": p5.loadImage('images/noise/perlin.png'),
    
    }
  }

  p5.setup = () => {
    cnv = p5.createCanvas( p5.windowWidth/2, p5.windowHeight/2, p5.WEBGL )

  }

  p5.draw = () => {
    texturesArr = Object.values( textures )
    Shader.setUniform( "u_noise", texturesArr.pop() )
    Shader.setUniform( "u_time", p5.millis() )
    Shader.setUniform( "u_timeout", 7000.0 )
    Shader.setUniform( "u_range", 0.25 )
    Shader.setUniform( "u_threshold", 1.0 )
    Shader.setUniform( "u_background", texturesArr[ 0 ] )
    Shader.setUniform( "u_foreground", texturesArr[ 1 ] )
    p5.shader( Shader )
    p5.rect( 0, 0, 0 )
  }

}

export function Sketch () {

  const parentRef = useRef()

  const [ isMounted, setIsMounted ] = useState< boolean >( false )

  useEffect( () => { setIsMounted( true ) }, [] )

  useEffect( () => {
    if ( !isMounted ) return
    let p5Instance: p5Types

    const initP5 = async () => {
      try {
        const p5 = ( await import( "p5" )).default
        new p5( p => {
          sketch( p, parentRef.current )
          p5Instance = p
        })
      } catch ( error ) {
        console.log( error )
      }
    }

    initP5()

    if ( p5Instance ) return p5Instance.remove()


  }, [ isMounted, sketch ] )

  return ( 
    <div ref = { parentRef } />
  )

}



