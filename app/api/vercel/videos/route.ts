import { getVercelVideosAction } from "actions/blobs/getVercelVideosAction"
import { NextRequest, NextResponse } from "next/server"

export async function GET( req: NextRequest ) {
    const data = await getVercelVideosAction()
    return NextResponse.json(data)
}