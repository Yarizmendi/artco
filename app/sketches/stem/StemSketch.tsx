
"use client"
import p5Types from "p5";
import InitP5 from "@/p5/InitP5.js"
import { useState, useRef, useEffect } from "react"

type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;

export default function StemSketch({ imgs, noise }) {
  let mp5 = null
  let parentRef = useRef()

  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => {
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else return mp5.remove()
  }, [ isMounted ] )

  const sketch: P5jsSketch = ( p5, parentRef ) => {

    let Shader
    let texturesArr
    let timer
  
    let changeEvery = 10
    let idx = 0
    let noiseTexture
  
    let canvasParent
  
    p5.preload = () => {
      Shader = p5.loadShader( '/shaders/standard.vert', '/shaders/stem.frag' )
      texturesArr = imgs.map( img => p5.loadImage( `/images/${ img.path }` ))
      noiseTexture = p5.loadImage( `/images/${ noise[0].path }` )
    }
  
    p5.setup = () => {
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
        changeEvery += 10
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

  return (
    <div>
      <div ref={ parentRef } id="canvasParent" className="h-[450px] w-full md:w-4/6 lg:w-2/3 m-auto" />
    </div> 
  )
}
