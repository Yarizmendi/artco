
import { IconLink } from "@/comps/Links/IconLink"
import { ShaderIcon } from "@/p5/inputs/ShaderIcon"
import { getShaderInputs } from "actions/inputs/getShaderInputs"
import Link from "next/link"

export default async function Motions() {
  const shaderInputs = await getShaderInputs()
    return (
      <div className="grow">
          <h1>Motion</h1>
          <IconLink href={"motions/create"} />
          { shaderInputs.map(inpt => <Link  key={inpt._id} href={`motion/${inpt._id}`}>
            <ShaderIcon icon={inpt.icon} label={inpt.label} />
          </Link>
          )}
      </div>
    )
  }