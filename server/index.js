require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const {SERVER_PORT, DATABASE_URI} = process.env;

const app = express();
app.use(bodyParser.json());


//set up database
massive(DATABASE_URI)
.then(db => {
    app.set('db', db);

}).catch(err => {
    console.log("Error in connecting with database:", err);
});


app.listen(SERVER_PORT, function() {
    console.log(`Listening at port: ${SERVER_PORT}`);
})