'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotesSchema extends Schema {
  up () {
    this.table('notes', (table) => {
      // alter table
      table.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('NO ACTION')
      .onDelete('SET NULL');
    })
  }

  down () {
    this.table('notes', (table) => {
      // reverse alternations
    })
  }
}

module.exports = NotesSchema
