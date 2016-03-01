/**
 * Version.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
  	id:{
  		type: 'INTEGER',
        primaryKey: true,
        autoIncrement: true
  	},
  	name:{
  		type: 'string',
  		unique: true,
  		required:true,
  		size: 100
  	},
  	component:{
  		model:'Component'
  	},
  	description:{
  		type:'string',
  		size:1024
  	},
  	path:{
  		type:'string'
  	},
  	recommended:{
  		type:'boolean'
  	},
  	active:{
  		type:'boolean'
  	},
  	ratings:{
  		collection:'Rating',
  		via:'version'
  	},
  	downloads:{
  		collection:'Usage',
  		via:'version'
  	}
  }
};

