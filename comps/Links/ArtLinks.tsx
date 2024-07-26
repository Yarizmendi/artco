
import Link from "next/link"
import Image from "next/image"
import { getBlob }  from "actions/blobs"

export default async function ArtLink({ title, url  }) {
  let blob = await getBlob( url )
  let blobUrl = blob[ 0 ].url
  return (
  <Link
    href={ `sketches/${ title }` }
    className="hover:scale-110 transform duration-400 ease-in-out cursor-pointer p-4">
    <Image 
      priority
      src={ blobUrl } 
      alt={ title } 
      width={ 500 }
      height={ 500 }
      className="max-w-[150px] h-[160px] rounded"  />
      <p className=" p-1 max-w-[150px] tracking-widest text-xs">{ title }</p>
  </Link>   
  )
}