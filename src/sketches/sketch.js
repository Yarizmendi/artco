// @ts-ignore
import p5Types from 'p5'
let canvasParent: Element
let parentStyle: CSSStyleDeclaration
let canvasWidth: number, canvasHeight: number

let font
let timeHeader
let timer

const preload = (p5: p5Types, canvasParentRef: Element) => {
  font = p5.loadFont('fonts/cabalFont.ttf')
}

const setup = (p5: p5Types, canvasParentRef: Element) => {
  // Find the parent Element's size to create a Canvas that size
  canvasParent = canvasParentRef
  if (canvasParentRef.parentElement) {
    parentStyle = getComputedStyle(canvasParentRef.parentElement)
  } else {
    parentStyle = getComputedStyle(canvasParentRef)
  }
  canvasWidth = parseInt(parentStyle.width)
  canvasHeight = parseInt(parentStyle.height)

  p5.createCanvas(canvasWidth, canvasHeight, p5.WEBGL).parent(canvasParentRef)
  p5.textSize(32)
  p5.textFont(font)
  timeHeader = p5.createP("").position(canvasWidth - 100, 0)
  timeHeader.style("background-color", "white")




}

const draw = (p5: p5Types) => {
  p5.background(192, 255, 255)

  timer = p5.round(p5.millis() / 1000)
  timeHeader.html(`${timer} seconds`)

}

// Keep canvas and its content responsive across window resizes
const windowResized = (p5: p5Types) => {
  let parentStyle: CSSStyleDeclaration
  if (canvasParent.parentElement) {
    parentStyle = getComputedStyle(canvasParent.parentElement)
  } else {
    parentStyle = getComputedStyle(canvasParent)
  }
  canvasWidth = parseInt(parentStyle.width)
  canvasHeight = parseInt(parentStyle.height)
  p5.resizeCanvas(canvasWidth, canvasHeight)
}

export { preload, setup, draw, windowResized }
