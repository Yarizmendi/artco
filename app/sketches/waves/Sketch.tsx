
"use client"
import p5Types from "p5"
import InitP5, { P5Recorder, RecorderOverlay } from "@/p5/InitP5.js"
import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation";

type P5jsContainerRef = HTMLDivElement
type P5jsSketch = ( p: p5Types, parentRef: P5jsContainerRef ) => void

export default function WaveSketch({ imgs }) {

  let mp5
  let parentRef = useRef()
  let path = usePathname().split('/')[ 2 ]

  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { if ( !isMounted ) setIsMounted( true )}, [])

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else return mp5.remove()
  }, [ isMounted ])

  const sketch: P5jsSketch = ( p5, parentRef ) => {
    let mediaRecorder

    let isPlaying = false
    let drawPlayTimer = 0
    let drawPauseTimer = 0

    let Shader 
    let p5Imgs 

    let canvasParent 
    let recordBtnParent

    let drawTimerP
    let sketchNameP

    let recordBtn
    let recordBtnP

    let recordIconSpan

    let record_icon_text = "radio_button_checked"

    let playBtn
    let playBtnP

    let playIconSpan
    let play_icon_text = "play_arrow"

    let iconsClass = "material-symbols-outlined"
    const sliderCmptStyle = "w-[130px] flex justify-around items-center text-xs"


    let [ wavesSliderParent, wavesSlider, wavesSliderValue ] = [ null, null, null ]
    let [ durationSliderParent, durationSlider, durationSliderValue ] = [ null, null, null ]


    p5.preload = () => {
      Shader = p5.loadShader("/shaders/standard.vert", "/shaders/oceans.frag")
      p5Imgs = imgs.map( img => p5.loadImage( `/images/${ img.path }` ))
    }

    p5.setup = () => {
      canvasParent = document.getElementById("canvasParent")
      p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )

      wavesSliderParent = p5.createDiv().class( sliderCmptStyle )
      wavesSliderValue = p5.createP("").parent( wavesSliderParent )
      wavesSlider = p5.createSlider( 10, 100, 30, 10 ).parent( wavesSliderParent )
      wavesSlider.size( 100 )
      
      durationSliderParent = p5.createDiv().class( sliderCmptStyle )
      durationSliderValue = p5.createP("").parent( durationSliderParent )
      durationSlider = p5.createSlider( 15, 120, 7, 15 ).parent( durationSliderParent )
      durationSlider.size( 100 )

      recordBtnParent = RecorderOverlay( p5, canvasParent )

      recordBtn = p5.createButton("")
      recordBtn.parent(recordBtnParent)
      recordBtn.class("flex items-center text-xs m-2 cursor-pointer text-black")

      recordIconSpan = p5.createSpan()
      recordIconSpan.class( iconsClass )
      recordIconSpan.html( record_icon_text )
      recordIconSpan.parent( recordBtn )
      recordBtnP = p5.createP("record").class("p-1").parent( recordBtn )

      playBtn = p5.createButton("")
      playBtn.parent(recordBtnParent)
      playBtn.class("flex items-center text-xs m-2 cursor-pointer")

      playIconSpan = p5.createSpan()
      playIconSpan.class( iconsClass )
      playIconSpan.html( play_icon_text )
      playIconSpan.parent( playBtn )
      playBtnP = p5.createP("play").class("p-1").parent( playBtn )

      drawTimerP = p5.createP("").class("text-xs p-1").parent( recordBtnParent)
      sketchNameP = p5.createP(`${ path } sketch`).class("text-xs p-1").parent( recordBtnParent)


      playBtn.mouseClicked(() => isPlaying = !isPlaying )

      recordBtn.mouseClicked(() => {
        if ( mediaRecorder.state == "inactive") {
          if ( !isPlaying ) isPlaying = true
          playBtnP.html("running")
          recordBtnP.html("recording")
          recordBtn.class("flex items-center text-xs m-2 text-red-500")
          mediaRecorder.start()
        }
        else if ( mediaRecorder.state == "recording" ) {
          if ( isPlaying ) isPlaying = false
          playBtnP.html("play")
          recordBtnP.html("record")
          recordBtn.class("flex items-center text-xs m-2 text-black")
          mediaRecorder.stop()
        }
      })

      mediaRecorder = P5Recorder( path )

    }

    p5.draw = () => {    
      wavesSliderValue.html(`${ wavesSlider.value() }`)
      durationSliderValue.html(`${ durationSlider.value() }`)
      drawTimerP.html(`${ p5.round( drawPlayTimer / 1000 )} seconds`)

      if ( !isPlaying ) {
        const pausedAt = drawPlayTimer
        drawPauseTimer = p5.millis() - drawPlayTimer
        Shader.setUniform( "u_time", pausedAt / 1000 )
      }

      if ( isPlaying ) {
        if ( !drawPauseTimer ) drawPlayTimer = p5.millis()
        else if ( drawPauseTimer ) drawPlayTimer = p5.millis() - drawPauseTimer
        Shader.setUniform( "u_time", drawPlayTimer / 1000 )
      } 

      Shader.setUniform( "u_texture", p5Imgs[ 0 ] )
      Shader.setUniform( "u_waves", wavesSlider.value() )
      Shader.setUniform( "u_duration", durationSlider.value() )

      p5.shader( Shader )
      p5.rect( 0, 0, 0 )

    }

    p5.windowResized = () => {
      p5.resizeCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight )
    }

  }

  return (
    <div>
      <div ref={ parentRef } id="canvasParent" className="h-[500px] sm:w-full md:w-4/6 lg:w-2/3 m-auto" />
      <a id="download" className="hidden">download</a>
    </div>
  )
}

