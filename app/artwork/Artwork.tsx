
import { allImages } from "../api/images"
import Image from "next/image"
import Link from "next/link"

function ArtLink({ path, width, height}) {
  const imgPrefix = "/images/"
  const imgName = ( path: string ) => path.replace('_', ' ' ).split('.').slice(0, -1).join('.') 
  return (
    <Link 
      href={`/artwork/${ path }`}
      className="hover:scale-110 transform duration-300 ease-in-out cursor-pointer m-2">
      <Image 
        src={ imgPrefix + path } 
        alt={ path } 
        width={ width }
        height={ height }
        className="max-w-[150px] h-[160px] rounded shadow-lg"  />
      <p className="max-w-[150px] tracking-widest text-xs">{ imgName( path )}</p>
    </Link>
  )
}


export default function Artwork() {
  return (
    <div 
      className="h-[380px] flex flex-wrap overflow-auto mx-[30px]">
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
