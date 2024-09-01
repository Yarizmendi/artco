
"use client"
import p5Types from "p5"
import InitP5 from "@/p5/Instance"
import { Controls } from "@/p5/Controls"
import { Recorder } from "@/p5/Recorder"
import { P5Sketch } from "@/p5/P5Sketch"
import { useState, useRef, useEffect } from "react"

export default function PathSKetch({ 
  id, 
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

    // let inptImg
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

    p.preload = () => {

      noises && noises.map( noise => {
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
        input["Paragraph"].html( input["Slider"].value() )
        ActiveShader.setUniform( input.uniform, input["Slider"].value() + noiseLevel * p.noise(nt))
      })
  
      textures.map(( texture, i ) => {
        ActiveShader.setUniform( texture.uniform, images[ i + idx ]["Image"])
      })

      noises && ActiveShader.setUniform( "u_noise", noises[ 0 ]["Noise"] )

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
        changeEvery += inputs[2]["Slider"].value()
        ActiveShader.setUniform( "u_timeout", drawPlayTimer )
      } 
    }

    function createElements(parent) {
      p.createCanvas( parent.offsetWidth, parent.offsetHeight, p.WEBGL ).parent( parent )

      inputs && inputs.map( input => {
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
        setTimeout( replay, 500 )
      })

      function replay() {
        document.getElementById("playbtn").click()
      }
    }
  }

  return <P5Sketch id={id} description={description} parentRef={parentRef} shaders={inputs} title={ displayName }/>
}