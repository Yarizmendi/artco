
import { getSKetches } from "actions/sketches/getSketchActions";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req: NextRequest ) {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const data = await getSKetches({ creatorId });
    return NextResponse.json(data);
}