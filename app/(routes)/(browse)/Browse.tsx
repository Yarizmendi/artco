
import Image from "next/image"
import { Suspense } from 'react'
import { allImages } from "../../(api)/images"

export function ArtPrev({ path }) {
  const imgPrefix = "/images/"
  const imgName = ( path: string ) => path.replace('_', ' ' ).split('.').slice(0, -1).join('.') 
  return (
    <div className="max-w-[150px] hover:scale-110 transform duration-300 ease-in-out cursor-pointer m-4">
      <Image 
        src={ imgPrefix + path } 
        alt={ path } 
        width={ 200 }
        height={ 200 }
        className="max-w-[150px] h-[150px] rounded shadow-lg" 
      />
      <p className="py-2 tracking-widest text-xs text-center">{ imgName( path )}</p>
    </div>
  )
}

export function BrowseArt({ showCnt = 12 }) {
  const imgs = allImages.slice( 0, showCnt )
  return (
    <div className="w-full">
      <span className="material-symbols-outlined cursor-pointer mb-[20px]">apps</span>
      <div className="flex flex-wrap justify-between">
        { imgs.map(( art, idx ) => 
          <Suspense key={ idx }>
            <ArtPrev path={ art.path } />
          </Suspense>
        )}
      </div>
      <ol className="text-end text-xs flex items-center justify-end row gap-2 p-[20px]">
        <span className="material-symbols-outlined">arrow_right_alt</span>
        <li className="underline underline-offset-2">1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ol>
    </div>
  )
}
