
"use client"
import p5Types from "p5"
import { useState, useRef, useEffect } from "react"
import { transitionSketch as sketch } from "./transition-sketch"

export function TransitionSketch () {

  const parentRef = useRef()
  const [ isMounted, setIsMounted ] = useState< boolean >( false )

  useEffect( () => { setIsMounted( true ) }, [] )

  useEffect( () => {
    if ( !isMounted ) return
    let p5Instance: p5Types

    const initP5 = async () => {
      try {
        const p5 = ( await import( "p5" )).default
        new p5( p => {
          sketch( p, parentRef.current )
          p5Instance = p
        })
      } catch ( error ) {
        console.log( error )
      }
    }

    initP5()

    if ( p5Instance ) return p5Instance.remove()

  }, [ isMounted, sketch ] )

  return ( 
    <div ref = { parentRef } />
  )

}



