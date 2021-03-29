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
