

"use client"
import { useState, useRef, useEffect } from "react"
import { colorsSketch as allImages } from "../../api/images"


export default function EditorSketch({ path }) {

  let mp5: any = null
  let parentRef = useRef()

  const [ isMounted, setIsMounted ] = useState( false )

  function sketch( p5 ) {
    let timer
    let changeEvery = 90
    let Shader 
    let textures
    let idx = 0
    
    p5.preload = () => {
      Shader = p5.loadShader("/shaders/standard.vert", "/shaders/colors.frag")
      textures = allImages.map( tex => p5.loadImage(`/images/${ tex.path }`))
    }
  
    p5.setup = ( parentRef ) => {
      p5.pixelDensity(1)
      p5.createCanvas( document.getElementById("editorParent").offsetWidth, document.getElementById("editorParent").offsetHeight, p5.WEBGL ).parent( parentRef )
    }
  
    p5.draw = () => {
      timer = p5.round( p5.millis() / 1000 )
      Shader.setUniform( "u_resolution", [ p5.width, p5.height ])
      Shader.setUniform( "u_background", textures[ idx ] )
      Shader.setUniform( "u_foreground", textures[ idx + 1 ] )
      Shader.setUniform( "u_time", p5.millis() / 1000 )
  
      // if ( timer < changeEvery ) {
      //   Shader.setUniform( "u_foreground", textures[ idx + 1 ]) 
      //   Shader.setUniform( "u_background",  textures[ idx ])
      // }
      // else if ( textures.length-2 > idx ) {
      //   changeEvery += 90
      //   idx+=1
      //   Shader.setUniform( "u_timeout", p5.millis() )
      // } 
  
      p5.shader( Shader )
      p5.rect( 0, 0 , 0 )
  
    }
  
    p5.windowResized = () => {
      p5.resizeCanvas( document.getElementById("editorParent").offsetWidth, document.getElementById("editorParent").offsetHeight )
    }

  }
  

  async function InitP5( sketch, parentRef) {
    const p5 = (await import( "p5" )).default
    const p = new p5( sketch, parentRef.current )
    return p
  }

  useEffect(() => { 
    if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else mp5.remove()
  }, [ isMounted ])

  return (
    <div>
      <div className="h-[480px] w-[900px]" ref={ parentRef } id="editorParent" />
    </div>
  )
}

