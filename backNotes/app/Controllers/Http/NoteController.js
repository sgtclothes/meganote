'use strict'

const Notes = use('App/Models/Note')
const Database = use('Database')

class NoteController {

    async index({request,response}) {
     return await Notes.query().with('reminder').fetch()
    }

    async add({request, response}) {
        const title = request.input("title")
        const noteFill = request.input("note")

        let note = new Notes()
        note.title = title
        note.note = noteFill

        await note.save() 
        await Database.table('reminders').insert({note_id:note.id})
        return response.json({"note": note, "id": note.id})
    }

    async addReminder({response, request}) {
        const title = request.input("title")
        const noteFill = request.input("note")
        const schedule = request.input("schedule")

        let note = new Notes()
        note.title = title
        note.note = noteFill
        await note.save() 
        await Database.table('reminders').insert({note_id:note.id, schedule:schedule})
		return response.json({'note':note, 'schedule':schedule})
    }


    async show ({params, response}) {
        try {
           const note = await Notes.find(params.id)
           const reminder = await note.reminder().fetch()
           return response.json({'note':note,'reminder':reminder})
        } catch (error) {
            return response.send({message:'Item not found'})
        }   
    }

    async delete ({params, response}) {
        const note = await Notes.find(params.id)
        const reminder = await note.reminder().fetch()
		if (!note) {
			return response.status(404).json({data: 'Resource not found'})
		}
        await note.delete()
        await reminder.delete()

		return response.status(204).json('Successfully deleted')
    }
    
    async update ({params, request, response}) {
		const noteFill = request.only(['title', 'note'])

		const note = await Notes.find(params.id)
		if (!note) {
			return response.status(404).json({data: 'Resource not found'})
		}
		note.title = noteFill.title
		note.note = noteFill.note

		await note.save()

		return response.status(200).json(note)
	}

}

module.exports = NoteController
