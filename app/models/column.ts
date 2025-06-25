import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Enterprise from './enterprise.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Sector from './sector.js'

export default class Column extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare enterprise_id: number

  @column()
  declare sector_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Enterprise, {
    foreignKey: 'enterprise_id',
  })
  declare enterprise: BelongsTo<typeof Enterprise>

  @belongsTo(() => Sector, {
    foreignKey: 'sector_id',
  })
  declare sector: BelongsTo<typeof Sector>
}
