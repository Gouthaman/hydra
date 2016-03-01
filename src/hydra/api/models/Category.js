/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
adapter: 'sails-mysql',
    attributes: {
        id: {
            type: 'INTEGER',
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: "string",
            size: 50
        }
    }
};

