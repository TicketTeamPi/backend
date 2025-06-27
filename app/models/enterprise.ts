import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Sector from './sector.js'
import Ticket from './ticket.js'

export default class Enterprise extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cnpj: string

  @column()
  declare phone: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => User, {
    foreignKey: 'enterpriseId',
  })
  declare users: HasMany<typeof User>

  @hasMany(() => Sector, {
    foreignKey: 'enterpriseId',
  })
  declare sectors: HasMany<typeof Sector>

  @hasMany(() => Ticket, {
    foreignKey: 'enterpriseId',
  })
  declare tickets: HasMany<typeof Ticket>
}
