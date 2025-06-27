import Ticket from '#models/ticket'
import type { HttpContext } from '@adonisjs/core/http'

export default class ResponsibleController {
  async index({ auth, response }: HttpContext) {
    const tickets = await Ticket.query().where('responsible_id', auth.user!.id)
    return response.ok(tickets)
  }

  async setResponsible({ auth, params, request, response }: HttpContext) {
    const ticket = await Ticket.query()
      .where('id', params.id)
      .where('enterpriseId', auth.user!.enterpriseId)
      .firstOrFail()

    const responsibleId = request.input('responsibleId')

    ticket.responsibleId = responsibleId

    await ticket.save()

    return response.noContent()
  }

  async updatePriority({ auth, params, request, response }: HttpContext) {
    const ticket = await Ticket.query()
      .where('id', params.id)
      .where('enterpriseId', auth.user!.enterpriseId)
      .firstOrFail()

    const priority = request.input('priority')

    ticket.priority = priority

    await ticket.save()

    return response.noContent()
  }
}
