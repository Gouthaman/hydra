/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
	Component.findOne({id:req.params['compid']}).exec(function(err,results){
		if(err)
			return res.servererror(err);
	   if (results.owner===req.user.id) {
	        return next();
	    }
	    else{
	        return res.send({
	                    message: "You are not the correct user to add version",
	                    user: req.user
	                });
	    }
    });
};