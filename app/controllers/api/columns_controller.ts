import type { HttpContext } from '@adonisjs/core/http'
import { columnValidator } from '#validators/columns/column'
import Column from '#models/column'

export default class ColumnsController {
  async create({ auth, request, response }: HttpContext) {
    const data = await request.validateUsing(columnValidator)
    const enterpriseId = auth.user!.enterprise_id!

    const column = await Column.create({
      name: data.name,
      enterprise_id: enterpriseId,
      sector_id: data.sector_id,
    })

    return response.created({
      data: {
        id: column.id,
        name: column.name,
      },
    })
  }

  async findAllBySectorId({ params, response }: HttpContext) {
    const sectorId = params.sectorId
    const columns = await Column.query().where('sector_id', sectorId)

    return response.ok({
      data: columns.map((column) => ({
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
    })
  }
}
