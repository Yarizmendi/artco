

import Link from "next/link"
import Image from "next/image"

export default function Collection({ id, blob, title }) {
    return (
        <Link href={{ pathname: `sketches/${id}-collection-${title}`,
         // query: { type: "collection" } 
        }} 
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