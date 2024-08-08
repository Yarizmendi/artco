import { NextResponse } from "next/server"
import { shadersBySketch } from "./shaders"

export async function GET({ id }) {
    const shaders = shadersBySketch[ id ] || shadersBySketch.image
    return NextResponse.json( shaders );
}

