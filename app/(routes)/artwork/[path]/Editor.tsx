
import Image from "next/image"
import Sketch from "comps/Sketch"

export default function Editor({ params }) {

  return (
    <div className="flex items-center">

     <Image
       src={ "/images/" + params.path }
       alt={ params.path }
       width={ 500 }
       height={ 500 }
       className={ "h-[400px] w-1/2" } />
          
      <Sketch 
        data = { params.path }
        className="h-[400px] w-1/2 m-4 border-2" />

    </div>
  )
}




