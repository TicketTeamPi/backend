import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Enterprise from './enterprise.js'
import Ticket from './ticket.js'
import Column from './column.js'

export default class Sector extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare enterpriseId: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => User, {
    foreignKey: 'sectorId',
  })
  declare users: HasMany<typeof User>

  @hasMany(() => Column, {
    foreignKey: 'sectorId',
  })
  declare columns: HasMany<typeof Column>

  @belongsTo(() => Enterprise, {
    foreignKey: 'enterpriseId',
  })
  declare enterprise: BelongsTo<typeof Enterprise>

  @hasMany(() => Ticket, {
    foreignKey: 'sectorId',
  })
  declare tickets: HasMany<typeof Ticket>
}
