const mongoose = require('mongoose');

const NotesSheme = mongoose.Schema({
    text: {
        type: String, 
        required: true,
    },
    time: {
        type : String,
        required: true,
    },
});

module.exports = mongoose.model('Notes', NotesSheme);