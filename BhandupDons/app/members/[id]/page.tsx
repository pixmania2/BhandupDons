import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Mail } from "lucide-react"
import { getMemberById } from "@/lib/data"

export const dynamic = "force-dynamic"

interface MemberDetailsPageProps {
  params: {
    id: string
  }
}

export default function MemberDetailsPage({ params }: MemberDetailsPageProps) {
  return (
    <div className="container mx-auto px-4 py-10">
      <Link href="/members" className="inline-flex items-center mb-6">
        <Button variant="ghost" className="pl-0">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Button>
      </Link>

      <Suspense fallback={<MemberDetailsSkeleton />}>
        <MemberDetails id={params.id} />
      </Suspense>
    </div>
  )
}

async function MemberDetails({ id }: { id: string }) {
  const member = await getMemberById(id)

  if (!member) {
    notFound()
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="relative aspect-square rounded-lg overflow-hidden border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.imageUrl || "/placeholder.svg?height=600&width=600"}
          alt={member.name}
          className="object-cover w-full h-full"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{member.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Role</h3>
            <p className="text-lg">{member.role}</p>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
            <p className="text-lg flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <a href={`mailto:${member.email}`} className="hover:underline">
                {member.email}
              </a>
            </p>
          </div>

          {member.bio && (
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Bio</h3>
              <p className="mt-1">{member.bio}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button asChild>
            <a href={`mailto:${member.email}`}>Contact Member</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function MemberDetailsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Skeleton className="aspect-square rounded-lg" />

      <div className="space-y-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-6 w-[250px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-[150px]" />
      </div>
    </div>
  )
}
