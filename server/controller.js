module.exports = {
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