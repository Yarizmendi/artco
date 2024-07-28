
"use client"
import p5Types from "p5"
import InitP5 from "@/p5/Instance"
import { Controls } from "@/p5/Controls"
import { Recorder } from "@/p5/Recorder"
import { SketchLayout } from "@/p5/SketchLayout"
import { useState, useRef, useEffect } from "react"

const vert = "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert"

export default function PathSKetch({ 
  id,
  title, 
  images,
  noises,
  shaders, 
  description,
}) {

  let timers = []
  let inputs = []
  let textures = []

  shaders.map( shader => {
    inputs.push( ...shader.inputs )
    timers.push( ...shader.timers )
    textures.push(...shader.textures )
  })

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

    let idx = 0
    let ActiveShader, Noise
    let Overlay, MediaRecorder
    let Parent = parentRef.current 
    let isPlaying = false, drawPlayTimer = 0, drawPauseTimer = 0

    p.preload = () => {

      images.map( img => {
        img["Image"] = p.loadImage( img.blob )
      })

      noises.map( noise => {
        noise["Noise"] = p.loadImage( noise.blob )
      })

      shaders.map( shader => {
        shader["Shader"] = p.loadShader( vert, shader.frag ) 
      })

    }
  
  
    p.setup = () => {
      p.pixelDensity(1)
      ActiveShader = shaders[idx]["Shader"]
      Noise = noises[idx]["Noise"]
      createElements(Parent)
    }
  
    p.draw = () => {
      Overlay.sketchTime.html(`${ p.round( drawPlayTimer / 1000 )} seconds`)
      
      ActiveShader.setUniform( "u_noise", Noise )

      textures.map(( texture ) => {
        ActiveShader.setUniform( texture.uniform, images[ idx ]["Image"])
      })

      timers.map((timer ) => {
        ActiveShader.setUniform( timer.uniform, drawPlayTimer / 1000 )
      })

      inputs.map(( input ) => {
        input["Paragraph"].html( input["Slider"].value() )
        ActiveShader.setUniform( input.uniform, input["Slider"].value() )
      })

      handleControls()
      p.shader(ActiveShader)
      p.rect(0,0,0)
    }

    function createElements(parent) {
      p.createCanvas( parent.offsetWidth, parent.offsetHeight, p.WEBGL ).parent( parent )

      inputs.map( input => {
        if ( input.type == "slider" ) {
          const { min, max, value, step } = input.settings
          input["Slider"] = p.createSlider( min, max, value, step ).parent(input.uniform+"Input"), 
          input["Paragraph"] = p.createP( value ).parent(input.uniform+"Value")
        }
      })

      MediaRecorder = Recorder(title)
      Overlay = Controls( p,title,parent )

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
      if ( isPlaying ) {
        if ( !drawPauseTimer ) drawPlayTimer = p.millis()
        else if ( drawPauseTimer ) drawPlayTimer = p.millis() - drawPauseTimer   
      } else  drawPauseTimer = p.millis() - drawPlayTimer
    }

  }
  
  return <SketchLayout parentRef={parentRef} inputs={inputs}/>
}


