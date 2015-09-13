var _ = require('lodash');
var fs = require('fs');

var teams = JSON.parse(fs.readFileSync(__dirname + '/teams.json', 'utf8'));

exports.seed = function (cb) {

  var count = 0;

  async.series([cleanCollection, createCollection], function (err) {
    cb(null);
  })

  function createCollection(next) {

    if (count === 32) {
      return next(null);

    }
    sails.log('seeding teams...');
    _.each(teams, function (team) {
      sails.log.info('creating team ' + team.team);
      sails.models.team.create({
        "shortName": team.team,
        "displayName": team.displayName,
        "byeWeek": team.byeWeek
      }).exec(function (err, data) {
        if (err) {
          return next(err);
        }
      });
    });
    return next(null);
  }

  function cleanCollection(next) {


    sails.models.team.count().exec(function (err, x) {
      if (err) throw err;
      count = x;

      if (count > 32) {
        sails.log.info("team data was borked, dropping teams");
        sails.models.team.native(function (err, collection) {
          if (err) throw reject(err);
          collection.drop();
          return next(null);
        })
      }
      else {
        return next(null);
      }

    });
  };

}
