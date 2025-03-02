
import { getUserImgCollections } from "actions/images/getImages"
import { NextRequest, NextResponse } from "next/server"

export async function GET( req: NextRequest ) {
    // const {searchParams} = req.nextUrl
    // const uploaderId = searchParams.get("user")
    const uploaderId = req.nextUrl.pathname.split("/")[1]
    console.log(uploaderId, "uploaderId")
    const data = await getUserImgCollections({ uploaderId })
    return NextResponse.json(data)
}