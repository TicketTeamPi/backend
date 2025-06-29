import Ticket from '#models/ticket'
import type { HttpContext } from '@adonisjs/core/http'

export default class ResponsibleController {
  async index({ auth, response }: HttpContext) {
    const tickets = await Ticket.query()
      .where('responsible_id', auth.user!.id)
      .preload('column')
      .preload('sector')

    return response.ok({
      data: tickets.map((column) => ({
        id: column.column.id,
        name: column.column.name,
        tickets: {
          id: column.id,
          title: column.title,
          priority: column.priority,
          userId: column.createdBy,
          sector: {
            name: column.sector.name,
            color: column.sector.color,
          },
        },
      })),
    })
  }

  async setResponsible({ auth, params, request, response }: HttpContext) {
    const ticket = await Ticket.query()
      .where('id', params.id)
      .where('enterpriseId', auth.user!.enterpriseId)
      .firstOrFail()

    const responsibleId = request.input('responsibleId') ?? auth.user!.id

    ticket.responsibleId = responsibleId

    await ticket.save()

    return response.noContent()
  }
}
