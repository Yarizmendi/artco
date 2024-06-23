
"use client"
import { useState, useRef, useEffect } from "react"
import { stem, noiseTextures } from "../../api/images"

function sketch ( p5, parentRef ) {

  let Shader: any
  let texturesArr: any[]
  let timer: number

  let changeEvery = 25
  let idx = 0
  let noiseTexture: any

  let [ width, height ] = [ p5.windowWidth / 2, p5.windowHeight / 1.5 ]

  p5.preload = () => {
    p5.loadFont('fonts/cabalFont.ttf')
    Shader = p5.loadShader( 'shaders/standard.vert', 'shaders/transitions.frag' )
    texturesArr = stem.map( img => p5.loadImage(`images/${ img.path }`))
    noiseTexture = p5.loadImage(`images/${ noiseTextures[0].path }`)
  }

  p5.setup = () => {
    p5.pixelDensity( 1 )
    p5.createCanvas( width, height, p5.WEBGL ).parent( parentRef )
  }

  p5.draw = ( ) => {

    timer = p5.round( p5.millis() / 1000 )

    Shader.setUniform( "u_time", p5.millis() )
    Shader.setUniform( "u_range", 0.0 )
    Shader.setUniform( "u_threshold", 1.0 )

    Shader.setUniform( "u_noise", noiseTexture )


    if ( timer < changeEvery ) {
      Shader.setUniform( "u_foreground", texturesArr[ idx + 1 ]) 
      Shader.setUniform( "u_background",  texturesArr[ idx ])
    }
    else if ( texturesArr.length-2 > idx ) {
      changeEvery += 25
      idx+=1
      Shader.setUniform( "u_timeout", p5.millis() )
    } 

    p5.shader( Shader )
    p5.rect( 0, 0, 0 )

  }

  p5.windowResized = function ( )  {
    p5.resizeCanvas( 
      p5.windowWidth / 2, 
      p5.windowHeight / 1.5
    )
  }
}


export default function TransitionSketch() {
  let mp5 = null
  const parentRef = useRef()
  const [ isMounted, setIsMounted ] = useState( false )

  useEffect( () => { if( !isMounted ) setIsMounted( true ) }, [])

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
    <div className="flex flex-col items-center min-w-[300px] max-w-[1200px]" ref={ parentRef } /> 
  )
}
