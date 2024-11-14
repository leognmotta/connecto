import { flexRender, Table as TStackTable } from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'
import React, { createContext, useContext } from 'react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

import { Button } from './button'
import { Input } from './input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table'

type DataTableContextType<T> = {
  table: TStackTable<T>
}

const DataTableContext = createContext<DataTableContextType<unknown>>(
  {} as DataTableContextType<unknown>,
)

export function useDataTableContext() {
  return useContext(DataTableContext)
}

export const DataTableRoot = React.forwardRef<
  HTMLDivElement,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.HTMLAttributes<HTMLDivElement> & DataTableContextType<any>
>(({ children, className, ...props }, ref) => {
  const { table, ...restProps } = props

  return (
    <DataTableContext.Provider
      value={{
        table,
      }}
    >
      <div ref={ref} className={cn('w-full', className)} {...restProps}>
        {children}
      </div>
    </DataTableContext.Provider>
  )
})
DataTableRoot.displayName = 'DataTableRoot'

export const DataTableActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex items-center py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
})
DataTableActions.displayName = 'DataTableActions'

export const DataTableSearch = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { filterKey: string }
>(({ className, filterKey, ...props }, ref) => {
  const { table } = useDataTableContext()

  return (
    <Input
      ref={ref}
      value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ''}
      onChange={(event) =>
        table.getColumn(filterKey)?.setFilterValue(event.target.value)
      }
      className={cn('max-w-sm', className)}
      {...props}
    />
  )
})
DataTableSearch.displayName = 'DataTableSearch'

export const DataTableColumns = () => {
  const { table } = useDataTableContext()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Columns <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const DataTable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('rounded-md border', className)} {...props}>
      <Table>{children}</Table>
    </div>
  )
})
DataTable.displayName = 'DataTable'

export const DataTableHeader = () => {
  const { table } = useDataTableContext()

  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="h-12 bg-muted">
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}

export const DataTableBody = () => {
  const { table } = useDataTableContext()

  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
            className="h-12"
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={table.getAllColumns().length}
            className="h-24 text-center"
          >
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

export const DataTablePagination = () => {
  const { table } = useDataTableContext()

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
