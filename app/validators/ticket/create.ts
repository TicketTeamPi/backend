import vine from '@vinejs/vine'

export const createValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).maxLength(100),
    description: vine.string().maxLength(255),
    status: vine.enum(['open', 'in_progress', 'closed']).optional(),
    priority: vine.enum(['low', 'medium', 'high']).optional(),
    columnId: vine.number().optional(),
    sectorId: vine.number().optional(),
    startedAt: vine.date().optional(),
    endDate: vine.date().optional(),
  })
)
