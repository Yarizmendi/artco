import TransitionSketch from "./TransitionSketch";

const sketch = {
    vert: "/basic.vert",
    frag: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/matrixScale.frag",
    title: "test",
    displayName: "test",
    description: "test",
    transitions: false, 
    inputs: [
        {
            "icon": "airwave",
            "type": "slider",
            "label": "offset",
            "uniform": "u_offset",
            "settings": {
                "min": .001,
                "max": 100,
                "step": .001,
                "value": .50
            },
            "description": "Implements spacing between bezier curves",
        },
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
    noises: [{ blob:"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/perlin.png"}],
    images: [
            {
                "_id": "67ca34fbae97b24546d401d5",
                "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/preview_collection6897.png",
            },
            {
                "_id": "67ca34faae97b24546d401d1",
                "blob": "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/highway.jpg",
            },
    ]
}

export default async function Page() {
    return ( 
        <TransitionSketch {...sketch} />
    )
  }

