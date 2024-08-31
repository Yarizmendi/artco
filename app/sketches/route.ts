
import { getSKetches } from "actions/sketches/getSketchActions"

export async function GET( req: Request ) {
    const sketches = await getSKetches()
    return Response.json(sketches)
}

