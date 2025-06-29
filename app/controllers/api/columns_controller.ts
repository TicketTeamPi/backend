import type { HttpContext } from '@adonisjs/core/http'
import { columnValidator } from '#validators/columns/column'
import Column from '#models/column'
import Ticket from '#models/ticket'
import { columnChangeValidator } from '#validators/columns/change_column'
import { positioning } from '#validators/columns/positioning'

export default class ColumnsController {
  async create({ auth, request, response }: HttpContext) {
    const data = await request.validateUsing(columnValidator)
    const enterpriseId = auth.user!.enterpriseId!

    const coluns = await Column.query().where('enterpriseId', enterpriseId)

    const column = await Column.create({
      name: data.name,
      enterpriseId: enterpriseId,
      position: coluns.length > 0 ? coluns.length : 0,
    })

    return response.created({
      data: {
        id: column.id,
        name: column.name,
        position: column.position,
      },
    })
  }

  async repositioningTicket({ request, response }: HttpContext) {
    const data = await request.validateUsing(positioning)
    const column = await Column.query()
      .where('id', data.columnIdFrom)
      .preload('tickets')
      .firstOrFail()
    if (!data.columnIdTo && column.tickets.length >= data.position) {
      const ticketIndex = column.tickets.findIndex((t) => t.id === data.ticketId)
      if (ticketIndex >= 0) {
        moveArrayItem(column.tickets, ticketIndex, data.position)
      }
      for (let i = 0; i < column.tickets.length; i++) {
        column.tickets[i].position = i
        await column.tickets[i].save()
      }
    } else {
      const columnTo = await Column.query()
        .where('id', data.columnIdTo!)
        .preload('tickets')
        .firstOrFail()
      if (columnTo.tickets.length >= data.position) {
        const ticket = await Ticket.findByOrFail('id', data.ticketId)
        ticket.columnId = data.columnIdTo!
        await ticket.save()
        moveArrayItem(columnTo.tickets, columnTo.tickets.length - 1, data.position)
        for (let i = 0; i < column.tickets.length; i++) {
          column.tickets[i].position = i
          await column.tickets[i].save()
        }
      }
    }

    return response.noContent()
  }

  async findAll({ auth, response }: HttpContext) {
    const columns = await Column.query()
      .where('enterpriseId', auth!.user!.enterpriseId)
      .preload('tickets', (query) => {
        query.preload('sector')
      })

    return response.ok({
      data: columns.map((column) => ({
        id: column.id,
        name: column.name,
        position: column.position,
        tickets: column.tickets.map((ticket) => ({
          id: ticket.id,
          title: ticket.title,
          priority: ticket.priority,
          userId: ticket.createdBy,
          position: ticket.position,
          responsibleId: ticket?.responsibleId,
          sector: {
            name: ticket.sector.name,
            color: ticket.sector.color,
          },
        })),
      })),
    })
  }

  async moveColumn({ auth, request, response }: HttpContext) {
    const data = await request.validateUsing(columnChangeValidator)
    const column = await Column.findByOrFail('id', data.columnId)
    const columns = await Column.query().where('enterpriseId', auth.user!.enterpriseId)
    if (columns.length >= data.position) {
      const columnIndex = columns.findIndex((t) => t.id === data.columnId)
      moveArrayItem(columns, columnIndex, data.position)
      let i = 0
      for (const columnI of columns) {
        columnI.position = i
        await columnI.save()
        i++
      }
    }

    return response.noContent()
  }
}

function moveArrayItem<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  const item = arr.splice(fromIndex, 1)[0]
  arr.splice(toIndex, 0, item)
  return arr
}
