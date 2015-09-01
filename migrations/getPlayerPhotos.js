// Retrieve
var MongoClient = require('mongodb').MongoClient;
var cheerio = require('cheerio');
var request = require('request');

// Connect to the db
MongoClient.connect(process.env.GRIDIRON_DB, function (err, db) {
  if (!err) {
    console.log("We are connected");
    db.open(function (err, db) {
      db.collection('player', function (err, collection) {
        collection.find(function (err, cursor) {
          cursor.each(function (err, player) {
            if (player != null && player.nflId) {

              var url = 'http://www.nfl.com/player/' + player.nflId + '/profile';
              console.log(url);
              request(url, function(err, res, html){
                if(!err && res.statusCode === 200){
                  var $ = cheerio.load(html);
                  console.log(html);
                  var selector = $('.player-photo').get();
                  console.log(selector);
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
