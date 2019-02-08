
//Wait until the page fully loads before the script is executed
$(function () {

    //When the button next to the listed burger is clicked...
    $(".burger-button").on("click", function () {
        
        //Get the data attributes from the associated button.
        let burgerId = $(this).data("id");
        let devoured = $(this).data("eaten");
        
        //Since we are switching the state of the burger (eaten or not), we need to make the update so that the database, and subsequent HTML for the button attribute is updated properly
        if(devoured === false){
            devoured = true;
        }
        else{
            devoured = false;
        };

        //Object to pass into the update request
        let newDevouredState = {
            devoured: devoured
        };

        //Update request to change the state of clicked burger from Eaten to Un-eaten (and vice versa)
        $.ajax("/api/burgers/" + burgerId, {
            type: "PUT",
            data: newDevouredState
        }).then(
            //Log the changed state of the burger and refresh the page
            function () {
                console.log("Devoured changed to " + devoured);
                location.reload();
            }
        );
    });

    //When a user wants to add a new burger...
    $(".make-da-burger").on("submit", function (event) {

        //Prevents an actual submission of a form
        event.preventDefault();

        //Get the name of the new burger
        let addedBurger = $("#burger-input").val().trim();

        //Put that new burger into an object to be passed into the POST request
        let newBurger = {
            burger_name: addedBurger,
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            //Log the new burger was added, clear the form, and refresh the page.
            function () {
                console.log("Added a new burger: " + addedBurger);
                $("#burger-input").val("");
                location.reload();
            }
        );
    });
});