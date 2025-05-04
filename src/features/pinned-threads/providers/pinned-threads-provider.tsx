import { PinnedThreadsContext } from '@/features/pinned-threads/providers/pinned-threads-context'
import { createContextProvider } from '@/utils/contexts'

export const PinnedThreadsProvider = createContextProvider(PinnedThreadsContext)
