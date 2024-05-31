
"use client"
import p5Types from "p5"
import { useState, useRef, useEffect } from "react"
import { transitionSketch as sketch } from "./transition-sketch"

export default function SketchContainer() {
  let p5Instance: p5Types = null

  const parentRef = useRef()
  const [ isMounted, setIsMounted ] = useState( false )
  useEffect( () => { setIsMounted( true ) }, [] )

  async function initSketch () {
    const p5 = ( await import( "p5" )).default
    p5Instance = new p5( p => sketch( p, parentRef.current ))
  }

  useEffect( () => {
    if ( !isMounted ) return
    if ( !p5Instance ) initSketch()
    else p5Instance.remove()
  }, [ isMounted ] )

  return <div className="border-4 border-black" ref={ parentRef } />
}
