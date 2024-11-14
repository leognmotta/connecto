import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { useQueryState } from 'nuqs'

export function useDataTable<T>(data: T[], columns: ColumnDef<T>[]) {
  const [sorting, setSorting] = useQueryState<SortingState>('sort', {
    parse: (value) => {
      try {
        return JSON.parse(value) as SortingState
      } catch {
        return []
      }
    },
    serialize: (value) => JSON.stringify(value),
    defaultValue: [],
  })
  const [columnFilters, setColumnFilters] = useQueryState<ColumnFiltersState>(
    'filters',
    {
      parse: (value) => {
        try {
          return JSON.parse(value) as ColumnFiltersState
        } catch {
          return []
        }
      },
      serialize: (value) => JSON.stringify(value),
      defaultValue: [],
    },
  )
  const [columnVisibility, setColumnVisibility] =
    useQueryState<VisibilityState>('visibility', {
      parse: (value) => JSON.parse(value) as VisibilityState,
      serialize: (value) => JSON.stringify(value),
      defaultValue: {},
    })
  const [rowSelection, setRowSelection] = useQueryState<RowSelectionState>(
    'selection',
    {
      parse: (value) => JSON.parse(value) as RowSelectionState,
      serialize: (value) => JSON.stringify(value),
      defaultValue: {},
    },
  )

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return table
}
