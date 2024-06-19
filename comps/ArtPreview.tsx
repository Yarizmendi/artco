
import Image from "next/image"
import classNames from "classnames"


export function ArtPrev({ path, width, height }) {
    
  const twDiv = `w-[${ width }px] h-[${ height}px] hover:scale-110 transform duration-300 ease-in-out cursor-pointer m-4`
  const twImg = `max-w-[${ width }px] h-[150px] rounded shadow-lg`

  const imgPrefix = "/images/"
  const imgName = ( path: string ) => path.replace('_', ' ' ).split('.').slice(0, -1).join('.') 
  return (
    <div className={classNames( twDiv )}>
      <Image 
        src={ imgPrefix + path } 
        alt={ path } 
        width={ width }
        height={ height }
        className={classNames( twImg )}
      />
      <p className="w-[20px] truncate">{ imgName( path )}</p>
    </div>
  )
}
