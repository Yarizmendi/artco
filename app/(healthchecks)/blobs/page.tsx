
"use client"

import { UseShaders } from "@/api/vercel/shaders/UseShaders";
import { Loading } from "@/comps/Loading";
import { NotFound } from "@/comps/NotFound";

export default function BlobsPage() {
  const { data, error, isLoading, isValidating, mutate } = UseShaders()
  if ( error ) return <NotFound />
  if ( isLoading || isValidating ) return <Loading />
    return (
        <div>
            <div>
                {data.map( shader => <p>{shader.url}</p>)}
            </div>
        </div>
    )
}