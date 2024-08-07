
import classnames from "classnames"
import  { Sliders }  from "./Slider"
import { ShaderIconsWithLabels } from "./Shader"
import { DESCRIPTION } from "actions/shaders"


export const sketchTitleClasses = classnames(
  "px-2 mt-4",
  "text-[20px]"
)

const sketchLayout = classnames(
  "flex flex-wrap flex-col md:flex-row grow"
)
export const SketchLayout = ({ props, children }:{ props?:any, children?:any })  => <div className={sketchLayout} {...props}>{children}</div>

const canvas = classnames("min-h-[550px] w-full md:w-1/2 md:h-full flex justify-center text-[30px]")
export const CanvasCtn = ({ parentRef }) => <div className={canvas} id="Parent" ref={parentRef} />

const controls = classnames("flex md:w-1/2")
export const SketchControls = ({ props, children }:{ props?:any, children?:any }) => <div {...props } id={"ctrls"} className={controls}>{children}</div>

const titleClass = classnames("text-[20px] uppercase mx-4 md:mt-4")
export const SketchTitle = ({ title }) => <p className={titleClass}>{title} sketch</p>

export const DownloadLink = ({}) => <a id="download" className="hidden"/>
const fileInputClass = classnames("flex text-md w-fit mx-6 md:mt-4")

export function P5Sketch({
  title,
  inputs,
  parentRef,
}) {
  return (
    <SketchLayout>
      <CanvasCtn parentRef={parentRef} />
      <SketchControls>
        <ShaderIconsWithLabels shaders={inputs} />
        <div>
          <SketchTitle title={title} />
          <p className="p-4 text-sm">{DESCRIPTION}</p>
          <Sliders sliders={inputs} />
          <span id="files" className={fileInputClass} />
        </div>
      </SketchControls>
      <DownloadLink />
    </SketchLayout>
  )
}



