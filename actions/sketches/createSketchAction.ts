
"use server"
import connect from 'mongo/index.js'
import { redirect } from 'next/navigation'
import SketchModel from '@/mongo/models/sketch.model'

export async function createSketchAction ( formData: FormData ) {
    const id = formData.get("creatorId")
    const title = formData.get("title")

    let images = formData.get("images")
    let inputs = formData.get("motions")
    let textures = formData.get("textures")
    let transitions = formData.get("transitions")

    const sketchInputBody = {
        vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
        frag: formData.get("frag"),
        blob: formData.get("blob"),
        title: title,
        creatorId: id,
        displayName: formData.get("displayName"),
        description: formData.get("description"),
        transitions: transitions == "false" ? false : true,
  
        path: `sketches/${title}`,
        noises: [],

        images: [images],
        inputs: [inputs],
        textures: [textures],
        
        tags: {
            meta: [],
            object: [],
        }
    }

    console.log(sketchInputBody.transitions)

    await connect()
    await SketchModel.create(sketchInputBody)
    redirect(`/${id}/sketches/`)
}