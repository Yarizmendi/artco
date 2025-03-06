import { list } from "@vercel/blob"

export async function getVercelVideosAction() {
    const {blobs} = await list({ prefix: 'videos/',  token: process.env.BLOB_READ_WRITE_TOKEN })
    return blobs
  }