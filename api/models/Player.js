/**
 * Player.js
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
    position: {
      type: 'string',
      required: true
    },
    draftYear: {
      type: 'string'
    },
    draftRound: {
      type: 'string'
    },
    nflId: {
      type: 'string'
    },
    espnId: {
      type: 'string'
    },
    rotoworldId: {
      type: 'string'
    },
    statsId: {
      type: 'string'
    },
    cbsId: {
      type: 'string'
    },
    twitterHandle: {
      type: 'string'
    },
    draftPick: {
      type: 'string'
    },
    team: {
      model: 'team'
    },
    byeWeek: {
      type: 'integer'
    },
    nflDraftRank: {
      type: 'integer'
    },
    rotowireDraftRank: {
      type: 'integer'
    },
    photo: {
      type: 'string'
    },
    league : {model: 'league'}
  }
}
