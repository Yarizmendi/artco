
import { Input } from "@/comps/Forms/FormInput"
import { ActionButton } from "@/comps/Buttons/ActionButton"
import { createSketchAction } from "actions/sketches/createSketchAction"
import { getShaderInputs } from "actions/inputs/getShaderInputs"
import { getShaderTextures } from "actions/textures/getShaderTextures"
import { BoolSelect, Datalist } from "@/comps/Forms/DataList"
import { getImages } from "actions/sketchActions"

export default async function CreateSketchPage({ params }) {
    const shaderInputs = await getShaderInputs()
    const shaderTextures = await getShaderTextures()
    const sketchImages = await getImages()
    const transitionsOptions = ["false", "true"]
    return (
      <div className="grow p-4">
      
        <form action={createSketchAction}>
          <div className="flex items-center">
              <h1 className="text-2xl mx-8">Create Sketch</h1>
              <ActionButton idleTxt="create" />
          </div>

          <div className="m-4 flex justify-between" >
            <div className={"flex flex-col w-1/2 p-2"}>
              <Input title={"title"} value={"test"} />  ``
              <Datalist title={"motions"} list="motions" dataArr={shaderInputs} />
              <Datalist title={"textures"} list="textures" dataArr={shaderTextures} />
              <Datalist title={"images"} list="images" dataArr={sketchImages} />
              <BoolSelect title={"transitions"} list={"transitions"} dataArr={transitionsOptions} />
              <Input title={"creatorId"} value={params.user} />
              <Input title={"frag"} value={"/matrixScale.frag"} />
              <Input title={"displayName"} value={"new test sketch"} />
              <Input title={"description"} value={"test description"} />
              <Input title={"blob"} value={"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/sid.jpg"} />
            </div>
          </div>
        </form>
      </div>
    )
  }