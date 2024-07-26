
"use client"
import InitP5 from "@/p5/Instance"
import { Controls } from "@/p5/Controls"
import { SketchLayout } from "@/p5/SketchLayout"
import { P5Recorder } from "@/p5/Recorder"
import { useState, useRef, useEffect } from "react"

export default function PathSKetch({ 
  title, 
  imgs,
  shaders, 
  sliders,
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

  function sketch(p) {

    let ActiveShader
    let Overlay, MediaRecorder
    let Parent = parentRef.current 
    let isPlaying = false, drawPlayTimer = 0, drawPauseTimer = 0

    p.preload = () => {
      shaders = shaders.map( shader => p.loadShader( shader.vert, shader.frag ))
      imgs = imgs.map( img => p.loadImage( img.url ))
    }
  
    p.setup = () => {
      createElements(Parent)
      ActiveShader = shaders[0]
    }
  
    p.draw = () => {
      updateElements()
      handleControls()
      p.shader(ActiveShader)
      p.rect(0,0,0)
    }

    function createElements(parent) {
      p.createCanvas( parent.offsetWidth, parent.offsetHeight, p.WEBGL ).parent(parent)
      sliders.map( slider => { 
        slider["input"] = p.createSlider( 0, 100, 10, 10 ).parent( slider.label ), 
        slider["paragraph"] = p.createP("pval").parent( slider.label+"value" )
      })
      MediaRecorder = P5Recorder(title)
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
      ActiveShader.setUniform("u_texture", imgs[0])

      if ( !isPlaying ) {
        drawPauseTimer = p.millis() - drawPlayTimer
      }
    
      if ( isPlaying ) {
        if ( !drawPauseTimer ) drawPlayTimer = p.millis()
        else if ( drawPauseTimer ) drawPlayTimer = p.millis() - drawPauseTimer

        sliders.map( slider => {
          ActiveShader.setUniform( "u_"+slider.label, slider.input.value() )
        })
        ActiveShader.setUniform( "u_time", drawPlayTimer / 1000 )
      } 
    }

    function updateElements() {
      sliders.map( slider => slider.paragraph.html(slider.input.value()))
    }
  }
  
  return <SketchLayout parentRef={parentRef} sliders={sliders}/>
}


