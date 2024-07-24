"use client"
import p5Types from "p5"
import { useState, useRef, useEffect } from "react"
import InitP5 from "@/p5/Instance"
import { P5Recorder } from "@/p5/Recorder"
import { Controls } from "@/p5/Controls"
import { Slider } from "@/p5/Slider"
import { P5Sketch } from "@/p5/P5Sketch"

type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = ( p: p5Types, parentRef: P5jsContainerRef ) => void;

export default function WavesSketch({ imgs, title }) {
  let mp5 = null
  let parentRef = useRef()
  let canvasParent 


  const [ waveMotion, setWaveMotion ] = useState( 10 )
  const [ zoomMotion, setZoomMotion ] = useState( 30 )
  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { if ( !isMounted ) setIsMounted( true )}, [])

  useEffect(() => { 
    if ( !isMounted ) return
    canvasParent = document.getElementById("canvasParent")
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef, canvasParent )
    else return mp5.remove()
  }, [ isMounted ])

  const sketch: P5jsSketch = ( p5, parentRef ) => {
    let Shader 
    let p5Imgs 
  
    let waveSlider, durationSlider 
    let drawPlayTimer = 0, drawPauseTimer = 0
    let overlay, mediaRecorder, isPlaying = false


    p5.preload = () => {
      Shader = p5.loadShader("/shaders/standard.vert", "/shaders/oceans.frag")
      p5Imgs = imgs.map( img => p5.loadImage( img.url ))
    }

    p5.setup = () => {
      p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )

      mediaRecorder = P5Recorder( title )
      overlay = Controls( p5, title, parentRef )

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
      Shader.setUniform( "u_texture", p5Imgs[ 0 ] )
      // waveSlider.value.html(`${ waveSlider.input.value() }`)
      // durationSlider.value.html(`${ durationSlider.input.value() }`)
      handleControls()
      p5.shader( Shader )
      p5.rect( 0, 0, 0 )

    }

    p5.windowResized = () => {
      p5.resizeCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight )
    }

    function handleControls() {
      if ( !isPlaying ) {
        drawPauseTimer = p5.millis() - drawPlayTimer
      }
    
      if ( isPlaying ) {
        if ( !drawPauseTimer ) drawPlayTimer = p5.millis()
        else if ( drawPauseTimer ) drawPlayTimer = p5.millis() - drawPauseTimer
        Shader.setUniform( "u_time", drawPlayTimer / 1000 )
        Shader.setUniform( "u_waves", waveMotion )
        Shader.setUniform( "u_duration", zoomMotion )
      } 
    }

  } 

  return (
    <P5Sketch parentRef={ parentRef }>
      <Slider label={"waves"} min={0} max={1000} step={1} defaultValue={10} sliderValue={waveMotion} setSliderValue={setWaveMotion} />
      <Slider label={"time"} min={0} max={3000} step={1} defaultValue={30} sliderValue={zoomMotion} setSliderValue={setZoomMotion} />
    </P5Sketch>
  )
}



