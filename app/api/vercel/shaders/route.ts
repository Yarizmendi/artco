
import { getVercelShadersAction } from "actions/blobs/getVercelShadersAction"
import { NextRequest, NextResponse } from "next/server"

export async function GET( req: NextRequest ) {
    const data = await getVercelShadersAction()
    return NextResponse.json(data)
}