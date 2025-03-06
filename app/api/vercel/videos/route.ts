import { getVercelVideosAction } from "actions/blobs/getVercelVideosAction"
import { NextRequest, NextResponse } from "next/server"

export async function GET( ) {
    const data = await getVercelVideosAction()
    return NextResponse.json(data)
}