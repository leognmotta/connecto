'use client'

import {
  Home,
  LayoutDashboard,
  Shield,
  SquareActivity,
  Workflow,
} from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const navigation = [
  {
    name: 'Overview',
    url: '',
    icon: Home,
  },
  {
    name: 'Workflows',
    url: '/workflows',
    icon: Workflow,
  },
  {
    name: 'Credentials',
    url: '/credentials',
    icon: Shield,
  },
  {
    name: 'Apps',
    url: '/apps',
    icon: LayoutDashboard,
  },
  {
    name: 'Monitoring',
    url: '/monitoring',
    icon: SquareActivity,
  },
]

export function PlatformNav() {
  const { workspaceId } = useParams<{ workspaceId: string }>()
  const pathname = usePathname()
  const activeRoute =
    navigation.find(
      (route) => route.url.length > 0 && pathname.includes(route.url),
    ) || navigation[0]

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {navigation.map((item) => (
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
