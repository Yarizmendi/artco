
"use client"
import { useState, useRef, useEffect } from "react"

function SimpleSketch() {

  let mp5: any = null
  let parentRef = useRef()

  const getWidth = () => document.getElementById("canvasParent").offsetWidth
  const getHeight = () => document.getElementById("canvasParent").offsetHeight

  let sketch = ( p5, parentRef ) => {

    p5.preload = ( parentRef) => {
      p5.loadFont( 'fonts/cabalFont.ttf' )
    }

    p5.setup = ( parentRef) => {
      const canvas = p5.createCanvas( getWidth(), getHeight(), p5.WEBGL )
      canvas.parent( parentRef )
      canvas.pixelDensity( 1 )
    }

    p5.draw = ( parentRef ) => {
      setTimer( p5.round( p5.millis() / 1000.0 ))
      p5.background( 0, 1, 0, 0 )
      p5.rect( 50, 50, 50 )
    }

    p5.windowResized = () => p5.resizeCanvas( getWidth(), getHeight() )
  
  }


  async function InitP5( sketch, parentRef ) {
    const p5 = (await import( "p5" )).default
    return new p5( sketch, parentRef.current )
  }
  
  const [ timer, setTimer ] = useState( null )
  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
  }, [ isMounted ])

  useEffect( () => { if( !isMounted ) setIsMounted( true ) }, [])

  return (
    <div ref={ parentRef }
      id={"canvasParent"}
      className="border-2 border-blue-500 text-xs flex">

      <menu className="border-2 border-white flex flex-col w-1/3">
       <p>sketch time: { timer }</p> 
        <div className="border-2 border-green-500 h-1/2"
          > <h2>Next Controls </h2>
        </div>
        <div className="border-2 border-purple-500 h-1/2"
          > <h3>P5 Controls </h3>
        </div>
      </menu>
    </div> 
  )
}


export default SimpleSketch

