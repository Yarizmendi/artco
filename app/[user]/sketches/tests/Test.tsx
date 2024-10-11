
"use client"
import Image from "next/image"
import classnames from "classnames"
import { Controls } from "@/p5/Controls"
import { Recorder } from "@/p5/Recorder"
import { P5Provider } from "hooks/contexts/useP5"
import { createSliders, handleSliders, Sliders } from "../helpers/Sliders"
import p5Types from "p5"
import { off } from "process"

export default function PathSKetch({
  title, vert, frag, displayName, description,
  images, inputs, textures, noises, transitions
}) {

  function sketch(
    p: p5Types, 
    Parent, 

) {

    let idx = 0
    let seconds = 0
    let changeEvery = 2500
    let ActiveShader = null
    let Overlay, MediaRecorder
    let isPlaying = true, drawPlayTimer = 0, drawPauseTimer = 0

    let mainCanvas
    let topLayer
    let shaderLayer
    let offest = 5

    let x1, y1
    let x2, y2
    let x3, y3
    let x4, y4


    p.preload = () => {
      images.map(img => img["Image"] = p.loadImage(img.blob))
      noises.map(noise => noise["Noise"] = p.loadImage(noise.blob))  
      ActiveShader = p.loadShader(vert, frag) 
    }
  
    p.setup = () => {

   

      topLayer = p.createGraphics(Parent.offsetWidth, Parent.offsetHeight)
      mainCanvas = p.createCanvas(Parent.offsetWidth, Parent.offsetHeight, p.WEBGL).parent("Parent")
      shaderLayer = p.createFramebuffer({ width: Parent.offsetWidth, height: Parent.offsetHeight })

      p.imageMode(p.CENTER)
      // p.background(220)
      p.image( shaderLayer, 0, 0, Parent.offsetWidth, Parent.offsetHeight, 0, 0, shaderLayer.width, shaderLayer.height, p.COVER)
   
    
      topLayer.background(0)
      topLayer.strokeWeight(.5)
      topLayer.noFill()
      topLayer.blendMode(p.REMOVE)


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
        setTimeout(() => document.getElementById("playbtn").click(), 500)
      })

      Overlay.downloadBtn.mouseClicked(() => {
        p.save(title + p.frameCount)
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

    let angle = 45;

    p.draw = () => {


      Overlay.sketchTime.html(`${ p.round(drawPlayTimer/1000)} seconds`)
      noises && noises.length && ActiveShader.setUniform("u_noise", noises[0]["Noise"])
      textures && textures.map((texture, i) => ActiveShader.setUniform(texture.uniform, images[i + idx]["Image"]))
      
      handleSliders({ inputs, ActiveShader })
      handleControls()

      shaderLayer.begin()
      p.shader(ActiveShader) 
      p.rect(0,0,0) 
      shaderLayer.end()
      
      p.scale(1,-1)
      p.image( shaderLayer, 0, 0, Parent.offsetWidth, Parent.offsetHeight, 0, 0, shaderLayer.width, shaderLayer.height, p.COVER)

  
      x1 = p.noise(offest+5)*topLayer.width
      x2 = p.noise(offest+10)*topLayer.width
      x3 = p.noise(offest+15)*topLayer.width
      x4 = p.noise(offest+20)*topLayer.width

      y1 = p.noise(offest+25)*topLayer.height*2
      y2 = p.noise(offest+30)*topLayer.height*2
      y3 = p.noise(offest+35)*topLayer.height*2
      y4 = p.noise(offest+40)*topLayer.height*2
 
      offest += .005



      // topLayer.begin()
      // p.rotateY( drawPlayTimer/ 2000 )
      topLayer.bezier(x1, x2, x3, x4, y1, y2, y3, y4)
      // topLayer.bezier(-x1, x2, x3, x4, y1, y2, y3, y4)
      // topLayer.bezier(-x1, -x2, -x3, x4, y1, y2, y3, y4)
      // topLayer.bezier(-x1, -x2, -x3, -x4, y1, y2, y3, y4)
 
      // topLayer.bezier(-x1, -x2, -x3, -x4, -y1, y2, y3, y4)
      // topLayer.bezier(-x1, -x2, -x3, -x4, -y1, -y2, y3, y4)
      // topLayer.bezier(-x1, -x2, -x3, -x4, -y1, -y2, -y3, y4)
      topLayer.bezier(-x1, -x2, -x3, -x4, -y1, -y2, -y3, -y4)
 

      // topLayer.bezier( p.pmouseX, p.pmouseY, p.mouseX, p.mouseY,  p.pmouseX, p.pmouseY, p.mouseX, p.mouseY)


      p.scale(1,-1)
      // p.rotateZ( p.frameCount/100 )
      p.rotateZ( p.frameCount/240 )
      p.image(topLayer, 0, 0, Parent.offsetWidth*2, Parent.offsetHeight*2, 0, 0, p.width, p.height, p.COVER)

  
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
       "flex flex-col grow p-4 w-3/5"
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