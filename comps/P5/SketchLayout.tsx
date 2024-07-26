
import classNames from "classnames"
import { Slider } from "./Slider"

const yellowBorder = "border border-yellow-500"
const redBorder = "border border-red-400"
const greenBorder = "border border-green-400"

export function SketchLayout({
  parentRef,
  sliders
}) {
  return (
    <div 
      className={ classNames([
      // redBorder,
      "h-full w-full",
      "flex flex-col md:flex-row",
    ])}>

      <div 
        id="Parent" 
        ref={ parentRef }
        className={ classNames([ 
        // greenBorder,
        "h-4/6 md:h-full",
        "w-full md:w-8/12",
      ])} />

      <form 
        id="ctrls"
        className={ classNames([ 
        // yellowBorder,
        "h-2/6 md:h-full",
        "w-full md:w-4/12",
      ])}>
        { sliders.map( slider => <Slider {...slider} /> )}
      </form>

      <a id="download" className="hidden"/>
    </div>
  )
}


