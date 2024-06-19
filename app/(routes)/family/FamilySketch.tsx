
"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { fam } from "app/(api)/images"

export function ArtPrev({ path, width, height  }) {
  const imgPrefix = "/images/"
  const imgName = ( path: string ) => path.replace('_', ' ' ).split('.').slice(0, -1).join('.') 
  return (
    <div className="max-w-[150px] hover:scale-110 transform duration-300 ease-in-out cursor-pointer mb-2">
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

  function sketch ( p5 ) {

    const getWidth = () => document.getElementById("canvasParent").offsetWidth
    const getHeight = () => document.getElementById("canvasParent").offsetHeight

    p5.preload = () => {
      p5.loadFont( 'fonts/cabalFont.ttf' )
      p5.loadShader( 'shaders/standard.vert', 'shaders/family.frag' )
    }

    p5.setup = ( parentRef) => {
      p5.createCanvas( getWidth(), getHeight(), p5.WEBGL ).parent( parentRef )
      p5.pixelDensity( 1 )
    }

    p5.draw = () => {
      setTimer( p5.round( p5.millis() / 1000.0 ))
      p5.rect( 50, 50, 50 )
    }

    p5.windowResized = () => p5.resizeCanvas( getWidth(), getHeight() )
  
  }

  async function InitP5( sketch, parentRef ) {
    const p5 = (await import( "p5" )).default
    return new p5( sketch, parentRef.current )
  }
  
  const [ timer, setTimer ] = useState( null )
  const [ isMounted, setIsMounted ] = useState( false )

  const [ texture, setTexture ] = useState( null )
  const [ textures, setTextures ] = useState( fam )

  useEffect( () => { if( !isMounted ) setIsMounted( true ) }, [])

  useEffect(() => { 
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = InitP5( sketch, parentRef )
    else mp5.remove()
  }, [ isMounted ])

  useEffect( () => {}, [ sketch ])

  return (
    <div className="border-2 border-blue-500 text-xs flex">

      <ul className="flex flex-col items-center w-[240px] h-[400px] overflow-auto">
        { textures && textures.map(( texture, idx ) => 
          <ArtPrev key={ idx } path={ texture.path } width={ 150 }  height={ 150 } /> )
        } 
      </ul>

      <menu className="border-2 border-white flex flex-col w-1/3">
       <p>sketch time: { timer }</p> 
        <div className="border-2 border-green-500 h-1/2"
          > <h2>Next Controls </h2>
        </div>
        <div className="border-2 border-purple-500 h-1/2"
          > <h3>P5 Controls </h3>
        </div>
      </menu>

      <div className="border-4 border-red-500 w-2/3 h-[400px]"
        ref={ parentRef } 
        id={"canvasParent"} 
      />

    </div> 
  )
}


export default SimpleSketch

