
import BezierSketch from "./BezierSketch";

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
        {"blob":"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/paintings/ballerina.png","title":"ballerina","pathname":"ballerina.png","description":"quantum ballerina","downloadUrl":"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/ballerina.png?download=1","uploaderId":{"$oid":"66bd62276d3999b70d5fd91b"},"createdAt":{"$date":{"$numberLong":"1725050762230"}},"__v":{"$numberInt":"0"}}
    ]
}

export default async function Page() {
    return ( 
        <BezierSketch {...sketch} />
    )
  }


