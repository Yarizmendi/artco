
import { getVercelPaintings } from "actions/blobs/getVercelPaintings"
import { getMongoImages, getMongoImagesByUploaderId, updateMongoImageBlobs } from "actions/images/getImages"
import { NextRequest, NextResponse } from "next/server"

export async function GET( req: NextRequest ) {
    const uploaderId = req.nextUrl.searchParams.get("creatorId")
    const vercelFlag = req.nextUrl.searchParams.get("vercel")

    if (vercelFlag) {
        const data = await getVercelPaintings()
        return NextResponse.json(data)
    } else {
        const data = await getMongoImages({ uploaderId })
        return NextResponse.json(data)
    }
}