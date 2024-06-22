
import { allImages } from "../../api/images"
import ArtLink from "comps/ArtLink"

export default function Artwork() {
  return (
    <div>
      <span className="material-symbols-outlined cursor-pointer mb-[20px]">apps</span>
      <div className="h-[400px] flex flex-wrap overflow-auto">
        { allImages && allImages.map(( art, idx ) => <ArtLink key={ idx } path={ art.path } width={ 200 }  height={ 200 } /> )}
      </div>
    </div>
  )
}
