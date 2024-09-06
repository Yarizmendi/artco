
"use client"
import { Datalist } from "@/comps/Forms/DataList"
import { Loading } from "@/comps/Loading"
import { NotFound } from "@/comps/NotFound"
import { UsePaintings } from "app/[user]/paintings/api/UsePainting"
// import { UseInputs } from "app/inputs/api/UseInputs"
// import { UseTextures } from "app/textures/api/UseShaders"

export function ImageSelect({ uploaderId }) {
  const { data, error, isLoading } = UsePaintings({ uploaderId })
  if ( error ) return <NotFound />
  if ( isLoading ) return <Loading />
  if ( data ) return <Datalist title={"images"} list="images" dataArr={data} />
}

// export function InputSelect() {
//   const { data, error, isLoading } = UseInputs()
//   if ( error ) return <NotFound />
//   if ( isLoading ) return <Loading />
//   if ( data ) return <Datalist title={"inputs"} list="inputs" dataArr={data} />
// }

// export function TextureSelect() {
//   const { data, error, isLoading } =  UseInputs()
//   if ( error ) return <NotFound />
//   if ( isLoading ) return <Loading />
//   if ( data ) return <Datalist title={"textures"} list="textures" dataArr={data} />
// }