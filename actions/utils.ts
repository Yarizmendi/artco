
export const getDistanceBetweenPoints = ( p1, p2 ): number => {
  const deltaX = Math.abs( p2.x - p1.x )
  const deltaY = Math.abs( p2.y - p1.y )
  return Math.sqrt( deltaX ** 2 + deltaY ** 2 )
}

export const getRandomElement = ( arr: any[] ): any => {
  return arr[ Math.floor( Math.random() * arr.length ) ]
}

export const getRandomInteger = ( range: number ): number => {
  return Math.floor( Math.random() * range )
}

export const getRandomHexColor = (): string => {
  const hexCode = '#' + getRandomInteger( 16777215 ).toString( 16 )
  return hexCode
}

export const getImgName = ( path: string ) => {
    /* takes a vercel blob url and gets filename and img name **/
    const imgFile =  path.split('/')[ 3 ]
    const imgName = imgFile.split('.')[ 0 ].replace(/_/g, ' ' )
    return { imgName, imgFile }
  }

// export const stripFileExtension = path => path.split('.')[ 0 ].replace(/_/g, ' ' )
  
// export const rmUnderScores = ( text: string, replacement=' ' ) => text.replace(/_/g, replacement )



export const ID = 0
export const TITLE = "TEST"
export const DESCRIPTION = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."