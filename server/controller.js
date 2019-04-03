module.exports = {
    getPost: function(req,res,next) {
        const dbInstance = req.app.get('db');

        dbInstance.get_all_post()
        .then(posts => {
            res.status(200).send(posts);
        }).catch(err => {
            res.sendStatus(500);
        })
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
    }
}