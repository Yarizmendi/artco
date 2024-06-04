
"use client"
import { useState, useRef, useEffect } from "react"

function sketch( p5, ref ) {

    let Shader: any
    let texture: any


    let [ width, height ] = [
        p5.windowWidth / 1.15,
        p5.windowHeight / 1.25
    ]

    p5.preload = () => {
        Shader = p5.loadShader( 'shaders/standard.vert', 'shaders/oceans.frag' )
        texture = p5.loadImage("images/nature/oceans/red_ocean.png")
    }

    p5.setup = () => {
        p5.createCanvas( width, height, p5.WEBGL ).parent( ref )
    }

    p5.draw = () => {
        Shader.setUniform( "u_time", p5.millis() )
        Shader.setUniform( "u_duration", 60000.0 )
        Shader.setUniform( "u_texture", texture)
        Shader.setUniform( "u_waves", p5.noise(25, 150 ))
        Shader.setUniform( "u_speed", p5.noise(500,1500 ))

       

       
        p5.shader( Shader )
        p5.rect( 0, 0, 0 )

    }
 
    



}

export default function BlendSketch() {
    const blendsketchRef = useRef()
    const [ isMounted, setIsMounted ] = useState( false )
    useEffect(() => { setIsMounted( true ) }, [])

    let mp5 = null;

    async function initSketch() {
        const p5 = ( await import( "p5" )).default
        return new p5( sketch, blendsketchRef.current )
      }
    

    useEffect(() => {
        if ( !isMounted ) return
        if ( !mp5 ) mp5 = initSketch()
        else mp5.remove()
      }, [ isMounted ] )

    useEffect(() => {}, [ sketch ])

  return(
    <div className="border-4 border-black min-w-[300px] max-w-[1200px]" ref={ blendsketchRef } /> 
  )
}