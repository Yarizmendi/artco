
import Image from "next/image"
import Sketch from "comps/Sketch"
import sketch from "comps/Sketch"

export default function Editor({ params }) {

  return (
    <div className="flex items-center">

     <Image
       src={ "/images/" + params.path }
       alt={ params.path }
       width={ 500 }
       height={ 500 }
       className={ "h-[400px] w-[400px] my-4" } />
          
      <Sketch 
        id="canvasParent"
        data = { params.path }
        sketch={ sketch }
        className="w-[400px] h-[400px] border-2" 
      />

    </div>
  )
}




