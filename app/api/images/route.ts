
import { NextResponse } from 'next/server'
import { Mongo } from '@/mongo/index'

export async function getSketchImages(title) {
  const col =  await Mongo.db("Images").collection("textures")
  .findOne({ name: title })
  return col
}

export async function GET( request: Request ) {
  const images = await getSketchImages("city")
  return NextResponse.json( images )
}