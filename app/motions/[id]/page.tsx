
import { ActionButton } from "@/comps/Buttons/ActionButton"
import { ClientButton } from "@/comps/Buttons/ClientButton"
import { deleteShaderAction } from "actions/inputs/deleteShaderInput"
import { getShaderInputById } from "actions/inputs/getShaderInputs"
import { Input } from "@/comps/Forms/FormInput"

export default async function Motion({ params }) {
  const id = params.id
  const { icon, type, label, uniform, settings, description } = await getShaderInputById(id)
  const { min, max, value, step } = settings

    return (
      <div className="grow p-4">
        <h1 className="text-2xl text-center">Shader Input: <span className="text-lg">{id}</span> </h1>
        <form action={""}>
          <div className="m-4 flex justify-between" >
            <div className={"flex flex-col w-1/2 p-2"}>
              <Input title={"type"} value={type} />
              <Input title={"uniform"} value={uniform} />
              <Input title={"icon"} value={icon} />
              <Input title={"label"} value={label} />
              <Input title={"description"} value={description} />
            </div>
            <div className={"flex flex-col w-1/2 p-2"}>
              <Input title={"min"} type={"number"} value={min} />
              <Input title={"val"} type={"number"} value={value} />
              <Input title={"step"} type={"number"} value={step} />
              <Input title={"max"} type={"number"} value={max} />
            </div>
          </div>
          <div className="flex gap-8 mx-4">
            <ActionButton idleTxt={"update"} color={"blue"} btnType={"submit"} />
            <ClientButton idleTxt={"delete"} color={"red"} actionFunct={deleteShaderAction} dataId={id} />
          </div>
        </form>
      </div>
    )
  }