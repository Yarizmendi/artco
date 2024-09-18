
"use client"
import Image from "next/image"
import classnames from "classnames"
import { Slider } from "@/p5/Slider"
import { Controls } from "@/p5/Controls"
import { Recorder } from "@/p5/Recorder"
import { P5Provider } from "hooks/contexts/useP5"

export default function PathSKetch({
  title, vert, frag, displayName, description,
  images, inputs, textures, noises, transitions
}) {

  function sketch(p){

    let Parent
    let idx = 0
    let seconds = 0
    let ActiveShader
    let Overlay, MediaRecorder
    let changeEvery = 2500
    let isPlaying = false, drawPlayTimer = 0, drawPauseTimer = 0

    let song = null
    let fft = null

    p.preload = () => {
      p.soundFormats('mp3', 'ogg')
      title == "grateful_dead" && (song = p.loadSound('/truckin.mp3'))
      images && images.length && images.map(img => img["Image"] = p.loadImage(img.blob))
      noises && noises.length && noises.map(noise => noise["Noise"] = p.loadImage(noise.blob))  
      ActiveShader = p.loadShader(vert, frag) 
    }
  
    p.setup = () => {
      createSliders()
      createControls()
      song && (fft = new p.constructor.FFT())
      Parent = document.getElementById("Parent")
      p.createCanvas(0, 580, p.WEBGL).parent("Parent").addClass("min-h-[580]")
      p.resizeCanvas(Parent.offsetWidth, Parent.offsetHeight)
    }

    p.draw = () => {
      Overlay.sketchTime.html(`${ p.round(drawPlayTimer/1000)} seconds`)
      noises && noises.length && ActiveShader.setUniform("u_noise", noises[0]["Noise"])
      textures && textures.map((texture, i) => ActiveShader.setUniform(texture.uniform, images[i + idx]["Image"]))
      
      handleSliders()
      handleControls()

      p.shader(ActiveShader)
      p.rect(0,0,0)     
    }

    p.windowResized = () => {
      p.resizeCanvas(Parent.offsetWidth, Parent.offsetHeight)
    }

    function handleControls() {

      if (isPlaying) {

        if (song) {
          let waveform = fft.waveform()
          for (let i = 0; i < waveform.length; i++){
            let x = p.map(i, 0, waveform.length, 0, Parent.offsetWidth);
            let y = p.map( waveform[i], -1, 1, 0, Parent.offsetHeight);
            ActiveShader.setUniform("uWavesX", x)
            ActiveShader.setUniform("uWavesY", y)
          }
        }

        if (!drawPauseTimer) drawPlayTimer = p.millis()
        else if (drawPauseTimer) drawPlayTimer = p.millis() - drawPauseTimer

        seconds = drawPlayTimer/1000 
        ActiveShader.setUniform("u_time", seconds)
      } 

      if (!isPlaying) {
        drawPauseTimer = p.millis() - drawPlayTimer
        seconds = drawPauseTimer/1000
      }

      if (transitions) handleTransitions()

    }

    function handleTransitions() {
      if (seconds > changeEvery && images.length-2 > idx) {
        idx+=1
        changeEvery += 2500
        ActiveShader.setUniform("u_timeout", (p.millis() - drawPlayTimer))
      } 
    }

    function handleSliders() {
      inputs && inputs.length && inputs.map((input) => {
        input["Paragraph"].html( input["Slider"].value())
        ActiveShader.setUniform( input.uniform, input["Slider"].value())
      })
    }

    function createControls() {
      MediaRecorder = Recorder(title)
      Overlay = Controls(p)

      Overlay.playBtn.mouseClicked(() => {
        if (!isPlaying) {
          song && song.play()
          isPlaying = true
          Overlay.playBtnLabel.html("pause")
        }
        else if (isPlaying) {
          song && song.pause()
          isPlaying = false
          Overlay.playBtnLabel.html("play")
        }
      })
    
      Overlay.recordBtn.mouseClicked(() => {
        if (MediaRecorder.state == "inactive") {
          if (!isPlaying) isPlaying = true
          Overlay.playBtnLabel.html("pause")
          Overlay.recordBtnLabel.html("recording")
          Overlay.recordBtn.addClass("text-red-500")
          MediaRecorder.start()
        }
        else if (MediaRecorder.state == "recording") {
          Overlay.playBtnLabel.html("play")
          Overlay.recordBtnLabel.html("record")
          Overlay.recordBtn.removeClass("text-red-500")
          MediaRecorder.stop()
        }
      })

      Overlay.resetBtn.mouseClicked(() => {
        // reset variables
        idx = 0
        seconds = 0
        isPlaying = false
        drawPlayTimer = 0
        drawPauseTimer = 0
        // reset html
        Overlay.playBtnLabel.html("play")
        Overlay.recordBtnLabel.html("record")
        // auto restart after delay
        p.resetShader()
        song && song.stop()
        setTimeout(() => document.getElementById("playbtn").click(), 500)
      })
    }

    function createSliders() {
      inputs && inputs.length && inputs.map( input => {
        if ( input.type == "slider" ) {
          const { min, max, value, step } = input.settings
          input["Slider"] = p.createSlider( min, max, value, step ).parent(input.uniform+"Input"), 
          input["Paragraph"] = p.createP( value ).parent(input.uniform+"Value")
        }
      })
    }

  }

  return (
    <P5Provider sketch={sketch}>
      <div className={classnames(
       "flex flex-col grow p-4"
      )}>
        {(displayName) && <p className={classnames("text-lg uppercase")}>{displayName || "Preview"} sketch</p>}
        <div id="menu" className={classnames("w-full md:min-w-1/3 h-[50px] border-b")} />
        { inputs && inputs.length && inputs.map( (inpt, id) => <Slider key={id} {...inpt} /> )}
        <div className={classnames(
         "flex gap-4 overflow-auto p-4 w-full"
          )}> {images && images.map((img, key) => <Image key={key} src={img.blob} width={100} alt={"img"} height={100} placeholder={"blur"} blurDataURL={"blur64"} />)}
        </div> 
        {description && <p className="text-sm">{description}</p>}
      </div>
  </P5Provider>
  )
}