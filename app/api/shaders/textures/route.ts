
import { Mongo } from '@/api/mongo'
import { NextResponse } from 'next/server'

export async function getShaderTextures(title) {
  const col =  await Mongo.db("Shaders").collection("textures")
  .findOne({ name: title })
  return col
}

export async function GET( request: Request ) {
  const textures = await getShaderTextures( "city")
  return NextResponse.json( textures)
}