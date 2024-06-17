
"use client"
import { useState, useRef, useEffect } from "react"
import { familySketch as sketch } from "./family-sketch"

export default function FamilySketch() {
  let mp5 = null
  const parentRef = useRef()
  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { setIsMounted( true ) }, [])

  async function initSketch() {
    const p5 = ( await import( "p5" )).default
    return new p5( sketch, parentRef.current )
  }

  useEffect(() => {
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = initSketch()
    else mp5.remove()
  }, [ isMounted ] )

  useEffect(() => {}, [ sketch ])

  return ( 
    <div className="flex flex-col items-center min-w-[300px] max-w-[1200px]" ref={ parentRef } /> 
  )
}
