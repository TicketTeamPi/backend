import vine from '@vinejs/vine'

export const sectorValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(100),
    description: vine.string().maxLength(255).optional(),
  })
)
