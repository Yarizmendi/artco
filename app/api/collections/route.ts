
import { getCollections } from "actions/images/getImages"
import { NextRequest, NextResponse } from "next/server"

export async function GET( req: NextRequest ) {
    const data = await getCollections()
    return NextResponse.json(data)
}