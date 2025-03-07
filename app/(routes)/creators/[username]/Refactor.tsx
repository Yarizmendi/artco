
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
import { CreateSliders, HandleSliders, Sliders } from "../../../../comps/P5/helpers/Sliders"
// import { put } from "@vercel/blob"

export default function PathSKetch({
  title, vert, frag, displayName, description, notes,
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
    let songUrl = "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/songs/piano.mp3"

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
      song = p.loadSound(songUrl)
      // @ts-ignore
      title == "grateful_dead" && (song = p.loadSound('https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/songs/truckin.mp3'))
    }

    const PreloadImages = () => {
      images && images.length && images.map(img => img["Image"] = p.loadImage(img.blob))
      notes && notes.length && notes.map(note => note["Note"] = p.loadImage(note.blob))
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
      // PreloadSong()
      PreloadNoise()
      PreloadImages()
      PreloadFFMEPG()
      PreloadShaders()
    }


    const SetupCanvas = () => {
      p.frameRate(frameRate)
      // ensures canvas is sized to parent on all screen sizes
      p.createCanvas(Parent.offsetWidth, Parent.offsetHeight, p.WEBGL).parent("Parent").class("min-h-[500px] dark:border-[40px] dark:border-zinc-900 dark:rounded-xl")
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
        verbose: true,
        showAlerts: true, 
        showDialogs: true,
       }, 
    );

      Overlay.recordBtn.mouseClicked(() => {
        if (!isRecording) {
          song && song.play()
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
            createMP4Video()
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

    const duration = 6000
    let cur = notes[0]
    let nxt = notes[cur.next]

    const HandleTimer = () => {
      if (startMillis == null) {
        startMillis = p.millis();
      }

      const elapsed = p.millis() - startMillis;
      const t = p.map(elapsed, 0, duration, 0, 1);

      if (t > 1) {
        cur = notes[cur.next]
        nxt = notes[cur.next]
        startMillis = null;
      }
    }

    p.setup = () => {
      SetupCanvas()
      CreateControls()
      // InitializeAudio()
      CreateSliders({ inputs, p })
      CreateShaderDropdown({ ActiveShader, shaderOptions})
      ActiveShader.setUniform("u_first_image", cur["Note"])
      ActiveShader.setUniform("u_second_image", nxt["Note"])
    }


    async function createMP4Video() {
      /**
       * Write files to FFmpeg filesystem
       */
      const ffmpeg = ffmpegRef.current;
      // await ffmpeg.writeFile("song.mpeg", songUrl+"?download=1")

      try {
        // Run the FFmpeg command to create a video
         await ffmpeg.exec([
          // Input framerate - how many images per second
          '-framerate', `${frameRate}`,
          // Tell FFmpeg how our files are named
          '-pattern_type', 'glob',
          '-i', 'img*.jpg',
          // Adds audio to video track
          // '-i', 'song.mpeg', '-map', '0:v', '-map 1:a', '-shortest',
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

        //   await put(
        //     "videos/" + "test.mp4", 
        //     rawVideoBlob, 
        //     {
        //       access: 'public', 
        //       token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
        //       contentType: "video/mp4" 
        //     })
        // }

        await ffmpeg.exec([
          '-pattern_type', 'glob',
          '-i', 'img*.jpg',
          '-framerate', `${frameRate}`,
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
      }

      }
      catch (error) {
        console.error('Error creating video:', error);
      }

      console.log('Video creation complete! view in the video component');
      return true
    }

  

    function HandleControls() {

      if (isPlaying) {
        if (!drawPauseTimer) drawPlayTimer = p.millis()
        else if (drawPauseTimer) drawPlayTimer = p.millis() - drawPauseTimer
        seconds = drawPlayTimer/1000 
        ActiveShader.setUniform("u_time", seconds)
        HandleTimer()
      } 

      if (!isPlaying) {
        drawPauseTimer = p.millis() - drawPlayTimer
        seconds = drawPauseTimer/1000
      }

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
      ActiveShader.setUniform("u_first_image", cur["Note"])
      ActiveShader.setUniform("u_second_image", nxt["Note"])
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
        }
      }
      return(y)
    }

    p.draw = () => {
      HandleControls()
      HandleRecording()
      HandleShaderDraw()
      HandleSketchTimer()
      // HandleSongDraw(song)
      HandleSliders({ inputs, ActiveShader })

      p.rectMode(p.CENTER)
      p.rect(0,0,0)    
      
    }

  }

  return (
    <P5Provider sketch={sketch}>
      <div className={classnames(
       "flex flex-col grow p-6 w-8/12 gap-4"
      )}>
        <div>
          {(displayName) && <p className={classnames("text-lg uppercase")}>{displayName || "Preview"} sketch</p>}
        </div>

        <div id="menu" className={classnames("flex flex-row-reverse items-center gap-4")} />
         <Sliders inputs={inputs} />
     
        <div className={classnames(
         "flex gap-4 overflow-auto w-full"
          )}> {images && images.concat(notes).map((img, key) => <Image className="h-[175px] w-[170px]" key={key} src={img.blob} width={175} alt={"img"} height={175} placeholder={"blur"} blurDataURL={"blur64"} />)}
        </div> 

        <div className="flex gap-8 items-center">
          {/* <p ref={messageRef}></p> */}
          <video ref={videoRef} id="mp4" controls className="w-[200px] h-[200px]"></video>
           {/* @ts-ignore */}
          <Image id="gif" ref={gifRef} alt={"gif"} width={100} height={100} className="w-[200px] h-[170px]"></Image>
        </div>

      </div>
  </P5Provider>
  )
}