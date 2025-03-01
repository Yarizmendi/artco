
import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from "next/server"

export async function GET( req: NextRequest ) {
    const currentPath = path.join(process.cwd())
    const publicFolderPath = currentPath + "/public"
    const fileList = fs.readdirSync(publicFolderPath)
    return NextResponse.json(fileList)
}
