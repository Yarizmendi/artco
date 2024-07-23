
import classNames from "classnames"

const yellowBorder = "border border-yellow-500"
const redBorder = "border border-red-400"
const greenBorder = "border border-green-400"


export function Ctn({ parentRef }) {
  return (
    <div className={ classNames([
      redBorder,
      "flex flex-col md:flex-row",
      "h-full w-full",
    ])} >

      <div id="canvasParent" 
        ref={ parentRef }
        className={ classNames([ 
          greenBorder,
          "h-4/6 md:h-full",
          "w-full md:w-8/12",
      ])} />

      <div id="ctrls"
        className={ classNames([ 
          yellowBorder,
      ])} />

      <a id="download" className="hidden"/>
    </div>
  )
}