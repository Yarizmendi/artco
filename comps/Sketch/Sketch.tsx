

"use client"
import { useState, useRef, useEffect } from "react"

function Sketch({ id, data, sketch, ...props }) {

  let mp5: any = null
  let canvasRef = useRef()
  const [ isMounted, setIsMounted ] = useState( false )

  async function InitP5( sketch, canvasRef ) {
    const p5 = (await import( "p5" )).default
    return new p5( sketch, canvasRef.current )
  }

  useEffect(() => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, canvasRef )
    else mp5.remove()
  }, [ isMounted ])

  useEffect(() => {}, [ sketch ])

  return <div { ...props } ref={ canvasRef }  />

}

export default Sketch
