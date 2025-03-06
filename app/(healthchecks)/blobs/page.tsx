
"use client"

import { UsePaintings, UseBlobs } from "@/api/vercel/paintings/UsePaintings";
import { UseShaders } from "@/api/vercel/shaders/UseShaders";
import { Loading } from "@/comps/Loading";
import { NotFound } from "@/comps/NotFound";
import Image from "next/image";

export default function BlobsPage() {
  const { data, error, isLoading, isValidating, mutate } = UseBlobs()
  const vercelBlobs = data && data.blobs


  if ( error ) return <NotFound />
  if ( isLoading || isValidating ) return <Loading />
    return (
        <div className="m-4">
            <div className="flex gap-2 w-full flex-wrap">
                {vercelBlobs.map( painting => 
                      <Image 
                        src= {painting.url} 
                        alt={"alt title"} 
                        width={ 300 }
                        height={ 300 }
                        quality={ 100 }
                        className="w-fill h-[260px] md:w-[240px] md:h-[220px] rounded p-2"
                      />
                )}
            </div>
        </div>
    )
}