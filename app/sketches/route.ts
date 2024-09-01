
import { getSKetches } from "actions/sketches/getSketchActions"
import { USERID } from "data/id"

// import sketchModel from "@/mongo/models/sketch.model"

const sketchInputBody = {
    transitions: true,
    vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
    frag: "/stem.frag",
    blob: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Messenger_creation_2c5e9010-5b0c-444a-adf7-77d39557c80d.jpeg",
    title: "mixing",
    creatorId: USERID,

    noises: [{
        "_id": "66d23819ef9ec71d14e5d9b1",
        "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png",
        "title": "perlin",
        "pathname": "perlin.png",
        "description": "perlin noise",
        "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png?download=1",
        "uploaderId": "66bd62276d3999b70d5fd91b",
        "createdAt": "2024-08-30T21:22:33.697Z",
        "__v": 0
    }],

    images: [
        {
            "_id": "66d3c0ee39447bc27f9a8ed0",
            "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Messenger_creation_ff780553-bb04-4c35-82f8-a9dc2270fb23.jpeg",
            "title": "Messenger_creation_ff780553-bb04-4c35-82f8-a9dc2270fb23.jpeg",
            "pathname": "Messenger_creation_ff780553-bb04-4c35-82f8-a9dc2270fb23.jpeg",
            "description": "",
            "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Messenger_creation_ff780553-bb04-4c35-82f8-a9dc2270fb23.jpeg?download=1",
            "createdAt": "2024-09-01T01:18:38.031Z"
        },
        {
            "_id": "66d3c0ed39447bc27f9a8ece",
            "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Messenger_creation_be0bb56a-8b40-4777-9521-89e4a216f91e.jpeg",
            "title": "Messenger_creation_be0bb56a-8b40-4777-9521-89e4a216f91e.jpeg",
            "pathname": "Messenger_creation_be0bb56a-8b40-4777-9521-89e4a216f91e.jpeg",
            "description": "",
            "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Messenger_creation_be0bb56a-8b40-4777-9521-89e4a216f91e.jpeg?download=1",
            "createdAt": "2024-09-01T01:18:37.557Z"
        },
        {
            "_id": "66d3c0ed39447bc27f9a8ecc",
            "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Messenger_creation_8ee70c0a-0645-42b5-a3be-a07e7ccb8abf.jpeg",
            "title": "Messenger_creation_8ee70c0a-0645-42b5-a3be-a07e7ccb8abf.jpeg",
            "pathname": "Messenger_creation_8ee70c0a-0645-42b5-a3be-a07e7ccb8abf.jpeg",
            "description": "",
            "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Messenger_creation_8ee70c0a-0645-42b5-a3be-a07e7ccb8abf.jpeg?download=1",
            "createdAt": "2024-09-01T01:18:37.040Z"
        },
        {
            "_id": "66d3c0ec39447bc27f9a8ec8",
            "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Messenger_creation_2c5e9010-5b0c-444a-adf7-77d39557c80d.jpeg",
            "title": "Messenger_creation_2c5e9010-5b0c-444a-adf7-77d39557c80d.jpeg",
            "pathname": "Messenger_creation_2c5e9010-5b0c-444a-adf7-77d39557c80d.jpeg",
            "description": "",
            "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Messenger_creation_2c5e9010-5b0c-444a-adf7-77d39557c80d.jpeg?download=1",
            "createdAt": "2024-09-01T01:18:36.134Z"
        },
        {
            "_id": "66d3c0eb39447bc27f9a8ec6",
            "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Messenger_creation_653416fc-a330-4eff-9d90-e16ffd5ce7cf.jpeg",
            "title": "Messenger_creation_653416fc-a330-4eff-9d90-e16ffd5ce7cf.jpeg",
            "pathname": "Messenger_creation_653416fc-a330-4eff-9d90-e16ffd5ce7cf.jpeg",
            "description": "",
            "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Messenger_creation_653416fc-a330-4eff-9d90-e16ffd5ce7cf.jpeg?download=1",
            "createdAt": "2024-09-01T01:18:35.589Z"
        },
        {
            "_id": "66d3c0d239447bc27f9a8ec1",
            "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Messenger_creation_079550e4-3e65-40ab-b885-000f175463ca.png",
            "title": "Messenger_creation_079550e4-3e65-40ab-b885-000f175463ca.png",
            "pathname": "Messenger_creation_079550e4-3e65-40ab-b885-000f175463ca.png",
            "description": "",
            "downloadUrl": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/Messenger_creation_079550e4-3e65-40ab-b885-000f175463ca.png?download=1",
            "createdAt": "2024-09-01T01:18:10.190Z"
        },
    ],

    inputs: [
        {
            "_id": "66d318d13df76d776c2d951f",
            "icon": "airwave",
            "type": "slider",
            "label": "threshold",
            "uniform": "u_threshold",
            "settings": {
                "min": 0,
                "max": 1,
                "value": 1,
                "step": 0.1
            },
            "description": "percentage of mixture",
            "createdAt": "2024-08-31T13:21:21.721Z",
            "__v": 0
        },
        {
            "_id": "66d318d13df76d776c2d9521",
            "icon": "instant_mix",
            "type": "slider",
            "label": "range",
            "uniform": "u_range",
            "settings": {
                "min": 0,
                "max": 1,
                "value": 0.25,
                "step": 0.01
            },
            "description": "size of noise",
            "createdAt": "2024-08-31T13:21:21.764Z",
            "__v": 0
        },
        {
            "_id": "66d3cea1982d3e771853e1f7",
            "icon": "timer",
            "type": "slider",
            "label": "threshold",
            "uniform": "u_timeout",
            "settings": {
                "min": 5,
                "max": 30,
                "value": 3,
                "step": 1
            },
            "description": "time of mixture of mixture",
            "createdAt": "2024-09-01T02:17:05.687Z",
            "__v": 0
        }
    ],
    textures: [
        {
            "_id": "66d31d673df76d776c2d953b",
            "uniform": "u_background",
            "__v": 0
        },
        {
            "_id": "66d31d673df76d776c2d953e",
            "uniform": "u_foreground",
            "__v": 0
        }
    ],
    
}
// await sketchModel.create(sketchInputBody)

export async function GET( req: Request ) {
    const sketches = await getSKetches()
    return Response.json(sketches)
}

