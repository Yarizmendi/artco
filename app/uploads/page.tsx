
"use client"
import { UseVercelImages } from "@/api/vercel/images/UseVercelImages"
import { Painting } from "@/comps/Links/PaintingLink"

export default function Page() {
    let vercelImages = UseVercelImages()
    return (
        <div className="w-full h-full m-8">
            <div className="w-11/12 md:w-2/3 h-[500px] md:h-vh flex flex-wrap overflow-auto p-8">
                { vercelImages.data && vercelImages.data.map(( imgObj, idx ) => 
                <Painting 
                    key={idx} 
                    positionIdx={idx} 
                    id={idx} 
                    title={imgObj.pathname}
                    blob={imgObj.url} 
                    uploaderId={0} 
                    description={"art.description"} 
                    displayName={"art.displayName"}  /> 
                )}
            </div>
        </div>
    )
}