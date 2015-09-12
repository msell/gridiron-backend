console.log('migration 1');
var teams = require('./002.insertTeams.js');
exports.migrations = [teams];