
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

  let inputs = []
  let textures = []
  let transitions

  shaders.map( shader => {
    inputs.push( ...shader.inputs )
    textures.push(...shader.textures )
    transitions = shader.transitions
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
    let seconds
    let changeEvery = 3
    let ActiveShader
    let Overlay, MediaRecorder
    let Parent = parentRef.current 
    let isPlaying = false, drawPlayTimer = 0, drawPauseTimer = 0

    p.preload = () => {

      noises && noises.map( noise => {
        noise["Noise"] = p.loadImage( noise.blob )
      })  
      
      images.map( img => {
        img["Image"] = p.loadImage( img.blob )
      })

      shaders.map( shader => {
        shader["Shader"] = p.loadShader( vert, shader.frag ) 
      })

    }
  
  
    p.setup = () => {
      p.pixelDensity(1)
      ActiveShader = shaders[idx]["Shader"]
      transitions && ActiveShader.setUniform( "u_noise", noises[ 0 ]["Noise"] )
      createElements(Parent)
    }
  
    p.draw = () => {
      Overlay.sketchTime.html(`${ p.round( drawPlayTimer / 1000 )} seconds`)

      inputs.map(( input ) => {
        input["Paragraph"].html( input["Slider"].value() )
        ActiveShader.setUniform( input.uniform, input["Slider"].value() )
      })
  
      transitions ?? textures.map(( texture ) => {
        ActiveShader.setUniform( texture.uniform, images[ idx ]["Image"])
      })
      
      handleControls()
      p.shader(ActiveShader)
      p.rect(0,0,0)
    }

    function handleControls() {
      if (isPlaying) {
        if ( !drawPauseTimer ) drawPlayTimer = p.millis()
        else if ( drawPauseTimer ) drawPlayTimer = p.millis() - drawPauseTimer
        seconds = drawPlayTimer / 1000 
        ActiveShader.setUniform( "u_time", drawPlayTimer / 1000 )
        transitions && handleTransitions()
      } 

      if (!isPlaying) {
        drawPauseTimer = p.millis() - drawPlayTimer
        seconds = drawPauseTimer / 1000
      }
    }

    function handleTransitions() {
      if ( seconds < changeEvery ) {
        ActiveShader.setUniform( "u_background",  images[ idx ]["Image"])
        ActiveShader.setUniform( "u_foreground", images[ idx + 1 ]["Image"]) 
      }
      else if ( images.length-2 > idx ) {
        idx+=1
        changeEvery += 3
        ActiveShader.setUniform( "u_timeout", drawPlayTimer )
      } 
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

  }
  
  return <SketchLayout parentRef={parentRef} inputs={inputs}/>
}


