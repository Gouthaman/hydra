/**
 * SecurityController
 *
 * @description :: Server-side logic for managing Securities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res) {

        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.send({
                    message: info.message,
                    user: user
                });
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    },
    add:function(req,res){
		var data=req.allParams();
		User.create({
			'email':data.email,
			'password':data.password,
			'firstName':data.firstName,
			'lastName':data.lastName,
            'isAdmin':data.isAdmin
		}).exec(function(err,results){
			if(err)
				return res.serverError(err);
			return	res.send({
                status:"200",
                message:"User created successfully"
            });
		});
	}
};