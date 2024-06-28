// @ts-nocheck

"use client"
import { useState, useRef, useEffect } from "react"
import InitP5 from "../../lib/InitP5"
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
      <div ref={ parentRef } id="canvasParent" className="h-[400px] w-full"  />
    </div> 
  )
}
