


import { getUserImgCollectionById } from "actions/images/getImages"
import { NextRequest, NextResponse } from "next/server"



export async function GET(req: NextRequest) {
    const data = await getUserImgCollectionById("66da83cf5d6b96614f57d6aa")
    return NextResponse.json(data)
}
