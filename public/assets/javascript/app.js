$(function() {
    $(".scrape-latest").on("click", function(event) {
        event.preventDefault();

        $.get("/scrape").then(function(response) {
            location.reload();
            // location.redirect("/");
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

    $(".unsave").on("click", function(event) {
        event.preventDefault();
        let idInput = $(this).data("id");

        $.ajax(`/api/unsave/${idInput}`, {type: "PUT"})
            .then(function() {
                location.reload();
            });
            
    });

    $(".note").on("click", function(event) {
        event.preventDefault();
        $("#modalBody").empty();

        let idInput = $(this).data("id");

        $("#save-note").attr("data-id", idInput);
        
        $.get(`/api/saved/${idInput}`).then(function(response) {
            // console.log(response);
            console.log(response.notes);

            // $("#testP").text(response.notes[0].body);
            response.notes.forEach(function(note) {
                $("#modalBody").append(
                    `<div>
                        <p>${note.body}<button class="btn btn-danger delete-note float-right" data-id=${note._id}>X</button></p>
                        <hr>
                    </div>`
                );
            });

            $("#modalBox").modal();
        })

    });

    $("#save-note").on("click", function(event) {
        event.preventDefault();

        let idInput = $(this).data("id");
        let newNote = {
            body: $("#note-input").val().trim()

        };

        $.post(`/api/saved/${idInput}`, newNote)
            .then(function(response) {
                location.reload();
            });
            
    });

    // $(".delete-note").on("click", function(event) {
    $(document).on("click", ".delete-note", function(event) {
        event.preventDefault();

        let idInput = $(this).data("id");
        // console.log(idInput);

        $.get(`/api/delete/${idInput}`).then(function(response) {
            location.reload();
        });


    });

    
});

