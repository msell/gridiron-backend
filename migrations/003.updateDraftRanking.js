var _ = require("underscore");
var request = require('superagent');
var config = require('./config.json');
(function () {


  updatePlayerRankings(0);


})();

function isFantasyPlayer(player) {
  var playerFilter = ['QB', 'RB', 'WR', 'DEF', 'K', 'TE'];
  return _.indexOf(playerFilter, player.position) > -1;
}

function updatePlayerRankings(offset) {
  var morePlayers = true;

  request.get(config.nfl_url + "players/editordraftranks?format=json&count=100&offset=" + offset)
    .set("Accept", "applicaiton/json")
    .end()
    .on('response', function (res) {
      var players = res.body.players;

      if (players.length === 0) return;

      var fantasyPlayers = _.filter(players, function (p) {
        return (_.indexOf(['QB', 'RB', 'WR', 'DEF', 'K', 'TE'], p.position) > -1);
      });

      console.log(fantasyPlayers.length + ' fantasy players');
      _.each(fantasyPlayers, function (player) {


        if (player.rank) {

          console.log('player ' + JSON.stringify(player));
          request.get(config.url + 'player')
            .query('where={"nflId":"' + player.id + '"}')
            .on('response', function (res) {
              console.log(player.firstName + ' ' + player.lastName + ' = ' + player.rank);

              var p = res.body[0];

              if (p) {
                console.log(p);
                request.put(config.url + 'player/' + p.id) // this must be mflId not nflId
                  .send({
                    nflDraftRank: player.rank
                  })
                  .on('response', function (updateRes) {

                    console.log(updateRes.statusCode + ' ' + config.url + 'player/' + p.id);
                  })
                  .end();
              }
            })

          .end(function () {
            offset += 10;
            if (morePlayers) {
              updatePlayerRankings(offset);
            }
          });



        }
      })
    })
}