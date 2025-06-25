import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('columns', (table) => {
      table
        .integer('sector_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('sectors')
        .onDelete('CASCADE')
    })
  }
}
