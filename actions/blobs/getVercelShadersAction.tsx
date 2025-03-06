"use server"
import { list } from '@vercel/blob'

export async function getVercelShadersAction() {
  let { blobs } = await list({ prefix: 'shaders/' })
  return blobs
}


