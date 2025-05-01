import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/student-team"
const MONGODB_DB = process.env.MONGODB_DB || "student-team"

// Cache the MongoDB connection to reuse it across requests
let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
  // If we have the cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // Create a new MongoDB client
  const client = new MongoClient(MONGODB_URI)

  // Connect to the MongoDB server
  await client.connect()

  // Get the database
  const db = client.db(MONGODB_DB)

  // Cache the client and db connections
  cachedClient = client
  cachedDb = db

  return { client, db }
}
