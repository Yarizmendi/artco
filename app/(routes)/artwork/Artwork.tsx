
import { allImages } from "../../api/images"
import { ArtPrev } from "comps"

export default function Artwork() {
  return (
    <div>
      <span className="material-symbols-outlined cursor-pointer mb-[20px]">apps</span>
      <div className="h-[400px] flex flex-wrap overflow-auto">
        { allImages && allImages.map(( art, idx ) => <ArtPrev key={ idx } path={ art.path } width={ 200 }  height={ 200 } /> )}
      </div>
    </div>
  )
}
