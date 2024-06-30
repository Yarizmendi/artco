
"use client"
import p5Types from "p5";
import InitP5 from "@/p5/InitP5.js"
import { useState, useRef, useEffect } from "react"

type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = ( p: p5Types, parentRef: P5jsContainerRef ) => void;

export default function StemSketch({ imgs, noises }) {
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

    let idx = 0
    let changeEvery = 10

    let seconds
    let canvasParent 

    let Shader 
    let p5Imgs 
    let p5Noises

    let [ timer, timerParent ] = [ null, null ]

    p5.preload = () => {
      Shader = p5.loadShader( '/shaders/standard.vert', '/shaders/stem.frag' )
      p5Imgs = imgs.map( img => p5.loadImage( `/images/${ img.path }` ))
      p5Noises = noises.map( noise => p5.loadImage( `/images/${ noise.path }` ))
    }
  
    p5.setup = () => {
      canvasParent = document.getElementById("canvasParent")
      p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )
      timerParent = document.getElementById("timerParent")
      timer = p5.createP("").parent( timerParent )
    }
  
    p5.draw = () => {
      seconds = p5.millis() / 1000
      timer.html(`${ p5.round( seconds ) } seconds`)

      Shader.setUniform( "u_time", p5.millis() )
      Shader.setUniform( "u_range", 0.0 )
      Shader.setUniform( "u_threshold", 1.0 )
      Shader.setUniform( "u_noise", p5Noises[ 0 ] )
  
      if ( seconds < changeEvery ) {
        Shader.setUniform( "u_background",  p5Imgs[ idx ])
        Shader.setUniform( "u_foreground", p5Imgs[ idx + 1 ]) 
      }
      else if ( p5Imgs.length-2 > idx ) {
        idx+=1
        changeEvery += 10
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
      <div id="timerParent" className="border-b p-2 flex justify-end text-sm" />
    </div> 
  )
}
