'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemindersSchema extends Schema {
  up () {
    this.table('reminders', (table) => {
      // alter table
      table.integer('note_id')
      .unsigned()
      .references('id')
      .inTable('notes')
      .onUpdate('NO ACTION')
      .onDelete('SET NULL');
    })
  }

  down () {
    this.table('reminders', (table) => {
      // reverse alternations
    })
  }
}

module.exports = RemindersSchema
