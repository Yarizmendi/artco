
"use client"

import { ShaderIcon } from "@/p5/inputs/ShaderIcon"
import Link from "next/link"
import { UseInputs } from "./api/UseInputs"

export function InputsList() {
    const { data } = UseInputs()
    if ( data ) return (
      <div className={"flex p-4 w-full h-[400px] overflow-auto"}>
      { data.map(inpt =>
         <Link className="m-2" key={inpt._id} href={`inputs/${inpt._id}`}>
          <ShaderIcon icon={inpt.icon} label={inpt.label} />
        </Link>
      )}
    </div>
    )
  }