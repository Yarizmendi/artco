
import { Painting } from "@/comps/Links/PaintingLink"
import { UploadImgForm } from "@/comps/Forms/Upload"
import { getMongoImagesByUploaderId } from "actions/images/getImages"

export default async function Paintings({ params }) {
  const uploaderId = params.user || "66bd62276d3999b70d5fd91b"
  const images = await getMongoImagesByUploaderId({ uploaderId })
  return (
    <div className="flex grow mt-8 px-8">
      <div className="w-1/3">
        <UploadImgForm uploaderId={uploaderId} />
      </div>
      <div className="w-2/3 h-[500px] flex flex-wrap justify-center overflow-auto">
        {images.map( art => <Painting key={art._id} title={art.title} blob={art.blob} path={art.pathname} id={art._id.toString()} uploaderId={uploaderId} />)}
      </div>
    </div>
  )
}

