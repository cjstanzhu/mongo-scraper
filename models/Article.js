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
    saved: {
        type: Boolean,
        default: false
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

ArticleSchema.methods.fullLink = function() {
    this.link = `https://www.nytimes.com${this.link}`;
    
    return this.link;
};

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

