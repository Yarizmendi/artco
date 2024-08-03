
import classNames from "classnames"
import  { Slider }  from "./Slider"
import { DESCRIPTION } from "actions/shaders"

const yellowBorder = "border border-yellow-500"
const redBorder = "border border-red-400"
const greenBorder = "border border-green-400"

export function SketchLayout({
  parentRef,
  inputs,
  title
}) {
  let icons = [
    <span className="material-symbols-outlined">airwave</span>,
    <span className="material-symbols-outlined">heat</span>,
    <span className="material-symbols-outlined">zoom_in_map</span>,
    <span className="material-symbols-outlined">zoom_out_map</span>,
    <span className="material-symbols-outlined">360</span>,
    <span className="material-symbols-outlined">arrow_upward</span>,
    <span className="material-symbols-outlined">arrow_downward</span>,
    <span className="material-symbols-outlined">arrow_back</span>,
    <span className="material-symbols-outlined">arrow_forward</span>,
  ]
  return (
    <div 
      className={ classNames([
      // redBorder,
      "flex flex-col md:flex-row",
    ])}>

      <div 
        id="Parent" 
        ref={ parentRef }
        className={ classNames([ 
        // greenBorder,
        "h-3/4 md:h-full",
        "w-full md:w-8/12",
        "flex justify-center text-[40px]"
      ])} />


      <div 
        id="ctrls"
        className={ classNames([ 
        // yellowBorder,
        "h-1/4 md:h-full",
        "w-full md:w-4/12",
      ])}>

        <div className="flex mx-4 py-3 border-b">
          {/* <span className="material-symbols-outlined">share</span> */}
          <p className="tracking-widest text-sm">{ title } sketch</p>
        </div>

        { inputs.map((slider, idx ) => <Slider key={ idx } {...slider} /> )}

        <div className="hidden md:flex justify-around items-center mx-6">
          <p className="text-xs w-1/2 h-[200px] overflow-hidden pt-3">{DESCRIPTION}</p>
          <div className="flex flex-wrap justify-center w-1/2">
            { icons.map( icon => 
                <p className="border rounded-lg cursor-pointer text-[10px] h-[50px] w-[50px] flex justify-center items-center mx-2 mb-2">{ icon }</p>)
              }
          </div>
        </div>

      </div>

      <a id="download" className="hidden"/>
    </div>
  )
}


