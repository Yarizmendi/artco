
import { getSKetches } from "actions/sketches/getSketchActions";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req: NextRequest ) {
    const data = await getSKetches();
    return NextResponse.json(data);
}