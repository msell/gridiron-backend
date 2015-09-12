/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var _ = require('lodash');
var fs = require('fs');
var teams = JSON.parse(fs.readFileSync('./migrations/teams.json', 'utf8'));

module.exports.bootstrap = function (cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  
  // TODO: Only run if teams do not exist
  _.each(teams, function (team) {
    console.log('creating team ' + team.team);
    sails.models.team.create({
      "shortName": team.team,
      "displayName": team.displayName,
      "byeWeek": team.byeWeek
    }).exec(function(err, data){
      console.log(data);
    });

  });
  cb();
};
