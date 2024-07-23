
"use client"
import p5Types from "p5";
import { useState, useRef, useEffect } from "react"
import InitP5, { P5Recorder, Controls, CS } from "@/p5/InitP5.tsx"

type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = ( p: p5Types, parentRef: P5jsContainerRef ) => void

export default function OceanSketch({ imgs, title }) {

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
    let p5Imgs

    let uTopTime, uBtmTime, waveSlider
    let drawPlayTimer = 0, drawPauseTimer = 0
    let overlay, mediaRecorder, isPlaying = false
    let canvasParent = document.getElementById("canvasParent")

    p5.preload = () => {
      Shader = p5.loadShader("/shaders/standard.vert", "/shaders/ocean-mix.frag")
      p5Imgs = imgs.map( img => p5.loadImage( img.url ))
    }

    p5.setup = () => {

      p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )
      
      mediaRecorder = P5Recorder( title )
      overlay = Controls( p5, title, parentRef )

      uTopTime =  CS( p5, 0, 60, 25, 1, "city", "ctrls", "speed of sky transition" )
      uBtmTime = CS( p5, 0, 60, 30, 1, "ocean", "ctrls", "speed of ocean transition" )
      waveSlider =  CS( p5, 15, 120, 7, 15, "waves", "ctrls", "number of ocean waves" )

      overlay.playBtn.mouseClicked(() => {
        if ( !isPlaying ) {
          isPlaying = true
          overlay.playBtnLabel.html("running")
        }
        else if ( isPlaying ) {
          isPlaying = false
          overlay.playBtnLabel.html("play")
        }
      })
    
      overlay.recordBtn.mouseClicked(() => {
        if ( mediaRecorder.state == "inactive") {
          if ( !isPlaying ) isPlaying = true
          overlay.playBtnLabel.html("running")
          overlay.recordBtnLabel.html("recording")
          overlay.recordBtn.addClass("text-red-500")
          mediaRecorder.start()
        }
        else if ( mediaRecorder.state == "recording" ) {
          if ( isPlaying ) isPlaying = false
          overlay.playBtnLabel.html("play")
          overlay.recordBtnLabel.html("record")
          overlay.recordBtn.addClass("text-black")
          mediaRecorder.stop()
        }
      })

    }

    p5.draw = () => {
      overlay.sketchTime.html(`${ p5.round( drawPlayTimer / 1000 )} seconds`)
      uTopTime.value.html(`${ uTopTime.input.value() }`)
      uBtmTime.value.html(`${ uBtmTime.input.value() }`)
      waveSlider.value.html(`${ waveSlider.input.value() }`)

      handleControls()
      
      Shader.setUniform( "u_topTime", uTopTime.input.value() )
      Shader.setUniform( "u_btmTime", uBtmTime.input.value() )
      Shader.setUniform( "u_waves", waveSlider.input.value() )
      Shader.setUniform( "u_industrial_ocean", p5Imgs[ 0 ] )
      Shader.setUniform( "u_red_ocean", p5Imgs[ 1 ])
      Shader.setUniform("u_polluted_ocean", p5Imgs[ 2 ])

      p5.shader( Shader )
      p5.rect( 0, 0, 0 )
    }

    p5.windowResized = () => {
      p5.resizeCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight )
    }

    
    function handleControls() {
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
    }

  }

  return (
    <div className="">
      <div ref={ parentRef } id="canvasParent" className="h-[470px] sm:h-[440px] [sm:w-full md:w-4/6 lg:w-2/3 m-auto" />
      <a id="download" className="hidden">download</a>
      <div id="ctrls" className="flex h-[50px] m-4" />
    </div>
  )
}