// @ts-nocheck

"use client"
import { useState, useRef, useEffect } from "react"
import { stem, noiseTextures } from "../../api/images"

export default function StemSketch() {
  let mp5 = null
  let parentRef = useRef()

  const [ isMounted, setIsMounted ] = useState( false )

  let Shader: any
  let texturesArr: any[]
  let timer: number

  let changeEvery = 25
  let idx = 0
  let noiseTexture: any

  let canvasParent

  function sketch ( p5 ) {

    p5.preload = () => {
      p5.loadFont('/fonts/cabalFont.ttf')
      Shader = p5.loadShader( '/shaders/standard.vert', '/shaders/transitions.frag' )
      texturesArr = stem.map( img => p5.loadImage( `/images/${ img.path }` ))
      noiseTexture = p5.loadImage( `/images/${ noiseTextures[0].path }` )
    }
  
    p5.setup = ( parentRef ) => {
      p5.pixelDensity( 1 )
      canvasParent = document.getElementById("canvasParent")
      p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )
    }
  
    p5.draw = () => {
  
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
  
    p5.windowResized = () => {
      p5.resizeCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight )
    }
  
  }
  
  async function initSketch( sketch, parentRef ) {
    const p5 = ( await import( "p5" )).default
    return new p5( sketch, parentRef.current )
  }

  useEffect(() => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => {
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = initSketch( sketch, parentRef )
    else mp5.remove()
  }, [ isMounted ] )

  return (
    <div>
      <div ref={ parentRef } id="canvasParent" className="h-[400px] w-full"  />
    </div> 
  )
}
