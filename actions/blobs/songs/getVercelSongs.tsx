
"use server"

import { list } from "@vercel/blob"

export async function getVercelSongBlobs() {
    const songBlobs = await list({ prefix: 'songs/' })
    return songBlobs

}