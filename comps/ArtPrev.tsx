
import Image from "next/image"

export default function ArtPrev({ path, width, height  }) {
  const imgPrefix = "/images/"
  const imgName = ( path: string ) => path.replace('_', ' ' ).split('.').slice(0, -1).join('.') 
  return (
    <div className="max-w-[150px] cursor-pointer m-2">
      <Image 
        src={ imgPrefix + path } 
        alt={ path } 
        width={ width }
        height={ height }
        className="max-w-[150px] h-[150px] rounded shadow-lg" 
      />
      <p className="max-w-[150px] p-1 tracking-widest text-xs">{ imgName( path )}</p>
    </div>
  )
}
