var _ = require('lodash');
var fs = require('fs');
var teams = JSON.parse(fs.readFileSync(__dirname + '/teams.json', 'utf8'));

exports.seed = function () {

  sails.log('seeding teams...')
  var count = 0;
  sails.models.team.count().exec(function (err, x) {
    if (err) throw err;
    count = x;
    sails.log.verbose(x + ' teams found');

    if (count > 32) {
      sails.log.info("team data was borked, dropping teams");
      sails.models.team.native(function (err, collection) {
        if (err) throw err;
        collection.drop();
      })
    }

    _.each(teams, function (team) {
      sails.log.info('creating team ' + team.team);
      sails.models.team.create({
        "shortName": team.team,
        "displayName": team.displayName,
        "byeWeek": team.byeWeek
      }).exec(function (err, data) {
        sails.log.verbose(data);
      });
    });
  });
};