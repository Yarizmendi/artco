
'use server'
import { list } from "@vercel/blob"

export async function getBlob( prefix?, limit=1 ) {
  const blob = await list({ prefix, limit })
  return blob.blobs
}

export async function getBlobCollection( collection ) {
  let customRes = []
  for ( let i = 0; i < collection.length; i++ ) {
    const blob = await getBlob(collection[ i ].path ) 
    customRes.push( ...blob )
  }
  return customRes
}

