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

    app.put("/api/unsave/:id", function(req, res) {
        db.Article.findOneAndUpdate(
            {_id: req.params.id},
            {saved: false},
            {new: true}
        ).then(function(result) {
            // res.redirect("/");
            res.status(200).end();

        }).catch(function(error) {
            res.json(error);
        });

    });

    app.get("/api/saved/:id", function(req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.findOne({_id: req.params.id})
            // ..and populate all of the notes associated with it
            .populate("notes")
            .then(function(dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                res.json(dbArticle);
            }).catch(function(error) {
                // If an error occurred, send it to the client
                res.json(error);
            });
    });

    app.post("/api/saved/:id", function(req, res) {
        db.Note.create(req.body)
            .then(function(dbNote) {
                // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
                // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                return db.Article.findOneAndUpdate(
                    {_id: req.params.id},
                    {$push: {notes: dbNote._id}},
                    {new: true}
                );
            }).then(function(dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
            }).catch(function(error) {
                // If an error occurred, send it to the client
                res.json(error);
            });

    });

    app.get("/api/delete/:id", function(req, res) {
        db.Note.remove({_id: req.params.id}, function(error, response) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                // console.log("delete success");
                res.status(200).end();
            };
        });



    });

};

