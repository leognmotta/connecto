import { useOrganization, useOrganizationList, useUser } from '@clerk/nextjs'
import { Plus, Settings } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import {
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxRoot,
  ComboboxSearchInput,
  ComboboxSeparator,
  ComboboxTrigger,
} from '@/components/ui/combox'
import useModalStore from '@/store/modals'

import { CREATE_ORGANIZATION_MODAL_ID } from './modals/create-organization-modal'
import { MANAGE_ORGANIZATION_MODAL_ID } from './modals/manage-organization-modal'
import { Button } from './ui/button'

export default function OrganizationSwitcher() {
  const [search, setSearch] = useState('')
  const { openModal } = useModalStore()
  const { organization } = useOrganization()
  const { user } = useUser()
  const { userMemberships, setActive } = useOrganizationList({
    userMemberships: true,
  })

  const organizations = [
    { label: 'Personal', value: 'personal' },
    ...(userMemberships.data?.map((org) => ({
      label: org.organization.name,
      value: org.organization.id,
    })) || []),
  ]
  const selectedValue = organization?.id || 'personal'
  const selectedOrganization = organizations.find(
    (org) => org.value === selectedValue,
  )
  const otherOrganizations = organizations.filter(
    (org) => org.value !== selectedValue,
  )

  const handleOrganizationSelect = (value: string) => {
    if (setActive) {
      setActive({
        organization: value === 'personal' ? null : value,
        redirectUrl: `/${value === 'personal' ? user?.id : value}`,
      })
    }
  }

  const handleManageOrganization = () => {
    openModal(MANAGE_ORGANIZATION_MODAL_ID)
  }

  const handleCreateOrganization = () => {
    openModal(CREATE_ORGANIZATION_MODAL_ID)
  }

  return (
    <ComboboxRoot search={search} onSearch={setSearch}>
      <ComboboxTrigger variant="ghost">
        <Link href={`/${organization?.id ?? user?.id}`}>
          {selectedOrganization?.label}
        </Link>
      </ComboboxTrigger>

      <ComboboxContent>
        <ComboboxSearchInput />

        <div className="flex items-center justify-between px-3 py-2">
          {selectedOrganization?.label}

          {selectedValue !== 'personal' && (
            <Button
              onClick={handleManageOrganization}
              size="sm"
              variant="outline"
              className="text-muted-foreground"
            >
              <Settings /> manage
            </Button>
          )}
        </div>

        <ComboboxList>
          <ComboboxEmpty />

          <ComboboxGroup>
            {otherOrganizations.map((org) => (
              <ComboboxItem
                key={org.value}
                value={org.value}
                onSelect={handleOrganizationSelect}
              >
                {org.label}
              </ComboboxItem>
            ))}
          </ComboboxGroup>

          <ComboboxSeparator />

          <ComboboxGroup>
            <ComboboxItem
              onSelect={handleCreateOrganization}
              className="flex gap-2 px-2 py-4"
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Create organization
              </div>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </ComboboxRoot>
  )
}
