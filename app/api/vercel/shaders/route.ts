
import { getVercelShadersAction } from "actions/blobs/getVercelShadersAction"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    const data = await getVercelShadersAction()
    return NextResponse.json(data)
}