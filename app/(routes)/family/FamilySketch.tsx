
"use client"

import { 
  shadersMap,
  familyImages as imagesMap,
  noiseTextures as noisesMap,
} from "app/(api)/images"

import { useState, useRef, useEffect } from "react"

export default function FamilySketch() {

  let mp5 = null
  const parentRef = useRef()

  const [ isMounted, setIsMounted ] = useState( false )
  useEffect(() => { setIsMounted( true ) }, [])

  async function initSketch() {
    const p5 = ( await import( "p5" )).default
    return new p5( sketch, parentRef.current )
  }

  useEffect(() => {
    if ( !isMounted ) return
    if ( !mp5 ) mp5 = initSketch()
  }, [ isMounted ] )

  useEffect(() => {}, [ sketch ])

  const [ timer, setTimer ] = useState( 0 )
  const [ noises, setNoises ] = useState( noisesMap )
  const [ images, setimages ] = useState( imagesMap )
  const [ shaders, setShaders ] = useState( shadersMap )

  function sketch ( p5: any, parentRef: any ) {
    // let Img: any
    // let Noise: any
    let Shader: any

    let imagesArr: any[]
    let noisesArr: any[]
    let shadersArr: any[]

    let imgIdx: number = 0
    let noiseIdx: number = 0
    let shaderIdx: number = 0

    let imgChangeTime : number = 15
    // let noiseChangeTime : number = 15
    // let shaderChangeTime : number = 15

    p5.preload = () => {
      p5.loadFont( 'fonts/cabalFont.ttf' )
      imagesArr = images.map( img => p5.loadImage( `images/${ img.path }` ))
      noisesArr = noises.map( noise => p5.loadImage( `images/${ noise.path }` ))
      shadersArr = shaders.map( shader => p5.loadShader( `shaders/${ shader.vertex }`, `shaders/${ shader.fragment }` ))
      Shader = shadersArr[ shaderIdx ]
    }
  
    p5.setup = () => {
      p5.pixelDensity(1)
      p5.createCanvas( 
      document.getElementById( "nextCanvas" ).offsetWidth,
      document.getElementById( "nextCanvas" ).offsetHeight,
      p5.WEBGL ).parent( parentRef )
    }
  
    p5.draw = () => {
      setTimer( p5.round( p5.millis() / 1000 ))
      Shader.setUniform( "u_range", 0.2 )
      Shader.setUniform( "u_threshold", 1.0 )
      Shader.setUniform( "u_time", p5.millis() )
      Shader.setUniform( "u_noise", noisesArr[ noiseIdx ] )

      if ( timer > imgChangeTime && imgIdx !== imagesArr.length ) {
        imgIdx+=1
        imgChangeTime += 15
        Shader.setUniform( "u_timeout", p5.millis() )
        Shader.setUniform( "u_background", imagesArr[ imgIdx ])
        Shader.setUniform( "u_foreground", imagesArr[ imgIdx + 1 ]) 
      }
      
      p5.shader( Shader )
      p5.rect( 0, 0, 0 )
  
    }
  
    p5.windowResized = () => p5.resizeCanvas( 
      document.getElementById( "nextCanvas" ).offsetWidth,
      document.getElementById( "nextCanvas" ).offsetHeight
    )
    
  }

  return ( 
    <div className="flex w-full h-full">
      
      <div 
        id={"nextCanvas"} 
        ref={ parentRef }
        className="w-[60%] h-[450px] border-4" 
      />

      <div 
        className="border-4 border-green-500 w-[40%]">
        <h1>{ timer }</h1>
      </div>

    </div>
  )
}
