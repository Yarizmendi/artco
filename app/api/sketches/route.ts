import { NextResponse } from "next/server"
import { getSketchData } from "@/api/sketches/sketches";

export async function GET(title) {
    const sketches = await getSketchData(title)
    return NextResponse.json( sketches );
}
