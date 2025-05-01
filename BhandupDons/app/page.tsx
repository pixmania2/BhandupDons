import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, UserPlus } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Student Team Management</h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          Welcome to the Student Team Members Management Application. Manage your team members efficiently with our
          easy-to-use platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/add-member">
            <Button className="w-full sm:w-auto" size="lg">
              <UserPlus className="mr-2 h-5 w-5" />
              Add Member
            </Button>
          </Link>
          <Link href="/members">
            <Button className="w-full sm:w-auto" size="lg" variant="outline">
              <Users className="mr-2 h-5 w-5" />
              View Members
            </Button>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">About Our Team</h2>
          <p className="text-muted-foreground">
            We are a dedicated group of students working together on various projects. Our team consists of talented
            individuals with diverse skills and backgrounds. Use this application to manage team members and keep track
            of everyone's information.
          </p>
        </div>
      </div>
    </div>
  )
}
