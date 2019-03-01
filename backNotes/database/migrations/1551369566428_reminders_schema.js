'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemindersSchema extends Schema {
  up () {
    this.create('reminders', (table) => {
      table.increments()
      table.string('title')
      table.string('note')
      table.datetime('schedule')
      table.timestamps()
    })
  }

  down () {
    this.drop('reminders')
  }
}

module.exports = RemindersSchema
