import { getVercelSongsAction } from "actions/blobs/getVercelSongsAction"
import { NextResponse } from "next/server"

export async function GET() {
    const data = await getVercelSongsAction()
    return NextResponse.json(data)
}