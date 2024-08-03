
import Link from "next/link"
import Image from "next/image"

export default function Painting({ title, blob, path  }) {
  title = title.replace(/_/g, ' ')
  return (
  <Link
    href={ `sketches/${ path }` }
    className="hover:scale-110 transform duration-400 ease-in-out cursor-pointer p-4">
    <Image 
      priority
      src={ blob } 
      alt={ title } 
      width={ 500 }
      height={ 500 }
      className="max-w-[150px] h-[160px] rounded"  />
      <p className=" p-1 max-w-[150px] tracking-widest text-xs">{ title }</p>
  </Link>   
  )
}