
"use client"
import p5Types from "p5"
import Image from "next/image"
import classnames from "classnames"
import { Controls } from "@/p5/Controls"
import { Recorder } from "@/p5/Recorder"
import { P5Provider } from "hooks/contexts/useP5"
import { createSliders, handleSliders, Sliders } from "../helpers/Sliders"
// import { CCapture } from "ccapture.js"
import { CanvasCapture } from 'canvas-capture';
import { headers } from "next/headers"
import Home from "app/ffmpeg/page"
import { useRef, useState } from "react"
import { FFmpeg } from "@ffmpeg/ffmpeg"
import { toBlobURL } from "@ffmpeg/util"
import JSZip from "jszip"
import { f } from "@nextui-org/slider/dist/use-slider-a94a4c83"

export default function PathSKetch({
  title, vert, frag, displayName, description,
  images, inputs, textures, noises, transitions, shaderOptions
}) {

  const fps = 30
  const duration = 500
  const imageFiles = [];

    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const messageRef = useRef<HTMLParagraphElement | null>(null);

    const load = async () => {
      setIsLoading(true);
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
      const ffmpeg = ffmpegRef.current;
      ffmpeg.on("log", ({ message }) => {
        if (messageRef.current) messageRef.current.innerHTML = message;
      });
      // toBlobURL is used to bypass CORS issue, urls with the same
      // domain can be used directly.
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
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
      load()
    }

    const frameRate = 24
  
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

      
    // Initialize and pass in canvas.
    CanvasCapture.init(
      // @ts-ignore
      document.getElementById('defaultCanvas0'),
      { 
        showRecDot: true,
        verbose: true,
        // showAlerts: true, // Default is false.
        // Show informational dialogs during export.
        // showDialogs: true, // Default is false.
        ffmpegCorePath: './node_modules/@ffmpeg/core/dist/ffmpeg-core.js', 
       }, 
    );


      Overlay.recordBtn.mouseClicked(() => {
        // if (MediaRecorder.state == "inactive") {
        if (CanvasCapture.isRecording() == false) {
          if (!isPlaying) isPlaying = true
          Overlay.playBtnLabel.html("pause")
          Overlay.recordBtnLabel.html("recording")
          Overlay.recordBtn.addClass("text-red-500")
          // MediaRecorder.start()
          CanvasCapture.beginJPEGFramesRecord(jpegOptions);
        }
        else if (CanvasCapture.isRecording() == true) {
          Overlay.playBtnLabel.html("play")
          Overlay.recordBtnLabel.html("record")
          Overlay.recordBtn.removeClass("text-red-500")
          // MediaRecorder.stop()
          if (isPlaying) isPlaying = false;
          CanvasCapture.stopRecord();
        }
      })

    }


    // let startMillis = null

    let jpegOptions = {
      onExport: (zipFile: Blob, filename: string) => {
        unZipContent({zipFile, log: true})
        .then(zipContent => parallelProcessImgs({ zipContent, log: true }))
        .then(createMP4Video)
        // const url = window.URL.createObjectURL(blob);
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = 'archive.zip';
        // link.click();
        // window.URL.revokeObjectURL(url);
      },  
      onExportProgress: (progress: number) => console.log(progress), // progress: range [0-1]/.
      onError: (error: Error | any) => console.log(error), // Callback on error.
    }

    async function unZipContent({ zipFile, log }: { zipFile: Blob, log: boolean }) {
      /**
       * Load the zip file and return the zip object
       */
      log && console.log('Loading zip file...');
      const zip = new JSZip();
      const zipContent = await zip.loadAsync(zipFile);

      log && zipContent && console.log('Zip file loaded!', zipContent);
      return zipContent;
    }

    async function parallelProcessImgs({ zipContent, log }: { zipContent: any, log: boolean }) {
      /**
       * Process all images in parallel, converting them to Uint8Array
       */
      log && console.log('Processing images in parallel...');
    
      let uIntArray = [];
      let chunkIndex = 0;
      let globalIndex = 0;
      const chunkSize = 10;

      for (let file in zipContent.files) {
        if (chunkIndex < chunkSize) {
          // log && console.log("chunking images...");
          const filename = `img${String(globalIndex).padStart(3, '0')}.jpg`;
          const currFile =  zipContent.files[file];
          const contentPromise = new Promise((resolve, reject) => {
            currFile.async('uint8array').then(content => resolve({ filename, content }))
          });
          uIntArray.push(contentPromise);
          chunkIndex++;
          globalIndex++;
        }
        else {
          log && console.log('Processing chunk of images...');
          const files = await Promise.all(uIntArray);
          log && console.log('Images turned into promises!', uIntArray);
          chunkIndex = 0;
          uIntArray = [];
          
          const ffmpeg = ffmpegRef.current;
          for (let { filename, content } of files) {
              ffmpeg.writeFile(filename, content);
              log && console.log("file written to ffmpeg filesystem...");
              content = null;
          }

          log && console.log( `done uploading chunk to ffmpeg file system ...`);
        }
      }
    }

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
          '-framerate', frameRate.toString(),
          // Tell FFmpeg how our files are named
          '-pattern_type', 'glob',
          '-i', 'img*.jpg',
          // Output video settings
          '-c:v', 'libx264',       // Use H.264 codec
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
          videoRef.current.src = URL.createObjectURL(
            new Blob([videoData.buffer], { type: "video/mp4" })
          );
        }

      }
      catch (error) {
        console.error('Error creating video:', error);
      }

      console.log('Video creation complete! view in the video component');
    }


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

      CanvasCapture.checkHotkeys();
      if (CanvasCapture.isRecording())  CanvasCapture.recordFrame();
    
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
        
        <video ref={videoRef} controls></video>
      </div>
  </P5Provider>
  )
}