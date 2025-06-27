import type { HttpContext } from '@adonisjs/core/http'
import { columnValidator } from '#validators/columns/column'
import Column from '#models/column'

export default class ColumnsController {
  async create({ auth, request, response }: HttpContext) {
    const data = await request.validateUsing(columnValidator)
    const enterpriseId = auth.user!.enterprise_id!

    const column = await Column.create({
      name: data.name,
      enterpriseId: enterpriseId,
      sectorId: data.sectorId,
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
    const columns = await Column.query()
      .select(['id', 'name'])
      .where('sector_id', sectorId)
      .preload('tickets', (query) => {
        query.select([
          'id',
          'title',
          'status',
          'priority',
          'user_id',
          'responsible_id',
          'started_at',
        ])
      })

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
