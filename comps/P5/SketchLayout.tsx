
import classnames from "classnames"
import  { Sliders }  from "./Slider"
import { ShaderIcons, shaderIcons, ShaderIconsWithLabels } from "./Shader"

export const sketchStyles = classnames(
  "m-2 font-normal",
  "text-[10px] bg-slate-200 dark:bg-slate-800",
  "min-w-[40px] min-h-[30px]",
  "max-w-[60px] max-h-[50px]",
  "rounded cursor-pointer",
  "flex justify-between"
)

export const sketchTitleClasses = classnames(
  "px-2 mt-4",
  "text-[20px]"
)

export const SketchLayout = ({ props, children }:{ props?:any, children?:any })  => <div className={classnames("")} {...props}>{children}</div>

export const CanvasCtn = ({ parentRef }) => <div className="min-h-full min-w-[350px]" id="Parent" ref={parentRef} />

export const SketchControls = ({ props, children }:{ props?:any, children?:any }) => <div {...props } id={"ctrls"} className={classnames("max-w-[500px]")} >{children}</div>

export const SketchTitle = ({ title }) => <p className={sketchTitleClasses}>{title} sketch</p>

export const DownloadLink = ({}) => <a id="download" className="hidden"/>

export function P5Sketch({
  title,
  inputs,
  parentRef,
}) {
  return (
    <SketchLayout>
      <CanvasCtn parentRef={parentRef} />
      <SketchControls>
        <SketchTitle title={title} />
        <Sliders sliders={inputs} />
        {/* <ShaderIcons shaders={shaderIcons} /> */}
        <ShaderIconsWithLabels shaderIcons={shaderIcons} />
        <DownloadLink />
      </SketchControls>
    </SketchLayout>
  )
}




