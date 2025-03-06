
import { getVercelBlobs } from "actions/blobs/getVercelBlobs"
import { getMongoImages, getMongoImagesByUploaderId } from "actions/images/getImages"
import { NextRequest, NextResponse } from "next/server"

export async function GET( req: NextRequest ) {
    const uploaderId = req.nextUrl.searchParams.get("creatorId")
    const vercelFlag = req.nextUrl.searchParams.get("vercel")

    if (vercelFlag) {
        const data = await getVercelBlobs()
        return NextResponse.json(data)
    }

    if (uploaderId) {
        const data = await getMongoImagesByUploaderId({ uploaderId })
        return NextResponse.json(data)
    }
    
    const data = await getMongoImages()
    return NextResponse.json(data)
}