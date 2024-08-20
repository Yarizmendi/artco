
import Link from "next/link"
import { IconLink } from "@/comps/Links/IconLink"
import { ShaderIcon } from "@/p5/inputs/ShaderIcon"
import { getShaderInputs } from "actions/inputs/getShaderInputs"

export default async function Motions() {
  const shaderInputs = await getShaderInputs()
    return (
      <div className="grow">
          <h1 className="text-3xl text-center p-4">Shader Functions</h1>
          <div className="flex justify-between p-8">
            <IconLink href={"motions/create"} />
            <input className="dark:bg-slate-900 border-b-2 dark:border-slate-100 text-sm font-light" type={"search"} placeholder={"search"} />
          </div>
          <div className={"flex p-4 w-full h-[400px] overflow-auto"}>
            { shaderInputs.map(inpt =>
               <Link className="m-2" key={inpt._id} href={`motions/${inpt._id}`}>
                <ShaderIcon icon={inpt.icon} label={inpt.label} />
              </Link>
            )}
          </div>
      </div>
    )
  }