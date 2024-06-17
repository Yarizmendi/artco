
import Image from "next/image"
import { allImages } from "../../(api)/images"

function ArtPrev({ path }) {
  const imgPrefix = "/images/"
  const imgName = path => path.replace('_', ' ' ).split('.').slice(0, -1).join('.') 
  return (
    <div className="w-[200px]">
      <Image 
        src={ imgPrefix + path } 
        alt={ path } 
        width={ 180 }
        height={ 180 }
        className="border-2 w-[180px] h-[180px] cursor-pointer" 
      />
      <p className="pl-[3px] tracking-widest text-xs">{ imgName( path )}</p>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="grid grid-cols-6 gap-4">
      { allImages.map(( art, idx ) => 
        <ArtPrev key={ idx } path={ art.path } />
      )}
    </div>
  )
}
