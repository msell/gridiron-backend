/**
* Franchise.js
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
    user:{
      model: 'user'
    },
    league:{ 
      model: 'league'
      },
    name: {
      type: 'string',
      required: true
    },
    division:{
      type: 'string',
      required: true
    },
    abbreviation:{
      type: 'string'
    },
    waiverSortOrder:{
      type: 'integer'
    },
    logo:{
      type: 'string'
    },
    icon:{
      type: 'string'
    }
  }
};

