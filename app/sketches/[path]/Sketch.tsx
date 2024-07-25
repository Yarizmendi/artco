
"use client"
import InitP5 from "@/p5/Instance"
import { Slider } from "@/p5/Slider"
import { P5Sketch } from "@/p5/P5Sketch"
import { useState, useRef, useEffect } from "react"

export default function PathSKetch({ 
  title, 
  imgs,
  shaders, 
  sliders
}) {

  let mp5 = null
  let parentRef = useRef()

  const [ isMounted, setIsMounted ] = useState(false)

  useEffect(() => { if ( !isMounted ) setIsMounted( true )}, [])

  useEffect(() => { 
    if ( isMounted ) {
      if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
      else return mp5.remove() 
 }}, [ isMounted ]) 

  function sketch( p ) {
    p.preload = () => {
      shaders = shaders.map( shader => p.loadShader( shader.vert, shader.frag ))
      imgs = imgs.map( img => p.loadImage( img.url ))
    }
  
    p.setup = () => {
      // @ts-ignore
      p.createCanvas( parentRef.current.offsetWidth, parentRef.current.offsetHeight, p.WEBGL ).parent( parentRef.current )
      p.shader(shaders[0])

      sliders.map( slider => {
        p.createP()
        p.createSlider(0,100,50,10).parent("ctrls") 
      })
    }
  
    p.draw = () => {
      shaders[0].setUniform("u_texture", imgs[0])
      p.rect(0,0,0)
    }
  }
  
  return (
    <P5Sketch parentRef={parentRef}>
      {sliders.map((slider, i) => <Slider key={i} {...slider} /> )}
    </P5Sketch>
  )
}



