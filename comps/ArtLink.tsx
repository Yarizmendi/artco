
import Image from "next/image"
import Link from "next/link"

function ArtPrev({ path, width, height  }) {
  const imgPrefix = "/images/"
  const imgName = ( path: string ) => path.replace('_', ' ' ).split('.').slice(0, -1).join('.') 
  return (
    <Link 
      href={`/artwork/${ path }`}
      className="max-w-[150px] hover:scale-110 transform duration-300 ease-in-out cursor-pointer m-4">
      <Image 
        src={ imgPrefix + path } 
        alt={ path } 
        width={ width }
        height={ height }
        className="max-w-[150px] h-[150px] rounded shadow-lg"  />
      <p className="max-w-[150px] p-1 tracking-widest text-xs">{ imgName( path )}</p>
    </Link>
  )
}

export default ArtPrev
