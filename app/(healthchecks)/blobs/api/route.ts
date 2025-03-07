
import { UseBlobs } from "@/api/vercel/paintings/UsePaintings";
import ImageModel from "@/mongo/models/image.model";
import { getVercelPaintings } from "actions/blobs/getVercelPaintings";
import { deleteMongoImages, getMongoImages } from "actions/images/getImages";
import { getUserByUsernameAction } from "actions/users/getUserAction";
import { NextResponse } from "next/server";

export async function GET() {
    const username = "Benji" 
    const user = await getUserByUsernameAction({ username })
    const { blobs } = await getVercelPaintings()

    // const mongoImages = await getMongoImages()
    // for (let i=0; i<mongoImages.length; i++) {
    //     const mongoImage = mongoImages[i]
    //     await ImageModel.findByIdAndDelete(mongoImage._id)
    // }

    // put all vercel blobs into mongoDb
    //   if (blobs) {
    //     for ( let i=0; i<blobs.length; i++) {
    //       const blob = blobs[i]
    //       const image = await ImageModel.create({
    //         ...blob,
    //         blob: blob.url,
    //         title: blob.pathname,
    //         uploaderId: user._id
    //       })
    //       console.log(image)
    //     }
    //   }
    


    return NextResponse.json(blobs)
}

