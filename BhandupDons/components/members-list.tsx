import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Eye } from "lucide-react"
import { getMembersList } from "@/lib/data"

export default async function MembersList() {
  const members = await getMembersList()

  if (!members.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No team members found</h3>
        <p className="text-muted-foreground mt-2">Add your first team member to get started.</p>
        <Link href="/add-member" className="mt-4 inline-block">
          <Button>Add Member</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member) => (
        <Card key={member._id} className="overflow-hidden">
          <div className="aspect-square relative">
            <Image
              src={member.imageUrl || "/placeholder.svg?height=300&width=300"}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg">{member.name}</h3>
            <p className="text-muted-foreground">{member.role}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/members/${member._id}`} className="w-full">
              <Button variant="outline" className="w-full">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
