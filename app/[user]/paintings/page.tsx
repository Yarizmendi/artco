
import { ImageCreateForm } from "@/comps/Forms/ImageCreateForm"
import { PaintingsList } from "./Paintings"

export default function PaintingsPage({ params }) {
  const uploaderId = params.user || "66bd62276d3999b70d5fd91b"
  return (
    <div className="flex flex-col items-center justify-center grow md:flex-row md:items-start mt-8 px-4">
      <ImageCreateForm uploaderId={uploaderId} /> 
      <PaintingsList uploaderId={uploaderId} />
    </div>
  )
}




