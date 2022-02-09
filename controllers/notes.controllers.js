const notesServices = require('../services/notes.services');

class NotesControllers {
    async getNotes() {
        const notes = await notesServices.getNotes();
        return notes;
    };

    async createNotes(body) {
        const notes = await notesServices.createNotes(body);
        return notes;
    };

    async editNotes(id, body) {
        const notes = await notesServices.editNotes(id, body);
        return notes;
    }

    async deleteNotes(id) {
        const notes = await notesServices.deleteNotes(id);
        return notes;
    }
};

module.exports = new NotesControllers();