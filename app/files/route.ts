
import fs from 'fs'
import path from 'path'


export async function GET( req: Request ) {
    // const publicDirectory = path.join(process.cwd(), 'public');
    // fs.readdir(publicDirectory, (err, files) => {
    //     console.log(files)
    // })
    try {  
        const data = fs.readFileSync('public/oceans.frag', 'utf8')
        return Response.json(data)
    } catch(e) {
        console.log('Error:', e.stack)
    }

}
