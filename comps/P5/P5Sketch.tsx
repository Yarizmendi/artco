
import classnames from "classnames"
import  { Sliders }  from "./Slider"
import { shaderIcons, ShaderIconsWithLabels } from "./Shader"


export const sketchTitleClasses = classnames(
  "px-2 mt-4",
  "text-[20px]"
)

const sketchLayout = classnames(
  "flex"
)
export const SketchLayout = ({ props, children }:{ props?:any, children?:any })  => <div className={sketchLayout} {...props}>{children}</div>

const canvas = classnames("min-h-[300px] min-w-[350px]")
export const CanvasCtn = ({ parentRef }) => <div className={canvas} id="Parent" ref={parentRef} />

const controls = classnames("")
export const SketchControls = ({ props, children }:{ props?:any, children?:any }) => <div {...props } id={"ctrls"} className={controls}>{children}</div>

const titleClass = classnames("text-[20px] uppercase mb-2")
export const SketchTitle = ({ title }) => <p className={titleClass}>{title} sketch</p>

export const DownloadLink = ({}) => <a id="download" className="hidden"/>

export function P5Sketch({
  title,
  inputs,
  parentRef,
}) {
  return (
    <SketchLayout>
      <CanvasCtn parentRef={parentRef} />
      <ShaderIconsWithLabels shaderIcons={shaderIcons} />
      <SketchControls>
        <SketchTitle title={title} />
        <Sliders sliders={inputs} />
      </SketchControls>
      <DownloadLink />
    </SketchLayout>
  )
}



