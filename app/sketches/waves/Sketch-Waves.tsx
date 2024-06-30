
"use client"
import { useState, useRef, useEffect } from "react"
import InitP5 from "@/p5/InitP5.js"
import p5Types from "p5"

type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;

export default function Canvas({ ...props }) {

  let mp5 = null
  let parentRef = useRef()

  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else return mp5.remove()
  }, [ isMounted ])

  
  const sketch: P5jsSketch = ( p5, parentRef ) => {
    let Shader 
    let texture
    let seconds
    let duration
    let canvasParent 
    let wavesSlider
    let timerP

    p5.preload = () => {
      Shader = p5.loadShader("/shaders/standard.vert", "/shaders/oceans.frag")
      texture = p5.loadImage(`/images/red_ocean.png`)
    }

    p5.setup = () => {
      canvasParent = document.getElementById("canvasParent")
      p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )

      timerP = p5.createP("").parent( parentRef )
      wavesSlider = p5.createSlider( 0, 100, 10 ).parent( parentRef )
      duration = p5.createSlider( 15, 240, 30 ).parent( canvasParent )
    }

    p5.draw = () => {
      seconds = p5.millis() / 1000
      timerP.html(`${ p5.round( seconds )}`)

      Shader.setUniform( "u_texture", texture )
      Shader.setUniform( "u_duration", duration.value() )
      Shader.setUniform( "u_waves", wavesSlider.value() )

      if ( seconds < duration.value() ) {
        Shader.setUniform( "u_time", seconds )
        p5.shader( Shader )
        p5.rect( 0, 0, 0 )
      }

    }

    p5.windowResized = () => {
      p5.resizeCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight )
    }

  }

  return (
    <div>
      <div ref={ parentRef } id="canvasParent" className="h-[450px] w-full md:w-4/6 lg:w-2/3 m-auto"  />
    </div>
  )
}