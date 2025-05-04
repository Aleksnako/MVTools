import { useMutation } from '@tanstack/react-query'
import type { Table } from '@tanstack/react-table'
import { type MouseEvent, useCallback } from 'react'
import { toast } from 'sonner'

import { usePinnedThreads } from '@/features/pinned-threads/hooks/use-pinned-threads'
import { Portal } from '@/features/shared/components/portal'
import { RemoveItemsButton } from '@/features/shared/components/remove-items-button'
import { modifyPinnedThreads } from '@/services/media-vida'
import type { PinnedThreadTableRow } from '@/types/media-vida'

const styles = {
  float: 'right'
}

interface Props {
  table: Table<PinnedThreadTableRow>
}

export const ActionButton = ({ table }: Props) => {
  const { buttonsContainer, type, token } = usePinnedThreads()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: modifyPinnedThreads,
    onError: error => {
      toast.error(`No se han podido eliminar los hilos ${type}`, {
        description: error instanceof Error ? error.message : 'Error desconocido'
      })
    }
  })

  const handleDeleteClick = useCallback(
    async (e: MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      const selectedRows = table.getSelectedRowModel().rows.map(({ original: { id } }) => id)
      await mutateAsync({ items: selectedRows, type, action: 'remove', token })
      location.reload()
    },
    [table]
  )

  return (
    <Portal
      root={buttonsContainer}
      styles={styles}
    >
      <RemoveItemsButton
        onClick={handleDeleteClick}
        disabled={!table.getSelectedRowModel().rows.length}
        submitting={isPending}
        type={type}
      />
    </Portal>
  )
}
