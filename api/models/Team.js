/**
* Team.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    shortName:{
      type: 'string',
      required: true
    },
    displayName:{
      type:'string',
      required:true
    },
    byeWeek:{
      type: 'integer',
      required: true
    },
    players:{
      collection: 'player',
      via: 'team'
    }
  }
};
