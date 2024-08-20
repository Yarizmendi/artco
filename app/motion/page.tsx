
import { ShaderIcon } from "@/p5/inputs/ShaderIcon"
import { getShaderInputs } from "actions/inputs/getShaderInputs"

export default async function Motion() {
  const shaderInputs = await getShaderInputs()
    return (
      <div className="grow">
          <h1>Motion</h1>
          { shaderInputs.map(inpt => <ShaderIcon key={inpt._id} icon={inpt.icon} label={inpt.label} />)}
      </div>
    )
  }