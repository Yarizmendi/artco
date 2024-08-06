import classnames from "classnames"
import classNames from "classnames"
import { ReactElement } from "react"
import { RandomBorder } from "./utils"

export const shaderIconStyle = classNames(
    "m-2",
    "rounded cursor-pointer",
    "text-[10px] font-normal",
    "min-w-[40px] min-h-[30px]",
    "max-w-[60px] max-h-[50px]",
    "bg-slate-200 dark:bg-slate-800",
    "flex items-center justify-center"
)

export const shaderIconWithLabelStyle = classNames(
    "p-4",
    "rounded cursor-pointer",
    "text-[10px] font-normal",
    "min-w-[40px] min-h-[30px]",
    "max-w-[60px] max-h-[50px]",
    "dark:bg-slate-950",
    "flex flex-col items-center justify-center"
)

export const shaderIcons: ReactElement[] = [
    <span className="material-symbols-outlined">airwave</span>,
    <span className="material-symbols-outlined">heat</span>,
    <span className="material-symbols-outlined">zoom_in_map</span>,
    <span className="material-symbols-outlined">zoom_out_map</span>,
    <span className="material-symbols-outlined">360</span>,
    // <span className="material-symbols-outlined">arrow_upward</span>,
    <span className="material-symbols-outlined">arrow_downward</span>,
    <span className="material-symbols-outlined">arrow_back</span>,
    <span className="material-symbols-outlined">arrow_forward</span>,
    <span className="material-symbols-outlined">arrow_forward</span>,
]

export const ShaderIconWithLabel = ({icon}) =>
 <div className={shaderIconWithLabelStyle}>
  {icon}
  <p>{ "label" }</p>
</div>

export const ShaderIcon = 
 ({ iconClassname }) => 
 <div className={shaderIconStyle}>
  {iconClassname}
</div>

export const ShaderIcons =
 ({ shaders }) =>
<div className={"flex flex-wrap items-end justify-end"}>
  { shaders.map((shader,i)=><ShaderIcon key={i} iconClassname={shader}/> )}
</div>

const shadersIconStyle = ""
export const ShaderIconsWithLabels = ({ shaderIcons }) => 
<div className={shadersIconStyle}>
  { shaderIcons.map((icon,i) => <ShaderIconWithLabel key={i} icon={icon} /> )}
</div>