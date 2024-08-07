

export function Recorder( path? ) {
    let recordedChunks = []
    let link =  document.getElementById("download")
    let canvas = document.querySelector("canvas")
    let stream = canvas.captureStream()
    // let options = { mimeType: "video/webm; codecs=vp9" }
    let mediaRecorder = new MediaRecorder( stream )
  
    function download( event ) {
      if ( event.data.size > 0 ) recordedChunks.push( event.data )
      const blob = new Blob( recordedChunks, { type: "video/webm" })
      const url = URL.createObjectURL( blob )
      //@ts-ignore
      link.href = url
      //@ts-ignore
      link.download = `${ path }_sketch.webm`
      link.click()
      recordedChunks = []
      window.URL.revokeObjectURL(url)
    }
  
    mediaRecorder.ondataavailable = download
    return mediaRecorder
  }