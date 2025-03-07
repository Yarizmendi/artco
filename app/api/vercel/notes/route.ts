import { getUserNotes } from "actions/images/getImages";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const uploaderId = req.nextUrl.searchParams.get("creatorId")
    const notes = await getUserNotes({ uploaderId })
    return NextResponse.json(notes)
}