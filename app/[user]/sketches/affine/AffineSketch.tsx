
"use client"
import p5Types from "p5"
import InitP5 from "@/p5/Instance"
import { Controls } from "@/p5/Controls"
import { Recorder } from "@/p5/Recorder"
import { P5Sketch } from "@/p5/P5Sketch"
import { useState, useRef, useEffect } from "react"


export default function PathSKetch({ 
  id,
  vert,
  frag,
  title, 
  images,
  noises,
  inputs, 
  textures,
  displayName,
  transitions,
  description
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

  function sketch( p: p5Types ) {

    // Sensitivity when taking mouse wheel action into account
    const zoomSensitivity = 0.1;

    // Scale while drawing objects
    // Start with a scale of 1
    let currentScale = 1;

    // Transformation while drawing objects
    // Start with no transformation
    let transformX = 0;
    let transformY = 0;

    // List of circles on the screem
    let circles = [];

    // To detect when mouse is dragged
    // Used to not create a circle on the screen when panned
    let isMouseDragged = false;
    let mousePressedX = null;
    let mousePressedY = null;
    const mouseDragDetectionThreshold = 10;
    let Parent = parentRef.current && parentRef.current

    function createElements(parent) {
      p.createCanvas(parent.offsetWidth, parent.offsetHeight).parent(parent)
    }

    p.preload = () => {
      images.map( img => {
        img["Image"] = p.loadImage( img.blob )
      })
    }

    p.setup = () => {
      //@ts-ignore
      createElements(Parent)

    }

    p.draw = () => {
      p.background(0, 0, 0);
      p.image(images[0]["Image"], 0, 0)
      p.stroke(180, 180, 180);
      p.fill(255, 255, 255);

      p.push();
      p.translate(transformX, transformY);
      p.scale(currentScale);
      circles.forEach(circle => p.ellipse(circle.x, circle.y, circle.r, circle.r));
      p.pop();
    }

    p.mousePressed = () => {
      mousePressedX = p.mouseX;
      mousePressedY = p.mouseY;
    }
    
    p.mouseDragged = () => {
      if (p.dist(mousePressedX, mousePressedY, p.mouseX, p.mouseY) > mouseDragDetectionThreshold) {
        isMouseDragged = true;
        transformX += (p.mouseX - p.pmouseX);
        transformY += (p.mouseY - p.pmouseY);
      }
    }
    
    p.mouseReleased = () => {
      if (!isMouseDragged) {
        // Push a circle that will be drawn on the screen
        // Reverse the transformation and scale while storing the coordinates
        circles.push({
          x: (p.mouseX - transformX) / currentScale,
          y: (p.mouseY - transformY) / currentScale,
          r: p.random(5, 100),
        }); 
      }
      mousePressedX = null;
      mousePressedY = null;
      isMouseDragged = false;
    }
    
     p.mouseWheel = (event) => {
      // Determine the scale factor based on zoom sensitivity
      let scaleFactor = null;
      //@ts-ignore
      if (event.delta < 0) {
        // Zoom in
        scaleFactor = 1 + zoomSensitivity;
      } else {
        // Zoom out
        scaleFactor = 1 - zoomSensitivity;
      }
    
      // Apply transformation and scale incrementally
      currentScale = currentScale * scaleFactor;
      transformX = p.mouseX - (p.mouseX * scaleFactor) + (transformX * scaleFactor);
      transformY = p.mouseY - (p.mouseY * scaleFactor) + (transformY * scaleFactor);
      
      // Disable page scroll
      return false;
    }

  }

  return <P5Sketch id={id} description={description} parentRef={parentRef} shaders={inputs} title={ displayName }/>
}