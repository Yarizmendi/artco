

import { NextResponse } from 'next/server'

export async function GET( request: Request ) {
  const textures = []
  return NextResponse.json( textures)
}