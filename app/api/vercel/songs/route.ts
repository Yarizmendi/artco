
import { NextRequest, NextResponse } from "next/server";

export default async function GET({ req: NextRequest, res: NextResponse }) {
  const { creatorId, title } = NextRequest.query
  const url = `https://api.spotify.com/v1/search?q=${title}&type=track&limit=1`
  const fetcher = url => fetch(url).then((res) => res.json())
  const data = await fetcher(url)
  return NextResponse.json(data)

}