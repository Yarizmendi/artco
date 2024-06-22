
"use client"
import { useState, useRef, useEffect } from "react"
// @ts-ignore
import sketch from "./sketch"

function Sketch({ ...props }) {

  let mp5: any = null
  let canvasRef = useRef()
  const [ isMounted, setIsMounted ] = useState( false )


  async function InitP5(  ) {
    const p5 = (await import( "p5" )).default
    const p = new p5( sketch, canvasRef.current )
    return p
  }
  
  useEffect(() => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( )
    else mp5.remove()
  }, [ isMounted ])

  useEffect(() => {}, [ sketch ])

  return <div { ...props } ref={ canvasRef } id="canvasParent" className="h-[400px] w-1/2 m-4 border-2" /> 

}

export default Sketch
