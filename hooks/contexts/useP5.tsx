
"use client"
import classnames from "classnames"
import {createContext, useEffect, useState} from 'react'

export const P5Context = createContext({
  isMounted: false,
})

export function P5Provider({ sketch, children }) {
  let mp5

  async function InitP5({ sketch }) {
    const pImport = (await import("p5")).default
    const pSound =  await import("../../lib/p5.sound")
    const Parent = document.getElementById("Parent")

    return new pImport( p => {
      p.windowResized = () => {
        p.resizeCanvas(Parent.offsetWidth, Parent.offsetHeight)
      }
      return sketch(p, Parent)
    })
  }

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => { if (!isMounted) setIsMounted(true)}, [])

  useEffect(() => { 
    if (isMounted) {
      if (!mp5) mp5 = InitP5({ sketch })
      else return mp5.remove() 
  }}, [isMounted]) 

  return (
    // @ts-ignore
    <P5Context.Provider value={{ isMounted }}>
        <div className={classnames([
          "flex flex-col md:flex-row w-full"
        ])}>

          <div id={"Parent"} className="w-full flex justify-center min-h-[500px]">

            <div id="p5_loading" className="w-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500"/>
            </div>

          </div>
          
          {children}
          <a id="download" />   
        </div>
    </P5Context.Provider>
  )
}