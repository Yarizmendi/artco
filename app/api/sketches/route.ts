
import { NextResponse } from "next/server"
import { getSketchData } from "@/api/sketches/sketches"

export async function GET() {
    const sketches = await getSketchData("aqua")
    return NextResponse.json( sketches )
}
