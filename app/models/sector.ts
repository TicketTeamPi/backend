import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Enterprise from './enterprise.js'
import Ticket from './ticket.js'

export default class Sector extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare enterprise_id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => User, {
    foreignKey: 'sector_id',
  })
  declare users: HasMany<typeof User>

  @belongsTo(() => Enterprise, {
    foreignKey: 'enterprise_id',
  })
  declare enterprise: BelongsTo<typeof Enterprise>

  @hasMany(() => Ticket, {
    foreignKey: 'sectorId',
  })
  declare tickets: HasMany<typeof Ticket>
}
