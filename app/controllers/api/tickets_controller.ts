import Ticket from '#models/ticket'
import { createValidator } from '#validators/ticket/create'
import { patchValidator } from '#validators/ticket/patch'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class TicketsController {
  async create({ auth, request, response }: HttpContext) {
    const data = await request.validateUsing(createValidator)

    const ticket = await Ticket.create({
      title: data.title,
      description: data.description,
      priority: data.priority || 'low',
      userId: auth.user!.id,
      sectorId: data.sectorId,
      columnId: data.columnId,
      enterpriseId: auth.user!.enterpriseId,
      startedAt: data.startedAt ? DateTime.fromJSDate(data.startedAt) : DateTime.now(),
      endDate: data.endDate ? DateTime.fromJSDate(data.endDate) : null,
    })

    return response.created({ id: ticket.id })
  }

  async show({ params, response }: HttpContext) {
    const ticket = await Ticket.findOrFail(params.id)

    return response.ok(ticket)
  }

  async patch({ auth, params, request, response }: HttpContext) {
    const data = await request.validateUsing(patchValidator)

    const ticket = await Ticket.findOrFail(params.id)

    if (ticket.userId !== auth.user!.id) {
      return response.forbidden('You are not allowed to update this ticket')
    }

    ticket.merge({
      title: data.title,
      description: data.description,
    })

    await ticket.save()

    return response.ok({ id: ticket.id })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const ticket = await Ticket.query()
      .where('id', params.id)
      .where('enterpriseId', auth.user!.enterpriseId)
      .where('user_id', auth.user!.id)
      .firstOrFail()

    await ticket.delete()

    return response.noContent()
  }
}
