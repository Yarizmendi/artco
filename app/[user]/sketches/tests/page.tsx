
import Sketch from "../tests/Test"

const sketch = {
    vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
    frag: "/matrixScale.frag",
    title: "test",
    displayName: "test",
    description: "test",
    transitions: false, 
    inputs: [
        {
            "icon": "zoom_in_map",
            "type": "slider",
            "label": "waves",
            "uniform": "u_waves",
            "settings": {
                "min": 0,
                "max": 500,
                "step": 1,
                "value": 15
            },
            "description": "Implements zooming into the upper left corner of the canvas. Value controls how long the zoom should run.",
        },
        {
            "icon": "zoom_in_map",
            "type": "slider",
            "label": "zoom",
            "uniform": "u_zoom",
            "settings": {
                "min": 0,
                "max": 120,
                "step": 1,
                "value": 120
            },
            "description": "Implements zooming into the upper left corner of the canvas. Value controls how long the zoom should run.",
        }
    ],
    textures: [
        {"uniform": "u_texture"},
    ],
    noises: [{blob:"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png"}],
    images: [

        {
            "_id": "66f254e311cb1072bc57a59e",
            "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/inbound2772130963691182903.jpg",
            "title": "womelon",
            "pathname": "inbound2772130963691182903.jpg",
            "description": "",
            "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/inbound2772130963691182903.jpg?download=1",
            "createdAt": "2024-09-24T05:57:55.106Z"
        },
        // {
        //     "_id": "66f4c56c2715853f18d2b573",
        //     "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Messenger_creation_3A9B32CE-BB98-44EB-A40F-DEA475FC809B.png",
        //     "title": "Messenger_creation_3A9B32CE-BB98-44EB-A40F-DEA475FC809B.png",
        //     "pathname": "Messenger_creation_3A9B32CE-BB98-44EB-A40F-DEA475FC809B.png",
        //     "description": "",
        //     "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Messenger_creation_3A9B32CE-BB98-44EB-A40F-DEA475FC809B.png?download=1",
        //     "createdAt": "2024-09-26T02:22:36.574Z"
        // },
]
}

export default async function Page({ params }) {
    return <Sketch {...sketch} />
  }




