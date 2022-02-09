const Notes = require('../models/notes.models');

class NotesServices {
    getNotes() {
        return new Promise((resolve, reject) => {
            try {
                const allNotes = Notes.find();
                resolve(allNotes);
            } catch (error) {
                reject(error);
            };
        });
    };

    createNotes(body) {
        return new Promise((resolve, reject) => {
            try {
                const { text, time } = body;
                const newNote = Notes.create({ text, time });
                resolve(newNote);
            } catch (error) {
                reject(error);
            };
        });
    };

    editNotes(id, body) {
        return new Promise((resolve, reject) => {
            try {
                const { text, time } = body;
                const editNotes = Notes.findByIdAndUpdate(id, { text, time });
                resolve(editNotes);
            } catch (error) {
                reject(error);
            };
        });
    };

    deleteNotes(id) {
        return new Promise((resolve, reject) => {
            try {
                const destroyNotes = Notes.findByIdAndDelete(id);
                resolve(destroyNotes);
            } catch (error) {
                reject(error);
            };
        });
    };
};

module.exports = new NotesServices();