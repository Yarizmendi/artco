
"use client"
import { useState, useRef, useEffect } from "react"
import InitP5 from "@/p5/InitP5.js"
import sketch from "./sketch"

export default function StemSketch() {
  let mp5 = null
  let parentRef = useRef()

  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => {
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else mp5.remove()
  }, [ isMounted ] )

  return (
    <div>
      <div ref={ parentRef } id="canvasParent" className="h-[450px] w-full md:w-5/6 lg:w-4/6 m-auto"  />
    </div> 
  )
}
