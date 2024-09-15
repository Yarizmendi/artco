
"use client"
import p5Types from "p5"
import classnames from "classnames"
import {createContext, useCallback, useEffect, useState} from 'react'
import { Loading } from "@/comps/Loading"

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

  useEffect(() => {
    if (!isMounted) setIsMounted(true)}, [])

  useEffect(() => { 
    if (isMounted) {
      if (!mp5) mp5 = InitP5({sketch, instRef})
      else return mp5.remove() 
  }}, [isMounted]) 

  return (
    <P5Context.Provider value={{isMounted, instRef}}>
      <div className={classnames("flex grow w-full flex-col md:flex-row dark:bg-slate-950")}>

      <div id="p5_loading" className="w-full flex items-center justify-center border">
          <Loading />
        </div>

        <div ref={instRef} id={"Parent"} className={"h-full w-full md:w-1/2 flex flex-col col-reverse justify-between text-[30px] text-center" } />
     
       {children}
       <a id="download" className="hidden"/>
  
      </div>
    </P5Context.Provider>
  )
}