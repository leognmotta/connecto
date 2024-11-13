'use client'

import { type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const { workspaceId } = useParams<{ workspaceId: string }>()
  const pathname = usePathname()
  const activeRoute =
    projects.find(
      (route) => route.url.length > 0 && pathname.includes(route.url),
    ) || projects[0]

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem
            data-active={activeRoute.url === item.url}
            key={item.name}
          >
            <SidebarMenuButton asChild>
              <Link href={`/${workspaceId}/${item.url}`}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
