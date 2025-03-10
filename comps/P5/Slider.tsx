
import { DESCRIPTION } from "actions/utils"
import classnames from "classnames"

export const box = classnames(
  "font-normal text-[10px]",
  "rounded cursor-pointer",
  "w-[35px] h-[35px]",
  "bg-slate-200 dark:bg-slate-800",
  "flex items-center justify-center"
)



export const InputValueWithLabel = ({ 
    label,
    uniform
  }) => {
    return (
      <div className="flex flex-col justify-center text-center mr-4">
        <p id={uniform+"Value"} className={box} />
        <label className="text-[9px] w-[35px] overflow-hidden" htmlFor={label}>{label}</label>
      </div>
    )
}

export const InputSliderWithDescription = ({
  uniform,
  description
}) => {
  return (
    <div id={uniform+"Input"} className="flex flex-col  max-h-[50px]">
      <p className="overflow-hidden text-[10px] pb-2">{description}</p>
    </div>
  )
}
