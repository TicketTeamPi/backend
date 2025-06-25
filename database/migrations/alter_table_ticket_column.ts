import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('tickets', (table) => {
      table.integer('column_id').unsigned().references('id').inTable('columns').onDelete('CASCADE')
    })
  }
}
