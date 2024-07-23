
'use server'
import { list } from "@vercel/blob"

export async function getBlob({ prefix }) {
  const blob = await list({ prefix, limit: 1 })
  return blob.blobs
}

export async function getBlobs({ limit }) {
  const blobObs = await list({ limit })
  return blobObs.blobs
}

export async function getBlobCollection({ collection }) {
  let customRes = []
  for ( let i = 0; i < collection.length; i++ ) {
    const blob = await getBlob({ prefix: collection[ i ].path }) 
    customRes.push( ...blob )
  }
  return customRes
}

