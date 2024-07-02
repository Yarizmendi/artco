
"use client"
import p5Types from "p5"
import InitP5, { P5Recorder, RECORD_ICON_TEXT, ICONS_OUTLINE, PLAY_ICON_TEXT, Button, Icon, Paragraph, Controls, Slider } from "@/p5/InitP5.tsx"
import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation";

type P5jsContainerRef = HTMLDivElement
type P5jsSketch = ( p: p5Types, parentRef: P5jsContainerRef ) => void

export default function WaveSketch({ imgs }) {

  let mp5
  let parentRef = useRef()
  let path = usePathname().split('/')[ 2 ]

  let mediaRecorder

  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { if ( !isMounted ) setIsMounted( true )}, [])

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else return mp5.remove()
  }, [ isMounted ])

  const sketch: P5jsSketch = ( p5, parentRef ) => {

    let isPlaying = false
    let drawPlayTimer = 0
    let drawPauseTimer = 0

    let Shader 
    let p5Imgs 

    let canvasParent 
    let recordBtnParent

    let sketchName
    let sketchTime

    let recordBtn
    let recordBtnP
    let recordIconSpan

    let playBtn
    let playBtnP
    let playIconSpan
    
    let waveSliderValue, waveSlider 
    let durationSliderValue, durationSlider 

    p5.preload = () => {
      Shader = p5.loadShader("/shaders/standard.vert", "/shaders/oceans.frag")
      p5Imgs = imgs.map( img => p5.loadImage( `/images/${ img.path }` ))
    }

    p5.setup = () => {
      canvasParent = document.getElementById("canvasParent")
      p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )

      waveSlider =  Slider( p5, 15, 120, 7, 15 ).parent("waveSliderParent")
      waveSliderValue =  Paragraph( p5, waveSlider.value() ).parent("waveSliderValueParent")
   
      durationSlider = Slider( p5, 15, 120, 7, 15 ).parent( "durationSliderParent" )
      durationSliderValue = Paragraph( p5, durationSlider.value() ).parent("durationSliderValueParent")

      recordBtnParent = Controls( p5, canvasParent )

      recordBtn = Button( p5, recordBtnParent ).addClass( "text-black")
      recordIconSpan = Icon( p5, ICONS_OUTLINE, RECORD_ICON_TEXT, recordBtn )
      recordBtnP = Paragraph( p5, "record", recordBtn )

      playBtn = Button( p5, recordBtnParent )
      playIconSpan = Icon( p5, ICONS_OUTLINE, PLAY_ICON_TEXT, playBtn )
      playBtnP = Paragraph( p5, "play", playBtn )

      sketchTime = Paragraph( p5, "0 seconds", recordBtnParent )
      sketchName = Paragraph( p5, `${ path } sketch`, recordBtnParent  )


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
      sketchTime.html(`${ p5.round( drawPlayTimer / 1000 )} seconds`)
      waveSliderValue.html(`${ waveSlider.value() }`)
      durationSliderValue.html(`${ durationSlider.value() }`)

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
      Shader.setUniform( "u_waves", waveSlider.value() )
      Shader.setUniform( "u_duration", durationSlider.value() )

      p5.shader( Shader )
      p5.rect( 0, 0, 0 )

    }

    p5.windowResized = () => {
      p5.resizeCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight )
    }

  }

  function CustomSlider({ sliderParentId, sliderValueParentId, sliderLabel }) {
    return (
      <div className="flex items-center mx-2">
        <p id={ sliderValueParentId } className="px-2 py-1 mx-2 border rounded-md" />
        <div id={ sliderParentId } className="flex flex-col p-1 justify-center">
          <p>{ sliderLabel } </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div ref={ parentRef } id="canvasParent" className="h-[500px] sm:w-full md:w-4/6 lg:w-2/3 m-auto" />
      <a id="download" className="hidden">download</a>
      <CustomSlider 
        sliderLabel={ "waves" }
        sliderParentId={ "waveSliderParent" } 
        sliderValueParentId={ "waveSliderValueParent" }>
      </CustomSlider>
      <CustomSlider 
        sliderLabel={ "duration" }
        sliderParentId={ "durationSliderParent" } 
        sliderValueParentId={ "durationSliderValueParent" }>
      </CustomSlider>
    </div>
  )
}



