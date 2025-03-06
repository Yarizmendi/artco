

import Link from "next/link"
import Image from "next/image"

export default function CollectionLink({ id, blob, title, uploaderId }) {
    return (
        <Link href={ `collections/${id}`}
        replace={true}
        prefetch={false}
        >  
        <Image 
            src= {blob} 
            alt={title} 
            width={ 300 }
            height={ 300 }
            quality={ 100 }
            className="w-fill h-[260px] md:w-[240px] md:h-[220px] rounded"
        />
      </Link>
      
    )
}    