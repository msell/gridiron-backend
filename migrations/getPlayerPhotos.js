// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect(process.env.GRIDIRON_DB, function (err, db) {
  if (!err) {
    console.log("We are connected");
    db.open(function (err, db) {
      db.collection('player', function (err, collection) {
        collection.find(function (err, cursor) {
          cursor.each(function (err, player) {
            if (player != null) {

              console.log('scrape nfl.com here for ' + player.nflId);
            } else {
              db.close();
            }
          });
        });
      });
    });
  }
});
