
import { createShaderAction } from "actions/inputs/createShaderInputs"
import { Input } from "app/[user]/sketches/newSketch/FormInput"

export default async function CreateMotionPage() {
    return (
      <div className="grow">
        <h1>Create Motion Page</h1>

        <form className="w-1/3" action={createShaderAction}>
          <Input title={"icon"} value={"heat"} />
          <Input title={"label"} value={"test"} />
          <Input title={"type"} value={"slider"} />
          <Input title={"uniform"} value={"test"} />
          <Input title={"description"} value={"test"} />
          <Input title={"min"} type={"number"} value={0} />
          <Input title={"val"} type={"number"} value={50} />
          <Input title={"step"} type={"number"} value={1} />
          <Input title={"max"} type={"number"} value={100} />
          <button type={"submit"} className="my-2 \rounded dark:bg-green-800 px-4 py-2 text-xs font-semibold">submit</button>
        </form>

      </div>
    )
  }