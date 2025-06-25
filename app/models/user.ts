import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Enterprise from './enterprise.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Sector from './sector.js'
import Ticket from './ticket.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare enterprise_id: number

  @column()
  declare sector_id: number

  @column()
  declare name: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare isAdmin: boolean

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @belongsTo(() => Enterprise, {
    foreignKey: 'enterprise_id',
  })
  declare enterprise: BelongsTo<typeof Enterprise>

  @belongsTo(() => Sector, {
    foreignKey: 'sector_id',
  })
  declare sector: BelongsTo<typeof Sector>

  @hasMany(() => Ticket, {
    foreignKey: 'userId',
  })
  declare tickets: HasMany<typeof Ticket>
}
