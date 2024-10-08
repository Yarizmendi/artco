

export const preload = (p) => {
    // images && images.length && images.map(img => img["Image"] = p.loadImage(img.blob))
    // ActiveShader = p.loadShader(vert, frag) 
}

export const setup = (p) => {
    p.createCanvas(500, 580, p.WEBGL).parent("Parent").addClass("min-h-[580]")
    p.background(255)
}

export const draw = (p, ActiveShader) => {
    // p.shader(ActiveShader)?
    p.rect(0,0,0)
}