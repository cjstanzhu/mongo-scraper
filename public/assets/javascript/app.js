$(function() {
    $(".scrape-latest").on("click", function(event) {
        event.preventDefault();

        $.get("/scrape").then(function(response) {
            location.reload();
        });

    });

    $(".clear").on("click", function(event) {
        event.preventDefault();

        $.get("/clear").then(function(response) {
            location.reload();
        });

    });

    $(".save").on("click", function(event) {
        event.preventDefault();
        let idInput = $(this).data("id");

        $.ajax(`/api/saved/${idInput}`, {type: "PUT"})
            .then(function() {
                location.reload();
            });
            
    });





});

