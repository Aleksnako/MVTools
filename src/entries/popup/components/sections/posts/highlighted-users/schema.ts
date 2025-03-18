import { z } from 'zod'

import type { PostsConfig } from '@/services/config'
import { checkUser } from '@/services/media-vida'
import { asyncValidator } from '@/utils/zod'

export const getHighlightedUsersSchema = (data: PostsConfig) =>
  z.object({
    highlightedUser: z
      .string()
      .trim()
      .toLowerCase()
      .nonempty('Introduce un nick de usuario')
      .refine(
        value => !data.userNotes.some(({ username }) => username.toLowerCase() === value),
        'El usuario ya está en la lista de anotados'
      )
      .superRefine(asyncValidator(checkUser))
  })
