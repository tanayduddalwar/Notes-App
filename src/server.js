// Initialization
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Note = require('./models/Note');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set the strictQuery option to false to prepare for Mongoose 7
mongoose.set('strictQuery', false);

const mongoDbPath = "mongodb+srv://tanay:T1234567@cluster0.ds3hgou.mongodb.net/mydatabase?retryWrites=true&w=majority";
mongoose.connect(mongoDbPath).then(function() {
    app.get("/", function(req, res) {
        const response = { statuscode: res.statusCode, message: "API Works!" };
        res.json(response);
    });
    
    const noteRouter = require('./routes/Note');
    app.use("/notes", noteRouter);
});

// Starting the server on a PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log("Server started at PORT: " + PORT);
});
