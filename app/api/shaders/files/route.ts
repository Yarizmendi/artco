import { Mongo } from '@/api/mongo'
import { NextResponse } from 'next/server'

export async function getShaderFiles(title) {
  const col =  await Mongo.db("Shaders").collection("files")
  .findOne({ name: title })
  return col
}

export async function GET( request: Request ) {
  const images = await getShaderFiles("city")
  return NextResponse.json( images )
}