
import classnames from "classnames"
import  { Sliders }  from "./Slider"
import { ShaderIcon } from "./inputs/ShaderIcon"
import { deleteSketchAction } from "actions/sketches/deleteSketchAction"
import { ClientButton } from "../Buttons/ClientButton"
import { updateSketchAction } from "actions/sketches/updateSketchAction"

export const sketchTitleClasses = classnames(
  "px-2 mt-4",
  "text-[20px]"
)

const sketchLayout = classnames("flex flex-wrap flex-col md:flex-row grow")
export const SketchLayout = ({ props, children }:{ props?:any, children?:any })  => <div className={sketchLayout} {...props}>{children}</div>

const canvas = classnames("min-h-[550px] w-full md:w-1/2 md:h-full flex justify-center text-[30px]")
export const CanvasCtn = ({ parentRef }) => <div className={canvas} id="Parent" ref={parentRef} />

const controls = classnames("flex md:w-1/2")
export const SketchControls = ({ props, children }:{ props?:any, children?:any }) => <div {...props } id={"ctrls"} className={controls}>{children}</div>

const titleClass = classnames("text-[20px] uppercase mx-4")
export const SketchTitle = ({ title }) => <p className={titleClass}>{title} sketch</p>

export const DownloadLink = () => <a id="download" className="hidden"/>
const fileInputClass = classnames("flex text-sm w-fit mx-6 md:mt-4")

export function P5Sketch({
  id,
  title,
  shaders,
  parentRef,
  description
}) {
  return (
    <SketchLayout>
      <CanvasCtn parentRef={parentRef} />
      <SketchControls>
        <div className="dark:bg-slate-950">
          {shaders.length > 0 && shaders.map(inpt=><ShaderIcon key={inpt._id} icon={inpt.icon} label={inpt.label} />)}
        </div>
        <div>
          <div className="flex items-center md:mt-4 gap-4">
            <SketchTitle title={title} />
            <ClientButton idleTxt={"share"} color={"blue"} actionFunct={()=>{}} dataId={id} />
            <ClientButton idleTxt={"fork"} color={"green"} actionFunct={()=>{}} dataId={id} />
            <ClientButton idleTxt={"delete"} color={"red"} actionFunct={deleteSketchAction} dataId={id} />
            <ClientButton idleTxt={"edit"} color={"orange"} actionFunct={updateSketchAction} dataId={id} />
          </div>
          <p className="p-4 text-sm">{description}</p>
          <Sliders sliders={shaders} />
          <span id="files" className={fileInputClass} />
        </div>
      </SketchControls>
      <DownloadLink />
    </SketchLayout>
  )
}



