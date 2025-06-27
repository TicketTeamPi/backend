import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const columnValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(1).maxLength(255),
    sectorId: vine.number(),
  })
)
export type ColumnData = Infer<typeof columnValidator>
