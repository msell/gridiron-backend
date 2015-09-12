var _ = require('lodash');
var fs = require('fs');
var config = require('./config.json');
var teams = JSON.parse(fs.readFileSync('./teams.json', 'utf8'));

(function () {
  _.each(teams, function (team) {
    sails.models.team.create({
        "shortName": team.team,
        "displayName": team.displayName,
        "byeWeek": team.byeWeek
      }).exec();
      
    // request.post(config.url + "team")
    //   .send({
    //     "shortName": team.team,
    //     "displayName": team.displayName,
    //     "byeWeek": team.byeWeek
    //   })
    //   .set("Accept", "applicaiton/json")
    //   .end()
    //   .on('response', function (res) {
    //     if (res.statusCode === 201) {
    //       console.log("added " + team.team);
    //     } else {
    //       console.log(team.team + "could not be added, http status code: " + res.statusCode);
    //     }

    //   });
  })
})();