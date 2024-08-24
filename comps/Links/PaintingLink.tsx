
import Link from "next/link"
import Image from "next/image"
import { IconButton } from "../Buttons/IconButton"

export function Painting({ title, blob, path, id, uploaderId }) {
  return (
  <div className="transform duration-400 ease-in-out p-4">
    <Link
      prefetch={false}
      href={ `/${id}/sketches/${ path }` }>
      <Image 
        src= { blob } 
        alt={ title } 
        width={ 300 }
        height={ 300 }
        quality={ 100 }
        className="w-[300px] h-[300px] md:w-[200px] md:h-[220px] rounded" />
    </Link>  

    <div className="flex">
      <p className=" p-1 max-w-[150px] tracking-widest text-xs">{ title }</p>
      <IconButton color="red" loadingTxt="deleting" iconName=" delete " imageId={id} vercelBlobUrl={blob} uploaderId={uploaderId} />
    </div>

  </div>

  )
}