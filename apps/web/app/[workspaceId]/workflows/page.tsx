'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DataTable,
  DataTableActions,
  DataTableBody,
  DataTableColumns,
  DataTableHeader,
  DataTablePagination,
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
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
    <DataTableRoot table={table}>
      <DataTableActions>
        <DataTableSearch filterKey="email" placeholder="Filter emails..." />

        <DataTableColumns />
      </DataTableActions>

      <DataTable>
        <DataTableHeader />
        <DataTableBody />
      </DataTable>

      <DataTablePagination />
    </DataTableRoot>
  )
}
