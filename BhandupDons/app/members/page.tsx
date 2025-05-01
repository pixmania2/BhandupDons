import { Suspense } from "react"
import MembersList from "@/components/members-list"
import { Skeleton } from "@/components/ui/skeleton"

export const dynamic = "force-dynamic"

export default function MembersPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Team Members</h1>

      <Suspense fallback={<MembersListSkeleton />}>
        <MembersList />
      </Suspense>
    </div>
  )
}

function MembersListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[160px]" />
            </div>
          </div>
          <Skeleton className="h-10 w-full mt-4" />
        </div>
      ))}
    </div>
  )
}
