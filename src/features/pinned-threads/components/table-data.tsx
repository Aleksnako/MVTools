import { createColumnHelper } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import type { PinnedThreadTableRow } from '@/types/media-vida'

const columHelper = createColumnHelper<PinnedThreadTableRow>()

export const columns = [
  columHelper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={value => {
          table.toggleAllPageRowsSelected(Boolean(value))
        }}
        disabled={!table.getRowModel().rows.length}
        aria-label='Seleccionar todos los hilos'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => {
          row.toggleSelected(Boolean(value))
        }}
        aria-label='Seleccionar hilo'
      />
    ),
    meta: {
      headerClassName: 'flex items-center justify-center',
      cellClassName: 'flex items-center justify-center'
    },
    enableSorting: false,
    enableHiding: false
  })
]
