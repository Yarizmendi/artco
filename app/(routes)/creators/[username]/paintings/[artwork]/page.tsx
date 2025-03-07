import { getMongoImageById } from "actions/images/getImages"
import { getPreviewPaintingSketch } from "actions/sketches/getSketchActions"
import Sketch from "../../Refactor"
import { getVercelShadersAction } from "actions/blobs/getVercelShadersAction"
import NoSSR from "app/NoSSR"

export default async function ArtworkSketch({ params }) {
  let {vert, noises, inputs, displayName, description, textures, transitions, frag} = getPreviewPaintingSketch("preview")
  const images = [await getMongoImageById(params.artwork)]

  const notes =
    [
      {
          "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/0210-mir_8962286502_o.jpg",
          "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/0210-mir_8962286502_o.jpg?download=1",
          "pathname": "paintings/0210-mir_8962286502_o.jpg",
          "size": 925884,
          "uploadedAt": "2025-03-06T05:25:59.000Z",
          "next": 1
      },
      {
          "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/0410-klee_8961090859_o.jpg",
          "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/0410-klee_8961090859_o.jpg?download=1",
          "pathname": "paintings/0410-klee_8961090859_o.jpg",
          "size": 880100,
          "uploadedAt": "2025-03-06T05:26:00.000Z",
          "next": 2
      },
      {
        "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/0510-boccioni_8961090757_o.jpg",
        "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/0510-boccioni_8961090757_o.jpg?download=1",
        "pathname": "paintings/0510-boccioni_8961090757_o.jpg",
        "size": 879708,
        "uploadedAt": "2025-03-06T05:26:00.000Z",
        "next": 3
    },
        {
          "_id": "67ca34edae97b24546d4014b",
          "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/0610-kandinskij_8961090657_o.jpg",
          "size": 903098,
          "title": "paintings/0610-kandinskij_8961090657_o.jpg",
          "pathname": "paintings/0610-kandinskij_8961090657_o.jpg",
          "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/0610-kandinskij_8961090657_o.jpg?download=1",
          "createdAt": "2025-03-06T23:51:09.196Z",
          "next": 4,
      },
      {
          "_id": "67ca34edae97b24546d4014d",
          "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/0710-klimt_8962286098_o.jpg",
          "size": 894181,
          "title": "paintings/0710-klimt_8962286098_o.jpg",
          "pathname": "paintings/0710-klimt_8962286098_o.jpg",
          "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/0710-klimt_8962286098_o.jpg?download=1",
          "createdAt": "2025-03-06T23:51:09.571Z",
          "next": 5,
      },
      {
          "_id": "67ca34edae97b24546d4014f",
          "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/0810-dal_8961090521_o.jpg",
          "size": 925536,
          "title": "paintings/0810-dal_8961090521_o.jpg",
          "pathname": "paintings/0810-dal_8961090521_o.jpg",
          "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/0810-dal_8961090521_o.jpg?download=1",
          "createdAt": "2025-03-06T23:51:09.694Z",
          "next": 6,
      },
      {
          "_id": "67ca34eeae97b24546d40151",
          "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/0910-matisse_8962285944_o.jpg",
          "size": 986048,
          "title": "paintings/0910-matisse_8962285944_o.jpg",
          "pathname": "paintings/0910-matisse_8962285944_o.jpg",
          "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/0910-matisse_8962285944_o.jpg?download=1",
          "createdAt": "2025-03-06T23:51:10.755Z",
          "next": 0,
      },
  ]

  // shader option dropdown has empty value because vercel returns folder first
  let shaderOptions = await getVercelShadersAction()
  shaderOptions = shaderOptions.splice(1)

     return ( 
      <NoSSR>
        <Sketch frag={frag} shaderOptions={shaderOptions} images={images}
        vert={vert}  transitions={transitions} notes={notes}
        title={"preview"} displayName={displayName} description={description} 
        noises={noises} inputs={inputs} textures={textures} />
      </NoSSR>
    )
}




