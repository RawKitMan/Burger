$(function () {

    $(".burger-button").on("click", function () {
        let burgerId = $(this).data("id");

        let devoured = $(this).data("eaten");
        console.log(devoured);
        
        if(devoured === false){
            devoured = true;
        }
        else{
            devoured = false;
        };

        let newDevouredState = {
            devoured: devoured
        };

        $.ajax("/api/burgers/" + burgerId, {
            type: "PUT",
            data: newDevouredState
        }).then(
            function () {
                console.log("Devoured changed to " + devoured);
                location.reload();
            }
        );
    });

    $(".make-da-burger").on("submit", function (event) {
        event.preventDefault();

        let addedBurger = $("#burger-input").val().trim();

        let newBurger = {
            burger_name: addedBurger,
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("Added a new burger: " + addedBurger);
                $("#burger-input").val("");
                location.reload();
            }
        );
    });
});