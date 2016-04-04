/**
 * UserModel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');
module.exports = {

  attributes: {
  	id:{
  		type: 'INTEGER',
        primaryKey: true,
        autoIncrement: true
  	},
  	email:{
  		type: 'email',
  		unique: true,
  		required:true,
  		size: 100
  	},
  	password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    firstName:{
    	type: 'string',
    	maxLength: 50
    },
    lastName:{
    	type: 'string',
    	maxLength: 50
    },
    isAdmin:{
      type : 'boolean',
      defaultsTo : false,
      required: true
    },
    toJSON: function() {
        var obj = this.toObject();
        delete obj.password;
        return obj;
    }

  },
  beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }
};

