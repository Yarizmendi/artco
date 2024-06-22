
import { allImages } from "../../api/images"
import Image from "next/image"
import Link from "next/link"

function ArtLink({ path, width, height  }) {
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
        className="max-w-[130px] h-[140px] rounded shadow-lg"  />
      <p className="max-w-[130px] tracking-widest text-xs">{ imgName( path )}</p>
    </Link>
  )
}


export default function Artwork() {
  return (
    <div 
      className="h-[350px] flex justify-center flex-wrap overflow-auto mx-[30px]">
      { allImages && allImages.map(( art, idx ) => 
        <ArtLink 
          width={ 130 } 
          height={ 140 } 
          key={ idx }
          path={ art.path } 
        /> )}
    </div>
  )
}
