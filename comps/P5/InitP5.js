export const ICONS_FILL = "material-symbols-fill"
export const ICONS_OUTLINE = "material-symbols-outlined"

export function P5Recorder( path ) {
  let recordedChunks = []
  let link = document.querySelector("a")
  let canvas = document.querySelector("canvas")
  let stream = canvas.captureStream( 60 )
  let options = { mimeType: "video/webm; codecs=vp9" }
  let mediaRecorder = new MediaRecorder( stream, options )

  function download( event ) {
    if ( event.data.size > 0 ) recordedChunks.push( event.data )
    const blob = new Blob( recordedChunks, { type: "video/webm" })
    const url = URL.createObjectURL( blob )
    link.href = url
    link.download = `${ path }_sketch.webm`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  mediaRecorder.ondataavailable = download
  return mediaRecorder

}

export default async function InitP5( sketch, parentRef ) {
  let p5 = ( await import( "p5" )).default
  return new p5( sketch, parentRef.current )
}

export function RecorderOverlay(  p5, parent ) {
  const className = "bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg"
  let ctn = p5.createDiv()
  ctn.size(150, 120)
  ctn.position( 20, 20 )
  ctn.class( className )
  ctn.draggable()
  ctn.parent( parent )
  return ctn
}