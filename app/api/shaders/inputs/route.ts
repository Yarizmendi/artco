import { NextResponse } from "next/server"
import { getShaderInputsBySketch } from "./shader_inputs"

export async function GET({ id }) {
    const shaders = getShaderInputsBySketch(id)
    return NextResponse.json( shaders );
}

