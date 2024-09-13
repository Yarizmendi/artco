
"use client"
import p5Types from "p5"
import classnames from "classnames"
import {createContext, useCallback, useEffect, useState} from 'react'

export const P5Context = createContext({
  instRef: null,
  isMounted: false,
})

export function P5Provider({ sketch, children }) {

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
      let mp5
      if (!mp5) mp5 = InitP5({sketch, instRef})
      else return mp5.remove() 
  }}, [isMounted]) 

  return (
    <P5Context.Provider value={{isMounted, instRef}}>
      <div className={classnames("flex grow w-full flex-col md:flex-row dark:bg-slate-950")}>
        <div ref={instRef} id={"Parent"} className={classnames("min-h-[500px] w-full md:w-1/2 flex justify-center text-[30px]")}/>
        {children}
        <a id="download" className="hidden"/>
      </div>
    </P5Context.Provider>
  )
}