var _ = require("underscore");
var request = require('superagent');
var config = require('./config.json');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var cheerio = require('cheerio');
var config = require('./config.json');

(function () {
  var teams = JSON.parse(fs.readFileSync('./teams.json', 'utf8'));

  request.get(config.mfl_url + "?TYPE=players&JSON=1&DETAILS=1")
    .set("Accept", "applicaiton/json")
    .end()
    .on('response', function (res) {
      var allPlayers = res.body.players.player;
      console.log(allPlayers.length + ' total players');

      var fantasyPlayers = _.filter(allPlayers, isFantasyPlayer);

      console.log(fantasyPlayers.length + ' fantasy players');

      var count = 0;
      _.each(fantasyPlayers, function (player) {
        if (player.nfl_id) {
          // strip out the text before the id
          //player.nfl_id = player.nfl_id.replace(/[^0-9]/g, '').toString();
        }
        request.post(config.url + 'player')
          .send({
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
          })
          .on('response', function (res) {

          })
          .end(function () {
            count++;
          });
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

  function getPlayerPhotos() {
    // Connect to the db
    MongoClient.connect(process.env.GRIDIRON_DB, function (err, db) {
      if (!err) {

        db.open(function (err, db) {
          db.collection('player', function (err, collection) {
            collection.find(function (err, cursor) {
              cursor.each(function (err, player) {
                if (player != null && player.nflId) {

                  var url = 'http://www.nfl.com/player/' + player.nflId + '/profile';
                  //console.log(url);
                  request(url, function (err, res, html) {
                    if (!err && res.statusCode === 200) {
                      var $ = cheerio.load(html);
                      var img = $('.player-photo img').attr('src');

                      console.log(config.url);
                      request.put(config.url + 'player/' + player._id)
                        .send({
                          photo: img
                        })
                        .on('response', function (updateRes) {

                          console.log(updateRes.statusCode + ' ' + config.url + 'player/' + player._id);
                        })
                        .end();
                    }
                  })

                } else {
                  db.close();
                }
              });
            });
          });
        });
      }
    });
  }
})();


//http://stackoverflow.com/questions/18831655/underscore-each-callback-when-finished
