"use client"
import p5Types from "p5"
import { useState, useRef, useEffect } from "react"
import InitP5 from "@/p5/InitP5.js"

type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;

export default function PathSKetch({ path }) {

  let mp5: any = null
  let parentRef = useRef()
  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else return mp5.remove()
  }, [ isMounted ])

  
  const sketch: P5jsSketch  = ( p5, parentRef ) => {
    let Shader 
    let texture
    let seconds
    let canvasParent 
    let noise

    p5.preload = () => {
      Shader = p5.loadShader("/shaders/standard.vert", "/shaders/texture.frag")
      texture = p5.loadImage(`/images/${ path }`)
      noise = p5.loadImage(`/images/perlin.png`)
    }

    p5.setup = () => {
      canvasParent = document.getElementById("canvasParent")
      p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )
    }

    p5.draw = () => {
      seconds = p5.millis() / 1000
      Shader.setUniform( "u_time", seconds )
      Shader.setUniform( "u_noise", noise )
      Shader.setUniform( "u_background", texture )
      p5.shader( Shader )
      p5.rect( 0, 0, 0 )

    }

    p5.windowResized = () => {
      p5.resizeCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight )
    }

  }

  return (
    <div>
      <div ref={ parentRef } id="canvasParent" className="h-[450px] w-full md:w-4/6 lg:w-2/3 m-auto" />
    </div>
  )
}