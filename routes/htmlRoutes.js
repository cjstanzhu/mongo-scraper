let db = require("../models");
let axios = require("axios");
let cheerio = require("cheerio");

module.exports = function(app) {
    app.get("/", function(req, res) {
        db.Article.find({})
            .then(function(results) {
                let hbsObject = {
                    articles: results
                };
        
                res.render("index", hbsObject);

            }).catch(function(error) {
            // If an error occurred, send it to the client
            res.json(error);
        });

    });

    app.get("/saved", function(req, res) {
        db.Article.find({})
            .then(function(results) {
                let hbsObject = {
                    articles: results
                };
        
                res.render("saved", hbsObject);
                
            }).catch(function(error) {
            // If an error occurred, send it to the client
            res.json(error);
        });

    });

    app.get("/scrape", function(req, res) {
        axios.get("https://www.nytimes.com/section/us").then(function(response) {
            let $ = cheerio.load(response.data);

            $("li.css-ye6x8s").each(function(i, element) {
                let result = {};

                result.title = $(element).find("h2").text();
                result.summary = $(element).find("p").text();
                result.link = $(element).find("a").attr("href");

                if (result.title && result.summary && result.link) {
                    let newArticle = new db.Article(result);

                    newArticle.fullLink();

                    db.Article.create(newArticle)
                        .then(function(dbArticle) {
                            // View the added result in the console
                            console.log(dbArticle);
                        }).catch(function(error) {
                            // If an error occurred, log it
                            console.log(error);
                    });
                };

            });

            // Send a message to the client
            // res.send("Scrape Complete");
            res.status(200).end();
        });

    });

    app.get("/clear", function(req, res) {
        db.Article.remove({}, function(error, response) {
            // Log any errors to the console
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                db.Note.remove({}, function(error, response) {
                    if (error) {
                        console.log(error);
                        res.send(error);
                    } else {
                        res.status(200).end();
                    };
                });

            };

        });

    });

    //testing populated route...
    app.get("/populated", function(req, res) {
        db.Article.find({})
            .populate("notes")
            .then(function(results) {
                res.json(results);
            }).catch(function(error) {
                // If an error occurs, send it back to the client
                res.json(error);
        });
        
    });

};

