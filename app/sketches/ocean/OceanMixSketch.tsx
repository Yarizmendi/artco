// @ts-nocheck

"use client"
import { useState, useRef, useEffect } from "react"
import sketch from "./sketch"
import InitP5 from "../../lib/InitP5"

export default function OceanMixSketch() {

  let mp5: any = null
  let parentRef = useRef()

  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else mp5.remove()
  }, [ isMounted ])

  const sliderCmptStyle = "w-[130px] flex justify-around items-center text-xs"

  return (
    <div>
      <div ref={ parentRef } id="canvasParent" className="h-[400px] w-full"  />
      <div id="timerParent" className="border-b p-2 flex justify-end text-sm" />
      <div className="flex p-2">
        <div id="topSliderParent" className={ sliderCmptStyle } />
        <div id="btmSliderParent" className={ sliderCmptStyle } />
      </div>
    </div>
  )
}