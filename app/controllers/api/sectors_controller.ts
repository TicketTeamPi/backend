import Sector from '#models/sector'
import { sectorValidator } from '#validators/sector/sector'
import type { HttpContext } from '@adonisjs/core/http'

export default class SectorsController {
  async create({ auth, request, response }: HttpContext) {
    const data = await request.validateUsing(sectorValidator)
    const enterpriseId = auth.user!.enterprise_id!

    const sector = await Sector.create({
      name: data.name,
      description: data.description,
      enterprise_id: enterpriseId,
    })

    return response.created({
      data: {
        id: sector.id,
        name: sector.name,
        description: sector.description,
      },
    })
  }

  async index({ auth, response }: HttpContext) {
    const enterpriseId = auth.user!.enterprise_id!

    const sectors = await Sector.query().where('enterprise_id', enterpriseId)

    return response.ok({
      data: sectors.map((sector) => ({
        id: sector.id,
        name: sector.name,
        description: sector.description,
        columns: sector.columns.map((column) => ({
          id: column.id,
          name: column.name,
          tickets: column.tickets.map((ticket) => ({
            id: ticket.id,
            title: ticket.title,
            status: ticket.status,
            priority: ticket.priority,
            userId: ticket.userId,
            responsibleId: ticket?.responsibleId,
            startedAt: ticket.startedAt,
          })),
        })),
      })),
    })
  }

  async update({ auth, params, request, response }: HttpContext) {
    const data = await request.validateUsing(sectorValidator)
    const enterpriseId = auth.user!.enterprise_id!
    const sector = await Sector.query()
      .where('id', params.id)
      .where('enterprise_id', enterpriseId)
      .firstOrFail()

    await sector
      .merge({
        name: data.name,
        description: data.description,
      })
      .save()

    return response.ok({
      data: {
        id: sector.id,
        name: sector.name,
        description: sector.description,
      },
    })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const enterpriseId = auth.user!.enterprise_id!
    const sector = await Sector.query()
      .where('id', params.id)
      .where('enterprise_id', enterpriseId)
      .firstOrFail()

    await sector.delete()

    return response.noContent()
  }
}
