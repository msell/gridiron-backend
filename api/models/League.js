/**
* League.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id: {
      primaryKey: true,
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    rosterSize: {
      type: 'integer',
      required: true
    },
    franchises: {collection: 'franchise', via: 'league'}    
  }
};

