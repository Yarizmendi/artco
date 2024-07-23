
'use server'
import { list } from "@vercel/blob"

export async function getImages({ prefix, limit }: { prefix?: string, limit?: number }) {
  return await list({ prefix, limit })
}

export async function getBlobs({ prefix, limit }: { prefix?: string, limit?: number }) {
  return await list({ prefix, limit })
}

export async function getSketchImgs({ paths }: { paths?: string[] }) {
  const customRes = []
  paths.map( async path => {
    customRes.push( await list({ prefix: path, limit: 1 }))
  })
  return customRes
}
