
"use server"
import connect from 'mongo/index.js'
import ImageModel from '@/mongo/models/image.model'
import { list } from '@vercel/blob'
import { head, BlobAccessError } from '@vercel/blob'
 
export async function getBlobMeta(vercelBlob) {
  let blobMetadata
  try {
    blobMetadata = await head(vercelBlob)
  }
  catch (err) {
    console.log("error! skipped!")
    blobMetadata = false
  }
  return blobMetadata
}

export async function getPaintings() {
  const blobs = await list({ prefix: 'paintings/' })
  return blobs
}

// const listOfBlobs = await list({
//     cursor,
//     limit: 10,
//     prefix: 'folder/',
//   });


