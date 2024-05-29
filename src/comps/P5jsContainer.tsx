"use client"

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { AspectRatio, Center } from '@chakra-ui/react'
import { preload, setup, draw, windowResized } from 'app/sketches/sketch'

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
        <Center minW="100vw">
          <AspectRatio width="100vw" maxW="container.sm" ratio={1}>
            <Sketch preload={preload} setup={setup} draw={draw} windowResized={windowResized} />
          </AspectRatio>
        </Center>
      )}
    </>
  )
}
