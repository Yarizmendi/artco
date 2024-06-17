
import Image from "next/image"
import { allImages, getSomeImgs } from "../../(api)/images"

export function ArtPrev({ path }) {
  const imgPrefix = "/images/"
  const imgName = ( path: string ) => path.replace('_', ' ' ).split('.').slice(0, -1).join('.') 
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

export function HomePage({ imgCnt = 12 }) {
  const imgs = getSomeImgs( imgCnt )
  return (
    <div className="w-full">
      <div className="grid grid-cols-6 gap-4">
        { imgs.map(( art, idx ) => 
          <ArtPrev key={ idx } path={ art.path } />
        )}
      </div>
      <p className="text-end text-xs">{ imgCnt } / { allImages.length - 1 }</p>
    </div>
  )
}
