
import { getVercelSongsAction } from "actions/blobs/getVercelSongsAction";
import { NextRequest, NextResponse } from "next/server"

export default async function GET({ req: NextRequest, res: NextResponse }) {
    const data = await getVercelSongsAction()
    return NextResponse.json(data)

}