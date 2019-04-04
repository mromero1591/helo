module.exports = {
    getPost: function(req,res,next) {
        const dbInstance = req.app.get('db');

        const USER_ID = req.params.id;
        const USERPOST = req.query.userpost;

        if(USERPOST != 'false') {
            dbInstance.get_user_post([USER_ID])
            .then( posts => {
                res.status(200).send(posts);
            }).catch(err => {
                res.sendStatus(500);
            })
        } else {
            dbInstance.get_non_user_post([USER_ID])
            .then( posts => {
                res.status(200).send(posts);
            }).catch(err => {
                res.sendStatus(500);
            })
        }
    },

    register: function(req,res,next) {
        delete req.user.password;
        req.session.userid = req.user.id;
        res.status(200).send(req.user);
    },

    login: function(req,res,next) {
        delete req.user.password;
        req.session.userid = req.user.id;
        res.status(200).send(req.user);
    },

    logout: function(req,res,next) {
        req.session.destroy;
        res.sendStatus(200);
    },

    searchPost: function(req,res,next) {
        //get the database from the app.
        const dbInstance = req.app.get('db');

        //check to see if user is selected.
        const {userpost, searchString} = req.query;

        //create search
        const sqlSearchString = `%${searchString}%`;

        //If user is selected use post_title_contains
        if(userpost != 'false') {
            const userId = req.session.userid;
            dbInstance.post_title_contains([sqlSearchString, userId])
            .then(posts => {
                res.status(200).send(posts);
            }).catch(err => {
                res.status(500).send({message: 'erorr in searching for post'});
            })
        } else { //if user is not selected use all_post_titles_contain
            dbInstance.all_post_titles_contain([sqlSearchString])
            .then(posts => {
                res.status(200).send(posts);
            }).catch(err => {
                res.status(500).send({message: 'erorr in searching for post'});
            })
        }
    }
}