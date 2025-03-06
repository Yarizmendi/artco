
import { getMongoImages } from "actions/images/getImages"
import { NextRequest, NextResponse } from "next/server"

export async function GET( req: NextRequest ) {
    const data = await getMongoImages()
    return NextResponse.json(data)
}