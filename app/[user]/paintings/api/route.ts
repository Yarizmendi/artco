
import { getMongoImagesByUploaderId } from "actions/images/getImages"
import { NextRequest, NextResponse } from "next/server"

export async function GET( req: NextRequest ) {
    const {searchParams} = req.nextUrl
    const uploaderId = searchParams.get("user")
    const data = await getMongoImagesByUploaderId({ uploaderId })
    return NextResponse.json(data)
}