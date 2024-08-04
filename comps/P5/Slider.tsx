

import { box } from "./SketchLayout"
import { boxClass } from "./utils"
import classnames from "classnames"

export const Slider = ({
  uniform,
  label,
  description,
}) => {
  return (
    <div className="flex items-center justify-center text-[10px]">
      <ValueBox uniform={uniform} />
      <div className="flex flex-col ml-3" id={uniform+"Input"}>
        <label htmlFor={label}>{label}</label>
        <p className="h-[15px] overflow-hidden">{description}</p>
      </div>
    </div>
  )
}


const sliderCmptclass = classnames("flex justify-center items-center")
export const ValueBox = ({ uniform }) => <p id={uniform+"Value"} className={box}/>

