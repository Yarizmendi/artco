// @ts-nocheck

"use client"
import { useState, useRef, useEffect } from "react"
import { colorsSketch as allImages } from "../../api/images"

export default function EditorSketch({ path }) {

  let mp5: any = null
  let parentRef = useRef()

  const [ isMounted, setIsMounted ] = useState( false )

  let font
  let Shader 
  let textures

  let idx = 0
  let changeEvery = 90

  let seconds

  let [ canvas, canvasParent ] = []
  let [ timer, timerParent ] = []
  let [ topSliderParent, topTimeSlider, topTimeSliderValue ] = []
  let [ btmSliderParent, btmTimeSlider, btmTimeSliderValue ] = []

  let [ topFrameBuffer, btmFrameBuffer ] = []

  function sketch( p5 ) {

    p5.preload = () => {
      font = p5.loadFont("/fonts/cabalFont.ttf")
      Shader = p5.loadShader("/shaders/standard.vert", "/shaders/colors.frag")
      textures = allImages.map( tex => p5.loadImage(`/images/${ tex.path }`))
    }
  
    p5.setup = ( parentRef ) => {
      p5.pixelDensity(1)
      canvasParent = document.getElementById("canvasParent")
      p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )

      topSliderParent = document.getElementById("topSliderParent")
      topTimeSliderValue = p5.createP("").parent( "topSliderParent")
      topTimeSlider = p5.createSlider( 0, 60, 1, 1 ).parent( topSliderParent )
      topTimeSlider.size( 100 )

      btmSliderParent = document.getElementById("btmSliderParent")
      btmTimeSliderValue = p5.createP("").parent("btmSliderParent" )
      btmTimeSlider = p5.createSlider( 0, 60, 1, 1 ).parent( btmSliderParent )
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
      Shader.setUniform( "u_background", textures[ idx ] )
      Shader.setUniform( "u_foreground", textures[ idx + 1 ])
      Shader.setUniform( "u_resolution", [ canvasParent.offsetWidth, canvasParent.offsetHeight ])

      p5.shader( Shader )
      p5.rect( 0 )
  
    }
  
    p5.windowResized = () => {
      p5.resizeCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight )
    }

  }
  
  async function InitP5( sketch, parentRef) {
    const p5 = (await import( "p5" )).default
    return new p5( sketch, parentRef.current )
  }

  useEffect(() => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else mp5.remove()
  }, [ isMounted ])

  const sliderCmptStyle = "w-[130px] flex justify-around items-center text-xs"

  return (
    <div>
      <div ref={ parentRef } id="canvasParent" className="h-[400px] w-full"  />
      <div id="timerParent" className="border-b p-2 flex justify-end text-sm" />
      <div className="flex p-2">
        <div id="topSliderParent" className={ sliderCmptStyle } />
        <div id="btmSliderParent" className={ sliderCmptStyle } />
      </div>
    </div>
  )
}