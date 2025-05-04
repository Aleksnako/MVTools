import { flexRender, type Table } from '@tanstack/react-table'

import { Portal } from '@/features/shared/components/portal'
import type { PinnedThreadTableRow } from '@/types/media-vida'

const styles = {
  backgroundColor: '#39464c',
  borderTop: '1px solid #262b31',
  padding: '14px 5px',
  display: 'table-cell',
  verticalAlign: 'middle'
}

interface Props {
  table: Table<PinnedThreadTableRow>
}

export const TableBodyRows = ({ table }: Props) => {
  return table.getRowModel().rows.map(row => (
    <Portal
      key={row.id}
      root={row.original.row}
      styles={styles}
    >
      {row.getVisibleCells().map(cell => (
        <div
          key={cell.id}
          className={cell.column.columnDef.meta?.cellClassName}
          title={cell.column.columnDef.meta?.title ? (cell.getValue() as string) : undefined}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      ))}
    </Portal>
  ))
}
