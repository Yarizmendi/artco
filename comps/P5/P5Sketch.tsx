
import classNames from "classnames"

const yellowBorder = "border border-yellow-500"
const redBorder = "border border-red-400"
const greenBorder = "border border-green-400"

function P5Sketch({
  parentRef,
  children
}) {
  return (
    <div 
      className={ classNames([
      // redBorder,
      "h-full w-full",
      "flex flex-col md:flex-row",
    ])}>

      <div 
        id="canvasParent" 
        ref={ parentRef }
        className={ classNames([ 
        // greenBorder,
        "h-4/6 md:h-full",
        "w-full md:w-9/12 lg:w-10/12",
      ])} />

      <div 
        id="ctrls"
        className={ classNames([ 
        // yellowBorder,
        "w-4/6 md:w-full p-4"
      ])}>
        { children }
      </div>

      <a id="download" className="hidden"/>
    </div>
  )
}

export { P5Sketch }