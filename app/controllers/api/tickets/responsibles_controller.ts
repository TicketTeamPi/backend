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
      .where('enterprise_id', auth.user!.enterprise_id)
      .firstOrFail()

    const responsibleId = request.input('responsibleId') ?? auth.user!.id

    ticket.responsibleId = responsibleId

    await ticket.save()

    return response.noContent()
  }

  async updateStatus({ auth, params, request, response }: HttpContext) {
    const ticket = await Ticket.query()
      .where('id', params.id)
      .where('enterprise_id', auth.user!.enterprise_id)
      .firstOrFail()

    const status = request.input('status')

    ticket.status = status

    await ticket.save()

    return response.noContent()
  }

  async updatePriority({ auth, params, request, response }: HttpContext) {
    const ticket = await Ticket.query()
      .where('id', params.id)
      .where('enterprise_id', auth.user!.enterprise_id)
      .firstOrFail()

    const priority = request.input('priority')

    ticket.priority = priority

    await ticket.save()

    return response.noContent()
  }
}
