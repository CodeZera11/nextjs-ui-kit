'use client'

import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useGetUserDetails } from '@/data/hooks/useAuthClient'
import Loader from '@/components/Loader'

const Page = () => {
  const { data: userDetails, loading } = useGetUserDetails()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    )
  }

  const { firstName, lastName, role, email } = userDetails

  console.log({ userDetails })

  return (
    <div className="w-full space-y-8 px-6 py-10">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
          <AvatarFallback>{firstName?.charAt(0) + lastName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1 text-lg">
          <div className="text-2xl font-bold">{firstName + ' ' + lastName}</div>
        </div>
      </div>
      <div className="space-y-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-primary">User Details</CardTitle>
            <CardDescription>Overview of user information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">First Name</Label>
              <Input disabled id="username" value={firstName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Last Name</Label>
              <Input disabled id="username" value={lastName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input disabled id="email" value={email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input disabled id="role" value={role.toLocaleLowerCase()} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Page
