let db = require("../models");

module.exports = function(app) {
    app.put("/api/saved/:id", function(req, res) {
        db.Article.findOneAndUpdate(
            {_id: req.params.id},
            {saved: true},
            {new: true}
        ).then(function(result) {
            // res.redirect("/");
            res.status(200).end();

        }).catch(function(error) {
            res.json(error);
        });

    });





















};

