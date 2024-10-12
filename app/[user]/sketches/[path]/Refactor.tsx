
"use client"
import Image from "next/image"
import classnames from "classnames"
import { Controls } from "@/p5/Controls"
import { Recorder } from "@/p5/Recorder"
import { P5Provider } from "hooks/contexts/useP5"
import { createSliders, handleSliders, Sliders } from "../helpers/Sliders"
import p5Types from "p5"

export default function PathSKetch({
  title, vert, frag, displayName, description,
  images, inputs, textures, noises, transitions
}) {

  function sketch(
    p: p5Types, 
    Parent, 

) {

    let idx = 0
    let frameRate 
    let seconds = 0
    let changeEvery = 2500
    let ActiveShader = null
    let Overlay, MediaRecorder
    let isPlaying, drawPlayTimer = 0, drawPauseTimer = 0



    p.preload = () => {
      images && images.length && images.map(img => img["Image"] = p.loadImage(img.blob))
      noises && noises.length && noises.map(noise => noise["Noise"] = p.loadImage(noise.blob))  
      ActiveShader = p.loadShader(vert, frag) 
    }
  
    p.setup = () => {
      createSliders({ inputs, p })
    //   frameRate = p.createP(String(p.frameRate()))
      p.createCanvas(Parent.offsetWidth, Parent.offsetHeight, p.WEBGL).parent("Parent")

      MediaRecorder = Recorder(title)
      Overlay = Controls(p)

      Overlay.playBtn.mouseClicked(() => {
        if (!isPlaying) {
          isPlaying = true
          Overlay.playBtnLabel.html("pause")
        }
        else if (isPlaying) {
          isPlaying = false
          Overlay.playBtnLabel.html("play")
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
        setTimeout(() => document.getElementById("playbtn").click(), 500)
      })

      Overlay.downloadBtn.mouseClicked(() => {
        p.saveCanvas(title + p.frameCount)
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

    }

    p.draw = () => {
      Overlay.sketchTime.html(`${ p.round(drawPlayTimer/1000)} seconds`)
    //   frameRate.html(`${p.frameRate()}`)
      noises && noises.length && ActiveShader.setUniform("u_noise", noises[0]["Noise"])
      textures && textures.map((texture, i) => ActiveShader.setUniform(texture.uniform, images[i + idx]["Image"]))
      
      handleSliders({ inputs, ActiveShader })
      handleControls()

      p.shader(ActiveShader)
      p.rectMode(p.CENTER)
      p.rect(0,0,0)     
    }

    function handleControls() {

      if (isPlaying) {

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

  }

  return (
    <P5Provider sketch={sketch}>
      <div className={classnames(
       "flex flex-col grow p-4"
      )}>
        {(displayName) && <p className={classnames("text-lg uppercase")}>{displayName || "Preview"} sketch</p>}
        <div id="menu" className={classnames("w-full md:min-w-1/3 h-[50px] border-b")} />
        <Sliders inputs={inputs} />
        <div className={classnames(
         "flex gap-4 overflow-auto p-4 w-full"
          )}> {images && images.map((img, key) => <Image key={key} src={img.blob} width={100} alt={"img"} height={100} placeholder={"blur"} blurDataURL={"blur64"} />)}
        </div> 
        {/* {description && <p className="text-sm">{description}</p>} */}
      </div>
  </P5Provider>
  )
}