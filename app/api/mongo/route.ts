
import { Mongo } from '.'
import { NextResponse } from 'next/server'

const shaderTextures = {
  name: "city",
  frag: "/simpleMix.frag",
  vert: "https://qfyy9q32bnwxmali.public.blob.vercel-storage.com/shaders/basic.vert",
}

async function getImages() {
  const db =  Mongo.db("Shaders")
  const col = await db.collection("files")
    .insertOne(shaderTextures)
  // .find({})
  // .sort({ title: -1 })
  // .limit(10)
  // .toArray()
  return col
}

export async function GET() {
  const res = await getImages()
  return NextResponse.json( res )
}

// Create new documents                                                                                                                                         
// const peopleDocuments = [
//   {
//     "name": { "first": "Alan", "last": "Turing" },
//     "birth": new Date(1912, 5, 23), // May 23, 1912                                                                                                                                 
//     "death": new Date(1954, 5, 7),  // May 7, 1954                                                                                                                                  
//     "contribs": [ "Turing machine", "Turing test", "Turingery" ],
//     "views": 1250000
//   },
//   {
//     "name": { "first": "Grace", "last": "Hopper" },
//     "birth": new Date(1906, 12, 9), // Dec 9, 1906                                                                                                                                 
//     "death": new Date(1992, 1, 1),  // Jan 1, 1992                                                                                                                                  
//     "contribs": [ "Mark I", "UNIVAC", "COBOL" ],
//     "views": 3860000
//   }
// ]
// Insert the documents into the specified collection        
// const p = await col.insertMany(peopleDocuments);