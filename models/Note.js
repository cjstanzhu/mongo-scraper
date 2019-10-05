let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let NoteSchema = new Schema({
    body: {
        type: String,
        trim: true,
        required: true
    }
});

let Note = mongoose.model("Note", NoteSchema);

module.exports = Note;

