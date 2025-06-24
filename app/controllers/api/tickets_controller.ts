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
      status: data.status || 'open',
      priority: data.priority || 'low',
      userId: auth.user!.id,
      sectorId: data.sectorId,
      enterpriseId: auth.user!.enterprise_id,
      startedAt: data.startedAt ? DateTime.fromJSDate(data.startedAt) : DateTime.now(),
      endDate: data.endDate ? DateTime.fromJSDate(data.endDate) : undefined,
    })

    return response.created({ id: ticket.id })
  }

  async index({ auth, response, request }: HttpContext) {
    const status = request.input('status') ?? null
    const priority = request.input('priority') ?? null
    const sectorId = request.input('sectorId') ?? null

    const query = Ticket.query().where('enterprise_id', auth.user!.enterprise_id)

    if (status) {
      query.where('status', status)
    }

    if (priority) {
      query.where('priority', priority)
    }

    if (sectorId) {
      query.where('sector_id', sectorId)
    }

    const tickets = await query

    return response.ok(tickets)
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
      .where('enterprise_id', auth.user!.enterprise_id)
      .where('user_id', auth.user!.id)
      .firstOrFail()

    await ticket.delete()

    return response.noContent()
  }
}
