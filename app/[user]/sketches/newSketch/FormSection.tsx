
"use client"

import { useEffect, useState } from 'react'
import Image from "next/image"
import { stripFileExtension } from 'actions/utils'
import { createSketch } from 'actions/sketchActions'
import { InputOpts } from './InputOptions'
import { Input } from './FormInput'

export function FormSection({ formAction }:{ formAction?: any }) {
    const [isMounted, setIsMounted] = useState(false)
    const [uploadImgs, setUploadImgs] = useState([])

    useEffect(()=>{
        if ( isMounted ) console.log("Component Mounted")
        else setIsMounted( !isMounted )
    },[isMounted])

    const uploadImgToClient = e => {     
        const imageList = []   
        const files = e.target.files
        Array.from(files).map( file => {
            // @ts-ignore
            imageList.push({ file, title: file.name, path: file.name, url: URL.createObjectURL(file), blob:"" })
        })
        setUploadImgs(imageList)
        // console.log( imageList )
    }

    return (
        <div>
                <div className='flex gap-2 items-center mt-4 text-xs'>
                    <label>Images:</label>
                    <input name={"images"} type={"file"} multiple onChange={uploadImgToClient}  />
                </div>
                <div className='flex w-full h-[180px] overflow-auto items-center px-4 border mt-4 rounded-md'>
                    { uploadImgs.map(( fileObj, idx) => {
                      let imgName = stripFileExtension(fileObj.title)
                      return (
                        <div key={idx} className="cursor-pointer mr-6">
                        <Image 
                          src={ fileObj.url } 
                          alt={ "title" } 
                          width={ 200 }
                          height={ 200 }
                          quality={ 100 }
                          className="min-w-[100px] min-h-[100px] w-[100px] h-[100px] rounded"  />
                          <p className="dark:bg-slate-950 flex flex-wrap p-1 max-w-[150px] text-xs overflow-none">{imgName}</p>
                      </div>  
                      )
                    })}
                </div>
        </div>
    )

}