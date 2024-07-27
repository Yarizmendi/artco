
"use client"
import p5Types from "p5"
import InitP5 from "@/p5/Instance"
import { Controls } from "@/p5/Controls"
import { SketchLayout } from "@/p5/SketchLayout"
import { Recorder } from "@/p5/Recorder"
import { useState, useRef, useEffect } from "react"

export default function PathSKetch({ 
  title, 
  blobs,
  inputs,
  shaders, 
}) {

  let mp5 = null
  let parentRef = useRef()
  const [ isMounted, setIsMounted ] = useState(false)

  useEffect(() => { if ( !isMounted ) setIsMounted( true )}, [])

  useEffect(() => { 
    if ( isMounted ) {
      if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
      else return mp5.remove() 
  }}, [ isMounted ]) 

  function sketch( p: p5Types ) {

    let ActiveShader
    let Overlay, MediaRecorder
    let Parent = parentRef.current 
    let isPlaying = false, drawPlayTimer = 0, drawPauseTimer = 0

    let pShaders, pImages

    p.preload = () => {
      pShaders = shaders.map( shader => p.loadShader( "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert", shader.frag ))
      pImages = blobs.map( blob => p.loadImage( blob.url ))
    }
  
    p.setup = () => {
      p.pixelDensity(1)
      createElements(Parent)
      ActiveShader = pShaders[0]

    }
  
    p.draw = () => {
      handleControls()
      Overlay.sketchTime.html(`${ p.round( drawPlayTimer / 1000 )}`)
      ActiveShader.setUniform("u_texture", pImages[0])
      ActiveShader.setUniform( "u_time", drawPlayTimer )
      inputs.map( slider => {
        ActiveShader.setUniform( slider.uniform, slider.input.value() )
        slider.paragraph.html(slider.input.value())
      })

      p.shader(ActiveShader)
      p.rect(0,0,0)
    }

    function createElements(parent) {
      p.createCanvas( parent.offsetWidth, parent.offsetHeight, p.WEBGL ).parent(parent)
      inputs.map( slider => { 
        const { min, max, value, step } = slider.settings
        slider["input"] = p.createSlider( min, max, value, step ).parent( slider.label ), 
        slider["paragraph"] = p.createP( value ).parent( slider.label+"value" )
      })

      MediaRecorder = Recorder(title)
      Overlay = Controls(p,title,Parent)
      Overlay.playBtn.mouseClicked(() => {
        if ( !isPlaying ) {
          isPlaying = true
          Overlay.playBtnLabel.html("running")
        }
        else if ( isPlaying ) {
          isPlaying = false
          Overlay.playBtnLabel.html("play")
        }
      })
    
      Overlay.recordBtn.mouseClicked(() => {
        if ( MediaRecorder.state == "inactive") {
          if ( !isPlaying ) isPlaying = true
          Overlay.playBtnLabel.html("running")
          Overlay.recordBtnLabel.html("recording")
          Overlay.recordBtn.addClass("text-red-500")
          MediaRecorder.start()
        }
        else if ( MediaRecorder.state == "recording" ) {
          if ( isPlaying ) isPlaying = false
          Overlay.playBtnLabel.html("play")
          Overlay.recordBtnLabel.html("record")
          Overlay.recordBtn.addClass("text-black")
          MediaRecorder.stop()
        }
      })
    }

    function handleControls() {
      if ( !isPlaying ) drawPauseTimer = p.millis() - drawPlayTimer
      if ( isPlaying ) {
        if ( !drawPauseTimer ) drawPlayTimer = p.millis()
        else if ( drawPauseTimer ) drawPlayTimer = p.millis() - drawPauseTimer   
      } 
    }

  }
  
  return <SketchLayout parentRef={parentRef} sliders={inputs}/>
}


