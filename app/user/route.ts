

import { getUsers } from "actions/users/getUserAction"

export async function GET() {
    const data = await getUsers()
    return Response.json(data)
}