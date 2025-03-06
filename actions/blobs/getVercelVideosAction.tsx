import { list } from "@vercel/blob"

export async function getVercelVideosAction() {
    const {blobs} = await list({ prefix: 'videos/' })
    return blobs
  }