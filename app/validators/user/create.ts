import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(100),
    email: vine.string().maxLength(255),
    isAdmin: vine.boolean(),
  })
)

export type CreateData = Infer<typeof createValidator>
