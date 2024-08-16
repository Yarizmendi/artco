
import Link from "next/link"
import Image from "next/image"

export async function Painting({ title, blob, path, id }) {
  return (
  <Link
    prefetch={false}
    href={ `${id}/sketches/${ path }` }
    className="hover:scale-110 transform duration-400 ease-in-out cursor-pointer p-4">
    <Image 
      src={ blob } 
      alt={ title } 
      width={ 300 }
      height={ 300 }
      quality={ 100 }
      className="w-[300px] h-[300px] md:w-[200px] md:h-[220px] rounded"  />
      <p className=" p-1 max-w-[150px] tracking-widest text-xs">{ title }</p>
  </Link>   
  )
}