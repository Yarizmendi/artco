const sketch = {
    vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
    frag: "/matrixScale.frag",
    title: "grateful_dead",
    displayName: "Grateful Dead",
    description: "Grateful dead sketch",
    transitions: false, 
    inputs: [
        {
            "icon": "zoom_in_map",
            "type": "slider",
            "label": "waves",
            "uniform": "u_waves",
            "settings": {
                "min": 0,
                "max": 150,
                "step": 1,
                "value": 10
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
    noises: [{blob:"https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/perlin.png"}]
}