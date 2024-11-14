'use client'

import { useOrganization, useOrganizationList, useUser } from '@clerk/nextjs'
import { ChevronsUpDown, Plus, Settings } from 'lucide-react'
import { useParams } from 'next/navigation'
import * as React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import useModalStore from '@/store/modals'

import { CREATE_ORGANIZATION_MODAL_ID } from './modals/create-organization-modal'
import { MANAGE_ORGANIZATION_MODAL_ID } from './modals/manage-organization-modal'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

export function TeamSwitcher() {
  const { workspaceId } = useParams<{ workspaceId: string }>()
  const { openModal } = useModalStore()
  const { organization } = useOrganization()
  const { userMemberships, setActive } = useOrganizationList({
    userMemberships: true,
  })
  const { user } = useUser()
  const { isMobile } = useSidebar()

  const teams = [
    {
      logo: user?.imageUrl,
      name: user?.fullName,
      plan: 'Personal workspace',
      value: 'personal',
    },
    ...(userMemberships.data?.map((org) => ({
      logo: org.organization.imageUrl,
      name: org.organization.name,
      plan: 'Enterprise',
      value: org.organization.id,
    })) || []),
  ]

  const activeTeam =
    teams.find((team) => team.value === organization?.id) || teams[0]

  const otherTeams = teams.filter((team) => team.value !== activeTeam.value)

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

  React.useEffect(() => {
    userMemberships?.revalidate?.()
  }, [workspaceId, userMemberships.revalidate, userMemberships])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                {activeTeam.logo && (
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={activeTeam.logo || ''}
                      alt={activeTeam.name || 'organization logo'}
                      className="aspect-square size-8 rounded-lg"
                    />
                    <AvatarFallback className="rounded-lg">
                      {activeTeam?.name?.[0]}
                      {activeTeam?.name?.[1]}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => {
                if (activeTeam.value !== 'personal') {
                  handleManageOrganization()
                }
              }}
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={activeTeam.logo || ''}
                  alt={activeTeam.name || 'organization logo'}
                  className="flex aspect-square size-8 items-center justify-center rounded-sm border"
                />
                <AvatarFallback className="rounded-sm">
                  {activeTeam?.name?.[0]}
                  {activeTeam?.name?.[1]}
                </AvatarFallback>
              </Avatar>

              <div className="flex w-full items-center justify-between">
                {activeTeam.name}

                {activeTeam.value !== 'personal' && (
                  <Button
                    onClick={handleManageOrganization}
                    size="icon"
                    variant="outline"
                    className="text-muted-foreground"
                  >
                    <Settings />
                  </Button>
                )}
              </div>
            </DropdownMenuItem>

            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organizations
            </DropdownMenuLabel>
            {otherTeams.map((team) => (
              <DropdownMenuItem
                key={team.value}
                onClick={() => handleOrganizationSelect(team.value)}
                className="gap-2 p-2"
              >
                <Avatar className="flex h-8 w-8 items-center justify-center rounded-lg">
                  <AvatarImage
                    src={team.logo || ''}
                    alt={team.name || 'organization logo'}
                    className="flex size-6 items-center justify-center rounded-sm border"
                  />
                  <AvatarFallback className="rounded-sm">
                    {activeTeam?.name?.[0]}
                    {activeTeam?.name?.[1]}
                  </AvatarFallback>
                </Avatar>
                {team.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={handleCreateOrganization}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add Organization
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
