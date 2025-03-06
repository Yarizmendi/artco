"use server"
import { list } from '@vercel/blob'

export async function getVercelShadersAction() {
  const blobs = await list({ prefix: 'shaders/' })
  return blobs
}


