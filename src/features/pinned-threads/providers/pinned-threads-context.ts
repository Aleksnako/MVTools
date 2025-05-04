import { createContext } from 'react'

import type { PinnedThreadElements, ThreadListType } from '@/types/media-vida'

export interface PinnedThreadsData extends PinnedThreadElements {
  type: ThreadListType
}

export const PinnedThreadsContext = createContext<PinnedThreadsData | null>(null)
