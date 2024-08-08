import classNames from "classnames"

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

// export const shaderIcons: any[] = [
  // { title: "heat", label: "waves"}
    // <span className="material-symbols-outlined">airwave</span>,
    // <span className="material-symbols-outlined">zoom_in_map</span>,
    // <span className="material-symbols-outlined">zoom_out_map</span>,
    // <span className="material-symbols-outlined">360</span>,
    // <span className="material-symbols-outlined">arrow_upward</span>,
    // <span className="material-symbols-outlined">arrow_downward</span>,
    // <span className="material-symbols-outlined">arrow_back</span>,
    // <span className="material-symbols-outlined">arrow_forward</span>,
    // <span className="material-symbols-outlined">arrow_forward</span>,
// ]

export const ShaderIconWithLabel = ({ icon, label }) =>
 <div className={shaderIconWithLabelStyle}>
  <span className="material-symbols-outlined">{ icon }</span>
  <p>{label}</p>
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

const shadersIconStyle = "h-full flex flex-col flex-wrap font-bold bg-slate-300 dark:bg-slate-950"
export const ShaderIconsWithLabels = ({ 
  shaders
}) => 
<div className={shadersIconStyle}>
  { shaders.map((shader,i) => <ShaderIconWithLabel key={i} {...shader } /> )}
</div>