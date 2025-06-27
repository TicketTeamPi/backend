import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Enterprise from './enterprise.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Sector from './sector.js'
import Ticket from './ticket.js'

export default class Column extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare enterpriseId: number

  @column()
  declare sectorId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Enterprise, {
    foreignKey: 'enterpriseId',
  })
  declare enterprise: BelongsTo<typeof Enterprise>

  @belongsTo(() => Sector, {
    foreignKey: 'sector_id',
  })
  declare sector: BelongsTo<typeof Sector>

  @hasMany(() => Ticket, {
    foreignKey: 'columnId',
  })
  declare tickets: HasMany<typeof Ticket>
}
