
export const artworkBlobs = "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com"

export async function getBlob( prefix?, limit=1 ) {
  return artworkBlobs + prefix
}

export async function getBlobCollection( imgPaths ) {
  let customRes = []
  imgPaths.map( img => customRes.push( artworkBlobs + img ))
  return customRes
}

