
import Image from "next/image"
import EditorSketch from "./EditorSketch"

export default function Homepage({ params }) {
  return (
    <div className="flex items-center">

    <Image
      src={ "/images/" + params.path }
      alt={ params.path }
      width={ 500 }
      height={ 500 }
      className={ "h-[400px] w-1/2" } />
         
      <EditorSketch path={ params.path } />

   </div>
  )
}
