import { flexRender, type Table } from '@tanstack/react-table'
import { Fragment } from 'react'

import { usePinnedThreads } from '@/features/pinned-threads/hooks/use-pinned-threads'
import { Portal } from '@/features/shared/components/portal'
import type { PinnedThreadTableRow } from '@/types/media-vida'

const styles = {
  backgroundColor: '#272d30',
  color: '#79848b',
  padding: '6px 5px',
  width: '40px',
  display: 'table-cell',
  verticalAlign: 'middle'
}

interface Props {
  table: Table<PinnedThreadTableRow>
}

export const TableHeaderCell = ({ table }: Props) => {
  const { tableHeaderRow } = usePinnedThreads()

  return (
    <Portal
      root={tableHeaderRow}
      styles={styles}
    >
      {table.getHeaderGroups().map(headerGroup => (
        <Fragment key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <div
              key={header.id}
              className={header.column.columnDef.meta?.headerClassName}
            >
              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
            </div>
          ))}
        </Fragment>
      ))}
    </Portal>
  )
}
