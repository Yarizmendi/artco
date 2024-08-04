
import classNames from "classnames"
import  { Slider }  from "./Slider"

const icons = [
  <span className="material-symbols-outlined">airwave</span>,
  <span className="material-symbols-outlined">heat</span>,
  <span className="material-symbols-outlined">zoom_in_map</span>,
  <span className="material-symbols-outlined">zoom_out_map</span>,
  <span className="material-symbols-outlined">360</span>,
  // <span className="material-symbols-outlined">arrow_upward</span>,
  // <span className="material-symbols-outlined">arrow_downward</span>,
  // <span className="material-symbols-outlined">arrow_back</span>,
  // <span className="material-symbols-outlined">arrow_forward</span>,
  // <span className="material-symbols-outlined">arrow_forward</span>,
]

export function SketchLayout({
  parentRef,
  inputs,
  title
}) {

  return (
    <div className="dark:bg-slate-950 flex justify-between items-center border">
      <div className="min-h-[300px] min-w-[350px]" id="Parent" ref={parentRef} />
      <div id="ctrls" className="border-2 max-w-[300px]">
        <p className="text-md">{title} sketch</p>
        <div className="">{inputs.map((slider, idx) => <Slider key={idx} {...slider} /> )}</div>
        <div className="flex flex-wrap items-end justify-end">{icons.map(icon => <MotionBox icon={icon} />)}</div>
        <a id="download" className="hidden"/>
      </div>
    </div>
  )
}

export const box = classNames(
  "m-2 font-light",
  "text-[10px] bg-slate-200 dark:bg-slate-900",
  "min-w-[40px] min-h-[30px]",
  "max-w-[60px] max-h-[50px]",
  "rounded cursor-pointer",
  "flex items-center justify-center"
)



function MotionBox({icon}) {
  return <div className={box}>{icon}</div>
}


