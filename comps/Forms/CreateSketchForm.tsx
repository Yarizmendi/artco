
"use client"
import { Input } from "@/comps/Forms/FormInput"
import { ActionButton } from "@/comps/Buttons/ActionButton"
import { createSketchAction } from "actions/sketches/createSketchAction"
import { UseSketches } from "../../app/api/sketches/UseSketches"

export function CreateSketchForm ({ user }) {
    const { mutate } = UseSketches({ creatorId: user })
    return (
      <form className="flex flex-col gap-4" action={ async formData =>{
        await createSketchAction(formData)
        mutate()
      }}>   
        <input name="creatorId" value={user} type={"hidden"} />
        <input name="vert" type={"hidden"} value={"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert"} />
        <Input title={"title"} value={"test"} /> 
        <Input title={"frag"} value={"/concept.frag"} />
        <Input title={"displayName"} value={"new test"} />
        <Input title={"description"} value={"test description"} />
        <ActionButton idleTxt="create sketch" btnType={"disabled"}/>
        </form>
    )
  }

