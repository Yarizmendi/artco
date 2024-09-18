
"use client"
// import p5Types from "p5"
import classnames from "classnames"
import {createContext, useCallback, useEffect, useState} from 'react'
import { Loading } from "@/comps/Loading"
import { mqStyles } from "app/[user]/sketches/[path]/PathSketch"

export const P5Context = createContext({
  instRef: null,
  isMounted: false,
})

export function P5Provider({ sketch, children }) {
  let mp5

  async function InitP5({sketch, instRef}) {
    let pImport = (await import("p5")).default
    let pSound =  await import("../../lib/p5.sound")
    return new pImport(sketch, instRef())
  }

  const [isMounted, setIsMounted] = useState(false)

  const instRef = useCallback(node =>{
    if (node) return node
  }, [])

  useEffect(() => { if (!isMounted) setIsMounted(true)}, [])

  useEffect(() => { 
    if (isMounted) {
      if (!mp5) mp5 = InitP5({sketch, instRef})
      else return mp5.remove() 
  }}, [isMounted]) 

  return (
    <P5Context.Provider value={{isMounted, instRef}}>

        <div className={classnames([
          mqStyles +
          "relative flex flex-col h-vh md:flex-row w-full" 
        ])}>

          <div className={classnames([
            mqStyles +
            " absolute flex items-center justify-center w-[800px] lg:min-w-[800px]  py-12 bg-slate-950"
          ])} id="p5_loading">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500" id="p5_loading"></div>
          </div>

          <div ref={instRef} id={"Parent"} className={classnames(
            mqStyles + 
            " relative w-full md:w-2/3"
          )} /> 

          {children}
        </div>

        <a id="download" />

    </P5Context.Provider>
  )
}