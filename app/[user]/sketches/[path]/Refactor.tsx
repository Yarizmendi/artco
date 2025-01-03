
"use client"
import p5Types from "p5"
import Image from "next/image"
import classnames from "classnames"
import { Controls } from "@/p5/Controls"
import { Recorder } from "@/p5/Recorder"
import { P5Provider } from "hooks/contexts/useP5"
import { createSliders, handleSliders, Sliders } from "../helpers/Sliders"

export default function PathSKetch({
  title, vert, frag, displayName, description,
  images, inputs, textures, noises, transitions, shaderOptions
}) {

  const origin = "https://ffmpeg.wide.video";
  const commands = [
    `fetch /videos/highway.webm`,
    `ffmpeg -i input.mp4 -vframes 4 -r .1 output%03d.jpg`];
  const params = {command:commands[0], placeholder:commands[0]};
  const hash = encodeURIComponent(JSON.stringify(params));

  function sketch(
    p: p5Types, 
    Parent, 

) {

    let idx = 0
    let seconds = 0
    let fragSelect = null
    let changeEvery = 2500
    let ActiveShader = null
    let Overlay, MediaRecorder
    let isPlaying, drawPlayTimer = 0, drawPauseTimer = 0

    function handleFragChange(fragUrl) {
      p.loadShader(vert, "/" + fragUrl, (shader) => { 
        ActiveShader = shader 
        p.shader(ActiveShader)
      })
    }

    p.preload = () => {
      images && images.length && images.map(img => img["Image"] = p.loadImage(img.blob))
      noises && noises.length && noises.map(noise => noise["Noise"] = p.loadImage(noise.blob))  
      ActiveShader = p.loadShader(vert, frag) 
    }
  
    p.setup = () => {
      
      // ensures canvas is sized to parent on all screen sizes
      p.createCanvas(Parent.offsetWidth, Parent.offsetHeight, p.WEBGL).parent("Parent").addClass("min-h-[500px]")
      p.resizeCanvas(Parent.offsetWidth, Parent.offsetHeight)

      p.shader(ActiveShader)
      // if ( title == "inbound8661079161443213041.jpg") {
        // create a fragment shader input switcher
        fragSelect = p.createSelect(frag).parent("menu").addClass("bg-slate-200 dark:bg-slate-950")
        shaderOptions && shaderOptions.map(shader => fragSelect.option(shader, shader))
        fragSelect.changed(() => handleFragChange(fragSelect.value()))
      //}
 
      // create sliders and controls
      createSliders({ inputs, p })
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
        p.shader(ActiveShader)
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
      // frameRate.html(`${p.frameRate()}`)
      noises && noises.length && ActiveShader.setUniform("u_noise", noises[0]["Noise"])
      textures && textures.map((texture, i) => ActiveShader.setUniform(texture.uniform, images[i + idx]["Image"]))
      
      handleSliders({ inputs, ActiveShader })
      handleControls()

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
        <div>
          {(displayName) && <p className={classnames("text-lg uppercase")}>{displayName || "Preview"} sketch</p>}
        </div>

        <div id="menu" className={classnames("w-full h-[50px]")} />

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