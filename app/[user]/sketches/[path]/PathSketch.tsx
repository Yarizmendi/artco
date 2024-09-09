
"use client"
import p5Types from "p5"
import Image from "next/image"
import classnames from "classnames"
import { Slider } from "@/p5/Slider"
import { Controls } from "@/p5/Controls"
import { Recorder } from "@/p5/Recorder"
import { P5Provider } from "hooks/contexts/useP5"
import { UseStockData } from "app/stocks/UseStockData"

export default function PathSKetch({
  title, vert, frag, displayName, description,
  images, inputs, textures, noises, transitions
}) {

  const {data, error, isLoading} = UseStockData()
  // console.log(data)

  function sketch( p: p5Types ){
    let idx = 0
    let seconds
    let ActiveShader
    let Overlay, MediaRecorder
    let changeEvery = 5
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
      createElements()
    }

    p.draw = () => {
      Overlay.sketchTime.html(`${ p.round( drawPlayTimer / 1000 )} seconds`)

      handleControls()

      inputs.map(( input ) => {
        input["Paragraph"].html( input["Slider"].value()  )
        ActiveShader.setUniform( input.uniform, input["Slider"].value() )
      })
  
      textures.map(( texture, i ) => {
        ActiveShader.setUniform( texture.uniform, images[ i + idx ]["Image"])
      })

      noises && noises.length && ActiveShader.setUniform( "u_noise", noises[ 0 ]["Noise"] )

      p.shader( ActiveShader )
      p.rect( 0, 0, 0 )

    }
    

    function handleControls() {

      if (isPlaying) {
        if ( !drawPauseTimer ) drawPlayTimer = p.millis()
        else if ( drawPauseTimer ) drawPlayTimer = p.millis() - drawPauseTimer

        seconds = drawPlayTimer / 1000 

        if ( transitions ) {
          ActiveShader.setUniform( "u_time", drawPlayTimer / 1000)
          handleTransitions()
        } else {
          ActiveShader.setUniform( "u_time", drawPlayTimer / 1000)
        }

      } 

      if (!isPlaying) {
        drawPauseTimer = p.millis() - drawPlayTimer
        seconds = drawPauseTimer / 1000
      }
    }

    function handleTransitions() {
      if ( drawPlayTimer < changeEvery && images.length-1 > idx ) {
        idx+=1
        changeEvery -= p.millis()
        ActiveShader.setUniform( "u_timeout", p.millis() )
      } 
    }

    function createElements() {
      p.createCanvas( 600, 570, p.WEBGL ).parent("Parent")

      inputs && inputs.length && inputs.map( input => {
        if ( input.type == "slider" ) {
          const { min, max, value, step } = input.settings
          input["Slider"] = p.createSlider( min, max, value, step ).parent(input.uniform+"Input"), 
          input["Paragraph"] = p.createP( value ).parent(input.uniform+"Value")
        }
      })

      MediaRecorder = Recorder(title)
      Overlay = Controls(p)

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
    <P5Provider sketch={sketch}>
      <div className={classnames("flex flex-col md:w-1/2 dark:bg-slate-900 p-4 gap-2")}>
        { (displayName || title) && <p className={classnames("text-lg uppercase")}>{displayName || title} sketch</p> }
        { description && <p className="text-sm">{description}</p> }
        { inputs && inputs.map( (inpt, id) => <Slider key={id} {...inpt} /> )}
        <p className="self-end text-xs">{images.length} images</p>
        <div className="flex flex-wrap w-[500px]">
        { images && images.map(img => <Image src={img.blob} width={100} alt={"img"} height={100} />)}
        </div>
      </div>
      <div className="text-sm p-4 gap-4 flex flex-col h-[600px] w-1/3 overflow-auto">
        { data && data.feed.map(img => <div>
            <p className="text-md max-h-[60px] overflow-hidden">{img.title}</p> 
            <p className="flex text-xs mt-1 justify-end">{img.overall_sentiment_label} {img.overall_sentiment_score}</p>
          </div>
        )}
      </div>
  </P5Provider>
  )
}