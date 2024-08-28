

import { getUsersAction } from "actions/users/getUserAction"

export async function GET() {
    const data = await getUsersAction()
    return Response.json(data)
}