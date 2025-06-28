import vine from '@vinejs/vine'

export const otherSectorValidator = vine.compile(
  vine.object({
    sectorChangeId: vine.number(),
    ticketId: vine.number(),
    columnId: vine.number(),
  })
)
