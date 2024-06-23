
import { colorsSketch as allImages } from "../api/images"
import Image from "next/image"
import Link from "next/link"
import React from "react"

function ArtLink({ path, width, height}) {
  const imgPrefix = "/images/"
  const imgName = ( path: string ) => path.replace('_', ' ' ).split('.').slice(0, -1).join('.') 
  return (
    <Link 
      href={`/sketches/${ path }`}
      className="hover:scale-110 transform duration-400 ease-in-out cursor-pointer m-2 h-fit">
      <Image 
        src={ imgPrefix + path } 
        alt={ path } 
        width={ width }
        height={ height }
        className="max-w-[150px] h-[160px] rounded shadow-lg"  />
        <p className=" p-1 max-w-[150px] tracking-widest text-xs">{ imgName( path )}</p>
    </Link>
  )
}


export default function Artwork() {
  return (
    <div 
      className="h-[400px] w-full flex flex-wrap overflow-auto mx-[20px]">
      { allImages && allImages.map(( art, idx ) => 
        <ArtLink 
          key={ idx }
          width={ 150 } 
          height={ 160 } 
          path={ art.path } 
        /> )}
    </div>
  )
}
