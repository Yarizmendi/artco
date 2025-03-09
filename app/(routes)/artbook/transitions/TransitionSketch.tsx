
"use client"
import p5Types from "p5"
import Image from "next/image"
import { useState } from "react"
import classnames from "classnames"
import { Controls } from "@/p5/Controls"
import { P5Provider } from "hooks/contexts/useP5"
import { CreateSliders, HandleSliders, Sliders } from "@/p5/helpers/Sliders"

export default function TransitionSketch({
    title, vert, frag, displayName, description,
    images, inputs, textures, noises, transitions
}) {

    function sketch(
        p: p5Types,
        Parent
    ) {
        let font
        let timer
        let canvas
        let timeHeader
        let randomizeBtn
        
        let Shader
        let texture = 0
        let textures = {}
        let texturesArray
        let changeEvery = 1
        let noiseTexture = null
        
        let transitionMotion
        
        let basicX 
        let basicY 
        let advX 
        let advY 
        
        // textures = {
        //     "yellow_act": loadImage("images/stem/yellow_actuality.png"),
        //     "yellow_org": loadImage("images/stem/yellow_org_collab.jpg"),
        
        //     "ballerina": loadImage("images/stem/ballerina.png"),
        //     "reclamation": loadImage("images/stem/Reclamation.png"),
        
        //     "yellow_stem": loadImage("images/stem/yellow_org_stem.jpg"),
        //     "orange_acts": loadImage("images/stem/orange_actuality.png"),
        
        //     "yellow_red": loadImage("images/stem/yellow_red_stem.jpg"),
        //     "blue_red_stem": loadImage("images/stem/blue_red_stem.jpg"),
        
        //     "sunset_circles_stem": loadImage("images/stem/sunset_circles_stem.jpg"),
        //     "pareto": loadImage("images/stem/in-search-of-pareto.png"),
        
        //     "patents_stem": loadImage("images/stem/patents_stem.jpg"),
        //     "person_stem": loadImage("images/stem/person_stem.jpg"),
        
        //     "pink_glimpses": loadImage("images/stem/pink_glimpses.png"),
        //     "predicting": loadImage("images/stem/predicting-the-present.png"),
        
        //     "quantum_ballerina": loadImage("images/stem/quantum_ballerina.png"),
        //     "quantum_computer": loadImage("images/stem/quantum-computer.png"),
        
        //     "recon_form": loadImage("images/stem/reconfiguring-formality.jpg"),
        //     "resistance": loadImage("images/stem/resistance.png"),
        
        //     "abstract-toon": loadImage("images/stem/abstract_toon_stem.jpg"),
        //     "sid": loadImage("images/stem/sid.jpg"),
        
        //     "thoughts": loadImage("images/stem/thoughts_wb.png"),
        //     "perlinNoise": loadImage('images/noise/perlin.png'),
        // }
    
        p.preload = () => {
            // font = p.loadFont('fonts/cabalFont.ttf')
            Shader = p.loadShader('/basic.vert', '/stem-trans.frag')
            images.map(img => img["Image"] = p.loadImage(img.blob))
            noises.map(noise => noise["Noise"] = p.loadImage(noise.blob))
            console.log(images, noises)
        }
        
        p.setup = () => {
            canvas = p.createCanvas(Parent.offsetWidth , Parent.offsetHeight, p.WEBGL )
            // canvas.position( p.windowWidth * 1 / 5, 0 )
            // canvas.style( "border", "solid black 10px" )
            
            // p.textSize( 32 )
            // p.textFont( font)
            
            timeHeader = p.createP("").position( 10, 10 )
            transitionMotion = p.createCheckbox( 'transition', true ).position( 5, 60 )
            
            basicX = p.createCheckbox( 'basic x', true ).position( 5, 80 )
            basicY = p.createCheckbox( 'basic y', true ).position( 5, 100 )
            
            advX = p.createCheckbox( 'adv x', true ).position( 5, 120 )
            advY = p.createCheckbox( 'adv y', true ).position( 5, 140 )
            
            randomizeBtn = p.createButton('random')
            randomizeBtn.position(  10, 175 )
            
            // texturesArray = Object.values( textures ) 
            // noiseTexture = texturesArray.pop()

            texturesArray = images
            noiseTexture = noises[0]
        
        }
        
        p.draw = () => {
        
            timer = p.round( p.millis() / 1000 )
            timeHeader.html(`${ timer } seconds` )
            
            Shader.setUniform('u_time', p.millis() )
            Shader.setUniform('u_range', 0.25 )
            Shader.setUniform('u_threshold', 1.0 )
            Shader.setUniform('u_noise', noises[0]["Noise"] )
            
            Shader.setUniform( 'u_basicX', basicX.checked() )
            Shader.setUniform( 'u_basicY', basicY.checked() )
            
            Shader.setUniform( 'u_advX', advX.checked() )
            Shader.setUniform( 'u_advY', advY.checked() )
            
            if ( !transitionMotion.checked() ) changeEvery = timer
            else if ( timer - changeEvery == 0 ) {
                Shader.setUniform('u_tyme', changeEvery * 1000 )
                Shader.setUniform('u_background', texturesArray[ texture ]["Image"])
                Shader.setUniform('u_foreground', texturesArray[texture + 1]["Image"])
                changeEvery += 9
                texture += 1
            }
            
            randomizeBtn.mousePressed( randomizeImgs )
            
            p.shader(Shader)
            p.rect(0, 0, 0)
        
        }
        
        function windowResized() {
          p.resizeCanvas(p.windowWidth * 3 / 4 , p.windowHeight - 20 )
        }
        
        function randomizeImgs() {
            texture = 0
            texturesArray = p.shuffle(texturesArray)
            changeEvery = timer
        }
    }

    return (
        <P5Provider sketch={sketch}>
            <div></div>
        </P5Provider>
    )
}


