
"use client"

import { useState, useRef, useEffect } from "react"
import { fam, noiseTextures } from "../../api/images"

function SimpleSketch() {

  let mp5: any = null
  let parentRef = useRef()

  const [ isMounted, setIsMounted ] = useState( false )

  const getWidth = () => document.getElementById("canvasParent").offsetWidth
  const getHeight = () => document.getElementById("canvasParent").offsetHeight

  function sketch ( p5 ) {

    let Shader: any
    let texturesArr: any[]
    let pTimer: number = 0
    let changeEvery = 10
    let idx = 0
    let noiseTexture: any

    let cTimer

    let playIcon
    let playBtn
    let p5timer
    let playCheck
  
    p5timer = p5.createP("")
    p5timer.parent( document.getElementById( "p5timer" ))

    // playIcon = p5.createSpan( "play_arrow" )
    // playIcon.class( "material-symbols-outlined" )

    playBtn = p5.createCheckbox( "", false )
    // playBtn.child( playIcon )
    playBtn.parent( document.getElementById( "playBtn" ))


    p5.preload = () => {
      p5.loadFont( 'fonts/cabalFont.ttf' )
      Shader = p5.loadShader( 'shaders/standard.vert', 'shaders/family.frag' )
      texturesArr = fam.map( img => p5.loadImage(`images/${ img.path }`))
      noiseTexture = p5.loadImage(`images/${ noiseTextures[0].path }`)
    }

    p5.setup = ( parentRef ) => {
      p5.pixelDensity(1)
      p5.createCanvas( getWidth(), getHeight(), p5.WEBGL ).parent( parentRef )
    }

    p5.draw = () => {
      p5timer.html(`${ pTimer } secs`)

      if ( playBtn.checked() ) {
        playSketch()
      }

      function playSketch() {
        pTimer = p5.round( p5.millis() / 1000.0 )
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
        p5.rect( 0, 0, 0 )
      }

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




  return (
    <div className="text-xs flex p-[20px]">

      <menu className="flex flex-col w-1/2">

        <div className="flex items-center">
          <div id={"playBtn"} />
          <div id={"p5timer"} />
        </div>


        <div id="p5Controls" className=""></div>

      </menu>

      <div className="w-1/2 h-[400px] p-4" ref={ parentRef } id={"canvasParent"} />

    </div> 
  )
}

export default SimpleSketch

