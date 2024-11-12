'use client'

import { useOrganization, useUser } from '@clerk/nextjs'
import { redirect, useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function WorkspaceIdManager() {
  const { organization, isLoaded: isOrgLoaded } = useOrganization()
  const { user, isLoaded: isUserLoaded } = useUser()
  const { workspaceId } = useParams<{ workspaceId: string }>()

  const hasBothLoaded = isOrgLoaded && isUserLoaded

  useEffect(() => {
    if (hasBothLoaded) {
      if (organization?.id && organization.id !== workspaceId) {
        redirect(`/${organization.id}`)
      }

      if (!organization?.id && user?.id !== workspaceId) {
        redirect(`${user?.id}`)
      }
    }
  }, [hasBothLoaded, organization?.id, user?.id, workspaceId])

  return null
}
