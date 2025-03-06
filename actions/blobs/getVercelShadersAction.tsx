"use server"
import { list } from '@vercel/blob'

export async function getVercelShadersAction() {
  let { blobs } = await list({ prefix: 'shaders/', token: process.env.BLOB_READ_WRITE_TOKEN })
  return blobs
}


