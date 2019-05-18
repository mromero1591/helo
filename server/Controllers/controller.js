module.exports = {
    getUser: function(req,res,next) {
        if(req.session && req.session.user) {
            var user_id = req.session.user.id;
            var dbInstance = req.app.get('db'); 
            
            dbInstance.get_user(user_id).then(user => {
                res.status(200).send(user[0]);
            })
        }
    },

    getPosts: function(req,res,next) {
        const db = req.app.get('db');

        db.get_posts().then(posts => {
            res.status(200).send(posts);
        }).catch(err => {
            res.status(500).send({message: 'error in getting pots', error: err});
        });
    },

    getPost: function(req,res,next) {
        const dbInstance = req.app.get('db');
        const postId = parseInt(req.params.id);
        dbInstance.get_post([postId])
        .then( post => {
            res.status(200).send(post[0]);
        }).catch(err => {
            res.status(500).send({message: 'error in getting post'});
        })
    },

    createPost: function(req,res,next) {
        if(req.session && req.session.user) {
            var user_id = req.session.user.id;
            var dbInstance = req.app.get('db');
            var {title, imgUrl, content} = req.body;
            dbInstance.create_post([title, imgUrl, content, user_id])
            .then(() => {
                res.status(200).send({message: 'created post'});
            }).catch(err => {
                console.log(err);
                res.status(500).send({message: 'user is not logged in'});
            })
        }
    }
}