module.exports = {
    register: function(req,res,next) {
        const {username, password} = req.body;

        const profilePic = `https://robohash.org/${username}.png`;

        const dbInstance = req.app.get('db');
        dbInstance.create_new_user([username,password,profilePic])
        .then(user => {
            res.status(200).send({username,profilePic});
        }).catch(err => {
            console.warn('faced error in reg user',err);
            res.status(500).send({message: 'could not create user'});
        })
    },

    login: function(req,res,next) {
        const {username, password} = req.body;
        const dbInstance = req.app.get('db');

        dbInstance.get_new_user(username)
        .then(res)
    }
}