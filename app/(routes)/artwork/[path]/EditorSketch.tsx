
"use client"
import { useState, useRef, useEffect } from "react"

export default function EditorSketch({ path }) {
    
  function sketch( p5, parentRef ) {

    let texture
    let fg
    let Shader 
    
    p5.preload = () => {
      Shader = p5.loadShader("/shaders/standard.vert", "/shaders/colors.frag")
      texture = p5.loadImage( `/images/${ path }` )
      fg = p5.loadImage( `/images/industrial_ocean.jpg` )
    }

    p5.setup = () =>  {
      p5.createCanvas( 
        document.getElementById( "canvasParent" ).offsetWidth,
        document.getElementById( "canvasParent" ).offsetHeight,
        p5.WEBGL
      ).parent( parentRef )

    }

    p5.draw = () => {

      Shader.setUniform( "u_resolution", [ p5.width, p5.height ])
      Shader.setUniform( "u_background", texture )
      Shader.setUniform( "u_foreground", fg )
      Shader.setUniform( "u_time", p5.millis() / 1000 )

      p5.shader( Shader )
      p5.rect( 0, 0 , 0 )

    }

   
    p5.windowResized = () => {
      p5.resizeCanvas(
        document.getElementById( "canvasParent" ).offsetWidth,
        document.getElementById( "canvasParent" ).offsetHeight
      )
    }

  }

  
  async function InitP5() {
    const p5 = (await import( "p5" )).default
    const p = new p5( sketch, parentRef.current )
    return p
  }


  let mp5: any = null
  let parentRef = useRef()
  const [ isMounted, setIsMounted ] = useState( false )

    
  useEffect( () => { if( !isMounted ) setIsMounted( true ) }, [])


  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5()
    else mp5.remove()
  }, [ isMounted ])

  useEffect(() => {}, [ sketch ])

  return (
    <div
      ref={ parentRef } 
      id="canvasParent"
      className="h-full w-screen" 
  />
  )
}

