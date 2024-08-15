
import { Mongo } from '@/mongo/index'
import { NextResponse } from 'next/server'

export async function getSketch(title) {
  const col =  await Mongo.db("test").collection("sketches")
  .findOne({ name: title })
  return col
}

export async function GET( request: Request ) {
  const images = await getSketch("city")
  return NextResponse.json( images )
}