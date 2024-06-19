
"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { fam, noiseTextures } from "app/(api)/images"

function ArtPrev({ path, width, height  }) {
  const imgPrefix = "/images/"
  const imgName = ( path: string ) => path.replace('_', ' ' ).split('.').slice(0, -1).join('.') 
  return (
    <div className="max-w-[150px] hover:scale-110 transform duration-300 ease-in-out cursor-pointer m-2">
      <Image 
        src={ imgPrefix + path } 
        alt={ path } 
        width={ width }
        height={ height }
        className="max-w-[150px] h-[150px] rounded shadow-lg" 
      />
      <p className="max-w-[150px] p-1 tracking-widest text-xs">{ imgName( path )}</p>
    </div>
  )
}

function SimpleSketch() {

  let mp5: any = null
  let parentRef = useRef()

  const [ timer, setTimer ] = useState( null )
  const [ isMounted, setIsMounted ] = useState( false )
  const [ isPlaying, setIsPlaying ] = useState( false )

  function sketch ( p5 ) {

    let Shader: any
    let texturesArr: any[]

    let pTimer: number

    let changeEvery = 10
    let idx = 0
    let noiseTexture: any

    const getWidth = () => document.getElementById("canvasParent").offsetWidth
    const getHeight = () => document.getElementById("canvasParent").offsetHeight

    p5.preload = () => {
      p5.loadFont( 'fonts/cabalFont.ttf' )
      Shader = p5.loadShader( 'shaders/standard.vert', 'shaders/family.frag' )
      texturesArr = fam.map( img => p5.loadImage(`images/${ img.path }`))
      noiseTexture = p5.loadImage(`images/${ noiseTextures[0].path }`)
    }

    p5.setup = ( parentRef) => {
      p5.createCanvas( getWidth(), getHeight(), p5.WEBGL ).parent( parentRef )
      p5.pixelDensity(1)
    }

    p5.draw = () => {
      pTimer = p5.round( p5.millis() / 1000.0 )
      setTimer( pTimer )

      Shader.setUniform( "u_time", p5.millis() )
      Shader.setUniform( "u_range", 0.0 )
      Shader.setUniform( "u_threshold", 1.0 )
      Shader.setUniform( "u_noise", noiseTexture )
  
  
      if ( pTimer < changeEvery ) {
        Shader.setUniform( "u_foreground", texturesArr[ idx + 1 ]) 
        Shader.setUniform( "u_background",  texturesArr[ idx ])
      }
      else if ( texturesArr.length-2 > idx ) {
        changeEvery += 10
        idx+=1
        Shader.setUniform( "u_timeout", p5.millis() )
      } 

      p5.shader( Shader )
      p5.rect( 0 )
    }

    p5.windowResized = () => p5.resizeCanvas( getWidth(), getHeight() )
  
  }

  async function InitP5( sketch, parentRef ) {
    const p5 = (await import( "p5" )).default
    return new p5( sketch, parentRef.current )
  }
  
  useEffect( () => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else mp5.remove()
  }, [ isMounted ])

  useEffect( () => {}, [ sketch ])

  return (
    <div className="text-xs flex p-[20px]">

      <menu className="flex flex-col w-1/2">

        <div className="flex items-center">
          <span className="material-symbols-outlined">play_arrow</span>
          <p>{ timer } secs</p> 
        </div>

        <ul className="flex overflow-x-scroll">
          { fam && fam.map(( texture, idx ) => 
            <ArtPrev key={ idx } path={ texture.path } width={ 150 }  height={ 150 } /> )
          } 
        </ul>

        <div className=""></div>

      </menu>

      <div className="w-1/2 h-[400px] p-4" ref={ parentRef } id={"canvasParent"} />

    </div> 
  )
}

export default SimpleSketch

