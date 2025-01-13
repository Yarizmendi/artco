import { fetchFile, toBlobURL } from "@ffmpeg/util"

export function Recorder( path, ffmpeg, videoRef ) {

    let recordedChunks = []
    let link =  document.getElementById("download")
    let canvas = document.querySelector("canvas")
    let stream = canvas.captureStream()
    // let options = { mimeType: "video/webm; codecs=vp9" }
    let mediaRecorder = new MediaRecorder( stream )
  
    async function download( event ) {
      if ( event.data.size > 0 ) recordedChunks.push( event.data )

      const blob = new Blob( recordedChunks, { type: "video/webm" })
      const buffer = await blob.arrayBuffer();
      const inputData = new Uint8Array(buffer);

      // const url = URL.createObjectURL( blob )
      // const testUrl = "http://localhost:3000/videos/highway.webm"
      // const externalTestUrl = "https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm"
      // const blobUrl = await toBlobURL(testUrl, "video/webm")

      //@ts-ignore
      // link.href = url
      // //@ts-ignore
      // link.download = `${ path }_sketch.webm`
      // link.click()
      recordedChunks = []
      // window.URL.revokeObjectURL(url)


      // const file = await fetchFile(url);
      // const file = await fetchFile(url);

      inputData && console.log("file", inputData)
      ffmpeg.writeFile("input.webm", inputData);

      await ffmpeg.exec(["-i", "input.webm", "-c", "copy", "output.mp4"]);
      const videoData = (await ffmpeg.readFile("output.mp4")) as any;

      if (videoRef.current) {
        videoRef.current.src = URL.createObjectURL(
          new Blob([videoData.buffer], { type: "video/mp4" })
        );
      }
      // ffmpeg -i input.webm -c:v libx264 -crf 18 output.mp4
      // ffmpeg -i input.webm -c:v libx264 -crf 18 -vf "scale=1280:-1" output.mp4
    }
  
    mediaRecorder.ondataavailable = download
    return mediaRecorder
  }