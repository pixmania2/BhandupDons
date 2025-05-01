import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { connectToDatabase } from "@/lib/mongodb"

interface Params {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid member ID" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const member = await db.collection("members").findOne({ _id: new ObjectId(id) })

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 })
    }

    return NextResponse.json(member)
  } catch (error) {
    console.error(`Error fetching member ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch member" }, { status: 500 })
  }
}
