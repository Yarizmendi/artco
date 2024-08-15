
import { MongoClient, ServerApiVersion } from 'mongodb'
// import { NextResponse } from 'next/server'

export const Mongo = new MongoClient("mongodb+srv://admin:artadmin@cluster0.couko.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

// export async function ping() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await Mongo.connect();
//       // Send a ping to confirm a successful connection
//       await Mongo.db("Infostructures").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await Mongo.close();
//     }
// }

// export async function getNodes() {
//   const db =  Mongo.db("Infostructures")

//   const movies = await db.collection("Nodes")
//   .find({})
//   // .sort({ metacritic: -1 })
//   // .limit(10)
//   .toArray()

//   return NextResponse.json( movies );
// }

  
