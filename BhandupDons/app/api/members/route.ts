import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    const members = await db.collection("members").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(members)
  } catch (error) {
    console.error("Error fetching members:", error)
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const role = formData.get("role") as string
    const email = formData.get("email") as string
    const bio = formData.get("bio") as string
    const image = formData.get("image") as File

    if (!name || !role || !email || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Save the image
    const uploadsDir = join(process.cwd(), "public/uploads")

    // Create uploads directory if it doesn't exist
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const uniqueFilename = `${Date.now()}-${image.name.replace(/\s/g, "_")}`
    const imagePath = join(uploadsDir, uniqueFilename)

    // Write the file
    const buffer = Buffer.from(await image.arrayBuffer())
    await writeFile(imagePath, buffer)

    // Save to database
    const { db } = await connectToDatabase()

    const result = await db.collection("members").insertOne({
      name,
      role,
      email,
      bio,
      imageUrl: `/uploads/${uniqueFilename}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(
      {
        _id: result.insertedId,
        name,
        role,
        email,
        bio,
        imageUrl: `/uploads/${uniqueFilename}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating member:", error)
    return NextResponse.json({ error: "Failed to create member" }, { status: 500 })
  }
}
