var express = require("express"); // Require express
var app = express();
var port = process.env.PORT || 3000; // Set the port

var pollCollection; // Init pollCollection to hold data on the poll
var doesCollectionExist = true; // Set checker tool so only one document is made

app.use("/", express.static(__dirname + "/public")); // This will serve the public docs
app.set("view engine", "ejs"); // Set view engine and give extension
app.set("views", "./views"); // Rename views a folder called views

var MongoClient = require('mongodb').MongoClient; // Require mongodb
var url = "mongodb://localhost:27017/mydb"; // Set a URL for my database
// var url = 'mongodb://heroku_zk1nncx0:38j5p68sm4rnjvpq0a5ss8hcde@ds233228.mlab.com:33228/heroku_zk1nncx0';



// Connect to database
MongoClient.connect(url, function(err, db) {
    
    if (err) throw err;
    
    // Redefine pollCollection as a collection
    pollCollection = db.collection("pollCollection");
    
});



// Render ejs for homepage
app.get("/", function(request, response) {
    
    // Use render to run through ejs and then send up the index.ejs (which is my homepage)
    response.render('index');
    
    
});










// This will get the data that was sent to mongo and turn it into 
// a document that we can manipulate
app.get("/poll/:id", function(request, response) {
    
    // Get name of poll
    var poll_id = request.params.id;
    
    // Search mongo using the poll_id
    var mongoData = pollCollection.find().toArray(function(err, documents) { 

        
        if (documents.length !== 0) {
            var selectionDocument1 = documents[0].count;
            var selectionDocument2 = documents[1].count;
            var selectionDocument3 = documents[2].count;
            var selectionDocument4 = documents[3].count;
        }
        
        var header = "Operating System";
        var selectionName1 = "Mac OS";
        var selectionName2 = "Windows";
        var selectionName3 = "Linux";
        var selectionName4 = "Ubuntu";
        
        
        pageObject = {
            
            // Title of poll
            pollType: {
                header: header
            },
            
            // Name of options for poll
            pollOption: {
                selectionName1: selectionName1,
                selectionName2: selectionName2,
                selectionName3: selectionName3,
                selectionName4: selectionName4
            },
            
            // Tally of counts for poll
            pollTally: {
                selectionCount1: selectionDocument1,
                selectionCount2: selectionDocument2,
                selectionCount3: selectionDocument3,
                selectionCount4: selectionDocument4   
            }
        }
        
        
        response.render("pollFile", pageObject);
        
        
    }); // End mongoData
    
//    response.render("pollFile", pageObject);
    
    
}); // End app.get for /poll/id:










































// API to receive AJAX hits from client
// This inserts the data object (page, selection, count) into pollCollection
app.get("/data-save", function(request, response) {    
    
    // Create request parameters (this may only need to be one?)
    var pageParam = request.param('page');
    var selectionParam = request.param('selection');
    var countParam = request.param('count');
    
    // Plug params into an object
    var dataObj = {
        page: pageParam, 
        selection: selectionParam,
        count: countParam
    }
        
    // Send the params object to MongClient.connect if collection doesn't exist
    if(doesCollectionExist == true) {
        pollCollection.insertOne(dataObj);
        doesCollectionExist = false;
    }
    
    // Otherwise, just update that existing opject
    else if (doesCollectionExist == false) {
        
        pollCollection.update(
            
            // Query selector grabs the ID
            { 
                page: pageParam,
                selection: selectionParam
            },
            
            // Define what to update
            {
                page: pageParam, 
                selection: selectionParam,
                count: countParam,
            },
            
            // Tell mongo to re-check each time
            { upsert: true }
        );
        
    }
    
    
    response.send("success");
}); // End API






















//Open browser to “localhost:<port>” to view pages
app.listen(port);