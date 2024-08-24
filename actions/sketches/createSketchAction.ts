
"use server"
import connect from 'mongo/index.js'
import { redirect } from 'next/navigation'
import SketchModel from '@/mongo/models/sketch.model';

export async function createSketchAction ( formData: FormData ) {
    const id = formData.get("creatorId")
    const title = formData.get("title")
    const images = formData.get("images")
    const inputs = formData.get("motions")
    const textures = formData.get("textures")

    const sketchInputBody = {
        vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
        frag: formData.get("frag"),
        blob: formData.get("blob"),
        title: title,
        creatorId: id,
        displayName: formData.get("displayName"),
        description: formData.get("description"),
        transitions: formData.get("transitions") === "off" ? false : true,
  
        path: `sketches/${title}`,
        noises: [],

        images: images,
        inputs: inputs,
        textures: textures,
        
        tags: {
            meta: [],
            object: [],
        }
    };

    console.log(formData.get("images"))

    await connect()
    await SketchModel.create(sketchInputBody)
    redirect(`/${id}/sketches/`)
}