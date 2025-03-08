
import classNames from "classnames"
import { ICONLINED } from "data/constants"

export const shaderIconWithLabelStyle = classNames(
    "rounded cursor-pointer",
    "h-[60px] max-w-[100px] min-w-[80px]",
    "dark:bg-slate-950",
    "flex flex-col items-center justify-center"
)

export const ShaderIcon = ({ icon, label }: { icon: string, label?: string }) => {
     return (
       <div className={shaderIconWithLabelStyle}>
         <span className={ICONLINED}>{ icon }</span>
         <p className="text-sm text-white">{label}</p>
       </div>
     )
   }
   