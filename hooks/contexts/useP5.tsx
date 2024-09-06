
"use client"
import p5Types from "p5"
import classnames from "classnames"
import {createContext, useCallback, useEffect, useState} from 'react'

import { Controls } from "@/p5/Controls"
import { Recorder } from "@/p5/Recorder"

export const P5Context = createContext({
  instRef: null,
  isMounted: false,
})

export function P5Provider({ sketch, children }) {

  let mp5

  async function InitP5({sketch, instRef}) {
    let pImport = (await import("p5")).default
    let p: p5Types = new pImport(sketch, instRef())
    return p
  }

  const [isMounted, setIsMounted] = useState(false)

  const instRef = useCallback(node =>{
    if (node) return node
  }, [])

  useEffect(() => {
    if (!isMounted) setIsMounted(true)}, [])

  useEffect(() => { 
    if (isMounted) {
      if (!mp5) mp5 = InitP5({sketch, instRef})
      else mp5.remove() 
  }}, [isMounted]) 

  return (
    <P5Context.Provider value={{isMounted, instRef}}>
      <div className={classnames("flex grow flex-col md:flex-row dark:bg-slate-950")}>
        <div className={classnames("h-full w-[80px]")} />
        <div ref={instRef} id={"Parent"} className={classnames("min-h-[550px] w-full md:w-1/2 flex justify-center text-[30px] p5_loading")}/>
        <div className={classnames("flex h-full w-[80px] md:flex-col")}/>
          {children}
        <div className={classnames("h-full w-[80px]")} />
        <a id="download" className="hidden"/>
      </div>
    </P5Context.Provider>
  )
}