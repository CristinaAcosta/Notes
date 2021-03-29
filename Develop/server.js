const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const uuid = require("uuid");
const { DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");

const app = express();
var PORT = process.env.PORT || 8080;

// Gives access to the assest folder 
app.use(express.urlencoded({extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Routes for the API's
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

//post function to add new notes
//UUID creates a unique ID for each note so then we can delete certain notes 
//Stringify allows us to read it 
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync(".db/db.json"));
    const newNote = req.body;
    new.id = uuid.v4();
    notes.push(newNote); 
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
});

//Removes the old notes 
app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const noNotes = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(noNotes));
})

