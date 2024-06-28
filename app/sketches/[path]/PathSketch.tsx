// @ts-nocheck

"use client"
import { useState, useRef, useEffect } from "react"
import InitP5 from "../../lib/InitP5"


export default function PathSKetch({ path }) {

  let mp5: any = null
  let parentRef = useRef()
  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else mp5.remove()
  }, [ isMounted ])

  
  function sketch( p5, parentRef ) {
    let Shader 
    let texture
    let seconds
    let canvasParent 
    let noise

    p5.preload = () => {
      Shader = p5.loadShader("/shaders/standard.vert", "/shaders/basic.frag")
      texture = p5.loadImage(`/images/${ path }`)
      noise = p5.loadImage(`/images/perlin.png`)
    }

    p5.setup = () => {
      p5.pixelDensity(1)
      canvasParent = document.getElementById("canvasParent")
      p5.createCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight, p5.WEBGL ).parent( parentRef )
    }

    p5.draw = () => {
      seconds = p5.millis() / 1000
      Shader.setUniform( "u_time", seconds )
      Shader.setUniform( "u_noise", noise )
      Shader.setUniform( "u_background", texture )
      Shader.setUniform( "u_resolution", [ canvasParent.offsetWidth, canvasParent.offsetHeight ])
      p5.shader( Shader )
      p5.rect( 0 )

    }

    p5.windowResized = () => {
      p5.resizeCanvas( canvasParent.offsetWidth, canvasParent.offsetHeight )
    }

  }

  return (
    <div>
      <div ref={ parentRef } id="canvasParent" className="h-[480px] w-full md:w-5/6 lg:w-4/6 m-auto"  />
    </div>
  )
}