import { getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useMemo } from 'react'

import { ActionButton } from '@/features/pinned-threads/components/action-button'
import { TableBodyRows } from '@/features/pinned-threads/components/table-body-rows'
import { columns } from '@/features/pinned-threads/components/table-data'
import { TableHeaderCell } from '@/features/pinned-threads/components/table-header-cell'
import { PinnedThreadsProvider } from '@/features/pinned-threads/providers/pinned-threads-provider'
import { useShadowRoot } from '@/features/shared/hooks/use-shadow-root'
import { getPinnedThreadElements } from '@/services/media-vida'
import type { ThreadListType } from '@/types/media-vida'

interface Props {
  type: ThreadListType
}

export const PinnedThreads = ({ type }: Props) => {
  const pinnedThreadElements = useMemo(getPinnedThreadElements, [])
  const { appRoot } = useShadowRoot()

  const table = useReactTable({
    data: pinnedThreadElements.tableRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: { appRoot }
  })

  useEffect(() => {
    pinnedThreadElements.tableFooterRowCell.setAttribute('colspan', '7')
  }, [])

  return (
    <PinnedThreadsProvider
      type={type}
      {...pinnedThreadElements}
    >
      <ActionButton table={table} />
      <TableHeaderCell table={table} />
      <TableBodyRows table={table} />
    </PinnedThreadsProvider>
  )
}
