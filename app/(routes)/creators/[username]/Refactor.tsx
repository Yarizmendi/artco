
"use client"
import p5Types from "p5"
import Image from "next/image"
import classnames from "classnames"
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { useRef, useState } from "react"
import { toBlobURL } from "@ffmpeg/util"
import { fetchFile } from "@ffmpeg/util"
import { Controls } from "@/p5/Controls"
import { Recorder } from "@/p5/Recorder"
import { CanvasCapture } from 'canvas-capture'
import { P5Provider } from "hooks/contexts/useP5"
import { CreateSliders, HandleSliders, Sliders } from "../helpers/Sliders"
import { put } from "@vercel/blob"

export default function PathSKetch({
  title, vert, frag, displayName, description,
  images, inputs, textures, noises, transitions, shaderOptions
}) {

    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const gifRef = useRef<HTMLImageElement | null>(null);
    const messageRef = useRef<HTMLParagraphElement | null>(null);

  function sketch(
    p: p5Types, 
    Parent, 
) {
    let amp = 0    
    let fft = null
    let song = null
    let spectrum = null

    let idx = 0
    let Overlay
    let seconds = 0
    let MediaRecorder

    let arrayBuffers = []
    let startMillis = null
    let framesRecordedCount = 0
    const ffmpeg = ffmpegRef.current

    const frameRate = 60
    let fragSelect = null
    let changeEvery = 2500
    let ActiveShader = null
    let isPlaying = false, isRecording = false
    let drawPlayTimer = 0, drawPauseTimer = 0

    const PreloadSong = () => {
      // @ts-ignore
      p.soundFormats('mp3', 'ogg')
      // @ts-ignore
      song = p.loadSound('https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/songs/piano.mp3')
      // @ts-ignore
      title == "grateful_dead" && (song = p.loadSound('https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/songs/truckin.mp3'))
    }

    const PreloadImages = () => {
      images && images.length && images.map(img => img["Image"] = p.loadImage(img.blob))
    }

    const PreloadNoise = () => {
      noises && noises.length && noises.map(noise => noise["Noise"] = p.loadImage(noise.blob))
    }

    const PreloadShaders = () => {
      ActiveShader = p.loadShader(vert, frag) 
    }
    
    const PreloadFFMEPG = async () => {
      setIsLoading(true);
      const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.5/dist/umd";
      const ffmpeg = ffmpegRef.current;

      ffmpeg.on('log', ({ message }) => {
        // messageRef.current.innerHTML = message;
        console.log(message);
      });

      // @ts-ignore
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

 
    p.preload = () => {
      PreloadSong()
      PreloadNoise()
      PreloadImages()
      PreloadFFMEPG()
      PreloadShaders()
    }


    const SetupCanvas = () => {
      p.frameRate(frameRate)
      // ensures canvas is sized to parent on all screen sizes
      p.createCanvas(Parent.offsetWidth, Parent.offsetHeight, p.WEBGL).parent("Parent").addClass("min-h-[500px]")
      p.resizeCanvas(Parent.offsetWidth, Parent.offsetHeight)
    }

    const CreateControls = () => {
      MediaRecorder = Recorder(title, ffmpegRef.current, videoRef)
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
          song && song.play()
          song.S
          isRecording = true;
          isPlaying = true;
          Overlay.playBtnLabel.html("pause")
          Overlay.recordBtnLabel.html("recording");
          Overlay.recordBtn.addClass("text-red-500");
        }
        else if (isRecording) {
          isPlaying = false;
          song && song.pause()
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

    const InitializeAudio = () => {
      // @ts-ignore
      song && (fft = new p.constructor.FFT())
      // fftanaylsis = fft.analyze()
    }

    const CreateShaderDropdown = ({ ActiveShader, shaderOptions }): { fragSelect } => {
     // create a fragment shader input switcher
     p.shader(ActiveShader)

     const testFrag = "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders"
     fragSelect = p.createSelect().parent("menu").addClass("bg-slate-200 dark:bg-slate-950")
     fragSelect.selected("/test.frag")

     shaderOptions && shaderOptions.map(shader => {
        const shaderName = shader.pathname.split("/")[1]
        const shaderUrl = shader.url
        return fragSelect.option(shaderName, shaderUrl)
     })
     fragSelect.changed(() => HandleShaderChange(fragSelect.value()))
     return fragSelect
    }


    p.setup = () => {
      SetupCanvas()
      CreateControls()
      InitializeAudio()

      CreateSliders({ inputs, p })
      CreateShaderDropdown({ ActiveShader, shaderOptions})
    }


    async function createMP4Video() {
      /**
       * Write files to FFmpeg filesystem
       */
      const ffmpeg = ffmpegRef.current;

      try {
        // Run the FFmpeg command to create a video
         await ffmpeg.exec([
          // Input framerate - how many images per second
          '-framerate', `${frameRate}`,
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

        // Read the video file from FFmpeg's virtual filesystem
        const videoData = (await ffmpeg.readFile("output.mp4")) as any;

        // Create a URL for the video file
        if (videoRef.current) {

          const rawVideoBlob = new Blob([videoData.buffer], { type: "video/mp4" })
          const videoMp4Url = URL.createObjectURL(rawVideoBlob)
          videoRef.current.src = videoMp4Url;

          const videoElement = document.querySelector('video');
          const link = document.createElement('a');
          link.href = videoElement.src;
          link.download = 'video.mp4';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          await ffmpeg.exec([
            '-pattern_type', 'glob',
            '-i', 'img*.jpg',
            'output.gif'
          ]);
  
          // Read the video file from FFmpeg's virtual filesystem
          const gifData = (await ffmpeg.readFile("output.gif")) as any;

          if ( gifRef.current) {
            const rawGifData = new Blob([gifData.buffer], { type: "image/gif" })
            const gifSrcUrl = URL.createObjectURL(rawGifData)
            gifRef.current.src = gifSrcUrl

            const gifElement = document.getElementById('gif');
            const link = document.createElement('a');
            // @ts-ignore
            link.href = gifElement.src;
            link.download = 'video.gif';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }

        //   await put(
        //     "videos/" + "test.mp4", 
        //     rawVideoBlob, 
        //     {
        //       access: 'public', 
        //       token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
        //       contentType: "video/mp4" 
        //     })
        }

      }
      catch (error) {
        console.error('Error creating video:', error);
      }

      console.log('Video creation complete! view in the video component');
      return true
    }

    const HandleTimer = () => {
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
    }

    function HandleControls() {

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

      if (transitions) HandleTransitions()

    }

    const HandleRecording = () => {
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
    }

    const HandleSketchTimer = () => {
      // Update Seconds Running Timer
      Overlay.sketchTime.html(`${ p.round(drawPlayTimer/1000)} seconds`)
    }

    const HandleShaderChange = (fragUrl) => {
      p.loadShader(vert, fragUrl, (shader) => { 
        ActiveShader = shader 
        p.shader(ActiveShader)
      })
    }


    const HandleShaderDraw = () => {
      noises && noises.length && ActiveShader.setUniform("u_noise", noises[0]["Noise"])
      textures && textures.map((texture, i) => ActiveShader.setUniform(texture.uniform, images[i + idx]["Image"]))
    }

    
    function HandleTransitions() {
      if (seconds > changeEvery && images.length-2 > idx) {
        idx+=1
        changeEvery += 2500
        ActiveShader.setUniform("u_timeout", (p.millis() - drawPlayTimer))
      } 
    }

    
    function HandleSongDraw(song) {
      let waveform = fft.waveform()
      amp = fft.getEnergy("bass", "treble") 
      let x, y
      if (song) {
        for (let i = 0; i < waveform.length; i++){
          x = p.map(i, 0, waveform.length, 0, Parent.offsetWidth);
          y = p.map( waveform[i]*100000, -1, 1, 0, Parent.offsetHeight);
          ActiveShader.setUniform("uWavesX", amp)
          ActiveShader.setUniform("uWavesY", amp)

          // console.log("waveform", x, y)
    
          // console.log("waveform", waveform[i])
        }
      }
      return(y)
    }

    p.draw = () => {
      HandleControls()
      HandleRecording()
      HandleShaderDraw()
      HandleSketchTimer()

      HandleSongDraw(song)
      HandleSliders({ inputs, ActiveShader })

      p.rectMode(p.CENTER)
      p.rect(0,0,0)    
      
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
           {/* @ts-ignore */}
          <Image id="gif" ref={gifRef} alt={"gif"} width={100} height={100} className="w-[100px] h-[100px]"></Image>
        </div>

      </div>
  </P5Provider>
  )
}