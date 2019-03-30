require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const controller = require('./controller');
const passport = require('passport');
const LocalStratagy = require('passport-local').Strategy;

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

//PASSPORT - set up auth
passport.use(new LocalStratagy(function(username, password, done) {
    if(!username || !password) {
        return done(null, false, {message: 'email and password are required'});
    }

    const dbInstance = app.get('db');

    
}));


//END POINTS
app.post('/auth/register', controller.register);


app.listen(SERVER_PORT, function() {
    console.log(`Listening at port: ${SERVER_PORT}`);
})