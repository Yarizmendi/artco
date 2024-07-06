
'use server'
import { list } from "@vercel/blob"

export async function getImages({ prefix, limit }: { prefix?: string, limit?: number }) {
  return await list({ prefix, limit })
}
