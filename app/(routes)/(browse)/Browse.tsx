
import Image from "next/image"
import { Suspense } from 'react'
import { allImages } from "../../(api)/images"
// import { ArtPrev } from "comps/ArtPreview"

export function ArtPrev({ path, width, height  }) {
  const imgPrefix = "/images/"
  const imgName = ( path: string ) => path.replace('_', ' ' ).split('.').slice(0, -1).join('.') 
  return (
    <div className="max-w-[150px] hover:scale-110 transform duration-300 ease-in-out cursor-pointer m-4">
      <Image 
        src={ imgPrefix + path } 
        alt={ path } 
        width={ width }
        height={ height }
        className="max-w-[150px] h-[150px] rounded shadow-lg"  />
      <p className="max-w-[150px] p-1 tracking-widest text-xs">{ imgName( path )}</p>
    </div>
  )
}

export function BrowseArt() {
  return (
    <div>
      <span className="material-symbols-outlined cursor-pointer mb-[20px]">apps</span>
      <div className="h-[400px] flex flex-wrap overflow-auto">
        { allImages && allImages.map(( art, idx ) => <ArtPrev key={ idx } path={ art.path } width={ 200 }  height={ 200 } /> )}
      </div>
    </div>
  )
}
