console.log('Seeding Database...');
var async = require('async');
var teams = require('./002.insertTeams.js');

exports.execute = function () {

	async.series([
		teams.seed,

	]);
}