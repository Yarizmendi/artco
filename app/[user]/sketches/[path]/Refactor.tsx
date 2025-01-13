
"use client"
import p5Types from "p5"
import Image from "next/image"
import classnames from "classnames"
import { Controls } from "@/p5/Controls"
import { Recorder } from "@/p5/Recorder"
import { P5Provider } from "hooks/contexts/useP5"
import { createSliders, handleSliders, Sliders } from "../helpers/Sliders"
import { CanvasCapture } from 'canvas-capture';
import { useRef, useState } from "react"
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { toBlobURL } from "@ffmpeg/util"
import { fetchFile } from "@ffmpeg/util"


export default function PathSKetch({
  title, vert, frag, displayName, description,
  images, inputs, textures, noises, transitions, shaderOptions
}) {

    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const messageRef = useRef<HTMLParagraphElement | null>(null);

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
    let isPlaying = false, isRecording = false
    let drawPlayTimer = 0, drawPauseTimer = 0

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
      load()
    }

    const frameRate = 10
  
    p.setup = () => {
      
      p.frameRate(frameRate)
      // ensures canvas is sized to parent on all screen sizes
      p.createCanvas(Parent.offsetWidth, Parent.offsetHeight, p.WEBGL).parent("Parent").addClass("min-h-[500px]")
      p.resizeCanvas(Parent.offsetWidth, Parent.offsetHeight)

      // create a fragment shader input switcher
      p.shader(ActiveShader)
      fragSelect = p.createSelect(frag).parent("menu").addClass("bg-slate-200 dark:bg-slate-950")
      shaderOptions && shaderOptions.map(shader => fragSelect.option(shader, shader))
      fragSelect.changed(() => handleFragChange(fragSelect.value()))

      // create sliders and controls
      createSliders({ inputs, p })
      MediaRecorder = Recorder(title, ffmpegRef.current, videoRef)
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
      
    // Initialize and pass in canvas.
    CanvasCapture.init(
      // @ts-ignore
      document.getElementById('defaultCanvas0'),
      { 
        showRecDot: true,
        verbose: true,
        showAlerts: true, // Default is false.
        // Show informational dialogs during export.
        showDialogs: true, // Default is false.
        // ffmpegCorePath: './node_modules/@ffmpeg/core/dist/ffmpeg-core.js', 
       }, 
    );

      Overlay.recordBtn.mouseClicked(() => {
        if (!isRecording) {
          isRecording = true;
          isPlaying = true;
          Overlay.playBtnLabel.html("pause")
          Overlay.recordBtnLabel.html("recording");
          Overlay.recordBtn.addClass("text-red-500");
        }
        else if (isRecording) {
          isPlaying = false;
          Overlay.playBtnLabel.html("play")
          Overlay.recordBtnLabel.html("record");
          Overlay.recordBtn.removeClass("text-red-500");
          isRecording = false;
          setTimeout(()=>{
            console.log(p.frameCount, arrayBuffers)
            createMP4Video().then(res => alert("video created!"))
          }, 1000)
    
        }
      })

    }


    let arrayBuffers = []
    let framesRecordedCount = 0

    async function createMP4Video() {
      /**
       * Write files to FFmpeg filesystem
       */
      const ffmpeg = ffmpegRef.current;

      try {
        // Run the FFmpeg command to create a video
        console.log('Creating video...');
        await ffmpeg.exec([
          // Input framerate - how many images per second
          '-framerate', '10',
          // Tell FFmpeg how our files are named
          '-pattern_type', 'glob',
          '-i', 'img*.jpg',
          // Output video settings
          '-c:v', 'libx264',       // Use H.264 codec
          '-preset', 'ultrafast',
          '-pix_fmt', 'yuv420p',   // Standard pixel format for compatibility
          '-vf', 'scale=1920:1080',// Scale to 1080p
          // Output filename
          'output.mp4'
        ]);
 
        console.log('Video created!');
        // Read the video file from FFmpeg's virtual filesystem
        const videoData = (await ffmpeg.readFile("output.mp4")) as any;

        // Create a URL for the video file
        if (videoRef.current) {

          const videoMp4Url = URL.createObjectURL(
            new Blob([videoData.buffer], { type: "video/mp4" })
          );

          videoRef.current.src = videoMp4Url;

          const videoElement = document.querySelector('video');
          const link = document.createElement('a');
          link.href = videoElement.src;
          link.download = 'video.mp4';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

      }
      catch (error) {
        console.error('Error creating video:', error);
      }

      console.log('Video creation complete! view in the video component');
      return true
    }

    let startMillis = null
    const ffmpeg = ffmpegRef.current

    p.draw = () => {

      // if (startMillis == null) {
      //   startMillis = p.millis();
      // }

      // const elapsed = p.millis() - startMillis;
      // const t = p.map(elapsed, 0, duration, 0, 1);

      // if (t > 1) {
        // console.log('finished one elapse.');
        // startMillis = null;
        // p.noLoop();
        // CanvasCapture.stopRecord();
      // } 


      if (isRecording) {
 
        const filename = `img${String(framesRecordedCount).padStart(3, '0')}`;
        framesRecordedCount++;
        
        CanvasCapture.takeJPEGSnapshot({
          name: filename,
          onExport: async (jpegBlob, filename) => {
            const jpeg = await fetchFile(jpegBlob);
            await ffmpeg.writeFile(filename, jpeg)
            arrayBuffers.push({ filename, jpeg });
            console.log(arrayBuffers.length);
          }
        })

      } 

      // Update Seconds Running Timer
      Overlay.sketchTime.html(`${ p.round(drawPlayTimer/1000)} seconds`)

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

        <div>
          {/* <p ref={messageRef}></p> */}
          <video ref={videoRef} id="mp4" controls className="max-w-[300px]"></video>
        </div>

      </div>
  </P5Provider>
  )
}