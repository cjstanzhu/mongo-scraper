let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    summary: {
        type: String,
        unique: true,
        required: true
    },
    link: {
        type: String,
        unique: true,
        required: true
    },
    // `note` is an object that stores a Note id
    // The ref property links the ObjectId to the Note model
    // This allows us to populate the Article with an associated Note
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

