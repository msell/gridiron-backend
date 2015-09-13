var _ = require("lodash");
var request = require('superagent');
var config = require('./config.json');
var fs = require('fs');


exports.seed = function (next) {

  var teams = JSON.parse(fs.readFileSync(__dirname + '/teams.json', 'utf8'));
  sails.models.player.count().exec(function (err, existingPlayers) {
    if (existingPlayers > 0) {
      next(null);
      return;
    }

    console.log('Seeding player data... this might be a good time to get a beer. ')
    request.get(config.mfl_url + "?TYPE=players&JSON=1&DETAILS=1")
      .end(function (err, res) {
        if (err) throw err;
        var allPlayers = res.body.players.player;
        console.log(allPlayers.length + ' total players');

        var fantasyPlayers = _.filter(allPlayers, isFantasyPlayer);

        console.log(fantasyPlayers.length + ' fantasy players');

        var count = 0;
        _.each(fantasyPlayers, function (player) {
          sails.models.player.create({
            "id": player.id.toString(),
            "name": player.name,
            "position": player.position,
            "team": player.team,
            "draftYear": player.draft_year,
            "draftRound": player.draft_round,
            "nflId": player.nfl_id,
            "espnId": player.espn_id,
            "rotoworldId": player.rotoworld_id,
            "statsId": player.stats_id,
            "cbsId": player.cbs_id,
            "twitterHandle": player.twitter_username,
            "draftPick": player.draft_pick,
            "byeWeek": getByeWeek(player.team)
          }).exec(function (err) {
            if (err) {
              next(err)
              return;
            }
            count++;
          })
        })
        next(null);
      })
  })

  function getByeWeek(team) {
    var playerTeam = _.findWhere(teams, {
      team: team
    });
    if (playerTeam) {
      return playerTeam.byeWeek;
    }
    return 0;
  };

  function isFantasyPlayer(player) {
    var playerFilter = ['QB', 'RB', 'WR', 'DEF', 'PK', 'TE'];
    return _.indexOf(playerFilter, player.position) > -1;
  }
};
