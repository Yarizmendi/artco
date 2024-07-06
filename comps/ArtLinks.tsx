
import Link from "next/link"
import Image from "next/image"

export const imgWithoutFileExtenstion = ( path: string ) => ( path ).split('.')[ 0 ].replace(/_/g, ' ' )

export default function ArtLink({ url, pathname }) {
  return (
  <Link
    href={ pathname }
    className="hover:scale-110 transform duration-400 ease-in-out cursor-pointer p-4">
    <Image 
      priority
      src={ url } 
      alt={ imgWithoutFileExtenstion( pathname ) } 
      width={ 500 }
      height={ 500 }
      className="max-w-[150px] h-[160px] rounded shadow-lg"  />
      <p className=" p-1 max-w-[150px] tracking-widest text-xs">{ imgWithoutFileExtenstion( pathname ) }</p>
  </Link>   
  )
}