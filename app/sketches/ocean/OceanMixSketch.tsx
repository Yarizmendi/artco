
"use client"
import p5Types from "p5";
import InitP5 from "@/p5/InitP5.js"
import { useState, useRef, useEffect } from "react"

type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;

export default function OceanMixSketch({ imgs }) {

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

    let Shader 
    let textures
    let seconds

    let [ canvasParent ] = [ null ]
    let [ timer, timerParent ] = [ null, null ]
    let [ topSliderParent, topTimeSlider, topTimeSliderValue ] = [ null, null, null ]
    let [ btmSliderParent, btmTimeSlider, btmTimeSliderValue ] = [ null, null, null ]

    p5.preload = () => {
      Shader = p5.loadShader("/shaders/standard.vert", "/shaders/ocean-mix.frag")
      textures = imgs.map( tex => p5.loadImage(`/images/${ tex.path }`))
    }

    p5.setup = () => {
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
      <div className="flex p-2">
        <div id="topSliderParent" className={ sliderCmptStyle } />
        <div id="btmSliderParent" className={ sliderCmptStyle } />
      </div>
    </div>
  )
}