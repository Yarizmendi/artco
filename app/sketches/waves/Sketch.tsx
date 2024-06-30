
"use client"
import p5Types from "p5";
import InitP5 from "@/p5/InitP5.js"
import { useState, useRef, useEffect } from "react"

type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;

export default function WaveSketch({ imgs }) {

  let mp5 = null
  let parentRef = useRef()

  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else return mp5.remove()
  }, [ isMounted ])

  
  const sliderCmptStyle = "w-[130px] flex justify-around items-center text-xs"
  
  const sketch: P5jsSketch = ( p5, parentRef ) => {
    let seconds
    let canvasParent 

    let Shader 
    let p5Imgs 

    let [ timer, timerParent ] = [ null, null ]
    let [ wavesSliderParent, wavesSlider, wavesSliderValue ] = [ null, null, null ]
    let [ durationSliderParent, durationSlider, durationSliderValue ] = [ null, null, null ]

    p5.preload = () => {
      Shader = p5.loadShader("/shaders/standard.vert", "/shaders/oceans.frag")
      p5Imgs = imgs.map( img => p5.loadImage( `/images/${ img.path }` ))
    }

    p5.setup = () => {
      canvasParent = document.getElementById("canvasParent")
      p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )

      timerParent = document.getElementById("timerParent")
      timer = p5.createP("").parent( timerParent )

      wavesSliderParent = document.getElementById("wavesSliderParent")
      wavesSliderValue = p5.createP("").parent("wavesSliderParent" )
      wavesSlider = p5.createSlider( 0, 100, 10 ).parent( wavesSliderParent )
      wavesSlider.size( 100 )
      
      durationSliderParent = document.getElementById("durationSliderParent")
      wavesSliderValue = p5.createP("").parent("durationSliderParent" )
      durationSlider = p5.createSlider( 15, 240, 33 ).parent( durationSliderParent )
      durationSlider.size( 100 )
    }

    p5.draw = () => {
      seconds = p5.millis() / 1000
      timer.html(`${ p5.round( seconds ) } seconds`)

      wavesSlider.html(`${ wavesSlider.value() }`)
      durationSlider.html(`${ durationSlider.value() }`)

      Shader.setUniform( "u_time", seconds )
      Shader.setUniform( "u_texture", p5Imgs[ 0 ] )
      Shader.setUniform( "u_waves", wavesSlider.value() )
      Shader.setUniform( "u_duration", durationSlider.value() )

      if ( seconds < durationSlider.value() ) {
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
      <div ref={ parentRef } id="canvasParent" className="h-[450px] w-full md:w-4/6 lg:w-2/3 m-auto" />
      <div id="timerParent" className="border-b p-2 flex justify-end text-sm" />
      <div className="flex p-2">
        <div id="wavesSliderParent" className={ sliderCmptStyle } />
        <div id="durationSliderParent" className={ sliderCmptStyle } />
      </div>
    </div>
  )
}