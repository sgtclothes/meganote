'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfilesSchema extends Schema {
  up () {
    this.table('profiles', (table) => {
      table
    .integer('user_id')
    .unsigned()
    .references('id')
    .inTable('users')
    .onUpdate('NO ACTION')
    .onDelete('SET NULL');
    })
  }

  down () {
    this.table('profiles', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ProfilesSchema
