
import { MongoClient, ServerApiVersion } from 'mongodb'
import process from 'process'

export const uri = process.env.MONGODB_URI

export const mongo = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
})