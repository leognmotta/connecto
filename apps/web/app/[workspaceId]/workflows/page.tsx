'use client'

import { ColumnDef } from '@tanstack/react-table'
import * as React from 'react'

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

type Workflow = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

const data: Workflow[] = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com',
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'success',
    email: 'Abe45@gmail.com',
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com',
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@hotmail.com',
  },
]

type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'email',
    header: () => {
      return <div>All apps</div>
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
]
export default function DataTableDemo() {
  const table = useDataTable(data, columns)
  const tableState = table.getState()

  React.useEffect(() => {
    console.log(tableState)
  }, [tableState])

  return (
    <div className="flex items-start gap-8">
      <div className="mx-auto w-full max-w-screen-lg">
        <DataTableRoot table={table}>
          <DataTableActions className="flex items-center justify-between gap-8">
            <DataTableSearch
              placeholder="Filter emails..."
              className="w-full border-none shadow-none focus-visible:ring-0"
            />

            <Button>Create Workflow</Button>
          </DataTableActions>

          <DataTable>
            <DataTableHeader />
            <DataTableBody />
          </DataTable>
        </DataTableRoot>
        <DataTableRoot table={table}>
          <DataTableActions className="flex items-center justify-between gap-8">
            <DataTableSearch
              placeholder="Filter emails..."
              className="w-full border-none shadow-none focus-visible:ring-0"
            />

            <Button>Create Workflow</Button>
          </DataTableActions>

          <DataTable>
            <DataTableHeader />
            <DataTableBody />
          </DataTable>
        </DataTableRoot>
        <DataTableRoot table={table}>
          <DataTableActions className="flex items-center justify-between gap-8">
            <DataTableSearch
              placeholder="Filter emails..."
              className="w-full border-none shadow-none focus-visible:ring-0"
            />

            <Button>Create Workflow</Button>
          </DataTableActions>

          <DataTable>
            <DataTableHeader />
            <DataTableBody />
          </DataTable>
        </DataTableRoot>
        <DataTableRoot table={table}>
          <DataTableActions className="flex items-center justify-between gap-8">
            <DataTableSearch
              placeholder="Filter emails..."
              className="w-full border-none shadow-none focus-visible:ring-0"
            />

            <Button>Create Workflow</Button>
          </DataTableActions>

          <DataTable>
            <DataTableHeader />
            <DataTableBody />
          </DataTable>
        </DataTableRoot>
        <DataTableRoot table={table}>
          <DataTableActions className="flex items-center justify-between gap-8">
            <DataTableSearch
              placeholder="Filter emails..."
              className="w-full border-none shadow-none focus-visible:ring-0"
            />

            <Button>Create Workflow</Button>
          </DataTableActions>

          <DataTable>
            <DataTableHeader />
            <DataTableBody />
          </DataTable>
        </DataTableRoot>
        <DataTableRoot table={table}>
          <DataTableActions className="flex items-center justify-between gap-8">
            <DataTableSearch
              placeholder="Filter emails..."
              className="w-full border-none shadow-none focus-visible:ring-0"
            />

            <Button>Create Workflow</Button>
          </DataTableActions>

          <DataTable>
            <DataTableHeader />
            <DataTableBody />
          </DataTable>
        </DataTableRoot>
      </div>

      <div className="sticky top-4 mt-[70px] h-full max-h-[740px] w-[480px] border">
        side content
      </div>
    </div>
  )
}
