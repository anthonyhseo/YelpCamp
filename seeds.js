var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
    {
        name: "Clouds Rest", 
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sapien arcu, imperdiet et lacus facilisis, fermentum fringilla neque. Duis hendrerit ultrices erat, non congue enim viverra a. Morbi turpis tortor, egestas vitae ante ac, vehicula tincidunt turpis. Pellentesque sollicitudin ligula eget lectus lacinia molestie. Duis finibus lorem sed arcu laoreet condimentum. Nullam elementum eu mauris at blandit. Etiam mollis id nibh et dictum. Aenean sed accumsan massa. Pellentesque facilisis lacus nunc, sit amet elementum nisi porttitor ac. Nam tristique, orci ac pharetra venenatis, justo ex sagittis erat, sit amet tincidunt purus ex nec tellus. Etiam ultricies ante a libero pharetra, nec placerat dolor condimentum. Fusce vitae sem nec purus placerat tincidunt sit amet ut eros. In ornare placerat neque, vitae mattis libero condimentum eu."
    }, 
    {
        name: "Desert Mesa", 
        image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sapien arcu, imperdiet et lacus facilisis, fermentum fringilla neque. Duis hendrerit ultrices erat, non congue enim viverra a. Morbi turpis tortor, egestas vitae ante ac, vehicula tincidunt turpis. Pellentesque sollicitudin ligula eget lectus lacinia molestie. Duis finibus lorem sed arcu laoreet condimentum. Nullam elementum eu mauris at blandit. Etiam mollis id nibh et dictum. Aenean sed accumsan massa. Pellentesque facilisis lacus nunc, sit amet elementum nisi porttitor ac. Nam tristique, orci ac pharetra venenatis, justo ex sagittis erat, sit amet tincidunt purus ex nec tellus. Etiam ultricies ante a libero pharetra, nec placerat dolor condimentum. Fusce vitae sem nec purus placerat tincidunt sit amet ut eros. In ornare placerat neque, vitae mattis libero condimentum eu."
    }, 
    {
        name: "Canyon Floor", 
        image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sapien arcu, imperdiet et lacus facilisis, fermentum fringilla neque. Duis hendrerit ultrices erat, non congue enim viverra a. Morbi turpis tortor, egestas vitae ante ac, vehicula tincidunt turpis. Pellentesque sollicitudin ligula eget lectus lacinia molestie. Duis finibus lorem sed arcu laoreet condimentum. Nullam elementum eu mauris at blandit. Etiam mollis id nibh et dictum. Aenean sed accumsan massa. Pellentesque facilisis lacus nunc, sit amet elementum nisi porttitor ac. Nam tristique, orci ac pharetra venenatis, justo ex sagittis erat, sit amet tincidunt purus ex nec tellus. Etiam ultricies ante a libero pharetra, nec placerat dolor condimentum. Fusce vitae sem nec purus placerat tincidunt sit amet ut eros. In ornare placerat neque, vitae mattis libero condimentum eu."
    }
]

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        // add a few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment) {
                            if(err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a new comment");
                            }
                        });
                }
            });
        });
    });
    
    // add a few comments
}

module.exports = seedDB;

