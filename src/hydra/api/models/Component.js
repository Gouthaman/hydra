/**
 * Component.js
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
  	description:{
  		type:'string',
  		size:1024
  	},
  	owner:{
  		model:'user',
  		required: true
  	},
  	image:{
  		type:'string'
  	},
  	referenceLink:{
  		type:'string'
  	},
  	componentType:{
  		model:'Category',
  		required:true
  	},
  	versions:{
  		collection:'version',
  		via: 'component'
  	}
  }
};

