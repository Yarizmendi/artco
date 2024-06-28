
import p5Types from "p5"
type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;

export const sketch: P5jsSketch = ( p5, parentRef ) => {

  p5.preload = () => {}

  p5.setup = () => {}

  p5.draw = () => {}

  p5.windowResized = () => {}

}
