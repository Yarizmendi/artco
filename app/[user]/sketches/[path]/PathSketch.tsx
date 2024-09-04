
"use client"
import p5Types from "p5"
import InitP5 from "@/p5/Instance"
import { Controls } from "@/p5/Controls"
import { Recorder } from "@/p5/Recorder"
import { useState, useRef, useEffect } from "react"
import { ShaderIcon } from "@/p5/inputs/ShaderIcon"
import { Slider } from "@/p5/Slider"
import classnames from "classnames"

export default function PathSKetch({ 
  vert,
  frag,
  title, 
  images,
  noises,
  inputs, 
  textures,
  displayName,
  transitions,
  description
}) {

  let mp5 = null
  let parentRef = useRef()
  const [ isMounted, setIsMounted ] = useState(false)

  useEffect(() => { if ( !isMounted ) setIsMounted( true )}, [])

  useEffect( () => { 
    if ( isMounted ) {
      if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
      else return mp5.remove() 
  }}, [ isMounted ]) 

  function sketch( p: p5Types ) {
    let idx = 0
    let seconds
    let ActiveShader
    let Overlay, MediaRecorder
    let Parent = parentRef.current && parentRef.current
    let changeEvery = transitions && inputs[2]["settings"].value
    let isPlaying = false, drawPlayTimer = 0, drawPauseTimer = 0

    // Set the noise level and scale.
    let noiseLevel = 1;
    let noiseScale = 0.005;
    // Scale the input coordinate.
    let nt = noiseScale * p.frameCount;
    let pNoise = () => p.round(noiseLevel * p.noise(nt))

    p.preload = () => {
      noises && noises.length && noises.map( noise => {
        noise["Noise"] = p.loadImage( noise.blob )
      })  
      
      images.map( img => {
        img["Image"] = p.loadImage( img.blob )
      })

      ActiveShader = p.loadShader( vert, frag ) 
    }
  
    p.setup = () => {
      createElements(Parent)
    }

    p.draw = () => {
      Overlay.sketchTime.html(`${ p.round( drawPlayTimer / 1000 )} seconds`)

      handleControls()

      inputs.map(( input ) => {
        input["Paragraph"].html( input["Slider"].value() + pNoise() )
        ActiveShader.setUniform( input.uniform, input["Slider"].value() + pNoise() )
      })
  
      textures.map(( texture, i ) => {
        ActiveShader.setUniform( texture.uniform, images[ i + idx ]["Image"])
      })

      noises && noises.length && ActiveShader.setUniform( "u_noise", noises[ 0 ]["Noise"] )

      p.shader( ActiveShader )
      p.rect( 0, 0, 0 )

    }
    
    p.windowResized = () => {
      // @ts-ignore
      p.resizeCanvas( Parent.offsetWidth, Parent.offsetHeight )
    }

    function handleControls() {

      if (isPlaying) {
        if ( !drawPauseTimer ) drawPlayTimer = p.millis()
        else if ( drawPauseTimer ) drawPlayTimer = p.millis() - drawPauseTimer

        seconds = drawPlayTimer / 1000 

        if ( transitions ) {
          ActiveShader.setUniform( "u_time", drawPlayTimer )
          handleTransitions()
        } else {
          ActiveShader.setUniform( "u_time", drawPlayTimer / 1000 )
        }

      } 

      if (!isPlaying) {
        drawPauseTimer = p.millis() - drawPlayTimer
        seconds = drawPauseTimer / 1000
      }
    }

    function handleTransitions() {
      if ( seconds > changeEvery && images.length-1 > idx ) {
        idx+=1
        inputs[2] ? changeEvery += inputs[2]["Slider"].value(): changeEvery += 5
        ActiveShader.setUniform( "u_timeout", drawPlayTimer )
      } 
    }

    function createElements(parent) {
      p.createCanvas( parent.offsetWidth, parent.offsetHeight, p.WEBGL ).parent( parent )

      inputs && inputs.length && inputs.map( input => {
        if ( input.type == "slider" ) {
          const { min, max, value, step } = input.settings
          input["Slider"] = p.createSlider( min, max, value, step ).parent(input.uniform+"Input"), 
          input["Paragraph"] = p.createP( value ).parent(input.uniform+"Value")
        }
      })

      MediaRecorder = Recorder(title)
      Overlay = Controls( p )

      Overlay.playBtn.mouseClicked(() => {
        if ( !isPlaying ) {
          isPlaying = true
          Overlay.playBtnLabel.html("pause")
        }
        else if ( isPlaying ) {
          isPlaying = false
          Overlay.playBtnLabel.html("play")
        }
      })
    
      Overlay.recordBtn.mouseClicked(() => {
        if ( MediaRecorder.state == "inactive") {
          if ( !isPlaying ) isPlaying = true
          Overlay.playBtnLabel.html("pause")
          Overlay.recordBtnLabel.html("recording")
          Overlay.recordBtn.addClass("text-red-500")
          MediaRecorder.start()
        }
        else if ( MediaRecorder.state == "recording" ) {
          if ( isPlaying ) isPlaying = false
          Overlay.playBtnLabel.html("play")
          Overlay.recordBtnLabel.html("record")
          Overlay.recordBtn.removeClass("text-red-500")
          MediaRecorder.stop()
        }
      })

      Overlay.resetBtn.mouseClicked(() => {
        isPlaying = false
        drawPlayTimer = 0
        drawPauseTimer = 0
        Overlay.playBtnLabel.html("play")
        Overlay.recordBtnLabel.html("record")
        setTimeout(() => document.getElementById("playbtn").click(), 1000)
      })

    }
  }

  return (
    <div className={classnames("flex grow flex-col md:flex-row dark:bg-slate-950")}>
      <div className={classnames("h-full w-[80px]")} />
      <div className={classnames("min-h-[550px] w-full md:w-1/2 md:h-full flex justify-center text-[30px]")}
       ref={parentRef} 
       id={"Parent"} />
      <div className={classnames("flex h-full w-[80px] md:flex-col")}>
        { inputs && inputs.map( inpt => <ShaderIcon {...inpt} />)}
      </div>
      <div className={classnames("flex flex-col md:w-1/2 dark:bg-slate-900 p-4 gap-2")}>
        { displayName && <p className={classnames("text-lg uppercase")}>{displayName} sketch</p> }
        { description && <p className="text-sm">{description}</p> }
        { inputs && inputs.map( inpt => <Slider key={inpt.id} {...inpt} /> )}
      </div>
      <div className={classnames("h-full w-[80px]")} />
      <a id="download" className="hidden"/>
  </div>
  )
}