
"use client"
import classnames from "classnames"
import {createContext, useCallback, useEffect, useState} from 'react'

export const P5Context = createContext({
  width: null,
  height: null,
  instRef: null,
  isMounted: false,
})

export function P5Provider({sketch, children}) {

  async function InitP5({ sketch, instRef }) {
    const p5 = await import("p5")
    const pImport = p5.default
    const reference = instRef()
    return new pImport(sketch, reference)
  }

  const [width, setWidth] = useState(null)
  const [height, setHeight] = useState(null)
  const [isMounted, setIsMounted] = useState(false)

  const instRef = useCallback(node =>{
    if (node) {
      setHeight(node.offsetHeight)
      setWidth(node.offsetWidth)
    } return node
  }, [])

  useEffect(() => {
    if (!isMounted) setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      InitP5({sketch, instRef})
    }
  }, [isMounted])

    return (
      <P5Context.Provider value={{isMounted, height, width, instRef}}>
        <div className={classnames("flex grow flex-col md:flex-row dark:bg-slate-950")}>
          <div className={classnames("h-full w-[80px]")} />
          <div ref={instRef} id={"Parent"} className={classnames("min-h-[550px] w-full md:w-1/2 md:h-full flex justify-center text-[30px] p5_loading")}/>
          <div className={classnames("flex h-full w-[80px] md:flex-col")}/>
          {children}
          <div className={classnames("h-full w-[80px]")} />
          <a id="download" className="hidden"/>
        </div>
      </P5Context.Provider>
    )
}