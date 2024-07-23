
export const getImgName = ( path: string ) => {
    /* takes a vefcel blob url and gets filename and img name **/
    const imgFile =  path.split('/')[ 3 ]
    const imgName = imgFile.split('.')[ 0 ].replace(/_/g, ' ' )
    return { imgName, imgFile }
  }

  export const stripNextPathParams = path => {
    return path.replace('sketches/', '')
  }

  export const stripFileExtension = path => path.split('.')[ 0 ].replace(/_/g, ' ' )
  

