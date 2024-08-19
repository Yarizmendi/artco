

import { FormSection } from './FormSection'
import { Input } from './FormInput'
import { InputOpts } from './InputOptions'

export default function AddSketch() {

    async function createSketch(formData: FormData) {
        "use server"
        const newSketchBody = {}

        newSketchBody["vert"] = "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert"
        newSketchBody["noises"] = [{
            title: "perlin",
            uniform: "u_noise",
            path: "/perlin.png",
            blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png"
        }]
        newSketchBody["textures"] = [{
            type: "texture",
            uniform: "u_texture",
        }]

        for (var pair of formData.entries()) {
            let [key, val] = [pair[0], pair[1]]
            // @ts-ignore
            if (key == "images") val = uploadImgs
            newSketchBody[key] = val
        }
       console.dir(newSketchBody)
        // return await createSketch(sketch)
    }


    return (
        <form className="grow px-8 py-4 text-sm" action={createSketch}>
            <h1 className="text-center text-lg">Create New Sketch</h1>

            <div className='flex'>
                <div className="flex flex-col w-1/2 p-4 m-2 border">
                    <Input title={"frag"} placeholder={"/new.frag"} value={"/new.frag"} />
                    <Input title={"title"} />
                    <Input title={"displayName"} />
                    <Input title={"description"} type={"textarea"} />
                    <InputOpts />
                </div>

                <FormSection />
            </div>

            <div className='flex justify-end border'>
             <button className="my-2 rounded dark:bg-green-800 px-4 py-2 text-xs font-semibold">submit</button>
            </div>
        </form>
    )
}