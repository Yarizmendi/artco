
"use client"
import { Input } from "@/comps/Forms/FormInput"
import { ActionButton } from "@/comps/Buttons/ActionButton"
import { createSketchAction } from "actions/sketches/createSketchAction"
// import { BoolSelect } from "@/comps/Forms/DataList"
import { ImageSelect, InputSelect, TextureSelect } from "./ImageSelect"
import { UseSketches } from "../../app/[user]/sketches/api/UseSketches"

export function CreateSketchForm ({ params }) {
    // const transitionsOptions = ["false", "true"]
    const { mutate } = UseSketches({ creatorId: params.user })
    return (
      <form className="w-full md:w-1/3 h-fit flex flex-col gap-2 flex-wrap overflow-auto px-2" action={ async formData =>{
        await createSketchAction(formData)
        mutate()
      }}>   
        <input name="creatorId" value={params.user} type={"hidden"} />
        <input name="vert" type={"hidden"} value={"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert"} />
        <Input title={"title"} value={"test"} /> 
        <Input title={"frag"} value={"/oceans.frag"} />
        <Input title={"displayName"} value={"new test"} />
        <Input title={"description"} value={"test description"} />
        <Input title={"blob"} value={"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/sid.jpg"} />
        {/* <BoolSelect title={"transitions"} list={"transitions"} dataArr={transitionsOptions} /> */}
        <ImageSelect />
        <InputSelect />
        <TextureSelect />
        <ActionButton idleTxt="create sketch" btnType={"submit"}/>
        </form>
    )
  }

