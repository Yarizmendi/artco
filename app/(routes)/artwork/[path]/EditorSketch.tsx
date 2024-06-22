
"use client"
import { useState, useRef, useEffect } from "react"

export default function EditorSketch({ path }) {
    
  function sketch( p5, parentRef ) {

    let texturesArr: any[]
    let texture

    p5.preload = () => {
      texture = p5.loadImage( `/images/${ path }` )
    }

    p5.setup = () =>  {
      p5.pixelDensity(1)
      p5.createCanvas( 
        document.getElementById( "canvasParent" ).offsetWidth,
        document.getElementById( "canvasParent" ).offsetHeight,
        p5.WEBGL
      ).parent( parentRef )
    }

    p5.draw = () => {
      // p5.background( 255 )
      p5.image( texture, 16, 16 )
      // p5.rect( 0, 0, 0 )
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

    
  useEffect(() => setIsMounted( true ), [])


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
      className="h-[400px] w-1/2 m-4 border-2" 
    /> 
  )
}

