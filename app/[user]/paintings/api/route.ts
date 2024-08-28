
import { getMongoImagesByUploaderId } from "actions/images/getImages"
import { USERID } from "data/id"

export async function GET( req: Request ) {
    const data = await getMongoImagesByUploaderId({ uploaderId: USERID })
    return Response.json(data)
}