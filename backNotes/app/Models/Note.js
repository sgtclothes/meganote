'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Note extends Model {
    reminder () {
        return this.hasOne('App/Models/Reminder')
      }
    
}

module.exports = Note
