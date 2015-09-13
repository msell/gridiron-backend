console.log('Seeding Database...');
var async = require('async');
var teams = require('./002.insertTeams.js');
var players = require('./003.insertPlayers.js');

exports.execute = function (done) {

	async.series([
		teams.seed,
		players.seed

	],function(err){
		console.log('Done Seeding Data.')
		done();
	});
}