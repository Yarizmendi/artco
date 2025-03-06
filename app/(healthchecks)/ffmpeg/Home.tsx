"use client";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useRef, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const gifRef = useRef<HTMLImageElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  const load = async () => {
    setIsLoading(true);
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.5/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        "text/javascript"
      ),
    });
    setLoaded(true);
    setIsLoading(false);
  };

  // const testMp4 = "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/videos/bunny_yawn.mp4"
  // const testWebm = "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/videos/tree.webm"
  const testAvi = "https://raw.githubusercontent.com/ffmpegwasm/testdata/master/video-15s.avi"

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    const contentType = "image/gif"
    
    await ffmpeg.writeFile(
      "test.avi",
      await fetchFile(testAvi)
    );
  
    await ffmpeg.exec(["-i","test.avi", "test.gif"]);

    const data = (await ffmpeg.readFile("test.gif")) as any;
    const createdUrl = URL.createObjectURL(new Blob([data.buffer], { type: contentType }))

    if (contentType == "image/gif") {
      if (gifRef.current) {
        gifRef.current.src = createdUrl
      }
    }

    else {
      if (videoRef.current)
        videoRef.current.src = URL.createObjectURL(
          new Blob([data.buffer], { type: contentType })
        );
    }
    


  };

  return loaded ? (
    <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      {/* <video ref={videoRef} controls></video> */}
      {/* @ts-ignore */}
      <Image ref={gifRef} alt={"gif"} width={100} height={100} className="w-[100px] h-[100px]"></Image>
      <br />
      <button
        onClick={transcode}
        className="bg-green-500 hover:bg-green-700 text-white py-3 px-6 rounded"
      >
        Transcode avi to gif
      </button>
      <p ref={messageRef}></p>
    </div>
  ) : (
    <button
      className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      onClick={load}
    >
      Load ffmpeg-core
      {isLoading && (
        <span className="animate-spin ml-3">
          <svg
            viewBox="0 0 1024 1024"
            focusable="false"
            data-icon="loading"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
          </svg>
        </span>
      )}
    </button>
  );
}