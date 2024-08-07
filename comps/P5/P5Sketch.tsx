
import classnames from "classnames"
import  { Sliders }  from "./Slider"
import { shaderIcons, ShaderIconsWithLabels } from "./Shader"
import { DESCRIPTION } from "actions/shaders"


export const sketchTitleClasses = classnames(
  "px-2 mt-4",
  "text-[20px]"
)

const sketchLayout = classnames(
  "font-bold",
  "flex flex-wrap flex-col md:flex-row"
)
export const SketchLayout = ({ props, children }:{ props?:any, children?:any })  => <div className={sketchLayout} {...props}>{children}</div>

const canvas = classnames("h-[600px] w-full md:w-1/2")
export const CanvasCtn = ({ parentRef }) => <div className={canvas} id="Parent" ref={parentRef} />

const controls = classnames("flex md:w-1/2 ")
export const SketchControls = ({ props, children }:{ props?:any, children?:any }) => <div {...props } id={"ctrls"} className={controls}>{children}</div>

const titleClass = classnames("text-[20px] uppercase mx-4 ml-4 mt-4")
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
      <SketchControls>
        <ShaderIconsWithLabels shaderIcons={shaderIcons} />
        <div>
          <SketchTitle title={title} />
          <p className="p-4 text-sm">{DESCRIPTION}</p>
          <Sliders sliders={inputs} />
        </div>
      </SketchControls>
      <DownloadLink />
    </SketchLayout>
  )
}



