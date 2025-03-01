
"use client"
import Image from "next/image"
import classnames from "classnames"
import { Controls } from "@/p5/Controls"
import { Recorder } from "@/p5/Recorder"
import { useRef, useState } from "react"
import { P5Provider } from "hooks/contexts/useP5"
import p5Types from "p5"
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { toBlobURL } from "@ffmpeg/util"
import { fetchFile } from "@ffmpeg/util"
import { createSliders, handleSliders, Sliders } from "../helpers/Sliders"

export default function PathSKetch({
  title, vert, frag, displayName, description,
  images, inputs, textures, noises, transitions, shaderOptions
}) {

  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const load = async () => {
    setIsLoading(true);
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.5/dist/umd";
    const ffmpeg = ffmpegRef.current;

    ffmpeg.on('log', ({ message }) => {
      // messageRef.current.innerHTML = message;
      console.log(message);
    });

    ffmpeg.on("error", ({ message }) => {
      console.error(message);
      // if (messageRef.current) messageRef.current.innerHTML = message;
    });
    
    ffmpeg.on('progress', ({ progress, time }) => {
      // messageRef.current.innerHTML = `${progress * 100} % (transcoded time: ${time / 1000000} s)`;
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        "text/javascript"
      ),
    });
    setLoaded(true);
    setIsLoading(false);
  }

  function sketch( p: p5Types ){

    let song = null
    let fft = null

    let idx = 0
    let Overlay
    let seconds = 0
    let MediaRecorder
    let Parent

    const frameRate = 24
    let fragSelect = null
    let changeEvery = 2500
    let ActiveShader = null
    let isPlaying = false, isRecording = false
    let drawPlayTimer = 0, drawPauseTimer = 0


    p.preload = () => {
      ActiveShader = p.loadShader(vert, frag) 
      images && images.length && images.map(img => img["Image"] = p.loadImage(img.blob))
      noises && noises.length && noises.map(noise => noise["Noise"] = p.loadImage(noise.blob))  
    }
  
    p.setup = () => {
      createSliders()
      // @ts-ignore
      song && (fft = new p.constructor.FFT())
      Parent = document.getElementById("Parent")
      p.createCanvas(0, 650, p.WEBGL).parent("Parent").addClass("min-h-[580]")
      p.resizeCanvas(Parent.offsetWidth, Parent.offsetHeight)
      // MediaRecorder = Recorder(title, ffmpegRef.current, videoRef)
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
      noises && noises.length && ActiveShader.setUniform("u_noise", noises[0]["Noise"])
      textures && textures.map((texture, i) => ActiveShader.setUniform(texture.uniform, images[i + idx]["Image"]))
      
      handleSliders()
      handleControls()

      p.shader(ActiveShader)
      p.rectMode(p.CENTER)
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