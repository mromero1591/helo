require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const controller = require('./Controllers/controller');
const authController = require('./Controllers/authController');
const passport = require('passport');
const localStratagy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const {SERVER_PORT, DATABASE_URI, SESSION_SECRET} = process.env;

const app = express();
app.use(bodyParser.json());

//set up database
massive(DATABASE_URI)
.then(db => {
    app.set('db', db);
}).catch(err => {
    console.log("Error in connecting with database:", err);
});

//Authentication
passport.use('register', new localStratagy({
    passReqToCallback: true},
    (req,username,password,done) => {
        const dbInstance = app.get('db');
        var username = req.body.username;
        dbInstance.get_user(username)
        .then(users => {
            if(users.length > 0) {
                return done('User already exist');
            }

            bcrypt.hash(password, 15, (err, hashedPassword) => {
                if(err) {
                    return done('System Failure');
                }

                var {username} = req.body;

                var profile_pic = `https://robohash.org/${username}`;

                dbInstance.create_user([username, hashedPassword, profile_pic])
                .then( ([user]) => {
                    delete user.password;
                    done(null, user);
                }).catch(err => {
                    console.warn(err);
                    done('System Failure');
                })
            });
    
        }).catch(err => {
            console.warn('error in getting user:', err);
            done('system Faliure');
        })
}));

passport.use('login', new localStratagy({ usernameField: 'username' }, (username, password, done) => {
    const db = app.get('db');
    
    db.users.find({ username })
        .then(users => {
            if (users.length === 0) {
                return done('Username or password is incorrect');
            }

            const user = users[0];

            bcrypt.compare(password, user.password, (err, isSame) => {
                if (err) {
                    return done('System failure');
                }

                if (!isSame) {
                    return done('Username or password is incorrect');
                }

                delete user.password;

                done(null, user);
            });
        })
        .catch(err => {
            console.warn(err);
            done('System failure');
        });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const dbInstance = app.get('db');

    dbInstance.users.find(id)
        .then(user => {
            if (!user) return done(null, undefined);

            delete user.password;

            return done(null, user);
        })
        .catch(err => {
            console.warn(err);
            done('System Failure');
        });
});

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/auth/register', passport.authenticate('register'), authController.register,authController.authError);
app.post('/auth/login', passport.authenticate('login'), authController.login,authController.authError);
app.get('/auth/logout', authController.logout);


//END POINTS
app.get('/api/post', controller.getPosts);
app.get('/api/post/:id', controller.getPost);
app.get('/api/search', controller.searchPost);

app.listen(SERVER_PORT, function() {
    console.log(`Listening at port: ${SERVER_PORT}`);
})