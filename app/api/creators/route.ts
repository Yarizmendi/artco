
import { NextRequest, NextResponse } from "next/server"
import { getUsersAction } from 'actions/users/getUserAction'

export async function GET( req: NextRequest ) {
    const mongoUsers = await getUsersAction()
    return NextResponse.json({ mongoUsers })
}