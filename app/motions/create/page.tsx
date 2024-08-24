
import { ActionButton } from "@/comps/Buttons/ActionButton"
import { createShaderAction } from "actions/inputs/createShaderInputs"
import { Input } from "@/comps/Forms/FormInput"

export default async function CreateMotionPage() {
    return (
      <div className="grow p-4">
        <h1 className="text-2xl text-center">Create Motion Page</h1>
        <form action={createShaderAction}>
          <div className="m-4 flex justify-between" >
            <div className={"flex flex-col w-1/2 p-2"}>
              <Input title={"type"} value={"slider"} />
              <Input title={"uniform"} value={"test"} />
              <Input title={"icon"} value={"heat"} />
              <Input title={"label"} value={"test"} />
              <Input title={"description"} value={"test"} />
            </div>
            <div className={"flex flex-col w-1/2 p-2"}>
              <Input title={"min"} type={"number"} value={0} />
              <Input title={"val"} type={"number"} value={50} />
              <Input title={"step"} type={"number"} value={1} />
              <Input title={"max"} type={"number"} value={100} />
            </div>
          </div>
          <div className="flex gap-8 mx-4">
            <ActionButton />
          </div>
        </form>
      </div>
    )
  }