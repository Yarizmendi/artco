
import { getSKetchesByCreatorId } from "actions/sketches/getSketchActions"
import { USERID } from "data/id"

export async function GET( req: Request ) {
    const data = await getSKetchesByCreatorId({ creatorId: USERID })
    return Response.json(data)
}