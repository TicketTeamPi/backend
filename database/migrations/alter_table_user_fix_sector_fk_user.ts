import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('users', (table) => {
      table.dropForeign(['sector_id'])
      table
        .integer('sector_id')
        .unsigned()
        .references('id')
        .inTable('sectors')
        .onDelete('CASCADE')
        .alter()
    })
  }

  public async down() {
    this.schema.alterTable('users', (table) => {
      table.dropForeign(['sector_id'])
      table
        .integer('sector_id')
        .unsigned()
        .references('id')
        .inTable('entreprises')
        .onDelete('CASCADE')
        .alter()
    })
  }
}
