
import { MongoClient, ServerApiVersion } from 'mongodb'

export const Mongo = new MongoClient("mongodb+srv://admin:artadmin@cluster0.couko.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})
