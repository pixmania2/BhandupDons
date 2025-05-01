import type { Member } from "./types"

// This would normally fetch from your API
export async function getMembersList(): Promise<Member[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/members`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch members")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching members:", error)
    return []
  }
}

export async function getMemberById(id: string): Promise<Member | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/members/${id}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error("Failed to fetch member")
    }

    return response.json()
  } catch (error) {
    console.error(`Error fetching member ${id}:`, error)
    return null
  }
}
