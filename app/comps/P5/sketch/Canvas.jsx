
"use client"
import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import InitP5 from "@/p5/InitP5.js"

export default function Canvas() {
  const pathname = usePathname()
  const sketch = dynamic(() => import( `${ pathname }/sketch` ))

  let mp5 = null
  let parentRef = useRef()

  const [ isMounted, setIsMounted ] = useState( false )

  useEffect(() => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else return mp5.remove()
  }, [ isMounted ])


  return (
    <div>
      <div ref={ parentRef } id="canvasParent" className="h-[450px] w-full md:w-4/6 lg:w-2/3 m-auto"  />
    </div>
  )
}