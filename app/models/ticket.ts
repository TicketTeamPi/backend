import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Enterprise from './enterprise.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Sector from './sector.js'
import User from './user.js'
import Column from './column.js'

export type TicketStatus = 'open' | 'in_progress' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high'

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare status: TicketStatus

  @column()
  declare priority: TicketPriority

  @column()
  declare userId: number

  @column()
  declare responsibleId: number

  @column()
  declare sectorId: number

  @column()
  declare enterpriseId: number

  @column.dateTime()
  declare startedAt: DateTime

  @column.dateTime()
  declare endDate: DateTime | null

  @column()
  declare isActive: boolean

  @column()
  declare columnId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'responsible_id',
  })
  declare responsible: BelongsTo<typeof User>

  @belongsTo(() => Sector, {
    foreignKey: 'sector_id',
  })
  declare sector: BelongsTo<typeof Sector>

  @belongsTo(() => Enterprise, {
    foreignKey: 'enterprise_id',
  })
  declare enterprise: BelongsTo<typeof Enterprise>

  @belongsTo(() => Column, {
    foreignKey: 'column_id',
  })
  declare column: BelongsTo<typeof Column>
}
