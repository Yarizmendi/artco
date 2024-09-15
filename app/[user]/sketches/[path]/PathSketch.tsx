
"use client"
import p5Types from "p5"
import Image from "next/image"
import classnames from "classnames"
import { Slider } from "@/p5/Slider"
import { Controls } from "@/p5/Controls"
import { Recorder } from "@/p5/Recorder"
import { P5Context, P5Provider } from "hooks/contexts/useP5"
import { UseStockData } from "app/stocks/UseStockData"
import { useContext } from "react"

export default function PathSKetch({
  title, vert, frag, displayName, description,
  images, inputs, textures, noises, transitions
}) {


  function sketch( p, pSound ){
    let idx = 0
    let seconds = 0
    let ActiveShader
    let Overlay, MediaRecorder
    let changeEvery = 9500
    let isPlaying = false, drawPlayTimer = 0, drawPauseTimer = 0


    let song = null
    let isSongPlaying = false
    let fft = null



    let Parent


    p.preload = () => {

      p.soundFormats('mp3', 'ogg');
      title == "grateful_dead" && (song = p.loadSound('/truckin.mp3'))
    
      noises && noises.length && noises.map( noise => {
        noise["Noise"] = p.loadImage( noise.blob )
      })  
      
      images.map( img => {
        img["Image"] = p.loadImage( img.blob )
      })

      ActiveShader = p.loadShader( vert, frag ) 
    }
  
    p.setup = () => {
      Parent = document.getElementById("Parent")
      song && (fft = new p.constructor.FFT())
      createElements()
      p.resizeCanvas( Parent.offsetWidth, Parent.offsetHeight)
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

    p.windowResized = () => {
      p.resizeCanvas( Parent.offsetWidth, Parent.offsetHeight)
    }


    function handleControls() {

      if (isPlaying) {

        song && !isSongPlaying && song.play()
        song && !isSongPlaying && (isSongPlaying = true)

        if ( song ) {
          let waveform = fft.waveform()
  
          for (let i = 0; i < waveform.length; i++){
            let x = p.map(i, 0, waveform.length, 0, Parent.offsetWidth);
            let y = p.map( waveform[i], -1, 1, 0, Parent.offsetHeight);
            ActiveShader.setUniform( "uWavesX", x)
            ActiveShader.setUniform( "uWavesY", y)
          }
        }

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
        if(isSongPlaying) {
          song.stop()
          isSongPlaying=false
        }
        drawPauseTimer = p.millis() - drawPlayTimer
        seconds = drawPauseTimer / 1000
      }

    }

    function handleTransitions() {
      if ( drawPlayTimer > changeEvery && images.length-2 > idx ) {
        idx+=1
        changeEvery += 9500
        ActiveShader.setUniform( "u_timeout", (p.millis() - drawPlayTimer) )
      } 
    }

    function createElements() {

      let _w = Parent.offsetWidth;
      let _h = Parent.offsetHeight;

      p.createCanvas( _w, _h, p.WEBGL ).parent("Parent")

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
        idx = 0
        drawPlayTimer = 0
        drawPauseTimer = 0
        Overlay.playBtnLabel.html("play")
        Overlay.recordBtnLabel.html("record")
        p.resetShader()
        setTimeout(() => document.getElementById("playbtn").click(), 1000)
      })

      Overlay.downloadBtn.mouseClicked(() => {
        p.saveCanvas(title + p.frameCount)
      })

    }

    
  }


  return (
    <P5Provider sketch={sketch}>

      <div className={classnames("flex flex-col dark:bg-slate-900 px-4 py-2 gap-2")}>

        <div className="w-full min-w-[300px]">
          { (displayName || title) && <p className={classnames("text-lg uppercase")}>{displayName || title} sketch</p> }
          { description && <p className="text-sm">{description}</p> }
          { inputs && inputs.map( (inpt, id) => <Slider key={id} {...inpt} /> )}
          <p className="text-end text-xs">{images.length} images</p>
        </div>

        <div id="menu" />


        <div className="flex flex-wrap gap-4">
        { images && images.map(img => <Image src={img.blob} width={100} alt={"img"} height={100} />)}
        </div> 
      </div>

      {/* <div className="w-full h-[300px] text-sm p-4 gap-4 flex flex-col md:h-[600px] md:w-1/4 overflow-auto">
        { data && data.feed.map(img => <div>
            <p className="text-md max-h-[60px] overflow-hidden">{img.title}</p> 
            <p className="flex text-xs mt-1 justify-end">{img.overall_sentiment_label} <span className="text-green-500"> <p>{img.overall_sentiment_score}</p> </span></p>
            <div className="relative">
            {img.topics && img.topics.map(topic => <p>{topic.topic}</p>)} 
            {img.ticker_sentiment && img.ticker_sentiment.map(topic => <p>{topic.ticker}</p>)} 
            </div>
          </div>
        )} 
      </div> */}

  </P5Provider>
  )
}