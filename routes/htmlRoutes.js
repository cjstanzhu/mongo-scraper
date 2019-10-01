let db = require("../models");
let axios = require("axios");
let cheerio = require("cheerio");

module.exports = function(app) {
    app.get("/scrape", function(req, res) {
        axios.get("https://www.nytimes.com/section/us").then(function(response) {
            let $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            $("li.css-ye6x8s").each(function(i, element) {
                // Save an empty result object
                let result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(element).find("h2").text();
                result.summary = $(element).find("p").text();
                result.link = $(element).find("a").attr("href");

                if (result.title && result.summary && result.link) {
                    console.log(result);

                    db.Article.create(result)
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
            res.send("Scrape Complete");
        });
    });


















};

