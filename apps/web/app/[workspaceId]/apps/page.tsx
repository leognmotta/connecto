import { ColumnDef } from '@tanstack/react-table'
import { Rocket } from 'lucide-react'
import * as React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type AppsTableData = {
  id: string
  name: string
  logoUrl?: string
}

export const columns: ColumnDef<AppsTableData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const { name } = row.original

      return (
        <div className="truncate">
          <Avatar className="h-6 w-6 rounded-sm text-muted-foreground">
            <AvatarImage
              src={row.original.logoUrl}
              alt={row.original.name}
              className="aspect-square size-6 rounded-sm"
            />
            <AvatarFallback className="rounded-sm bg-transparent">
              <Rocket />
            </AvatarFallback>
          </Avatar>
          {name}
        </div>
      )
    },
  },
]

export default function Apps() {
  return (
    <div className="w-full flex-1 max-lg:space-y-6">
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex w-full max-w-[80ch] flex-col gap-3">
          <div className="w-full space-y-2">
            <h2 className="truncate text-2xl font-medium tracking-tight">
              Apps
            </h2>

            <p className="truncate text-base text-muted-foreground">
              view and manage apps
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex w-full flex-col gap-2">
          <div className="w-full">
            <section className="flex flex-col gap-4">
              <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                commands
              </header>

              <div>table</div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
