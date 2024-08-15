

import { NextResponse } from 'next/server'
import { getSketch } from './shader_inputs'

export async function GET( request: Request ) {
  const images = await getSketch("city")
  return NextResponse.json( images )
}