require('dotenv').config();

const express = require('express');
const session = require('express-session');
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
passport.use('login', new LocalStratagy(function(username, password, done) {
    if(!username || !password) {
        return done(null, false, {message: 'email and password are required'});
    }

    const dbInstance = app.get('db');

    //check the database to see if the user exist.
    dbInstance.users.find({username})
    .then(users => {
        //if no user is found return message to the user.
        if(users.length == 0) {
            return done(null, false, {message: 'username or password is incorrect'});
        }

        //get the user that was returned
        const user = users[0];
        
        //get the pass word and remove it from the user object.
        const storedPassword = user.password;
        delete user.password;

        if(storedPassword === password) {
            return done(null, user);
        } else { 
            return done(null, false, {message: 'incorrect username or password'});
        }

    }).catch(err => {
        console.warn('faced issue when getting user:', err);
        done({message: 'erorr faced when getting user'});
    })
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
})

passport.deserializeUser(function(id, done) {
    done(null, id);
})

app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: process.env.SECRET
}));
app.use(passport.initialize());
app.use(passport.session());


//END POINTS
app.post('/auth/register', controller.register);
app.post('/auth/login', passport.authenticate('login'), controller.login);


app.listen(SERVER_PORT, function() {
    console.log(`Listening at port: ${SERVER_PORT}`);
})