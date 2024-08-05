

import classnames from "classnames"
import { RandomBorder } from "./utils"

export const box = classnames(
  "m-2 font-normal",
  "text-[10px] bg-slate-200 dark:bg-slate-800",
  "min-w-[40px] min-h-[30px]",
  "max-w-[60px] max-h-[50px]",
  "rounded cursor-pointer",
  "flex items-center justify-center"
)

export const Slider = ({
  uniform,
  label,
  description,
}) => {
  return (
    <div className="flex items-center justify-around font-bold">
      <InputValueWithLabel uniform={uniform} label={label}/>
      <InputSliderWithDescription uniform={uniform} description={description}/>
    </div>
  )
}

export const InputValueWithLabel = ({ 
    label,
    uniform
  }) => {
    return (
      <div className="flex flex-col items-center justify-center">
        <p id={uniform+"Value"} className={box} />
        <label className="text-[9px] overflow-hidden" htmlFor={label}>{label}</label>
      </div>
    )
}

export const InputSliderWithDescription = ({
  uniform,
  description
}) => {
  return (
    <div id={uniform+"Input"} className="flex flex-col justify-center max-h-[50px]">
      <p className="overflow-hidden text-[10px] pb-2">{description}</p>
    </div>
  )
}

export const Sliders = ({ 
  sliders
}) => {
  const styles = classnames()
  return (
    <div className={styles}>
      {sliders.map((slider, idx) => <Slider key={idx} {...slider} /> )}
    </div>
  )
}
