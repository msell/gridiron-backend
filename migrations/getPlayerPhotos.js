// Retrieve
var MongoClient = require('mongodb').MongoClient;
var cheerio = require('cheerio');
var request = require('request');
var superagent = require('superagent');
var config = require('./config.json');

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
              request(url, function(err, res, html){
                if(!err && res.statusCode === 200){
                  var $ = cheerio.load(html);
                  var img = $('.player-photo img').attr('src');

                  console.log(config.url);
                  superagent.put(config.url + 'player/' + player._id)
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
