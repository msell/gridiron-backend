console.log('Seeding Database...');
var async = require('async');
var teams = require('./002.insertTeams.js');

exports.execute = function (done) {

	async.series([
		teams.seed,

	],function(err){
		console.log('done with migrations')
		done();
	});
}