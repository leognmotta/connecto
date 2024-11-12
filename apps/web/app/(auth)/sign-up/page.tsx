'use client'

import { SignUp, useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Page() {
  const { user } = useUser()

  if (user?.id) {
    return redirect(`/${user.id}/`)
  }

  return <SignUp routing="hash" forceRedirectUrl={`/sign-up`} />
}
