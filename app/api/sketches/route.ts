import { NextResponse } from "next/server"
import { getSketchData } from "actions/sketches";

export async function GET(title) {
    const sketches = await getSketchData(title)
    return NextResponse.json( sketches );
}
