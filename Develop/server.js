const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const path = require("path");
//const uuid = require("uuid");


const app = express();

var PORT = process.env.PORT || 8080;

// Gives access to the assest folder 
app.use(express.urlencoded({extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes for the API's
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//post function to add new notes
//UUID creates a unique ID for each note so then we can delete certain notes 
//Stringify allows us to read it 
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNote = req.body.toUpperCase;
    newNote.id = uuid.v4();
    notes.push(newNote); 
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
});

//calls the HTML
app.get("/", function (req, res){
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//Calls to the notes.html folder 
app.get("/notes", function (req,res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.listen(8080, () => {
    console.log(`App listening on PORT ${8080}`);
})


// app will keep listening until we stop it w/ control C
//npx nodemon index.js = will download file so it will update automactically w/ each save 
