'use client'

import { SignIn, useOrganization, useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Page() {
  const { organization, isLoaded } = useOrganization()
  const { user } = useUser()

  if (organization?.id) {
    return redirect(`/${organization.id}`)
  } else if (user?.id && isLoaded) {
    return redirect(`/${user.id}`)
  }

  return <SignIn routing="hash" forceRedirectUrl={`/sign-in`} />
}
