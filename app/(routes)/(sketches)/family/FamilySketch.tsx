
"use client"
import { useState, useRef, useEffect } from "react"
import { stem, noiseTextures } from "app/(api)/images"

function sketch ( p5, parentRef ) {

  let Shader: any
  let texturesArr: any[]
  let timer: number

  let timeHeader: any

  let changeEvery = 0
  let idx = 0
  let noiseTexture: any

  let basicX: any
  let basicY: any
  let advX: any
  let advY: any


  let [ width, height ] = [
    p5.windowWidth / 1.15,
    p5.windowHeight / 1.25
  ]

  p5.preload = ( parentRef ) => {
    p5.loadFont('fonts/cabalFont.ttf')
    Shader = p5.loadShader( 'shaders/standard.vert', 'shaders/transitions.frag' )

    texturesArr = stem.map( img => p5.loadImage(`images/${ img.path }`))
    noiseTexture = p5.loadImage(`images/${ noiseTextures[0].path }`)

  }

  p5.setup = ( parentRef ) => {
    p5.pixelDensity( 1 )
    timeHeader = p5.createP("")
    p5.createCanvas( width, height, p5.WEBGL ).parent( parentRef )
    basicX = p5.createCheckbox('basicX', false )
    basicY = p5.createCheckbox('basicY', false )
    advX = p5.createCheckbox('advX', false )
    advY = p5.createCheckbox('advY', false )
  }

  p5.draw = ( parentRef ) => {

    timer = p5.round( p5.millis() / 1000 )
    timeHeader.html(`${ timer } seconds`)

    Shader.setUniform( "u_time", p5.millis() )
    Shader.setUniform( "u_range", 0.5 )
    Shader.setUniform( "u_threshold", 1.0 )

    Shader.setUniform( "u_time", p5.millis() )
    Shader.setUniform( "u_noise", noiseTexture )

    Shader.setUniform( "u_foreground", texturesArr[ idx +1 ] ) 
    Shader.setUniform( "u_background",  texturesArr[ idx ] )

    if ( timer > changeEvery ) {
      if ( idx < texturesArr.length-1) {
        changeEvery += 9
        Shader.setUniform( "u_timeout", p5.millis() )
        idx += 1
      }
      
    }

    Shader.setUniform( "u_basicX", basicX.checked() ) 
    Shader.setUniform( "u_basicY", basicY.checked() ) 
    Shader.setUniform( "u_advX", advX.checked() ) 
    Shader.setUniform( "u_advY", advY.checked() ) 

    p5.shader( Shader )
    p5.rect( 0, 0, 0 )

  }

  p5.windowResized = function ( parentRef )  {
    p5.resizeCanvas( 
      p5.windowWidth / 1.15, 
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
    <div className="flex flex-col items-center min-w-[300px] max-w-[1200px]" ref={ parentRef } /> 
  )
}
