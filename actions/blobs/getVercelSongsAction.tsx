
"use server"

import { list } from "@vercel/blob"

export async function getVercelSongsAction() {
    const songBlobs = await list({ prefix: 'songs/' })
    return songBlobs

}