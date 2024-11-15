'use client'

import { ColumnDef } from '@tanstack/react-table'
import { AppWindow, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DataTable,
  DataTableActions,
  DataTableBody,
  DataTableHeader,
  DataTableRoot,
  DataTableSearch,
} from '@/components/ui/data-table'
import { useDataTable } from '@/hooks/use-data-table'

type AppsTableData = {
  id: string
  name: string
  logoUrl?: string
}

const columns: ColumnDef<AppsTableData>[] = [
  {
    accessorKey: 'name',
    header: 'All apps',
    cell: ({ row }) => {
      const { name } = row.original

      return (
        <Link
          href="/"
          className="hover group flex h-12 items-center justify-between truncate px-4"
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-5 w-5 rounded-sm text-muted-foreground">
              <AvatarImage
                src={row.original.logoUrl}
                alt={row.original.name}
                className="aspect-square size-5 rounded-sm"
              />
              <AvatarFallback className="rounded-sm bg-transparent">
                <AppWindow className="h-auto w-5" />
              </AvatarFallback>
            </Avatar>
            {name}
          </div>

          <ChevronRight className="invisible size-4 text-muted-foreground group-hover:visible" />
        </Link>
      )
    },
  },
]

const data: AppsTableData[] = [
  {
    id: '1',
    name: 'ClickUp',
    logoUrl:
      'https://seeklogo.com/images/C/clickup-symbol-logo-BB24230BBB-seeklogo.com.png',
  },
  {
    id: '2',
    name: 'Slack',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/1200px-Slack_icon_2019.svg.png',
  },
  {
    id: '3',
    name: 'Notion',
    logoUrl: 'https://www.notion.so/images/favicon.ico',
  },
  {
    id: '4',
    name: 'Trello',
    logoUrl: 'https://trello.com/favicon.ico',
  },
  {
    id: '5',
    name: 'GitHub',
    logoUrl: 'https://github.com/favicon.ico',
  },
  {
    id: '6',
    name: 'Jira',
    logoUrl: 'https://jira.atlassian.com/favicon.ico',
  },
  {
    id: '7',
    name: 'Asana',
    logoUrl: 'https://asana.com/favicon.ico',
  },
  {
    id: '8',
    name: 'Linear',
    logoUrl: 'https://linear.app/favicon.ico',
  },
  {
    id: '9',
    name: 'Monday',
    logoUrl: 'https://monday.com/favicon.ico',
  },
  {
    id: '10',
    name: 'Discord',
    logoUrl: 'https://discord.com/assets/favicon.ico',
  },
  {
    id: '11',
    name: 'Microsoft Teams',
    logoUrl: 'https://teams.microsoft.com/favicon.ico',
  },
  {
    id: '12',
    name: 'Zoom',
    logoUrl: 'https://zoom.us/favicon.ico',
  },
  {
    id: '13',
    name: 'Google Meet',
    logoUrl: 'https://meet.google.com/favicon.ico',
  },
  {
    id: '14',
    name: 'Figma',
    logoUrl: 'https://www.figma.com/favicon.ico',
  },
  {
    id: '15',
    name: 'Miro',
    logoUrl: 'https://miro.com/favicon.ico',
  },
  {
    id: '16',
    name: 'Airtable',
    logoUrl: 'https://airtable.com/favicon.ico',
  },
  {
    id: '17',
    name: 'Basecamp',
    logoUrl: 'https://basecamp.com/favicon.ico',
  },
  {
    id: '18',
    name: 'Dropbox',
    logoUrl: 'https://www.dropbox.com/favicon.ico',
  },
  {
    id: '19',
    name: 'Google Drive',
    logoUrl: 'https://drive.google.com/favicon.ico',
  },
  {
    id: '20',
    name: 'Box',
    logoUrl: 'https://www.box.com/favicon.ico',
  },
  {
    id: '21',
    name: 'Confluence',
    logoUrl: 'https://confluence.atlassian.com/favicon.ico',
  },
  {
    id: '22',
    name: 'HubSpot',
    logoUrl: 'https://www.hubspot.com/favicon.ico',
  },
  {
    id: '23',
    name: 'Salesforce',
    logoUrl: 'https://www.salesforce.com/favicon.ico',
  },
  {
    id: '24',
    name: 'Zendesk',
    logoUrl: 'https://www.zendesk.com/favicon.ico',
  },
]

export default function Apps() {
  const table = useDataTable(data, columns)

  return (
    <div className="mx-auto w-full max-w-screen-lg">
      <div className="mb-2 w-full space-y-2">
        <h2 className="truncate text-2xl font-medium tracking-tight">Apps</h2>

        <p className="truncate text-base text-muted-foreground">
          view and manage apps
        </p>
      </div>

      <DataTableRoot table={table}>
        <DataTableActions className="flex items-center justify-between gap-8">
          <DataTableSearch
            placeholder="Filter emails..."
            className="w-full border-none shadow-none focus-visible:ring-0"
          />

          <Button>Create Workflow</Button>
        </DataTableActions>

        <DataTable className="rounded-md bg-muted px-1 pb-1">
          <DataTableHeader />
          <DataTableBody />
        </DataTable>
      </DataTableRoot>
    </div>
  )
}
