
"use client"
import { useState, useRef, useEffect } from "react"
import InitP5 from "@/p5/InitP5.js"
import p5Types from "p5"
type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;

export default function WindowSketch() {

  let mp5 = null
  let parentRef = useRef()

  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else return mp5.remove()
  }, [ isMounted ])


  const sketch: P5jsSketch = ( p5, parentRef ) => {
    let bgImg
    let canvasParent
    let seconds
    let Shader

    p5.preload = () => {
      bgImg = p5.loadImage("/images/commision.jpg")
      Shader = p5.loadShader("/shaders/standard.vert", "/shaders/texture.frag")
    }

    p5.setup = () => {
      canvasParent = document.getElementById("canvasParent")
      p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )
    }

    p5.draw = () => {
      seconds = p5.millis() / 1000
      Shader.setUniform( "u_time", seconds )
      Shader.setUniform( "u_background", bgImg )
      Shader.setUniform( "u_resolution", [ canvasParent.offsetWidth, canvasParent.offsetHeight ])
      p5.shader( Shader )
      p5.rect( 0, 0, 0 )
    }

    p5.windowResized = () => {
      p5.resizeCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight )
    }

  }

  return (
    <div>
      <div ref={ parentRef } id="canvasParent" className="h-[450px] w-full md:w-4/6 lg:w-2/3 m-auto"  />
    </div>
  )
}