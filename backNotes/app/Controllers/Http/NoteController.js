'use strict'

const Notes = use('App/Models/Note')

class NoteController {

    async add({request, response}) {
        const title = request.input("title")
        const noteFill = request.input("note")

        let note = new Notes()
        note.title = title
        note.note = noteFill

        note = await note.save()
        return response.json({"note": note})
    }
}

module.exports = NoteController
