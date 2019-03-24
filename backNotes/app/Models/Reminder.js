'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reminder extends Model {
    note() {
        return this.belongsTo('App/Models/Note')
        }
}

module.exports = Reminder
