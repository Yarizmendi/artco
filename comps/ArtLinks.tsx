
import Link from "next/link"
import Image from "next/image"
import { getImgName } from "actions/utils"

export default function ArtLink({ url }) {
  const { imgName, imgFile } = getImgName( url )
  return (
  <Link
    href={ `sketches/${ imgFile }` }
    className="hover:scale-110 transform duration-400 ease-in-out cursor-pointer p-4">
    <Image 
      priority
      src={ url } 
      alt={ imgName } 
      width={ 500 }
      height={ 500 }
      className="max-w-[150px] h-[160px] rounded"  />
      <p className=" p-1 max-w-[150px] tracking-widest text-xs">{ imgName }</p>
  </Link>   
  )
}