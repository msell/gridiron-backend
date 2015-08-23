/**
* RankedPlayer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    rank : {type: 'integer', required: true},
    draftBoard : {model: 'draftBoard'}
   ,player : {type: 'string'}
     
  }
};

