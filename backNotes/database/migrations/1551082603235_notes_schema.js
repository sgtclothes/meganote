'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotesSchema extends Schema {
  up () {
    this.create('notes', (table) => {
      table.increments()
      table.string('title')
      table.text('note')
      table.double('rating')
      table.boolean('boolean')
      table.timestamps()
    })
  }

  down () {
    this.drop('notes')
  }
}

module.exports = NotesSchema
