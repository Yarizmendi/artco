
import fs from 'fs'
import path from 'path'
import ffmpeg from "ffmpeg"
import { NextRequest, NextResponse } from "next/server"

export async function GET( req: NextRequest ) {
    // const pathToSrcFile = path.join(process.cwd(), 'public/highway.webm')

    // try {  
    //     const readStream = fs.createReadStream(pathToSrcFile)
    //     const writeStream = fs.createWriteStream('public/output.mp4')
    //     ffmpeg(readStream)
    //         .addOutputOptions('-movflags +frag_keyframe+separate_moof+omit_tfhd_offset+empty_moov')
    //         .format('mp4')
    //         .pipe(writeStream);
    //     return NextResponse.json({message: "video converted!"})
    // } catch(e) {
    //     console.log('Error:', e.stack)
    //     return NextResponse.json({...e.stack})
    // }
    return NextResponse.json({})

}
