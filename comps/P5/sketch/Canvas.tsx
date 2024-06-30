
"use client"
import { useState, useRef, useEffect } from "react"
import InitP5 from "p5/InitP5.js"
import p5Types from "p5"
type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;

export default function Canvas({ ...props }) {

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

    p5.preload = () => {}

    p5.setup = () => {}

    p5.draw = () => {}

    p5.windowResized = () => {}

  }

  return (
    <div>
      <div ref={ parentRef } id="canvasParent" className="h-[450px] w-full md:w-4/6 lg:w-2/3 m-auto"  />
    </div>
  )
}