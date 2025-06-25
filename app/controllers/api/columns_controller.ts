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
}
