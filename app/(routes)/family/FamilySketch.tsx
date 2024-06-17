
"use client"
import { useState, useRef, useEffect } from "react"
import { fam, noiseTextures } from "app/(api)/images"

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


  const [ timer, setTimer ] = useState( 0 )

  const sketch = ( p5: any, parentRef: any ) => {

    let Shader: any
    let texturesArr: any[]
    let changeEvery = 15
    let idx = 0
    let noiseTex: any
    let pTimer: number
  
  p5.preload = () => {
    p5.loadFont('fonts/cabalFont.ttf')
    Shader = p5.loadShader( 'shaders/standard.vert', 'shaders/family.frag' )
    texturesArr = fam.map( img => p5.loadImage(`images/${ img.path }`))
    noiseTex = p5.loadImage(`images/${ noiseTextures[0].path }`)
  }

  p5.setup = () => {
    p5.pixelDensity( 1 )
    p5.createCanvas( 
     document.getElementById( "nextCanvas" ).offsetWidth,
     document.getElementById( "nextCanvas" ).offsetHeight,
     p5.WEBGL ).parent( parentRef )
  }
  
  p5.draw = () => {
    pTimer = ( p5.round( p5.millis() / 1000 ))
    setTimer( pTimer )

    Shader.setUniform( "u_range", 0.2 )
    Shader.setUniform( "u_threshold", 1.0 )
    Shader.setUniform( "u_noise", noiseTex )
    Shader.setUniform( "u_time", p5.millis() )

    if ( pTimer < changeEvery ) {
      Shader.setUniform( "u_foreground", texturesArr[ idx + 1 ]) 
      Shader.setUniform( "u_background",  texturesArr[ idx ])
    }
    else if ( texturesArr.length-2 > idx ) {
      changeEvery += 15
      idx+=1
      Shader.setUniform( "u_timeout", p5.millis() )
    } 
    
    p5.shader( Shader )
    p5.rect( 0, 0, 0 )

  }

  p5.windowResized = () => {
    p5.resizeCanvas( 
      document.getElementById( "nextCanvas" ).offsetWidth,
      document.getElementById( "nextCanvas" ).offsetHeight
    )
  }
  
  }

  useEffect(() => {}, [ sketch ])

  return ( 
    <div className="flex justify-around border-4 ">
      
      <div 
        id={"nextCanvas"} 
        ref={ parentRef }
        className="border-2 border-purple-500 w-[50%] h-[400px] " 
      />

      <div className="border-2 border-green-500 w-[40%]">
        <h1>{ timer }</h1>
      </div>

    </div>
  )
}
