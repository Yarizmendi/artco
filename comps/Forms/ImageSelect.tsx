
"use client"
import { Datalist } from "@/comps/Forms/DataList"
import { Loading } from "@/comps/Loading"
import { NotFound } from "@/comps/NotFound"
import { UsePaintings } from "app/[user]/paintings/api/UsePainting"
import { UseShaders } from "app/shaders/UseShaders"

export function ImageSelect({ uploaderId }) {
  const { data, error, isLoading } = UsePaintings({ uploaderId })
  if ( error ) return <NotFound />
  if ( isLoading ) return <Loading />
  if ( data ) return <Datalist title={"image"} list="images" dataArr={data} />
}

export function ShaderSelect() {
  const { data, error, isLoading } = UseShaders()
  if ( error ) return <NotFound />
  if ( isLoading ) return <Loading />
  if ( data ) return <Datalist title={"shader"} list="shaders" dataArr={data} />
}
