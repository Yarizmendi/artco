
import { list } from "@vercel/blob"
import { NextResponse } from "next/server"
 
export async function GET(request: Request) {
  const { blobs } = await list()
  return NextResponse.json(blobs)
}

