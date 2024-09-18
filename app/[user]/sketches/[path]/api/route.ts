

import { NextRequest, NextResponse } from "next/server"

export async function GET( req: NextRequest ) {
    const {searchParams} = req.nextUrl
    const title = searchParams.get("title")
    const creatorId = searchParams.get("user") 
    const data = {title, creatorId }
    return NextResponse.json(data)
}
