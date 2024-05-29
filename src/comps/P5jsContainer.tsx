"use client"

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import { preload, setup, draw, windowResized } from '../sketches/test'

const importFunction = () => import('react-p5').then((mod) => mod.default)
let Sketch: any = null
if (typeof window !== 'undefined') {
  Sketch = dynamic(importFunction, { ssr: false })
}

export function P5jsContainer() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <>
      {mounted && (

        <Sketch preload={preload} setup={setup} draw={draw} windowResized={windowResized} />

      )}
    </>
  )
}
